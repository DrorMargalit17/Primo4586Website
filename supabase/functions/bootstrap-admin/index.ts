import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BootstrapRequest {
  email: string;
  key: string;
  password?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get the bootstrap key from environment
    const bootstrapKey = Deno.env.get("BOOTSTRAP_ADMIN_KEY");
    if (!bootstrapKey) {
      console.error("BOOTSTRAP_ADMIN_KEY not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request body
    const body: BootstrapRequest = await req.json();
    const { email, key, password } = body;

    // Validate inputs
    if (!email || !key || !password) {
      return new Response(JSON.stringify({ error: "Email, password and key are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the bootstrap key
    if (key !== bootstrapKey) {
      console.warn("Invalid bootstrap key attempt for email:", email);
      return new Response(JSON.stringify({ error: "Invalid key" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Find user by email
    const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) {
      console.error("Error listing users:", listError);
      return new Response(JSON.stringify({ error: "Failed to find user" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const foundUser = usersData.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    // Ensure account exists and password is set.
    // NOTE: A repeated signup in Supabase does NOT update the password, which leads to "Invalid login credentials".
    let targetUser = foundUser;

    if (!targetUser) {
      const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError || !created.user) {
        console.error("Error creating user:", createError);
        return new Response(JSON.stringify({ error: "Failed to create user" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      targetUser = created.user;
    } else {
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
        password,
        email_confirm: true,
      });

      if (updateError) {
        console.error("Error updating user password:", updateError);
        return new Response(JSON.stringify({ error: "Failed to set password" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Check if user already has admin role
    const { data: existingRole, error: checkError } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", targetUser.id)
      .eq("role", "admin")
      .maybeSingle();

    if (checkError) {
      console.error("Error checking existing role:", checkError);
      return new Response(JSON.stringify({ error: "Failed to check user role" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (existingRole) {
      return new Response(
        JSON.stringify({ message: "Password set; user already has admin role", already_admin: true }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Grant admin role
    const { error: insertError } = await supabaseAdmin.from("user_roles").insert({
      user_id: targetUser.id,
      role: "admin",
    });

    if (insertError) {
      console.error("Error granting admin role:", insertError);
      return new Response(JSON.stringify({ error: "Failed to grant admin role" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Password set and admin role granted to:", email);
    return new Response(
      JSON.stringify({ message: "Password set and admin role granted successfully", email }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Bootstrap admin error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

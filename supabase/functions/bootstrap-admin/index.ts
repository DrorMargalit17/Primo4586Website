import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BootstrapRequest {
  email: string;
  key: string;
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
    const { email, key } = body;

    // Validate inputs
    if (!email || !key) {
      return new Response(JSON.stringify({ error: "Email and key are required" }), {
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

    const targetUser = usersData.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!targetUser) {
      return new Response(
        JSON.stringify({ error: "User not found. Please register first." }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
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
        JSON.stringify({ message: "User already has admin role", already_admin: true }),
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

    console.log("Admin role granted to:", email);
    return new Response(
      JSON.stringify({ message: "Admin role granted successfully", email }),
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

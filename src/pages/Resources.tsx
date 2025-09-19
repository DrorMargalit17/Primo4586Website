import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  ExternalLink,
  Brain,
  Hammer,
  Settings,
  Cpu,
  Code,
  Users,
  Camera,
  Palette,
  Bot,
  DollarSign,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Resource {
  id: string;
  category: string;
  name: string;
  type: string;
  link: string;
}

interface Team {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  resources: Resource[];
}

const teamIcons = {
  "Strategy": Brain,
  "CAD & Manufacture": Hammer,
  "Mechanics": Settings,
  "Electronics": Cpu,
  "Software": Code,
  "Community": Users,
  "Media": Camera,
  "Design": Palette,
  "FLL": Bot,
  "Resource Mobilization": DollarSign,
};

const Resources = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("category", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;

      // Group resources by category
      const resourcesByCategory = (data || []).reduce((acc: { [key: string]: Resource[] }, resource: Resource) => {
        if (!acc[resource.category]) {
          acc[resource.category] = [];
        }
        acc[resource.category].push(resource);
        return acc;
      }, {});

      // Create teams array with icons and resources
      const teamsData: Team[] = Object.entries(resourcesByCategory).map(([category, resources]) => ({
        icon: teamIcons[category as keyof typeof teamIcons] || Brain,
        title: category,
        resources: resources as Resource[]
      }));

      setTeams(teamsData);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpenIndex(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          Team <span className="bg-gradient-primary bg-clip-text text-transparent">Resources</span>
        </h1>
        <div className="text-center">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
        Team <span className="bg-gradient-primary bg-clip-text text-transparent">Resources</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {teams.map((team, index) => (
          <Card
            key={index}
            onClick={() => setOpenIndex(index)}
            className="cursor-pointer p-6 bg-gradient-surface border-border hover:border-primary/50 hover:shadow-glow transform transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary p-3 rounded-full">
                <team.icon className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-bold text-xl text-foreground">{team.title}</h2>
            </div>
          </Card>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-background max-w-2xl w-full p-8 rounded-xl shadow-lg overflow-y-auto max-h-[80vh] relative z-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-foreground">{teams[openIndex].title}</h3>
              <button onClick={() => setOpenIndex(null)} className="text-muted-foreground hover:text-foreground text-xl font-bold">
                ✕
              </button>
            </div>
            <ul className="space-y-4">
              {teams[openIndex].resources.map((res, idx) => (
                <li key={idx} className="flex justify-between items-center border-b border-border pb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{res.name}</h4>
                    <p className="text-sm text-muted-foreground">{res.type}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <a href={res.link} target="_blank" className="flex items-center gap-2">
                      {res.type.includes("Repository") || res.type.includes("YouTube") ? (
                        <ExternalLink className="h-4 w-4" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {res.type.includes("Repository") || res.type.includes("YouTube") ? "View" : "Download"}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;

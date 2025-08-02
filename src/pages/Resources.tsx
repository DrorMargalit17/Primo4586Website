import { useState } from "react";
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

const teams = [
  {
    icon: Brain,
    title: "Strategy",
    resources: [
      { name: "Game Analysis Sheet", type: "PDF", link: "#" },
      { name: "Match Strategy Presentation", type: "Slides", link: "#" },
    ],
  },
  {
    icon: Hammer,
    title: "CAD & Manufacture",
    resources: [
      { name: "Fusion 360 Files", type: "CAD", link: "#" },
      { name: "Machining Guidelines", type: "PDF", link: "#" },
    ],
  },
  {
    icon: Settings,
    title: "Mechanics",
    resources: [
      { name: "Subsystem Overview", type: "Document", link: "#" },
      { name: "Assembly Instructions", type: "PDF", link: "#" },
    ],
  },
  {
    icon: Cpu,
    title: "Electronics",
    resources: [
      { name: "Wiring Diagram", type: "Schematic", link: "#" },
      { name: "Sensor Guide", type: "Manual", link: "#" },
    ],
  },
  {
    icon: Code,
    title: "Software",
    resources: [
      { name: "Control Code Repo", type: "GitHub Repository", link: "#" },
      { name: "Autonomous Algorithms", type: "Python Scripts", link: "#" },
    ],
  },
  {
    icon: Users,
    title: "Community",
    resources: [
      { name: "Outreach Summary", type: "Report", link: "#" },
      { name: "Volunteer Program", type: "Document", link: "#" },
    ],
  },
  {
    icon: Camera,
    title: "Media",
    resources: [
      { name: "Photo Collection", type: "Drive Folder", link: "#" },
      { name: "Promo Video", type: "YouTube", link: "#" },
    ],
  },
  {
    icon: Palette,
    title: "Design",
    resources: [
      { name: "Brand Guide", type: "PDF", link: "#" },
      { name: "Logo Pack", type: "Assets", link: "#" },
    ],
  },
  {
    icon: Bot,
    title: "FLL",
    resources: [
      { name: "Mentorship Plan", type: "Document", link: "#" },
      { name: "Team Goals", type: "PDF", link: "#" },
    ],
  },
  {
    icon: DollarSign,
    title: "Resource Mobilization",
    resources: [
      { name: "Sponsorship Letter", type: "PDF", link: "#" },
      { name: "Budget Plan", type: "Spreadsheet", link: "#" },
    ],
  },
];

const Resources = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpenIndex(null);
    }
  };

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

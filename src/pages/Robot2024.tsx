import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Eye, Cog } from "lucide-react";
import Punk from "@/assets/Robot/2024Robot.jpeg";
import SeasonLogo from "@/assets/Robot/Crescendo_FRC_Logo.png";

const Robot2024 = () => {
  const systems = [
    { label: "Swerve", value: "Swerve MK4I traffic vehicle" },
    { label: "Intake", value: "Consists of 4 axles & timing belts" },
    { label: "Shooter", value: "Consists of 2 axles & 8 timing wheels" },
    { label: "Climb", value: "Consists of 2 aluminum hooks" },
  ];

  const achievements = [
    "District #2 - Captain of Alliance 4",
    "Off Season - 2nd Pick of Alliance 3",
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <img
                  src={SeasonLogo}
                  alt="2024 Season Logo"
                  className="h-16 w-auto"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Meet <span className="bg-gradient-primary bg-clip-text text-transparent">Punk</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Our 2024 competition robot designed for strategic gameplay and 
                reliable performance. Punk showcased our team's growth in 
                engineering and competitive strategy.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge className="bg-primary text-primary-foreground">2024 Season</Badge>
                <Badge className="bg-accent text-accent-foreground">Autonomus</Badge>
                <Badge className="bg-success text-white">Disassembled</Badge>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-surface rounded-2xl p-8 border border-border">
                <img
                  src={Punk}
                  alt="Punk Robot 2024"
                  className="w-full h-auto rounded-lg shadow-elevated"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info & Achievements Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">About Our Robot</h2>
            <p className="text-xl text-muted-foreground">
              PUNK was built to tackle the unique challenges of the 2025 season with unmatched precision and power. 
              Designed with robust engineering and intelligent programming, it excels in autonomy, agility, and teamwork integration.
              From complex tasks to collaborative field maneuvers, SPARROW is the result of countless hours of design, testing, and refinement.
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Season Achievements</h2>
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="p-4 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300"
                >
                  <p className="font-medium text-foreground">{achievement}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Robot Systems Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Robot Systems
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore the integrated subsystems powering SPARROW
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 text-center"
            >
              <h3 className="text-md text-muted-foreground mb-2">{system.label}</h3>
              <p className="text-base font-medium text-foreground">{system.value}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-4">Season Challenge</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/9keeDyFxzY4?t=1"
                title="2024 Season Challenge"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-4">Robot Reveal</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/JaSdbmQUUUQ"
                title="Robot Reveal"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6 mb-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Robot Gallery
          </h2>
          <p className="text-xl text-muted-foreground">
            Punk in action during the 2024 season
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
          ].map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <img
                src={image}
                alt={`Robot gallery image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Robot2024;

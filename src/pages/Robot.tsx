import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Eye, Cog } from "lucide-react";

const Robot = () => {
  const specifications = [
    { label: "Height", value: "36 inches" },
    { label: "Weight", value: "125 lbs" },
    { label: "Max Speed", value: "12 ft/s" },
    { label: "Battery Life", value: "2.5 hours" },
    { label: "Sensors", value: "15+ integrated" },
    { label: "Processing Power", value: "ARM Cortex-A78" },
  ];

  const features = [
    {
      icon: Cpu,
      title: "Advanced AI Processing",
      description: "Real-time decision making with machine learning algorithms for optimal performance in dynamic environments.",
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Multiple cameras and sensors provide 360° awareness with object detection and tracking capabilities.",
    },
    {
      icon: Zap,
      title: "Precision Control",
      description: "High-precision actuators and feedback systems ensure accurate movements and task execution.",
    },
    {
      icon: Cog,
      title: "Modular Design",
      description: "Easily configurable components allow rapid adaptation for different competition challenges.",
    },
  ];

  const achievements = [
    "Regional Championship Winner 2023",
    "Innovation in Design Award",
    "Autonomous Navigation Excellence",
    "Best Technical Documentation",
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Meet <span className="bg-gradient-primary bg-clip-text text-transparent">APEX-R1</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Our latest autonomous robot designed for precision, efficiency, and
                adaptability. APEX-R1 represents the culmination of years of
                engineering excellence and innovation.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge className="bg-primary text-primary-foreground">Autonomous</Badge>
                <Badge className="bg-accent text-accent-foreground">AI-Powered</Badge>
                <Badge className="bg-success text-white">Competition Ready</Badge>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-surface rounded-2xl p-8 border border-border">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
                  alt="APEX-R1 Robot"
                  className="w-full h-auto rounded-lg shadow-elevated"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Technical Specifications
          </h2>
          <p className="text-xl text-muted-foreground">
            Built with cutting-edge technology and precision engineering
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specifications.map((spec, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 text-center"
            >
              <h3 className="text-sm text-muted-foreground mb-2">{spec.label}</h3>
              <p className="text-2xl font-bold text-foreground">{spec.value}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Advanced capabilities that set APEX-R1 apart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-primary p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Robot Gallery
          </h2>
          <p className="text-xl text-muted-foreground">
            See APEX-R1 in action and development
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

      {/* Achievements */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Competition Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300"
              >
                <p className="font-medium text-foreground">{achievement}</p>
              </Card>
            ))}
          </div>
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:info@robotics.edu">
              Learn More About Our Technology
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Robot;
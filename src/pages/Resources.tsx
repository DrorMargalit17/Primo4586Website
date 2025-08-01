import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Book, Code, Video, FileText } from "lucide-react";

const Resources = () => {
  const categories = [
    {
      icon: Code,
      title: "Software & Code",
      description: "Open-source code repositories, programming tutorials, and development tools",
      resources: [
        { name: "Robot Control System", type: "GitHub Repository", link: "#" },
        { name: "AI Vision Library", type: "Python Package", link: "#" },
        { name: "Sensor Integration Guide", type: "Documentation", link: "#" },
        { name: "Programming Tutorial Series", type: "Video Course", link: "#" },
      ],
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Technical manuals, design specifications, and educational materials",
      resources: [
        { name: "Robot Design Manual", type: "PDF", link: "#" },
        { name: "Assembly Instructions", type: "PDF", link: "#" },
        { name: "Safety Guidelines", type: "PDF", link: "#" },
        { name: "Competition Rules", type: "PDF", link: "#" },
      ],
    },
    {
      icon: Video,
      title: "Educational Content",
      description: "Video tutorials, webinars, and educational presentations",
      resources: [
        { name: "Robotics Fundamentals", type: "Video Series", link: "#" },
        { name: "Building Your First Robot", type: "Workshop", link: "#" },
        { name: "Advanced Programming Techniques", type: "Webinar", link: "#" },
        { name: "Competition Strategy", type: "Video Guide", link: "#" },
      ],
    },
    {
      icon: FileText,
      title: "Research & Papers",
      description: "Academic publications, research findings, and technical papers",
      resources: [
        { name: "Autonomous Navigation Study", type: "Research Paper", link: "#" },
        { name: "AI in Robotics", type: "White Paper", link: "#" },
        { name: "Sensor Fusion Techniques", type: "Technical Report", link: "#" },
        { name: "Team Performance Analysis", type: "Case Study", link: "#" },
      ],
    },
  ];

  const tools = [
    {
      name: "CAD Software",
      description: "Professional 3D modeling and design tools",
      links: ["Fusion 360", "SolidWorks", "Onshape"],
    },
    {
      name: "Programming Platforms",
      description: "Development environments and programming tools",
      links: ["Arduino IDE", "VS Code", "ROS (Robot Operating System)"],
    },
    {
      name: "Simulation Software",
      description: "Virtual testing and simulation environments",
      links: ["Gazebo", "V-REP", "Webots"],
    },
    {
      name: "Learning Platforms",
      description: "Online courses and educational resources",
      links: ["Coursera", "edX", "MIT OpenCourseWare"],
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Learning <span className="bg-gradient-primary bg-clip-text text-transparent">Resources</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our comprehensive collection of educational materials, code
            repositories, documentation, and tools to accelerate your robotics
            journey.
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="container mx-auto px-6">
        <div className="space-y-16">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-gradient-primary p-3 rounded-lg">
                  <category.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.resources.map((resource, resourceIndex) => (
                  <Card
                    key={resourceIndex}
                    className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
                  >
                    <div className="flex flex-col h-full">
                      <h3 className="font-semibold text-foreground mb-2">
                        {resource.name}
                      </h3>
                      <p className="text-sm text-accent mb-4">{resource.type}</p>
                      <div className="mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <a href={resource.link} className="flex items-center gap-2">
                            {resource.type.includes("Repository") || resource.type.includes("Course") ? (
                              <ExternalLink className="h-4 w-4" />
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                            {resource.type.includes("Repository") || resource.type.includes("Course") ? "View" : "Download"}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Tools */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recommended Tools
            </h2>
            <p className="text-xl text-muted-foreground">
              Essential software and platforms for robotics development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {tool.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tool.links.map((link, linkIndex) => (
                    <span
                      key={linkIndex}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {link}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution CTA */}
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Contribute to Our Resources
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have valuable resources to share? Help us build a comprehensive
          knowledge base for the robotics community.
        </p>
        <Button variant="hero" size="lg" asChild>
          <a href="mailto:resources@robotics.edu">
            Submit Resources
          </a>
        </Button>
      </section>
      
      {/* Extra spacing before footer */}
      <div className="py-12"></div>
    </div>
  );
};

export default Resources;
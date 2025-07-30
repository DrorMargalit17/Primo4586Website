import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Team Captain & Lead Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Senior studying Mechanical Engineering with a passion for autonomous systems and AI.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alex@robotics.edu",
    },
    {
      name: "Maya Patel",
      role: "Software Lead",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
      bio: "Computer Science major specializing in machine learning and computer vision.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "maya@robotics.edu",
    },
    {
      name: "Jordan Williams",
      role: "Hardware Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Electrical Engineering student focused on embedded systems and sensor integration.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "jordan@robotics.edu",
    },
    {
      name: "Sam Rodriguez",
      role: "Design & CAD Specialist",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face",
      bio: "Industrial Design major with expertise in 3D modeling and mechanical design.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "sam@robotics.edu",
    },
    {
      name: "Riley Kim",
      role: "Strategy & Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Business Administration student managing team operations and community outreach.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "riley@robotics.edu",
    },
    {
      name: "Dr. Sarah Johnson",
      role: "Faculty Mentor",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      bio: "Professor of Robotics Engineering with 15+ years of experience in autonomous systems.",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "sjohnson@university.edu",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Meet Our <span className="bg-gradient-primary bg-clip-text text-transparent">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A diverse group of passionate students and mentors working together
            to push the boundaries of robotics technology and innovation.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
                
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <a href={`mailto:${member.email}`} aria-label="Email">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Join Us Section */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to be part
            of our robotics journey. No experience required - just enthusiasm!
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:team@robotics.edu">
              Get in Touch
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Team;
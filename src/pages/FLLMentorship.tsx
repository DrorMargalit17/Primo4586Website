import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Users, Target, Lightbulb } from "lucide-react";

const FLLMentorship = () => {
  const fllTeams = [
    {
      name: "FLL Champions",
      description: "Our flagship FLL team competing in regional and state championships with a focus on robot design and core values.",
      achievements: [
        { icon: Trophy, text: "Regional Champions 2023", type: "gold" },
        { icon: Award, text: "Core Values Award", type: "blue" },
        { icon: Star, text: "Innovation Award", type: "purple" }
      ],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop"
    },
    {
      name: "FLL Innovators", 
      description: "A creative team focused on innovative solutions and community impact through FIRST LEGO League challenges.",
      achievements: [
        { icon: Lightbulb, text: "Innovation Project Winner", type: "yellow" },
        { icon: Users, text: "Teamwork Excellence", type: "green" },
        { icon: Target, text: "Mission Accuracy Award", type: "red" }
      ],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop"
    },
    {
      name: "FLL Rising Stars",
      description: "Our developing team where young engineers learn robotics fundamentals and FIRST values in a supportive environment.",
      achievements: [
        { icon: Star, text: "Rising Team Award", type: "purple" },
        { icon: Users, text: "Community Impact", type: "green" },
        { icon: Award, text: "Judges Award", type: "blue" }
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
    }
  ];

  const fllMentors = [
    {
      name: "Jennifer Martinez",
      role: "Lead FLL Mentor",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
      since: "2016"
    },
    {
      name: "Robert Chen",
      role: "Technical Mentor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      since: "2018"
    },
    {
      name: "Maria Rodriguez",
      role: "Core Values Mentor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      since: "2019"
    },
    {
      name: "David Kim",
      role: "Project Mentor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      since: "2020"
    }
  ];

  const galleryItems = [
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
  ];

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'gold': return 'bg-yellow-500 text-white';
      case 'blue': return 'bg-blue-500 text-white';
      case 'purple': return 'bg-purple-500 text-white';
      case 'yellow': return 'bg-yellow-600 text-white';
      case 'green': return 'bg-green-500 text-white';
      case 'red': return 'bg-red-500 text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            FLL <span className="bg-gradient-primary bg-clip-text text-transparent">Mentorship</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering young minds through FIRST LEGO League, where students develop 
            engineering skills, teamwork, and core values while tackling real-world challenges.
          </p>
        </div>
      </section>

      {/* FLL Teams Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our FLL Teams
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three dynamic teams competing in FIRST LEGO League, each bringing 
            unique strengths and perspectives to robotics challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fllTeams.map((team, index) => (
            <Card key={index} className="overflow-hidden bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
              <div className="relative">
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {team.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {team.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Achievements:</h4>
                  {team.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center space-x-2">
                      <achievement.icon className="h-4 w-4 text-primary" />
                      <Badge className={`text-xs ${getBadgeColor(achievement.type)}`}>
                        {achievement.text}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            FLL Gallery
          </h2>
          <p className="text-xl text-muted-foreground">
            Capturing moments from competitions, practice sessions, and team building activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <img
                src={image}
                alt={`FLL Gallery image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Card>
          ))}
        </div>
      </section>

      {/* FLL Mentors Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            FLL Mentors
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experienced mentors who guide our FLL teams with expertise in robotics, 
            project development, and FIRST core values.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fllMentors.map((mentor, index) => (
            <Card
              key={index}
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {mentor.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {mentor.role}
                </p>
              </div>
              
              {/* Since label in bottom-left */}
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  since {mentor.since}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Our FLL Program
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Interested in mentoring or learning more about our FLL teams? 
            We welcome passionate individuals who want to inspire the next generation.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:fll@robotics.edu">
              Get Involved
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FLLMentorship;
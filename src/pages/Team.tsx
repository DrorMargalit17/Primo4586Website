import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

const Team = () => {
  const teamCaptains = [
    {
      name: "Alex Chen",
      role: "Team Captain & Lead Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      teams: ["Leadership", "Software", "Strategy"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alex@robotics.edu",
    },
    {
      name: "Shay Kalisher",
      role: "Captain",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
      teams: ["Leadership", "Design", "Community"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "shay@robotics.edu",
    },
  ];

  const teamLeads = [
    {
      name: "Jordan Williams",
      role: "Hardware Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      teams: ["Hardware", "Electronics", "Testing"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "jordan@robotics.edu",
    },
    {
      name: "Sam Rodriguez",
      role: "Design Lead",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face",
      teams: ["Design", "CAD", "Manufacturing"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "sam@robotics.edu",
    },
    {
      name: "Riley Kim",
      role: "Operations Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      teams: ["Operations", "Outreach", "Logistics"],
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "riley@robotics.edu",
    },
  ];

  const teamMembers = [
    {
      name: "Maya Patel",
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      teams: ["Software", "AI", "Testing"],
    },
    {
      name: "David Chen",
      role: "Mechanical Engineer",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
      teams: ["Hardware", "Manufacturing"],
    },
    {
      name: "Sarah Kim",
      role: "Electronics Specialist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      teams: ["Electronics", "Hardware"],
    },
    {
      name: "Mike Johnson",
      role: "3D Designer",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=face",
      teams: ["Design", "CAD"],
    },
    {
      name: "Emma Davis",
      role: "Marketing Coordinator",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
      teams: ["Outreach", "Social Media"],
    },
    {
      name: "Tom Wilson",
      role: "Programmer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      teams: ["Software", "AI"],
    },
  ];

  const mentors = [
    {
      name: "Dr. Sarah Johnson",
      role: "Faculty Mentor",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      since: "2012",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "sjohnson@university.edu",
    },
    {
      name: "Prof. Mark Anderson",
      role: "Technical Advisor",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      since: "2015",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "manderson@university.edu",
    },
    {
      name: "Lisa Rodriguez",
      role: "Industry Mentor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      since: "2018",
      linkedin: "https://linkedin.com",
      email: "lrodriguez@techcorp.com",
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

      {/* Team Captains */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Captains
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamCaptains.map((member, index) => (
            <Card
              key={index}
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
                
                <div className="flex justify-center space-x-2 mb-4">
                  {member.github && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {member.linkedin && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {member.email && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={`mailto:${member.email}`} aria-label="Email">
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Teams dropdown in bottom-left */}
              <div className="absolute bottom-4 left-4">
                <Select>
                  <SelectTrigger className="w-auto h-8 text-xs bg-surface border-border">
                    <SelectValue placeholder="Teams" />
                    <ChevronDown className="h-3 w-3" />
                  </SelectTrigger>
                  <SelectContent>
                    {member.teams.map((team, teamIndex) => (
                      <SelectItem key={teamIndex} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Leads */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Leads
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamLeads.map((member, index) => (
            <Card
              key={index}
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
                
                <div className="flex justify-center space-x-2 mb-4">
                  {member.github && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {member.linkedin && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {member.email && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={`mailto:${member.email}`} aria-label="Email">
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Teams dropdown in bottom-left */}
              <div className="absolute bottom-4 left-4">
                <Select>
                  <SelectTrigger className="w-auto h-8 text-xs bg-surface border-border">
                    <SelectValue placeholder="Teams" />
                    <ChevronDown className="h-3 w-3" />
                  </SelectTrigger>
                  <SelectContent>
                    {member.teams.map((team, teamIndex) => (
                      <SelectItem key={teamIndex} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Other Team Members */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
              </div>
              
              {/* Teams dropdown in bottom-left */}
              <div className="absolute bottom-4 left-4">
                <Select>
                  <SelectTrigger className="w-auto h-8 text-xs bg-surface border-border">
                    <SelectValue placeholder="Teams" />
                    <ChevronDown className="h-3 w-3" />
                  </SelectTrigger>
                  <SelectContent>
                    {member.teams.map((team, teamIndex) => (
                      <SelectItem key={teamIndex} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Mentors Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Mentors
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experienced professionals and educators who guide our team with their expertise, 
            helping us grow both technically and personally.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
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
                
                <div className="flex justify-center space-x-2 mb-4">
                  {mentor.github && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={mentor.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {mentor.linkedin && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {mentor.email && (
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground">
                      <a href={`mailto:${mentor.email}`} aria-label="Email">
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
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
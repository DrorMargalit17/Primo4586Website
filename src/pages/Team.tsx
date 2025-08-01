import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

const Team = () => {
  const [selectedTeams, setSelectedTeams] = useState<Record<string, string[]>>({});

  const teamOptions = [
    { label: "Leadership", value: "leadership" },
    { label: "Software", value: "software" },
    { label: "Hardware", value: "hardware" },
    { label: "Design", value: "design" },
    { label: "Electronics", value: "electronics" },
    { label: "CAD", value: "cad" },
    { label: "Manufacturing", value: "manufacturing" },
    { label: "Operations", value: "operations" },
    { label: "Outreach", value: "outreach" },
    { label: "Community", value: "community" },
    { label: "Strategy", value: "strategy" },
    { label: "Testing", value: "testing" },
    { label: "AI", value: "ai" },
    { label: "Logistics", value: "logistics" },
    { label: "Social Media", value: "social-media" },
  ];

  const teamCaptains = [
    {
      name: "Alex Chen",
      role: "Team Captain & Lead Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      teams: ["leadership", "software", "strategy"],
    },
    {
      name: "Shay Kalisher",
      role: "Captain",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
      teams: ["leadership", "design", "community"],
    },
    {
      name: "Jordan Davis",
      role: "Co-Captain",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      teams: ["leadership", "operations", "strategy"],
    },
  ];

  const teamLeads = [
    { name: "Jordan Williams", role: "Hardware Lead", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", teams: ["hardware", "electronics", "testing"] },
    { name: "Sam Rodriguez", role: "Design Lead", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face", teams: ["design", "cad", "manufacturing"] },
    { name: "Riley Kim", role: "Operations Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", teams: ["operations", "outreach", "logistics"] },
    { name: "Maya Patel", role: "Software Lead", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face", teams: ["software", "ai", "testing"] },
    { name: "David Chen", role: "Manufacturing Lead", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face", teams: ["manufacturing", "hardware"] },
    { name: "Sarah Kim", role: "Electronics Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face", teams: ["electronics", "hardware"] },
    { name: "Mike Johnson", role: "CAD Lead", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=face", teams: ["design", "cad"] },
    { name: "Emma Davis", role: "Outreach Lead", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face", teams: ["outreach", "social-media"] },
    { name: "Tom Wilson", role: "AI Lead", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face", teams: ["software", "ai"] },
    { name: "Lisa Zhang", role: "Strategy Lead", image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face", teams: ["strategy", "operations"] },
  ];

  const teamMembers = [
    { name: "Alex Thompson", role: "Software Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", teams: ["software", "ai"] },
    { name: "Maria Garcia", role: "Mechanical Engineer", image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face", teams: ["hardware", "manufacturing"] },
    { name: "Kevin Liu", role: "Electronics Specialist", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", teams: ["electronics", "hardware"] },
    { name: "Sophie Anderson", role: "CAD Designer", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face", teams: ["design", "cad"] },
    { name: "Ryan Park", role: "Programmer", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face", teams: ["software", "testing"] },
    { name: "Ashley Brown", role: "Outreach Coordinator", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face", teams: ["outreach", "community"] },
    { name: "Daniel Rodriguez", role: "Manufacturing Specialist", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=face", teams: ["manufacturing", "hardware"] },
    { name: "Rachel Johnson", role: "Testing Engineer", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face", teams: ["testing", "electronics"] },
    { name: "Jacob Miller", role: "Strategy Analyst", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face", teams: ["strategy", "operations"] },
    { name: "Olivia Wilson", role: "Social Media Manager", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", teams: ["social-media", "outreach"] },
    { name: "Ethan Davis", role: "Hardware Specialist", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face", teams: ["hardware", "electronics"] },
    { name: "Grace Lee", role: "Software Developer", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", teams: ["software", "ai"] },
    { name: "Nathan Turner", role: "Design Engineer", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face", teams: ["design", "manufacturing"] },
    { name: "Chloe Martinez", role: "Operations Assistant", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face", teams: ["operations", "logistics"] },
    { name: "Brandon Kim", role: "Programmer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", teams: ["software", "testing"] },
    { name: "Isabella Rodriguez", role: "CAD Designer", image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face", teams: ["design", "cad"] },
    { name: "Tyler Johnson", role: "Electronics Technician", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", teams: ["electronics", "testing"] },
    { name: "Samantha White", role: "Community Liaison", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face", teams: ["community", "outreach"] },
    { name: "Andrew Chen", role: "Manufacturing Assistant", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face", teams: ["manufacturing", "hardware"] },
    { name: "Madison Taylor", role: "Strategy Coordinator", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face", teams: ["strategy", "operations"] },
    { name: "Lucas Anderson", role: "AI Developer", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=face", teams: ["ai", "software"] },
    { name: "Zoe Williams", role: "Design Specialist", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face", teams: ["design", "cad"] },
    { name: "Cameron Davis", role: "Logistics Coordinator", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face", teams: ["logistics", "operations"] },
    { name: "Haley Brown", role: "Content Creator", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", teams: ["social-media", "outreach"] },
    { name: "Justin Garcia", role: "Testing Specialist", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face", teams: ["testing", "hardware"] },
    { name: "Victoria Liu", role: "Electronics Engineer", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", teams: ["electronics", "hardware"] },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
              </div>
              
              {/* Teams badges in bottom-left */}
              <div className="absolute bottom-4 left-4">
                <div className="flex flex-wrap gap-1">
                  {member.teams.map((team, teamIndex) => {
                    const teamOption = teamOptions.find(opt => opt.value === team);
                    return (
                      <Badge key={teamIndex} variant="secondary" className="text-xs">
                        {teamOption?.label || team}
                      </Badge>
                    );
                  })}
                </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamLeads.map((member, index) => (
            <Card
              key={index}
              className="relative p-4 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-center">
                <div className="relative mb-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>
                
                <h3 className="text-sm font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                
                <p className="text-xs text-primary font-medium mb-3">
                  {member.role}
                </p>
              </div>
              
              {/* Teams badges in bottom-left */}
              <div className="absolute bottom-3 left-3">
                <div className="flex flex-wrap gap-1">
                  {member.teams.slice(0, 2).map((team, teamIndex) => {
                    const teamOption = teamOptions.find(opt => opt.value === team);
                    return (
                      <Badge key={teamIndex} variant="secondary" className="text-xs">
                        {teamOption?.label || team}
                      </Badge>
                    );
                  })}
                  {member.teams.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{member.teams.length - 2}
                    </Badge>
                  )}
                </div>
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="relative p-3 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-center">
                <div className="relative mb-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>
                
                <h3 className="text-xs font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                
                <p className="text-xs text-primary font-medium mb-2">
                  {member.role}
                </p>
              </div>
              
              {/* Teams badge in bottom */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex justify-center">
                  <Badge variant="secondary" className="text-xs truncate">
                    {teamOptions.find(opt => opt.value === member.teams[0])?.label || member.teams[0]}
                    {member.teams.length > 1 && ` +${member.teams.length - 1}`}
                  </Badge>
                </div>
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
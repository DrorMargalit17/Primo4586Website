import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Team = () => {
  const [selectedTeams, setSelectedTeams] = useState<Record<string, string[]>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  // Original team data (unchanged)
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
      linkedin: "https://linkedin.com",
      email: "sjohnson@university.edu",
    },
    {
      name: "Prof. Mark Anderson",
      role: "Technical Advisor",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      since: "2015",
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  return (
    <div className="space-y-20">
      {/* Hero Section (Original) */}
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
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[280px]"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>

                <p className="text-primary font-medium mb-4">{member.role}</p>
              </div>

              {/* Teams dropdown bottom-left */}
              <div
                ref={(el) => (dropdownRefs.current[member.name] = el)}
                className="absolute bottom-4 left-4"
              >
                <button
                  onClick={() => toggleDropdown(member.name)}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold hover:bg-primary/20 transition"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === member.name}
                >
                  Teams ▾
                </button>
                {openDropdown === member.name && (
                  <div className="absolute left-0 mt-1 w-40 max-h-40 overflow-y-auto bg-surface border border-primary/30 rounded-md shadow-lg z-50 p-2">
                    {teamOptions.map((team) => {
                      const isMemberInTeam = member.teams.includes(team.value);
                      return (
                        <div
                          key={team.value}
                          className={`flex items-center px-2 py-1 rounded cursor-default select-none ${
                            isMemberInTeam ? "bg-primary/20 text-primary font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isMemberInTeam}
                            readOnly
                            className="mr-2 cursor-default"
                          />
                          <span>{team.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
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
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[240px]"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>

                <h3 className="text-md font-semibold text-foreground mb-1">{member.name}</h3>

                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
              </div>

              {/* Teams dropdown bottom-left */}
              <div
                ref={(el) => (dropdownRefs.current[member.name] = el)}
                className="absolute bottom-4 left-4"
              >
                <button
                  onClick={() => toggleDropdown(member.name)}
                  className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold hover:bg-primary/20 transition"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === member.name}
                >
                  Teams ▾
                </button>
                {openDropdown === member.name && (
                  <div className="absolute left-0 mt-1 w-40 max-h-40 overflow-y-auto bg-surface border border-primary/30 rounded-md shadow-lg z-50 p-2">
                    {teamOptions.map((team) => {
                      const isMemberInTeam = member.teams.includes(team.value);
                      return (
                        <div
                          key={team.value}
                          className={`flex items-center px-2 py-1 rounded cursor-default select-none ${
                            isMemberInTeam ? "bg-primary/20 text-primary font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isMemberInTeam}
                            readOnly
                            className="mr-2 cursor-default"
                          />
                          <span>{team.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Members
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[1100px] w-full">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="relative p-4 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[200px]"
              >
                <div className="text-center">
                  <div className="relative mb-2">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-foreground mb-1">{member.name}</h3>

                  {/* Role removed as requested */}
                  {/* <p className="text-primary text-xs font-medium mb-4">{member.role}</p> */}
                </div>

                {/* Teams dropdown bottom-left */}
                <div
                  ref={(el) => (dropdownRefs.current[member.name] = el)}
                  className="absolute bottom-3 left-3"
                >
                  <button
                    onClick={() => toggleDropdown(member.name)}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold hover:bg-primary/20 transition"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === member.name}
                  >
                    Teams ▾
                  </button>
                  {openDropdown === member.name && (
                    <div className="absolute left-0 mt-1 w-40 max-h-40 overflow-y-auto bg-surface border border-primary/30 rounded-md shadow-lg z-50 p-2">
                      {teamOptions.map((team) => {
                        const isMemberInTeam = member.teams.includes(team.value);
                        return (
                          <div
                            key={team.value}
                            className={`flex items-center px-2 py-1 rounded cursor-default select-none ${
                              isMemberInTeam ? "bg-primary/20 text-primary font-semibold" : "text-muted-foreground"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isMemberInTeam}
                              readOnly
                              className="mr-2 cursor-default"
                            />
                            <span>{team.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Mentors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <Card
              key={index}
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[280px]"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{mentor.name}</h3>

                <p className="text-primary font-medium mb-2">{mentor.role}</p>

                <p className="text-muted-foreground text-sm mb-6">Mentor since {mentor.since}</p>

                <div className="flex justify-center space-x-4">
                  {/* Removed github, linkedin and mail links per request */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;

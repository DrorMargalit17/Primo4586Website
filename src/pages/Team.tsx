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
    { label: "Strategy", value: "strategy" },
    { label: "CAD", value: "cad" },
    { label: "Manufacturing", value: "manufacturing" },
    { label: "Mechanics", value: "mechanics" },
    { label: "Electronics", value: "electronics" },
    { label: "Software", value: "software" },
    { label: "Design", value: "design" },
    { label: "Media", value: "media" },
    { label: "Resources", value: "resources" },
    { label: "Community", value: "community" },
    { label: "DriveTeam", value: "DriveTeam" },
    { label: "FLL", value: "fll" },
  ];

  // Original team data (unchanged)
  const teamCaptains = [
    {
      name: "Maya Goz",
      role: "Co. Captain",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      teams: ["community", "media", "design", "resources"],
    },
    {
      name: "Shay Kalisher",
      role: "Captain",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
      teams: ["cad", "community", "electronics", "resources"],
    },
    {
      name: "Nadav Marx",
      role: "Co-Captain",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      teams: ["mechanics","cad", "electronics", "strategy"],
    },
  ];

  const teamLeads = [
    { name: "Ariel Ivri", role: "Mechanics & FLL TeamLeader", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", teams: ["mechanics", "community"] },
    { name: "Gali Levy", role: "Mechanics Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face", teams: ["mechanics", "cad"] },
    { name: "Karny Eissenberg", role: "Design TeamLeader", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face", teams: ["design", "fll", "community"] },
    { name: "Dror Margalit", role: "Media TeamLeader", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", teams: ["media", "resources", "fll", "community", "design", "cad", "mechanics"] },
    { name: "Eilon Hoppert", role: "Software TeamLeader & Coach", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face", teams: ["software","DriveTeam", "cad", "mechanics"] },
    { name: "Yair Lavie", role: "CAD & Manufacturing TeamLeader", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face", teams: ["manufacturing", "mechanics", "cad", "strategy"] },
    { name: "Talya Fuchs", role: "Electronics TeamLeader", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face", teams: ["electronics", "media", "community"] },
    { name: "Shir Cohen", role: "Strategy TeamLeader", image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face", teams: ["strategy"] },
    { name: "Daniel Levy", role: "Resources TeamLeader & FLL Manager", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face", teams: ["resources", "fll"] },
    { name: "Amir Blinda", role: "FLL Manager", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=face", teams: ["fll"] },
  ];

  const teamMembers = [
    { name: "Amit Levy", role: "CAD Master", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", teams: ["cad", "manufacturing", "mechanics"] },
    { name: "Uri Rosin", role: "Robot Driver", image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face", teams: ["software", "DriveTeam"] },
    { name: "Or Buzaglo", role: "Scouting GOAT", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Adam Dashevsky", role: "Human Player", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face", teams: ["mechanics"] },
    { name: "Ziv Avivi", role: "Programmer", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face", teams: ["software"] },
    { name: "Noga Zechmeister", role: "Robot operator", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face", teams: ["strategy", "DriveTeam"] },
    { name: "Abigal Ketzel", role: "", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Alon Pankin", role: "Ramle Vibes", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face", teams: ["Media"] },
    { name: "Osher Shkard", role: "", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Ori Lahat", role: "", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Ofir Shafran", role: "", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Benjamin Binkin", role: "", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Ariel Meborah", role: "", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Itamar Ivri", role: "", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Ayla Diaz", role: "", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Spair Rosner", role: "", image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Einat Magrafta", role: "", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Noa Kozel", role: "", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Yaara Lind", role: "", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Rani Applebaum", role: "", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Shaked Carmon", role: "", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Erez Bukobza", role: "", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Itay Alon", role: "", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Noam Shtein", role: "", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Mor Gaz", role: "", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face", teams: [] },
    { name: "Yotam Cohen", role: "", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", teams: [] },
  ];

  const mentors = [
    {
      name: "Ilya Kazakevich",
      role: "Mechanics Mentor",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      since: "2012",
    },
    {
      name: "Avi Segal",
      role: "Software Mentor",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      since: "2015",
    },
    {
      name: "Maor Steinberg",
      role: "PR & Community Mentor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      since: "2018",
    },
    {
      name: "Michal Naim",
      role: "Financial Mentor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      since: "2018",
    },
    {
      name: "Noa Fuchs",
      role: "Community Mentor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      since: "2018",
    },
    {
      name: "Hen Perah",
      role: "Software Mentor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      since: "2018",
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

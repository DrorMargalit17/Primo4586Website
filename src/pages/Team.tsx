import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail, Plus, Edit } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { EditableText } from "@/components/editor/EditableText";
import { useAdminMode } from "@/hooks/useAdminMode";
import { TeamMemberForm, TeamMember } from "@/components/admin/TeamMemberForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Team = () => {
  const [selectedTeams, setSelectedTeams] = useState<Record<string, string[]>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { isEditMode } = useAdminMode();
  
  // Database state
  const [teamCaptains, setTeamCaptains] = useState<TeamMember[]>([]);
  const [teamLeads, setTeamLeads] = useState<TeamMember[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [mentors, setMentors] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [currentSection, setCurrentSection] = useState<'captains' | 'leads' | 'members' | 'mentors'>('captains');

  // Load team members from database
  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      const captains = data.filter(member => member.section === 'captains') as TeamMember[];
      const leads = data.filter(member => member.section === 'leads') as TeamMember[];
      const members = data.filter(member => member.section === 'members') as TeamMember[];
      const mentorsList = data.filter(member => member.section === 'mentors') as TeamMember[];

      setTeamCaptains(captains);
      setTeamLeads(leads);
      setTeamMembers(members);
      setMentors(mentorsList);
    } catch (error) {
      console.error("Error loading team members:", error);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Open add form
  const handleAddMember = (section: 'captains' | 'leads' | 'members' | 'mentors') => {
    setCurrentSection(section);
    setEditingMember(null);
    setIsFormOpen(true);
  };

  // Open edit form
  const handleEditMember = (member: TeamMember) => {
    setCurrentSection(member.section);
    setEditingMember(member);
    setIsFormOpen(true);
  };

  // Handle form save
  const handleFormSave = (savedMember: TeamMember) => {
    loadTeamMembers(); // Reload data
  };

  // Handle delete
  const handleDelete = (deletedId: string) => {
    loadTeamMembers(); // Reload data
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center">
          <EditableText 
            contentKey="team-hero-title" 
            defaultContent="Meet Our Team" 
            tag="h1" 
            className="text-5xl md:text-6xl font-bold mb-6 text-foreground"
          >
            Meet Our <span className="bg-gradient-primary bg-clip-text text-transparent">Team</span>
          </EditableText>
          <EditableText 
            contentKey="team-hero-description" 
            defaultContent="A diverse group of passionate students and mentors working together to push the boundaries of robotics technology and innovation." 
            contentType="paragraph"
            tag="p" 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* Team Captains */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Captains
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Admin Add Button */}
          {isEditMode && (
            <Card 
              onClick={() => handleAddMember('captains')}
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[280px] cursor-pointer border-dashed border-2 flex items-center justify-center"
            >
              <div className="text-center">
                <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-primary font-medium">Add Captain</p>
              </div>
            </Card>
          )}
          
          {teamCaptains.map((member, index) => (
            <Card
              key={member.id || index}
              onClick={isEditMode ? () => handleEditMember(member) : undefined}
              className={`relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[280px] ${isEditMode ? 'cursor-pointer' : ''}`}
            >
              {/* Admin Edit Icon */}
              {isEditMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit className="h-4 w-4 text-primary" />
                </div>
              )}
              
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

              {/* Teams dropdown bottom-left - only show if not in edit mode */}
              {!isEditMode && (
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
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Team Leads */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Leads
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
            {/* Admin Add Button */}
            {isEditMode && (
              <Card 
                onClick={() => handleAddMember('leads')}
                className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[280px] w-full cursor-pointer border-dashed border-2 flex items-center justify-center"
              >
                <div className="text-center">
                  <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-primary font-medium">Add Team Lead</p>
                </div>
              </Card>
            )}
            
            {teamLeads.map((member, index) => (
              <Card
                key={member.id || index}
                onClick={isEditMode ? () => handleEditMember(member) : undefined}
                className={`relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[280px] w-full ${isEditMode ? 'cursor-pointer' : ''}`}
              >
                {/* Admin Edit Icon */}
                {isEditMode && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className="text-center">
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <h3 className="text-md font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                </div>

                {/* Teams dropdown bottom-left - only show if not in edit mode */}
                {!isEditMode && (
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
                                isMemberInTeam
                                  ? "bg-primary/20 text-primary font-semibold"
                                  : "text-muted-foreground"
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
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Members
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-[1000px] w-full">
            {/* Admin Add Button */}
            {isEditMode && (
              <Card 
                onClick={() => handleAddMember('members')}
                className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[220px] cursor-pointer border-dashed border-2 flex items-center justify-center"
              >
                <div className="text-center">
                  <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-primary font-medium">Add Team Member</p>
                </div>
              </Card>
            )}
            
            {teamMembers.map((member, index) => (
              <Card
                key={member.id || index}
                onClick={isEditMode ? () => handleEditMember(member) : undefined}
                className={`relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[220px] ${isEditMode ? 'cursor-pointer' : ''}`}
              >
                {/* Admin Edit Icon */}
                {isEditMode && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className="text-center">
                  <div className="relative mb-2">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-23 h-23 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-foreground mb-1">{member.name}</h3>
                </div>

                {/* Teams dropdown bottom-left - only show if not in edit mode */}
                {!isEditMode && (
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
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="container mx-auto px-6 mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Mentors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Admin Add Button */}
          {isEditMode && (
            <Card 
              onClick={() => handleAddMember('mentors')}
              className="relative p-3 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[260px] cursor-pointer border-dashed border-2 flex items-center justify-center"
            >
              <div className="text-center">
                <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-primary font-medium">Add Mentor</p>
              </div>
            </Card>
          )}
          
          {mentors.map((mentor, index) => (
            <Card
              key={mentor.id || index}
              onClick={isEditMode ? () => handleEditMember(mentor) : undefined}
              className={`relative p-3 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[260px] ${isEditMode ? 'cursor-pointer' : ''}`}
            >
              {/* Admin Edit Icon */}
              {isEditMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div className="text-center">
                <div className="relative mb-2">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                  />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{mentor.name}</h3>
                <p className="text-primary font-medium mb-2">{mentor.role}</p>
                <p className="text-muted-foreground text-sm mb-6">Mentor since {mentor.year}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Form Modal */}
      <TeamMemberForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleFormSave}
        onDelete={handleDelete}
        member={editingMember}
        section={currentSection}
      />
    </div>
  );
};

export default Team;
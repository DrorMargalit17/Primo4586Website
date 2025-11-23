import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail, Plus, Edit, GripVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { EditableText } from "@/components/editor/EditableText";
import { useAdminMode } from "@/hooks/useAdminMode";
import { TeamMemberForm, TeamMember } from "@/components/admin/TeamMemberForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTeamCard } from '@/components/admin/SortableTeamCard';

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

  // Handle drag and drop reordering
  const handleDragEnd = async (event: DragEndEvent, section: 'captains' | 'leads' | 'members' | 'mentors') => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    const sectionData = {
      captains: teamCaptains,
      leads: teamLeads,
      members: teamMembers,
      mentors: mentors
    }[section];

    const setSectionData = {
      captains: setTeamCaptains,
      leads: setTeamLeads,
      members: setTeamMembers,
      mentors: setMentors
    }[section];

    const oldIndex = sectionData.findIndex((item) => item.id === active.id);
    const newIndex = sectionData.findIndex((item) => item.id === over.id);

    const newOrder = arrayMove(sectionData, oldIndex, newIndex);
    setSectionData(newOrder);

    // Update display_order in database
    try {
      const updates = newOrder.map((member, index) => ({
        id: member.id,
        display_order: index,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('team_members')
          .update({ display_order: update.display_order })
          .eq('id', update.id);

        if (error) throw error;
      }

      toast.success('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
      loadTeamMembers(); // Reload on error
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    { label: "Spokesmanship", value: "spokesmanship" },
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e, 'captains')}
        >
          <SortableContext items={teamCaptains.map(m => m.id)} strategy={rectSortingStrategy}>
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
              
              {teamCaptains.map((member, index) => {
                // Shay Kalisher appears first on mobile, original order on desktop
                const isShayKalisher = member.name === "Shay Kalisher";
                
                return (
                  <SortableTeamCard key={member.id} id={member.id} isEditMode={isEditMode}>
                    <Card
                      onClick={isEditMode ? () => handleEditMember(member) : undefined}
                      className={`relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[280px] ${isEditMode ? 'cursor-pointer' : ''} ${!isEditMode && isShayKalisher ? 'order-first md:order-none' : ''}`}
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
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-glow"
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
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold hover:bg-primary/20 transition shadow-sm"
                            aria-haspopup="true"
                            aria-expanded={openDropdown === member.name}
                          >
                            Teams ▾
                          </button>
                          {openDropdown === member.name && (
                            <div className="absolute left-0 mt-2 w-44 max-h-48 overflow-y-auto bg-card border-2 border-primary/40 rounded-lg shadow-2xl z-50 backdrop-blur-sm">
                              <div className="p-1.5 space-y-1">
                                {teamOptions
                                  .filter((team) => member.teams.includes(team.value))
                                  .map((team) => (
                                    <div
                                      key={team.value}
                                      className="px-3 py-2 rounded-md cursor-default select-none bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors"
                                    >
                                      <span>{team.label}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </Card>
                </SortableTeamCard>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </section>

      {/* Team Leads */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Leads
        </h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e, 'leads')}
        >
          <SortableContext items={teamLeads.map(m => m.id)} strategy={rectSortingStrategy}>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
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
                  <SortableTeamCard key={member.id} id={member.id} isEditMode={isEditMode}>
                    <Card
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
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-glow"
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
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold hover:bg-primary/20 transition shadow-sm"
                            aria-haspopup="true"
                            aria-expanded={openDropdown === member.name}
                          >
                            Teams ▾
                          </button>
                          {openDropdown === member.name && (
                            <div className="absolute left-0 mt-2 w-44 max-h-48 overflow-y-auto bg-card border-2 border-primary/40 rounded-lg shadow-2xl z-50 backdrop-blur-sm">
                              <div className="p-1.5 space-y-1">
                                {teamOptions
                                  .filter((team) => member.teams.includes(team.value))
                                  .map((team) => (
                                    <div
                                      key={team.value}
                                      className="px-3 py-2 rounded-md cursor-default select-none bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors"
                                    >
                                      <span>{team.label}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </SortableTeamCard>
                ))}
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </section>

      {/* Team Members */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Team Members
        </h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e, 'members')}
        >
          <SortableContext items={teamMembers.map(m => m.id)} strategy={rectSortingStrategy}>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-[1000px] w-full">
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
                  <SortableTeamCard key={member.id} id={member.id} isEditMode={isEditMode}>
                    <Card
                      onClick={isEditMode ? () => handleEditMember(member) : undefined}
                      className={`relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group min-h-[245px] ${isEditMode ? 'cursor-pointer' : ''}`}
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
                            className="w-21 h-21 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-glow"
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
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold hover:bg-primary/20 transition shadow-sm"
                            aria-haspopup="true"
                            aria-expanded={openDropdown === member.name}
                          >
                            Teams ▾
                          </button>
                          {openDropdown === member.name && (
                            <div className="absolute left-0 mt-2 w-44 max-h-48 overflow-y-auto bg-card border-2 border-primary/40 rounded-lg shadow-2xl z-50 backdrop-blur-sm">
                              <div className="p-1.5 space-y-1">
                                {teamOptions
                                  .filter((team) => member.teams.includes(team.value))
                                  .map((team) => (
                                    <div
                                      key={team.value}
                                      className="px-3 py-2 rounded-md cursor-default select-none bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors"
                                    >
                                      <span>{team.label}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </SortableTeamCard>
                ))}
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </section>

      {/* Mentors */}
      <section className="container mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Mentors
        </h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e, 'mentors')}
        >
          <SortableContext items={mentors.map(m => m.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Admin Add Button */}
              {isEditMode && (
                <Card 
                  onClick={() => handleAddMember('mentors')}
                  className="relative p-3 bg-gradient-surface border-border hover:border-accent/50 transition-all duration-300 hover:shadow-glow group cursor-pointer border-dashed border-2 flex items-center justify-center min-h-[200px]"
                >
                  <div className="text-center">
                    <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-primary font-medium">Add Mentor</p>
                  </div>
                </Card>
              )}
              
              {mentors.map((mentor, index) => (
                <SortableTeamCard key={mentor.id} id={mentor.id} isEditMode={isEditMode}>
                  <Card
                    onClick={isEditMode ? () => handleEditMember(mentor) : undefined}
                    className={`relative p-6 bg-gradient-surface border-border hover:border-accent/50 transition-all duration-300 hover:shadow-glow group h-full min-h-[200px] flex flex-col ${isEditMode ? 'cursor-pointer' : ''}`}
                  >
                    {/* Admin Edit Icon */}
                    {isEditMode && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    
                    <div className="text-center flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{mentor.name}</h3>
                      <p className="text-primary font-medium mb-2 line-clamp-2">{mentor.role}</p>
                      <p className="text-muted-foreground text-sm">Mentor since {mentor.year}</p>
                    </div>
                  </Card>
                </SortableTeamCard>
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
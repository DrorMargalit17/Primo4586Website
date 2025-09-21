import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface TeamMember {
  id?: string;
  name: string;
  role?: string;
  image: string;
  teams: string[];
  section: 'captains' | 'leads' | 'members' | 'mentors';
  year?: string;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

interface TeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
  onDelete?: (id: string) => void;
  member?: TeamMember | null;
  section: 'captains' | 'leads' | 'members' | 'mentors';
}

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

export const TeamMemberForm = ({ isOpen, onClose, onSave, onDelete, member, section }: TeamMemberFormProps) => {
  const [formData, setFormData] = useState<TeamMember>({
    name: "",
    role: "",
    image: "",
    teams: [],
    section,
    year: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({ ...member });
    } else {
      setFormData({
        name: "",
        role: "",
        image: "",
        teams: [],
        section,
        year: "",
      });
    }
  }, [member, section]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.image.trim()) {
      toast.error("Name and image are required");
      return;
    }

    try {
      let savedMember;
      
      if (member?.id) {
        // Update existing member
        const { data, error } = await supabase
          .from("team_members")
          .update({
            name: formData.name,
            role: formData.role || null,
            image: formData.image,
            teams: formData.teams,
            year: formData.year || null,
          })
          .eq("id", member.id)
          .select()
          .single();
        
        if (error) throw error;
        savedMember = data;
      } else {
        // Create new member
        const { data: existingMembers } = await supabase
          .from("team_members")
          .select("display_order")
          .eq("section", section)
          .order("display_order", { ascending: false })
          .limit(1);

        const nextOrder = existingMembers && existingMembers.length > 0 
          ? (existingMembers[0].display_order || 0) + 1 
          : 1;

        const { data, error } = await supabase
          .from("team_members")
          .insert({
            name: formData.name,
            role: formData.role || null,
            image: formData.image,
            teams: formData.teams,
            section: formData.section,
            year: formData.year || null,
            display_order: nextOrder,
          })
          .select()
          .single();
        
        if (error) throw error;
        savedMember = data;
      }

      onSave(savedMember);
      toast.success(member ? "Team member updated!" : "Team member added!");
      onClose();
    } catch (error) {
      console.error("Error saving team member:", error);
      toast.error("Failed to save team member");
    }
  };

  const handleDelete = async () => {
    if (!member?.id) return;
    
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", member.id);
      
      if (error) throw error;

      onDelete?.(member.id);
      toast.success("Team member deleted!");
      onClose();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    }
  };

  const handleTeamToggle = (teamValue: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      teams: checked 
        ? [...prev.teams, teamValue]
        : prev.teams.filter(t => t !== teamValue)
    }));
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'captains': return 'Captain';
      case 'leads': return 'Team Lead';
      case 'members': return 'Team Member';
      case 'mentors': return 'Mentor';
      default: return 'Team Member';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {member ? `Edit ${getSectionTitle()}` : `Add New ${getSectionTitle()}`}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Enter role"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="Enter image URL"
              required
            />
          </div>

          {section === 'mentors' && (
            <div className="space-y-2">
              <Label htmlFor="year">Year Started</Label>
              <Input
                id="year"
                value={formData.year || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                placeholder="e.g., 2015"
              />
            </div>
          )}

          {section !== 'mentors' && (
            <div className="space-y-2">
              <Label>Teams</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded p-3">
                {teamOptions.map((team) => (
                  <div key={team.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={team.value}
                      checked={formData.teams.includes(team.value)}
                      onCheckedChange={(checked) => handleTeamToggle(team.value, checked as boolean)}
                    />
                    <Label htmlFor={team.value} className="text-sm">
                      {team.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <div>
              {member && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {member ? "Update" : "Add"} {getSectionTitle()}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Edit2, Plus, MoveUp, MoveDown, Upload } from "lucide-react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  since: string;
  display_order: number;
}

interface SortableSponsorProps {
  sponsor: Sponsor;
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
}

const SortableSponsor = ({ sponsor, onEdit, onDelete }: SortableSponsorProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: sponsor.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="p-4 mb-4 cursor-move hover:bg-accent/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={sponsor.logo} alt={sponsor.name} className="w-12 h-12 object-contain" />
            <div>
              <h3 className="font-semibold">{sponsor.name}</h3>
              <p className="text-sm text-muted-foreground">Since {sponsor.since}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(sponsor);
              }}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(sponsor.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const SponsorsManager = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    since: "",
    logo: null as File | null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching sponsors:", error);
      toast({
        title: "Error",
        description: "Failed to fetch sponsors",
        variant: "destructive",
      });
      return;
    }

    setSponsors(data || []);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      website: "",
      description: "",
      since: "",
      logo: null,
    });
    setEditingId(null);
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("sponsor-logos")
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("sponsor-logos")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let logoUrl = "";
      
      if (formData.logo) {
        logoUrl = await handleFileUpload(formData.logo);
      }

      const sponsorData = {
        name: formData.name,
        website: formData.website,
        description: formData.description,
        since: formData.since,
        ...(logoUrl && { logo: logoUrl }),
      };

      if (editingId) {
        const { error } = await supabase
          .from("sponsors")
          .update(sponsorData)
          .eq("id", editingId);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Sponsor updated successfully",
        });
      } else {
        const maxOrder = Math.max(...sponsors.map(s => s.display_order), 0);
        const { error } = await supabase
          .from("sponsors")
          .insert({
            ...sponsorData,
            logo: logoUrl,
            display_order: maxOrder + 1,
          });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Sponsor added successfully",
        });
      }

      resetForm();
      fetchSponsors();
    } catch (error) {
      console.error("Error saving sponsor:", error);
      toast({
        title: "Error",
        description: "Failed to save sponsor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setFormData({
      name: sponsor.name,
      website: sponsor.website,
      description: sponsor.description,
      since: sponsor.since,
      logo: null,
    });
    setEditingId(sponsor.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sponsor?")) return;

    const { error } = await supabase
      .from("sponsors")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting sponsor:", error);
      toast({
        title: "Error",
        description: "Failed to delete sponsor",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Sponsor deleted successfully",
    });
    fetchSponsors();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sponsors.findIndex((s) => s.id === active.id);
    const newIndex = sponsors.findIndex((s) => s.id === over.id);

    const newSponsors = [...sponsors];
    const [movedSponsor] = newSponsors.splice(oldIndex, 1);
    newSponsors.splice(newIndex, 0, movedSponsor);

    // Update display orders
    const updates = newSponsors.map((sponsor, index) => ({
      id: sponsor.id,
      display_order: index + 1,
    }));

    setSponsors(newSponsors);

    try {
      for (const update of updates) {
        await supabase
          .from("sponsors")
          .update({ display_order: update.display_order })
          .eq("id", update.id);
      }
      
      toast({
        title: "Success",
        description: "Sponsor order updated successfully",
      });
    } catch (error) {
      console.error("Error updating sponsor order:", error);
      toast({
        title: "Error",
        description: "Failed to update sponsor order",
        variant: "destructive",
      });
      fetchSponsors(); // Revert to original order
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Sponsors</h2>
        <Button onClick={resetForm} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add New Sponsor
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Sponsor Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="since">Since Year</Label>
            <Input
              id="since"
              value={formData.since}
              onChange={(e) => setFormData({ ...formData, since: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="logo">Logo Image</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })}
              required={!editingId}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            required
          />
        </div>

        <div className="flex space-x-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Sponsor" : "Add Sponsor"}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold mb-4">Existing Sponsors (Drag to reorder)</h3>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sponsors.map(s => s.id)} strategy={verticalListSortingStrategy}>
            {sponsors.map((sponsor) => (
              <SortableSponsor
                key={sponsor.id}
                sponsor={sponsor}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default SponsorsManager;
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Trash2, Edit, Plus, GripVertical, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import SponsorEditModal from "@/components/admin/SponsorEditModal";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  since: string;
  display_order: number;
}

const SponsorsManager = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [since, setSince] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching sponsors:', error);
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
    setName("");
    setWebsite("");
    setDescription("");
    setSince("");
    setLogoFile(null);
    setEditingId(null);
  };

  const uploadLogo = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName;

    const { error } = await supabase.storage
      .from('sponsor-logos')
      .upload(filePath, file);

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('sponsor-logos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSaveSponsor = async () => {
    if (!name.trim() || !website.trim() || !description.trim() || !since.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!editingId && !logoFile) {
      toast({
        title: "Error",
        description: "Please select a logo file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      let logoUrl = "";
      
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile);
      }

      if (editingId) {
        const updateData: any = {
          name: name.trim(),
          website: website.trim(),
          description: description.trim(),
          since: since.trim(),
        };

        if (logoFile) {
          updateData.logo = logoUrl;
        }

        const { data, error } = await supabase
          .from('sponsors')
          .update(updateData)
          .eq('id', editingId)
          .select()
          .single();

        if (error) throw error;
        if (!data) throw new Error('Update failed: no data returned');

        // Optimistically update local state for immediate UI feedback
        setSponsors((prev) => prev.map((s) => (s.id === data.id ? { ...s, ...data } : s)));

        toast({
          title: "Success",
          description: "Sponsor updated successfully",
        });
      } else {
         const maxOrderResult = await supabase
           .from('sponsors')
           .select('display_order')
           .order('display_order', { ascending: false })
           .limit(1);

        const nextOrder = maxOrderResult.data?.[0]?.display_order ? maxOrderResult.data[0].display_order + 1 : 1;

        const { error } = await supabase
          .from('sponsors')
          .insert({
            name: name.trim(),
            logo: logoUrl,
            website: website.trim(),
            description: description.trim(),
            since: since.trim(),
            display_order: nextOrder,
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Sponsor added successfully",
        });
      }

      resetForm();
      fetchSponsors();
    } catch (error: any) {
      console.error('Error saving sponsor:', error);
      toast({
        title: "Error",
        description: error?.message ? `Failed to save sponsor: ${error.message}` : "Failed to save sponsor",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteSponsor = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this sponsor?')) {
      return;
    }

    const { error } = await supabase
      .from('sponsors')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting sponsor:', error);
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

  const handleEditSponsor = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setIsEditModalOpen(true);
  };

  const handleSaveSponsorEdit = async (values: { name: string; website: string; description: string; since: string; logoFile?: File | null; }) => {
    if (!editingSponsor) return;
    
    if (!values.name.trim() || !values.website.trim() || !values.description.trim() || !values.since.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSavingEdit(true);
    try {
      let logoUrl = editingSponsor.logo;
      
      if (values.logoFile) {
        logoUrl = await uploadLogo(values.logoFile);
      }

      const updateData: any = {
        name: values.name.trim(),
        website: values.website.trim(),
        description: values.description.trim(),
        since: values.since.trim(),
        logo: logoUrl,
      };

      const { data, error } = await supabase
        .from('sponsors')
        .update(updateData)
        .eq('id', editingSponsor.id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Update failed: no data returned');

      setSponsors((prev) => prev.map((s) => (s.id === data.id ? { ...s, ...data } : s)));

      toast({
        title: "Success",
        description: "Sponsor updated successfully",
      });

      setIsEditModalOpen(false);
      setEditingSponsor(null);
    } catch (error: any) {
      console.error('Error updating sponsor:', error);
      toast({
        title: "Error",
        description: error?.message ? `Failed to update sponsor: ${error.message}` : "Failed to update sponsor",
        variant: "destructive",
      });
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sponsors.findIndex((item) => item.id === active.id);
      const newIndex = sponsors.findIndex((item) => item.id === over.id);
      
      const newSponsors = arrayMove(sponsors, oldIndex, newIndex);
      setSponsors(newSponsors);

      // Update display_order in database
      const updates = newSponsors.map((sponsor, index) => ({
        id: sponsor.id,
        display_order: index + 1,
      }));

      for (const update of updates) {
        await supabase
          .from('sponsors')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }

      toast({
        title: "Success",
        description: "Sponsor order updated",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Sponsor" : "Add New Sponsor"}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Sponsor Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter sponsor name"
              />
            </div>
            
            <div>
              <Label htmlFor="since">Year Since</Label>
              <Input
                id="since"
                value={since}
                onChange={(e) => setSince(e.target.value)}
                placeholder="e.g., 2025"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor="logo">Logo</Label>
            {editingId && !logoFile && (
              <div className="mb-2 p-3 bg-muted rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Current logo:</p>
                <img
                  src={sponsors.find(s => s.id === editingId)?.logo}
                  alt="Current logo"
                  className="h-16 w-auto object-contain"
                />
                <p className="text-xs text-muted-foreground mt-2">Upload a new file to change the logo</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                className="flex-1"
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter sponsor description..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleSaveSponsor} 
              disabled={isUploading}
            >
              {isUploading ? "Saving..." : editingId ? "Update Sponsor" : "Add Sponsor"}
            </Button>
            
            {editingId && (
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Sponsors List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sponsors ({sponsors.length})</h3>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sponsors} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {sponsors.map((sponsor) => (
                <SortableItem key={sponsor.id} id={sponsor.id}>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                    
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden border">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{sponsor.name}</h4>
                      <p className="text-sm text-muted-foreground">Since {sponsor.since}</p>
                      <p className="text-sm text-muted-foreground truncate">{sponsor.description}</p>
                    </div>
                    
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); handleEditSponsor(sponsor); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); handleDeleteSponsor(sponsor.id); }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                  </div>
                </SortableItem>
              ))}
              
              {sponsors.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No sponsors found. Add your first sponsor above!
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </Card>

      <SponsorEditModal
        open={isEditModalOpen}
        sponsor={editingSponsor}
        isSaving={isSavingEdit}
        onClose={() => { setIsEditModalOpen(false); setEditingSponsor(null); }}
        onSave={handleSaveSponsorEdit}
      />
    </div>
  );
};

export default SponsorsManager;
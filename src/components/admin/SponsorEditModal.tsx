import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export interface SponsorEditValues {
  name: string;
  website: string;
  description: string;
  since: string;
  logoFile?: File | null;
}

interface SponsorEditModalProps {
  open: boolean;
  sponsor: {
    id: string;
    name: string;
    logo: string;
    website: string;
    description: string;
    since: string;
  } | null;
  isSaving: boolean;
  onClose: () => void;
  onSave: (values: SponsorEditValues) => void;
}

const SponsorEditModal = ({ open, sponsor, isSaving, onClose, onSave }: SponsorEditModalProps) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [since, setSince] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    if (sponsor) {
      setName(sponsor.name || "");
      setWebsite(sponsor.website || "");
      setDescription(sponsor.description || "");
      setSince(sponsor.since || "");
      setLogoFile(null);
    }
  }, [sponsor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsor) return;
    onSave({ name, website, description, since, logoFile });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Sponsor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Sponsor Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter sponsor name" />
            </div>
            <div>
              <Label htmlFor="since">Year Since</Label>
              <Input id="since" value={since} onChange={(e) => setSince(e.target.value)} placeholder="e.g., 2025" />
            </div>
          </div>

          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" />
          </div>

          <div>
            <Label htmlFor="logo">Logo</Label>
            {sponsor?.logo && !logoFile && (
              <div className="mb-2 p-3 bg-muted rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Current logo:</p>
                <img src={sponsor.logo} alt="Current logo" className="h-16 w-auto object-contain" />
                <p className="text-xs text-muted-foreground mt-2">Upload a new file to change the logo</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Input id="logo" type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} className="flex-1" />
              <Upload className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter sponsor description..." rows={3} />
          </div>

          <DialogFooter>
            <div className="flex gap-2 ml-auto">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Update Sponsor"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorEditModal;

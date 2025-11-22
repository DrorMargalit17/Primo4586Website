import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, ExternalLink, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { resourceSchema } from "@/lib/validations";

interface Resource {
  id: string;
  category: string;
  name: string;
  type: string;
  link: string;
}

const categories = [
  "Strategy",
  "CAD & Manufacture", 
  "Mechanics",
  "Electronics",
  "Software",
  "Community",
  "Media",
  "Design",
  "FLL",
  "Resource Mobilization"
];

const ResourcesManager = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Strategy");
  const [newResource, setNewResource] = useState({
    name: "",
    type: "",
    link: ""
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("category", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast({
        title: "Error",
        description: "Failed to fetch resources",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddResource = async () => {
    // Validate inputs with zod schema
    const validation = resourceSchema.safeParse({
      name: newResource.name,
      link: newResource.link,
      type: newResource.type,
      category: selectedCategory
    });

    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("resources")
        .insert({
          category: selectedCategory,
          name: newResource.name,
          type: newResource.type,
          link: newResource.link
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resource added successfully",
      });

      setNewResource({ name: "", type: "", link: "" });
      fetchResources();
    } catch (error) {
      console.error("Error adding resource:", error);
      toast({
        title: "Error",
        description: "Failed to add resource",
        variant: "destructive",
      });
    }
  };

  const handleDeleteResource = async (id: string) => {
    try {
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resource deleted successfully",
      });

      fetchResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      });
    }
  };

  const filteredResources = resources.filter(resource => resource.category === selectedCategory);

  if (loading) {
    return <div className="p-6">Loading resources...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Manage Resources</h2>
      </div>

      {/* Category Selection */}
      <Card className="p-4">
        <Label htmlFor="category" className="text-sm font-medium">
          Select Category
        </Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Add New Resource */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Add New Resource to {selectedCategory}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="name">Resource Name</Label>
            <Input
              id="name"
              value={newResource.name}
              onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              placeholder="e.g., Game Analysis Sheet"
            />
          </div>
          <div>
            <Label htmlFor="type">Resource Type</Label>
            <Input
              id="type"
              value={newResource.type}
              onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
              placeholder="e.g., PDF, GitHub Repository"
            />
          </div>
          <div>
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              value={newResource.link}
              onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>
        <Button onClick={handleAddResource} className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </Card>

      {/* Resources List */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">
          Resources in {selectedCategory} ({filteredResources.length})
        </h3>
        {filteredResources.length === 0 ? (
          <p className="text-muted-foreground">No resources found for this category.</p>
        ) : (
          <div className="space-y-3">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{resource.name}</h4>
                  <p className="text-sm text-muted-foreground">{resource.type}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-md">{resource.link}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      {resource.type.includes("Repository") || resource.type.includes("YouTube") ? (
                        <ExternalLink className="h-4 w-4" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {resource.type.includes("Repository") || resource.type.includes("YouTube") ? "View" : "Download"}
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteResource(resource.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResourcesManager;
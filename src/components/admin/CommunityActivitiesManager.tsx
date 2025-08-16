import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Activity = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

export default function CommunityActivitiesManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from('community_activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: "Failed to fetch activities",
        variant: "destructive",
      });
      return;
    }

    setActivities(data || []);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImages([]);
    setEditingId(null);
  };

  const uploadImages = async (activityId: string, files: File[]) => {
    const urls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('community-activities')
        .upload(`${activityId}/${fileName}`, file);

      if (error) {
        console.error('Error uploading image:', error);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('community-activities')
        .getPublicUrl(data.path);

      urls.push(publicUrl);
    }

    return urls;
  };

  const deleteActivityImages = async (activityId: string, imageUrls: string[]) => {
    for (const url of imageUrls) {
      const path = url.split('/').slice(-2).join('/'); // Extract path from URL
      await supabase.storage
        .from('community-activities')
        .remove([path]);
    }
  };

  const handleSave = async () => {
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        let newUrls: string[] = [];
        if (images.length > 0) {
          newUrls = await uploadImages(editingId, images);
        }

        const { error } = await supabase
          .from('community_activities')
          .update({
            title,
            description,
            ...(newUrls.length > 0 ? { images: newUrls } : {}),
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('community_activities')
          .insert({
            title,
            description,
            images: [],
          })
          .select()
          .single();

        if (error) throw error;

        if (images.length > 0) {
          const imageUrls = await uploadImages(data.id, images);
          await supabase
            .from('community_activities')
            .update({ images: imageUrls })
            .eq('id', data.id);
        }
      }

      resetForm();
      fetchActivities();
      toast({
        title: "Success",
        description: editingId ? "Activity updated successfully" : "Activity created successfully",
      });
    } catch (err) {
      console.error("Error saving activity", err);
      toast({
        title: "Error",
        description: "Error saving activity",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (activity: Activity) => {
    setTitle(activity.title);
    setDescription(activity.description);
    setEditingId(activity.id);
    setImages([]);
  };

  const handleDelete = async (activity: Activity) => {
    if (!confirm("Delete this activity?")) return;

    setLoading(true);

    try {
      // Delete images from storage
      if (activity.images.length > 0) {
        await deleteActivityImages(activity.id, activity.images);
      }

      // Delete activity from database
      const { error } = await supabase
        .from('community_activities')
        .delete()
        .eq('id', activity.id);

      if (error) throw error;

      fetchActivities();
      toast({
        title: "Success",
        description: "Activity deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting activity", err);
      toast({
        title: "Error",
        description: "Error deleting activity",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto bg-gradient-surface border border-border rounded-2xl p-8 shadow-md mb-12">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-4 p-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="w-full mb-4 p-3 border border-border rounded-md resize-none bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={e => setImages(e.target.files ? Array.from(e.target.files) : [])}
          className="mb-6"
          disabled={loading}
        />
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-md hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update Activity" : "Add Activity"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              disabled={loading}
              className="px-6 py-2 bg-gray-600 text-primary-foreground rounded-md hover:brightness-110 transition disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <ul className="max-w-3xl mx-auto space-y-6">
        {activities.map(activity => (
          <li
            key={activity.id}
            className="bg-gradient-surface border border-border rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold">{activity.title}</h3>
            <p className="text-muted-foreground mt-2 whitespace-pre-line">{activity.description}</p>
            {activity.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activity.images.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Activity Image ${i + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => handleEdit(activity)}
                disabled={loading}
                className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md text-black transition disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity)}
                disabled={loading}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white transition disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
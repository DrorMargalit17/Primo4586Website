import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

  const refCollection = collection(db, "communityActivities");

  const fetchActivities = async () => {
    const snapshot = await getDocs(refCollection);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Activity, "id">),
    }));
    setActivities(data);
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
      const storageRef = ref(storage, `communityActivities/${activityId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    return urls;
  };

  const deleteImageFolder = async (activityId: string) => {
    // Placeholder for deletion logic if needed
  };

  const handleSave = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        const docRef = doc(db, "communityActivities", editingId);
        let newUrls: string[] = [];
        if (images.length > 0) {
          newUrls = await uploadImages(editingId, images);
        }

        await updateDoc(docRef, {
          title,
          description,
          ...(newUrls.length > 0 ? { images: newUrls } : {}),
        });
      } else {
        const newDoc = await addDoc(refCollection, {
          title,
          description,
          images: [],
          createdAt: Timestamp.now(),
        });

        const imageUrls = await uploadImages(newDoc.id, images);

        await updateDoc(newDoc, {
          images: imageUrls,
        });
      }

      resetForm();
      fetchActivities();
    } catch (err) {
      console.error("Error saving activity", err);
      alert("Error saving activity");
    }
  };

  const handleEdit = (activity: Activity) => {
    setTitle(activity.title);
    setDescription(activity.description);
    setEditingId(activity.id);
    setImages([]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this activity?")) return;

    try {
      await deleteDoc(doc(db, "communityActivities", id));
      await deleteImageFolder(id);
      fetchActivities();
    } catch (err) {
      console.error("Error deleting activity", err);
      alert("Error deleting activity");
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
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="w-full mb-4 p-3 border border-border rounded-md resize-none bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="file"
          multiple
          onChange={e => setImages(e.target.files ? Array.from(e.target.files) : [])}
          className="mb-6"
        />
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-md hover:brightness-110 transition"
          >
            {editingId ? "Update Activity" : "Add Activity"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-gray-600 text-primary-foreground rounded-md hover:brightness-110 transition"
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
                className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md text-black transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity.id)}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white transition"
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

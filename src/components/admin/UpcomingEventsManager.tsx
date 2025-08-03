import { useState, useEffect } from "react";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

type Event = {
  id: string;
  title: string;
  date: Timestamp;
  time: string; // e.g. "16:30"
  location: string;
  description: string;
};

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // yyyy-mm-dd format
  const [time, setTime] = useState(""); // HH:mm format
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const eventsRef = collection(db, "events");

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(eventsRef);
      const eventsData = snapshot.docs.map(doc => {
        const data = doc.data() as Omit<Event, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });
      eventsData.sort((a, b) => {
        const aDate = a.date.toDate().getTime();
        const bDate = b.date.toDate().getTime();
        return aDate - bDate;
      });
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
    setEditingId(null);
  };

  const handleSaveEvent = async () => {
    if (!title || !date || !time) {
      alert("Please fill in title, date, and time");
      return;
    }

    const [hour, minute] = time.split(":").map(Number);
    const eventDateTime = new Date(date);
    eventDateTime.setHours(hour, minute);

    try {
      if (editingId) {
        const eventDoc = doc(db, "events", editingId);
        await updateDoc(eventDoc, {
          title,
          date: Timestamp.fromDate(eventDateTime),
          time,
          location,
          description,
        });
      } else {
        await addDoc(eventsRef, {
          title,
          date: Timestamp.fromDate(eventDateTime),
          time,
          location,
          description,
        });
      }
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event. Check console for details.");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteDoc(doc(db, "events", id));
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event. Check console for details.");
    }
  };

  const handleEditEvent = (event: Event) => {
    setTitle(event.title);
    setDate(event.date.toDate().toISOString().split("T")[0]);
    setTime(event.time);
    setLocation(event.location);
    setDescription(event.description);
    setEditingId(event.id);
  };

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen bg-background">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-foreground">
        Event <span className="bg-gradient-primary bg-clip-text text-transparent">Management</span>
      </h1>

      {/* Form */}
      <div className="bg-gradient-surface border border-border rounded-2xl p-6 shadow-md max-w-3xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-4 p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
          />
        </div>
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="w-full p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
        />

        <div className="mt-6 flex items-center space-x-3 justify-center">
          <button
            onClick={handleSaveEvent}
            className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-md hover:brightness-110 transition"
          >
            {editingId ? "Update Event" : "Add Event"}
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

      {/* Events List */}
      <ul className="max-w-3xl mx-auto space-y-6">
        {events.map(event => (
          <li
            key={event.id}
            className="bg-gradient-surface border border-border rounded-2xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex-1 mb-4 sm:mb-0 text-foreground">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-sm text-muted-foreground">
                {event.date.toDate().toLocaleDateString()} {event.time} - {event.location}
              </p>
              <p className="mt-2 whitespace-pre-line">{event.description}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEditEvent(event)}
                className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md text-black transition"
                aria-label={`Edit event ${event.title}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white transition"
                aria-label={`Delete event ${event.title}`}
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

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export default function UpcomingEventsManager() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "Please fill in title, date, and time",
        variant: "destructive",
      });
      return;
    }

    const [hour, minute] = time.split(":").map(Number);
    const eventDateTime = new Date(date);
    eventDateTime.setHours(hour, minute);

    setLoading(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('events')
          .update({
            title,
            date: eventDateTime.toISOString(),
            time,
            location,
            description,
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert({
            title,
            date: eventDateTime.toISOString(),
            time,
            location,
            description,
          });

        if (error) throw error;
      }

      resetForm();
      fetchEvents();
      toast({
        title: "Success",
        description: editingId ? "Event updated successfully" : "Event created successfully",
      });
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchEvents();
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = (event: Event) => {
    setTitle(event.title);
    const eventDate = new Date(event.date);
    setDate(eventDate.toISOString().split("T")[0]);
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
          disabled={loading}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
            disabled={loading}
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
            disabled={loading}
          />
        </div>
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="w-full p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
          disabled={loading}
        />

        <div className="mt-6 flex items-center space-x-3 justify-center">
          <button
            onClick={handleSaveEvent}
            disabled={loading}
            className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-md hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update Event" : "Add Event"}
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
                {new Date(event.date).toLocaleDateString()} {event.time} - {event.location}
              </p>
              <p className="mt-2 whitespace-pre-line">{event.description}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEditEvent(event)}
                disabled={loading}
                className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md text-black transition disabled:opacity-50"
                aria-label={`Edit event ${event.title}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                disabled={loading}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white transition disabled:opacity-50"
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
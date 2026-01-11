import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Plus } from "lucide-react";
import { EditableText } from "@/components/editor/EditableText";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const addToGoogleCalendar = (event: Event) => {
  const [hour, minute] = event.time.split(":").map(Number);
  const startDate = new Date(event.date);
  startDate.setHours(hour, minute);

  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours

  const formatDateForGoogle = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(
    endDate
  )}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(
    event.location || ""
  )}`;

  window.open(googleCalendarUrl, "_blank");
};

interface UpcomingEventsProps {
  showTitle?: boolean;
  className?: string;
}

const UpcomingEvents = ({ showTitle = true, className = "" }: UpcomingEventsProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      // Fetch only future/current events - filter out past events at query time
      // This is safer than calling an RPC to delete past events
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', now.split('T')[0]) // Only get events from today onwards
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      setEvents(data || []);
    };

    // Initial fetch
    fetchEvents();

    // Set up periodic cleanup every 5 minutes
    const cleanupInterval = setInterval(() => {
      fetchEvents();
    }, 5 * 60 * 1000);

    // Set up real-time subscription
    const subscription = supabase
      .channel('events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
        fetchEvents();
      })
      .subscribe();

    return () => {
      clearInterval(cleanupInterval);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <section className={className}>
      {showTitle && (
        <div className="text-center mb-8">
          <EditableText
            contentKey="upcoming-events-title"
            defaultContent="Upcoming Events"
            contentType="heading"
            tag="h2"
            className="text-4xl font-bold text-foreground mb-4"
          />
          <EditableText
            contentKey="upcoming-events-subtitle"
            defaultContent="Join us at our upcoming robotics events and activities"
            contentType="paragraph"
            tag="p"
            className="text-xl text-muted-foreground"
          />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {events.map(event => (
          <Card
            key={event.id}
            className="p-6 border-border bg-gradient-surface hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addToGoogleCalendar(event)}
                className="flex items-center gap-2 text-xs"
              >
                <Plus className="w-3 h-3" />
                Add to Calendar
              </Button>
            </div>

            <EditableText
              contentKey={`event-title-${event.id}`}
              defaultContent={event.title}
              contentType="heading"
              tag="h3"
              className="text-2xl font-bold text-foreground mb-3"
            />

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>

            <EditableText
              contentKey={`event-description-${event.id}`}
              defaultContent={event.description}
              contentType="paragraph"
              tag="p"
              className="text-muted-foreground leading-relaxed"
            />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;

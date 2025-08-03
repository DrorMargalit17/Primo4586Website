import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Plus } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Timestamp;
  time: string;
  location: string;
  description: string;
}

const formatDate = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const addToGoogleCalendar = (event: Event) => {
  // המרת תאריך ושעה ל־Date אחד
  const [hour, minute] = event.time.split(":").map(Number);
  const startDate = event.date.toDate();
  startDate.setHours(hour, minute);

  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 שעות

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
    event.location
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
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Event, "id">),
      }));
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className={className}>
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
          <p className="text-xl text-muted-foreground">
            Join us at our upcoming robotics events and activities
          </p>
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

            <h3 className="text-2xl font-bold text-foreground mb-3">{event.title}</h3>

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

            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;

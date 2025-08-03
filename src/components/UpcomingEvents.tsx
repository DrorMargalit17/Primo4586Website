import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Plus } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  googleCalendarId?: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "Spark Day",
    date: "2025-08-10",
    time: "16:30 - 20:00 PM",
    location: "Modi'in Israel",
    description: "Interactive robotics demonstrations and hands-on activities for families.",
  },
  {
    id: "2",
    title: "Regional Competition",
    date: "2025-05-15",
    time: "9:00 AM",
    location: "University Campus",
    description: "Public competition where community members can cheer on our team.",
  },
  {
    id: "3",
    title: "Summer Camp Kickoff",
    date: "2025-06-05",
    time: "2:00 PM",
    location: "Primo4586 Lab",
    description: "Launch of our annual summer robotics camp for middle school students.",
  },
  {
    id: "4",
    title: "Tech Showcase",
    date: "2025-07-20",
    time: "6:00 PM",
    location: "Community Center",
    description: "Showcase of our latest robotics innovations and student projects.",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

const addToGoogleCalendar = (event: Event) => {
  const startDate = new Date(`${event.date}T${convertTo24Hour(event.time)}`);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
  
  window.open(googleCalendarUrl, '_blank');
};

const convertTo24Hour = (time12h: string) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  return `${hours}:${minutes}:00`;
};

interface UpcomingEventsProps {
  showTitle?: boolean;
  className?: string;
}

const UpcomingEvents = ({ showTitle = true, className = "" }: UpcomingEventsProps) => {
  const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
        {sortedEvents.map((event) => (
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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import UpcomingEvents from "@/components/UpcomingEvents";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { EditableText } from "@/components/editor/EditableText";

const AutoCarousel = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const intervalId = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio >= 0.7);
      },
      {
        threshold: [0, 0.7, 1],
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      intervalId.current = setInterval(() => {
        setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
    } else {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [isVisible, images.length]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg w-full h-full max-h-[300px]"
    >
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Image ${idx + 1}`}
          className={`w-full h-full object-cover rounded-lg absolute top-0 left-0 transition-opacity duration-1000 ${
            idx === currentImg ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ maxHeight: 300 }}
        />
      ))}
    </div>
  );
};

interface Activity {
  id: string;
  title: string;
  description: string;
  images: string[];
}

const Community = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from("community_activities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-20 px-6 container mx-auto">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 text-center">
        <EditableText 
          contentKey="community-hero-title" 
          defaultContent="Community Impact" 
          tag="h1" 
          className="text-5xl md:text-6xl font-bold mb-6 text-foreground"
        >
          Community{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Impact
          </span>
        </EditableText>
        <EditableText 
          contentKey="community-hero-description" 
          defaultContent="We believe in giving back to our community by sharing our passion for robotics and inspiring others to explore STEM. Our mission reaches from age 3 to the 3rd age, showing that curiosity and innovation have no limits!" 
          contentType="paragraph"
          tag="p" 
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
        />
      </section>

      {/* New Section: Title and Description for Community Activities */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold text-foreground">Community Activities</h2>
        <p className="text-lg text-muted-foreground">
          Discover the various ways we engage with and inspire our community through hands-on robotics events and workshops.
        </p>
      </section>

      {/* Community Activities */}
      <div className="space-y-8">
        {loading ? (
          <div className="text-center py-8">Loading activities...</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No activities found.</div>
        ) : (
          activities.map((activity) => (
            <Card
              key={activity.id}
              className="grid grid-cols-2 gap-6 items-center p-6 relative overflow-hidden"
              style={{ height: 320 }}
            >
              <div className="flex flex-col justify-center h-full">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {activity.description}
                </p>
              </div>
              <AutoCarousel images={activity.images} />
            </Card>
          ))
        )}
      </div>

      {/* Upcoming Events with Google Calendar Integration */}
      <UpcomingEvents />

      {/* Impact Stats */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Community Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Numbers that show our commitment to community engagement
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Students Inspired" },
              { number: "50+", label: "Mentees Guided" },
              { number: "$25K+", label: "Funds Raised" },
              { number: "200+", label: "Monthly Visitors" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA - Updated Section */}
      <section className="container mx-auto px-6 text-center pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Collaborate With Us
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Are you a team looking for collaboration? 
          Primo is always open to partnerships that spark
          innovation, fuel creativity, and strengthen our
          community. Let’s build the future together!        
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Community;

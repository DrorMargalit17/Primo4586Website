import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import primoFly1 from "@/assets/community/primoFly/primoFly1.jpg";
import primoFly2 from "@/assets/community/primoFly/primoFly4.jpg";
import primoFly3 from "@/assets/community/primoFly/primoFly5.jpg";
//import primoSenior1 from "@/assets/community/primoSenior/primoSenior_1.png";
//import primoSenior2 from "@/assets/community/primoSenior/primoSenior_2.png";
//import primoSenior3 from "@/assets/community/primoSenior/primoSenior_3.png";



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

const communityActivities = [
  {
    title: "Science With PrimoFly",
    description:
      "An engaging day of hands-on robotics learning for local high school students. Participants built simple robots and learned the basics of electronics and programming.",
    images: [primoFly1, primoFly2, primoFly3],
  },
  {
    title: "Primo Senior",
    description:
      "We hosted interactive booths and showcased our robots at the city's STEM fair, drawing hundreds of visitors and spreading STEM awareness.",
      //images: [primoSenior1, primoSenior2, primoSenior3],
  },
  {
    title: "Charity Robot Show",
    description:
      "A public robotics demonstration to raise funds for local children's hospitals. Our robots performed fun tasks and entertained the audience.",
    images: [
      "/images/community/charity1.jpg",
      "/images/community/charity2.jpg",
    ],
  },
];

const events = [
  {
    date: "August 10, 2025",
    title: "Spark Day",
    location: "Modi'in Israel",
    description: "Interactive robotics demonstrations and hands-on activities for families.",
  },
  {
    date: "April 22, 2024",
    title: "Earth Day Tech Challenge",
    location: "City Park",
    description: "Showcasing sustainable robotics solutions for environmental challenges.",
  },
  {
    date: "May 10, 2024",
    title: "Regional Competition",
    location: "University Campus",
    description: "Public competition where community members can cheer on our team.",
  },
  {
    date: "June 5, 2024",
    title: "Summer Camp Kickoff",
    location: "Primo4586 Lab",
    description: "Launch of our annual summer robotics camp for middle school students.",
  },
];

const Community = () => {
  return (
    <div className="space-y-20 px-6 container mx-auto">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Community <span className="bg-gradient-primary bg-clip-text text-transparent">Impact</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We believe in giving back to our community by sharing our passion for
          robotics and inspiring others to explore STEM fields through hands-on
          learning and mentorship.
        </p>
      </section>

      {/* New Section: Title and Description for Community Activities */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold text-foreground">Community Activities</h2>
        <p className="text-lg text-muted-foreground">
          Discover the various ways we engage with and inspire our community through hands-on robotics events and workshops.
        </p>
      </section>

      {/* Community Activities (wrapped in its own scrollable container) */}
      <div className="max-h-screen overflow-y-auto space-y-8">
        {communityActivities.map((activity, index) => (
          <Card
            key={index}
            className="grid grid-cols-2 gap-6 items-center p-6 relative overflow-hidden"
            style={{ height: 320 }}
          >
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-3xl font-bold text-foreground mb-4">{activity.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{activity.description}</p>
            </div>
            <AutoCarousel images={activity.images} />
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Upcoming Events</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event, index) => (
            <Card
              key={index}
              className="p-6 border-border bg-gradient-surface hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-center mb-4 text-muted-foreground">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{event.title}</h3>
              <div className="flex items-center mb-2 text-muted-foreground">
                <Users className="w-5 h-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <p className="text-muted-foreground">{event.description}</p>
            </Card>
          ))}
        </div>
      </section>

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
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="container mx-auto px-6 text-center pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get Involved
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Want to be part of our community initiatives? There are many ways to
          contribute and make a difference.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:community@robotics.edu">
              Volunteer with Us
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:partnerships@robotics.edu">
              Partner with Us
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Community;

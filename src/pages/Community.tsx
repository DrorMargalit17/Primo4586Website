import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Award, Heart } from "lucide-react";

const Community = () => {
  const initiatives = [
    {
      icon: Users,
      title: "STEM Workshops",
      description: "Free robotics workshops for local schools and community centers, inspiring the next generation of engineers.",
      impact: "500+ students reached",
    },
    {
      icon: Award,
      title: "Mentorship Program",
      description: "One-on-one mentoring for aspiring robotics enthusiasts, providing guidance and technical support.",
      impact: "50+ mentees guided",
    },
    {
      icon: Heart,
      title: "Charity Competitions",
      description: "Organizing fundraising events where robots perform demonstrations to support local charities.",
      impact: "$25,000+ raised",
    },
    {
      icon: Calendar,
      title: "Open Days",
      description: "Monthly public demonstrations where community members can see our robots in action and ask questions.",
      impact: "200+ visitors monthly",
    },
  ];

  const events = [
    {
      date: "March 15, 2024",
      title: "Spring STEM Fair",
      location: "Metro Community Center",
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
      location: "RoboTeam Lab",
      description: "Launch of our annual summer robotics camp for middle school students.",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Community <span className="bg-gradient-primary bg-clip-text text-transparent">Impact</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in giving back to our community by sharing our passion for
            robotics and inspiring others to explore STEM fields through hands-on
            learning and mentorship.
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Initiatives
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meaningful programs that make a difference in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((initiative, index) => (
            <Card
              key={index}
              className="p-8 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-primary p-4 rounded-lg">
                  <initiative.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {initiative.description}
                  </p>
                  <div className="bg-accent/20 text-accent-foreground px-4 py-2 rounded-lg inline-block font-medium">
                    {initiative.impact}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us at these exciting community events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="mb-4">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                  {event.date}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-accent font-medium mb-3">{event.location}</p>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
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
      <section className="container mx-auto px-6 text-center">
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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To inspire and educate the next generation of engineers and innovators through hands-on robotics experience, fostering creativity, problem-solving skills, and technical excellence.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be a leading robotics team that bridges the gap between theoretical learning and practical application, creating solutions that make a positive impact on our community and beyond.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Integrity, collaboration, innovation, and continuous learning. We believe in inclusive team culture where every member's contribution is valued and celebrated.",
    },
  ];

  const achievements = [
    "Regional Champions 2023",
    "Innovation Award Winner",
    "Community Impact Recognition",
    "Technical Excellence Award",
    "Best Design Award 2022",
    "Outstanding Teamwork Recognition",
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Primo4586</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a passionate group of students, mentors, and innovators
            dedicated to advancing robotics technology and inspiring the next
            generation of engineers.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="p-8 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow text-center"
            >
              <div className="bg-gradient-primary p-4 rounded-lg w-fit mx-auto mb-6">
                <value.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2018, Primo4586 began as a small group of students
                passionate about robotics and engineering. What started in a
                garage has grown into a competitive team with state-of-the-art
                facilities and cutting-edge technology.
              </p>
              <p>
                Our journey has been marked by continuous learning, innovation,
                and community engagement. From our first competition to our
                recent achievements, we've consistently pushed the boundaries
                of what's possible in robotics.
              </p>
              <p>
                Today, we're proud to be a diverse team of engineers, programmers,
                designers, and strategists working together to create robots that
                not only compete but also contribute to solving real-world problems.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Our Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="p-4 bg-surface border-border hover:border-primary/50 transition-all duration-300"
                >
                  <p className="text-sm font-medium text-foreground">
                    {achievement}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Want to Learn More?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our team, see our robot in action, or get in touch to join
            our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/team">
                Meet Our Team <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
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

      {/* What is FRC Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              What is FRC?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                FIRST Robotics Competition (FRC) is an international high school robotics competition where teams 
                of students design, build, and program robots to compete in an alliance format against other teams.
              </p>
              <p>
                Founded by Dean Kamen in 1989, FRC combines the excitement of sport with the rigors of science and technology. 
                Teams have six weeks to build a robot that can perform specific tasks in a game that changes every year.
              </p>
              <p>
                More than just building robots, FRC teaches students valuable life skills including problem-solving, 
                teamwork, and leadership while inspiring them to pursue careers in STEM fields.
              </p>
            </div>
          </div>
          <div className="relative">
            <Card className="p-8 bg-gradient-surface border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                FRC by the Numbers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">3,000+</p>
                  <p className="text-sm text-muted-foreground">Teams Worldwide</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">80,000+</p>
                  <p className="text-sm text-muted-foreground">Student Participants</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">6</p>
                  <p className="text-sm text-muted-foreground">Week Build Season</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">30+</p>
                  <p className="text-sm text-muted-foreground">Countries</p>
                </div>
              </div>
            </Card>
          </div>
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
                Primo 4586 was founded 11 years ago, in 2012, at the initiative of 4 motivated FLL “Boeing 727” alumni who wanted to establish an 
                FRC at the school based on the values ​​they received from FLL, such as family 
                spirit, spreading the worlds of science and technology in the community, and more!
              </p>
              <p>
                And after struggling for a long time to open an FRC group,
                in their year of 12th grade they managed to open the group 
                while meeting the condition that the group would be 50% girls
                ,a condition that still guides us today, and the group had 70% female captains
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
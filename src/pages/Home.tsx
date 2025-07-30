import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, Trophy, Rocket } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const Home = () => {
  const teamImages = [team1, team2, team3];
  
  const features = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge robotics technology and creative solutions",
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Collaborative environment fostering growth and learning",
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "Competitive achievements and technical expertise",
    },
    {
      icon: Rocket,
      title: "Future",
      description: "Preparing students for tomorrow's technological challenges",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-slide-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Welcome to Primo4586
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Where innovation meets engineering. We design, build, and program
                autonomous robots that push the boundaries of what's possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/about">
                    Discover Our Mission <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/robot">See Our Robot</Link>
                </Button>
              </div>
            </div>

            {/* Right Carousel */}
            <div className="animate-fade-in">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-full max-w-lg mx-auto"
              >
                <CarouselContent>
                  {teamImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={image}
                          alt={`Team ${index + 1}`}
                          className="w-full h-80 md:h-96 object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Drives Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our core values shape everything we do, from design to competition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-4 group-hover:shadow-accent-glow transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Join Our Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of a team that's shaping the future of robotics and
            technology innovation.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/team">
              Meet Our Team <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
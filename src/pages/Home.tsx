import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, Trophy, Rocket, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const Home = () => {
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
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
    {
      icon: Lightbulb,
      title: "Learning",
      description: "Continuous education and skill development in STEM fields",
    },
  ];

  // Auto-cycle through core values every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % features.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [features.length]);

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
                opts={{
                  align: "start",
                  loop: true,
                }}
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

      {/* Core Values Carousel Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do, from design to competition
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Card className="p-8 md:p-12 bg-gradient-surface border-border text-center h-[400px] flex flex-col justify-center">
              <div className="bg-gradient-primary p-4 rounded-xl w-fit mx-auto mb-6 shadow-accent-glow transition-all duration-500">
                {(() => {
                  const IconComponent = features[currentValueIndex].icon;
                  return <IconComponent className="h-8 w-8 text-primary-foreground" />;
                })()}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 transition-all duration-500">
                {features[currentValueIndex].title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed transition-all duration-500">
                {features[currentValueIndex].description}
              </p>
            </Card>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentValueIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentValueIndex
                      ? 'bg-primary shadow-glow'
                      : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to value ${index + 1}`}
                />
              ))}
            </div>
          </div>
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
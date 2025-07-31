import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, Briefcase, HeartHandshake, Target, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import team1 from "@/assets/HomePage/team-1.jpg";
import team2 from "@/assets/HomePage/team-2.jpg";
import team3 from "@/assets/HomePage/team-3.jpg";
import team4 from "@/assets/HomePage/team-4.jpg";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const teamImages = [team1, team2, team3, team4];

  const features = [
    {
      icon: Handshake,
      title: "Family Spirit",
      description:
        "'Primo is a family' is more than just a slogan — it’s a core value that guides everything we do. It's reflected in our Shabbat gatherings, team bonding activities, and the overall atmosphere.Our family extends across generations — from founding mentors and alumni who continue to support us, to current members, parents, and the surrounding community. The deep-rooted connections we've built within our team, school, and city are what make us a true family. We also nurture the future through programs like FLL and school involvement, constantly expanding our family circle.",
    },
    {
      icon: Briefcase,
      title: "Professionalism",
      description:
        "Professionalism is a key value in Primo, essential to achieving excellence as a team. Our committed mentors pass on real-world knowledge, and veteran members train others during the season and in summer courses. This culture of learning ensures that every member gains strong technical skills and can work independently, which directly contributes to our success.",
    },
    {
      icon: HeartHandshake,
      title: "Gracious Professionalism",
      description:
        "We emphasize kindness and respect, both within the team and beyond. Internally, every member is treated with equal respect, regardless of role or experience. Externally, we maintain friendly and professional relationships with other teams in our city and beyond, always offering support and collaboration.",
    },
    {
      icon: Target,
      title: "Sense of Mission",
      description:
        "Our team operates with a strong sense of purpose — to contribute to our community, our country, and the global FIRST community. We proudly represent STEAM values and believe deeply in the impact of our work.",
    },
    {
      icon: Sparkles,
      title: "Initiative",
      description:
        "Primo empowers its members to take initiative, encouraging them to develop and lead their own projects. This fosters creativity, responsibility, and leadership, giving members the chance to influence the team's growth and face real challenges head-on.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % teamImages.length);
        setFade(true);
      }, 500); // duration of fade out
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

            {/* Right Carousel (Manual with auto-rotation) */}
            <div className="animate-fade-in">
              <div className="w-full max-w-lg mx-auto relative overflow-hidden rounded-xl">
                <img
                  src={teamImages[currentImageIndex]}
                  alt={`Team ${currentImageIndex + 1}`}
                  className={`w-full h-80 md:h-96 object-cover transition-opacity duration-500 ${
                    fade ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Carousel Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do, from design to competition
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Card className="p-8 md:p-12 bg-gradient-surface border-border text-center h-[400px] flex flex-col justify-center">
              <div className="bg-gradient-primary p-4 rounded-xl w-fit mx-auto mb-6 shadow-accent-glow transition-all duration-500">
                {(() => {
                  const IconComponent = features[currentImageIndex].icon;
                  return <IconComponent className="h-8 w-8 text-primary-foreground" />;
                })()}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 transition-all duration-500">
                {features[currentImageIndex].title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed transition-all duration-500">
                {features[currentImageIndex].description}
              </p>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-primary shadow-glow"
                      : "bg-muted hover:bg-muted-foreground/50"
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

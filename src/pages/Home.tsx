import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EditableText } from "@/components/editor/EditableText";

import UpcomingEvents from "@/components/UpcomingEvents";

import team1 from "@/assets/HomePage/team_1.jpg";
import team2 from "@/assets/HomePage/team_2.jpg";
import team3 from "@/assets/HomePage/team_3.jpg";
import team4 from "@/assets/HomePage/team_4.jpg";
import team5 from "@/assets/HomePage/team_5.jpg";
/*
import team6 from "@/assets/HomePage/team_6.jpg";
import team7 from "@/assets/HomePage/team_7.jpg";
import team8 from "@/assets/HomePage/team_8.jpg";
import team9 from "@/assets/HomePage/team_9.jpg";
import team10 from "@/assets/HomePage/team_10.jpg";
import team11 from "@/assets/HomePage/team_11.jpg";
import team12 from "@/assets/HomePage/team_12.jpg";
import team13 from "@/assets/HomePage/team_13.jpg";
import team14 from "@/assets/HomePage/team_14.jpg";
import team15 from "@/assets/HomePage/team_15.jpg";
*/



import { Handshake, Briefcase, HeartHandshake, Target, Sparkles } from "lucide-react";

const teamImages = [team1, team2, team3, team4, team5, 
  /*team6,team7,team8,team9,team10,team11,team12,team13,team14,team15 */];

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

/**
 * ImageCarousel component
 * - Displays team images in an auto-rotating carousel every 4 seconds with smooth fade transition.
 */
const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      timeoutRef.current = setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % teamImages.length);
        setFade(true); // fade in new image
      }, 300); // fade duration
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto relative overflow-hidden rounded-xl h-80 md:h-96">
      {teamImages.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Team ${idx + 1}`}
          className={`w-full h-full object-cover rounded-xl absolute top-0 left-0 transition-opacity duration-500 ${
            idx === currentImageIndex && fade ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </div>
  );
};

/**
 * CoreValuePopup component
 * - Displays a modal popup with detailed information about a selected core value.
 * - Clicking outside the popup closes it.
 * - Content is fully centered.
 */
const CoreValuePopup = ({ feature, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const IconComponent = feature.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-surface rounded-lg p-8 max-w-xl w-full shadow-xl flex flex-col items-center text-center"
      >
        <div className="bg-gradient-primary p-4 rounded-xl w-fit mb-6 shadow-accent-glow">
          <IconComponent className="h-10 w-10 text-primary-foreground mx-auto" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
};

/**
 * CoreValuesCarousel component
 * - Displays core values with auto-rotation every 15 seconds.
 * - Allows manual selection of a value which pauses auto-rotation and shows a popup.
 * - Entire card area is clickable to open popup.
 * - Pagination dots switch value without opening popup.
 * - NO blue glowing outline on hover over entire card (removed).
 */
const CoreValuesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const intervalRef = useRef(null);

  // Auto-rotation effect with 15 seconds interval
  useEffect(() => {
    if (!isPopupOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % features.length);
      }, 15000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPopupOpen]);

  // Open popup and pause rotation
  const openPopup = (index) => {
    setCurrentIndex(index);
    setIsPopupOpen(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Close popup and resume rotation
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const IconComponent = features[currentIndex].icon;

  return (
    <div className="max-w-6xl mx-auto relative">
      <Card
        className="p-8 md:p-12 bg-gradient-surface border-border text-center h-[400px] flex flex-col justify-center cursor-pointer select-none"
        onClick={() => openPopup(currentIndex)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openPopup(currentIndex);
        }}
        aria-label={`Open details for ${features[currentIndex].title}`}
      >
        <div className="bg-gradient-primary p-4 rounded-xl w-fit mx-auto mb-6 shadow-accent-glow transition-all duration-500">
          <IconComponent className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 transition-all duration-500">
          {features[currentIndex].title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed transition-all duration-500">
          {features[currentIndex].description}
        </p>

        <div className="flex justify-center mt-6 space-x-2">
          {features.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation(); // prevent parent card click
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-primary shadow-glow"
                  : "bg-muted hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to value ${idx + 1}`}
              disabled={isPopupOpen}
              type="button"
            />
          ))}
        </div>
      </Card>

      {isPopupOpen && (
        <CoreValuePopup feature={features[currentIndex]} onClose={closePopup} />
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-slide-in">
              <EditableText
                contentKey="hero-title" 
                defaultContent="Welcome to Primo4586"
                contentType="heading"
                tag="h1"
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
              />
              <EditableText
                contentKey="hero-description"
                defaultContent="Where innovation meets engineering. We design, build, and program autonomous robots that push the boundaries of what's possible."
                contentType="paragraph"
                tag="p"
                className="text-xl md:text-2xl text-muted-foreground mb-8"
              />
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

            {/* Right Image Carousel */}
            <ImageCarousel />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <EditableText
            contentKey="core-values-title"
            defaultContent="Our Core Values"
            contentType="heading"
            tag="h2"
            className="text-4xl font-bold text-foreground mb-4"
          />
          <EditableText
            contentKey="core-values-description"
            defaultContent="The principles that guide everything we do, from design to competition"
            contentType="paragraph"
            tag="p"
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          />
        </div>

        <CoreValuesCarousel />
      </section>

      {/* Upcoming Events Section */}
      <section className="container mx-auto px-6">
        <UpcomingEvents />
      </section>

      {/* CTA Section */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto text-center">
          <EditableText
            contentKey="cta-title"
            defaultContent="Ready to Join Our Journey?"
            contentType="heading"
            tag="h2"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          />
          <EditableText
            contentKey="cta-description"
            defaultContent="Be part of a team that's shaping the future of robotics and technology innovation."
            contentType="paragraph" 
            tag="p"
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          />
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

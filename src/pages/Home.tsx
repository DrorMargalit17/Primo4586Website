import { useEffect, useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EditableText } from "@/components/editor/EditableText";
import useEmblaCarousel from "embla-carousel-react";

import UpcomingEvents from "@/components/UpcomingEvents";

const team1 = "/HomePagePictures/team_1.webp";
const team2 = "/HomePagePictures/team_2.webp";
const team3 = "/HomePagePictures/team_3.webp";
const team4 = "/HomePagePictures/team_4.webp";
const team5 = "/HomePagePictures/team_5.webp";
const team6 = "/HomePagePictures/team_6.webp";
const team7 = "/HomePagePictures/team_7.webp";
const team8 = "/HomePagePictures/team_8.webp";
const team9 = "/HomePagePictures/team_9.webp";
const team10 = "/HomePagePictures/team_10.JPG";
const team11 = "/HomePagePictures/team_11.JPG";
const team12 = "/HomePagePictures/team_12.JPG";
const team13 = "/HomePagePictures/team_13.JPG"; 
const team14 = "/HomePagePictures/team_14.JPG";
const team15 = "/HomePagePictures/team_15.JPG";



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

const teamImages = [team1, team2, team3, team4, team5,team6,team7,team8,team9,team10,team11,team12,team13,team14,team15];

const features = [
  {
    icon: Handshake,
    title: "Family Spirit",
    description:
      "As a team, we are guided by a set of core values that shape our actions—within the team, in collaboration with others, and in our community. One of the most important values for us is being a family.'Primo-family' is more than a slogan to us - it’s a core value. This is reflected in our weekly gatherings, bonding activities, and overall group atmosphere. It’s about leading by example and building strong connections.",
  },
  {
    icon: Briefcase,
    title: "Professionalism",
    description:
      "Professionalism is a core value in Primo, guiding us to achieve the best results as a team. It’s reflected in the dedicated work ethic of all members, enhanced by mentors who share industry knowledge and senior members who pass on their expertise. This ensures high-quality learning, leading to better outcomes and greater independence",
  },
  {
    icon: HeartHandshake,
    title: "Gracious Professionalism",
    description:
      "Gracious Professionalism (GP) is a core value for us, emphasizing both external and internal kindness and respect. Externally, we build professional, supportive relationships with other teams and communities, both locally and beyond. Internally, we promote a culture of mutual respect, where all team members are valued equally, regardless of their role or experience",
  },
  {
    icon: Target,
    title: "Sense of Mission",
    description:
      "Team members act out of a sense of mission and a willingness to contribute as much as they can to the community - locally, nationally, and to FIRST. This is because they represent the values of STEAM and believe deeply in their work, methods, and the values it stands on",
  },
  {
    icon: Sparkles,
    title: "Initiative",
    description:
      "As a team, we empower members and provide a platform for developing ideas. This allows team members to realize their potential and lead their own projects. This path fosters and develops creativity among our team members, while also instilling responsibility. This initiative gives members the opportunity to make an impact, face a variety of challenges, and influence the growth of the team",
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
    <div className="w-full max-w-lg mx-auto relative overflow-hidden rounded-xl h-80 md:h-96 shadow-vivid-glow">
      {teamImages.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Team ${idx + 1}`}
          className={`w-full h-full object-cover rounded-xl absolute top-0 left-0 transition-opacity duration-500 shadow-vivid-glow ${
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={popupRef}
        className="bg-surface rounded-lg p-6 sm:p-8 max-w-xl w-full shadow-xl flex flex-col items-center text-center max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-primary p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-6 shadow-accent-glow">
          <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground mx-auto" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">{feature.title}</h3>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
};

/**
 * CoreValuesCarousel component
 * - Displays core values with auto-rotation every 15 seconds.
 * - Allows manual selection of a value which pauses auto-rotation and shows a popup.
 * - Supports touch/swipe gestures on mobile.
 * - Entire card area is clickable to open popup.
 * - Pagination dots switch value without opening popup.
 */
const CoreValuesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const intervalRef = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });

  // Sync embla with currentIndex
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Auto-rotation effect with 15 seconds interval
  useEffect(() => {
    if (!isPopupOpen && emblaApi) {
      intervalRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 15000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPopupOpen, emblaApi]);

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

  // Handle dot click to navigate
  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="max-w-6xl mx-auto relative px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <Card
                  className="p-6 sm:p-8 md:p-12 bg-gradient-surface border-border text-center min-h-[350px] sm:min-h-[400px] flex flex-col justify-center cursor-pointer select-none mx-2"
                  onClick={() => openPopup(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openPopup(index);
                  }}
                  aria-label={`Open details for ${feature.title}`}
                >
                  <div className="bg-gradient-primary p-3 sm:p-4 rounded-xl w-fit mx-auto mb-4 sm:mb-6 shadow-accent-glow transition-all duration-500">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed transition-all duration-500 px-2">
                    {feature.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
        {features.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              scrollTo(idx);
            }}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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

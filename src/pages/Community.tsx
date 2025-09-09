import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import UpcomingEvents from "@/components/UpcomingEvents";
import primoFly1 from "@/assets/community/primoFly/primoFly1.jpg";
import primoFly2 from "@/assets/community/primoFly/primoFly4.jpg";
import primoFly3 from "@/assets/community/primoFly/primoFly5.jpg";
import primoSenior1 from "@/assets/community/PrimoSenior/primoSenior_1.png";
import primoSenior2 from "@/assets/community/PrimoSenior/primoSenior_2.png";
import primoSenior3 from "@/assets/community/PrimoSenior/primoSenior_3.png";
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

const communityActivities = [
  {
    title: "Spark Day Festival",
    description:
      "A project in collaboration with Greenblitz #4590 and Excalibur #6738, attended by around 300+ people. The festival featured many LEGO and robotics stations, including robot driving.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "PRIMOLAB Experiment Booklet",
    description:
      "An experiment booklet we published during the war with Iran, shared with the entire FIRST community and as many other communities as possible.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Participation in the “Waves of Hope” project by Mariners #8223",
    description:
      "We gave two lectures on Scratch programming and space.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Primo Senior",
    description:
      "During COVID-19, the project moved online to help seniors use communication platforms (e.g., Zoom). Created tutorial videos on software such as Word, PowerPoint, and Gmail (hundreds of views). Presented the videos in the Modiin Senior Day Center and assisted seniors in person.",
    images: [primoSenior1, primoSenior2, primoSenior3],
  },
  {
    title: "Science With PrimoFly",
    description:
      "An engaging day of hands-on robotics learning for local high school students. Participants built simple robots and learned the basics of electronics and programming.",
    images: [primoFly1, primoFly2, primoFly3],
  },
  {
    title: "Summer Courses",
    description:
      "Since the establishment of the team, we have been organizing summer courses. In the courses, we teach and welcome the new team members.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Mentoring FLL Teams",
    description:
      " Over the years, we have mentored more than 8 FLL teams and 21 FLL Jr. teams. We also founded 4 FLL teams and 18 FLL Explore teams. Currently, we are mentoring 5 teams. In addition, we founded the Dorot FLL team.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Volunteering in FLL competitions",
    description:
      "Our team members volunteer at local, regional, and national FIRST events, helping with field setup, scorekeeping, refereeing, and team check-in. Volunteering gives students hands-on experience, leadership opportunities, and a chance to support the FIRST community while inspiring other teams.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Fundraising Campaign for “Ezer Modiin” Association",
    description:
      "Donated clothing, board games, books, and refurbished laptops.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Gvanim School",
    description:
      " During the War, while schools were closed, we conducted remote science experiments and interactive lessons in topics such as evolution, neuroscience, and mathematics in nature. 'I always watched videos of robots and cool things like that online. I always wanted to build a robot like that. Today, you made my dream come true.' – Anat, 8th grade, Gvanim School",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Volunteering with “Latet” Organization",
    description:
      "Food donation drives before holidays",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Mandala of the Heart",
    description:
      "Remote science activity held during COVID-19",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Shema Organization (education for children with hearing impairments)",
    description:
      "Longstanding partnership. Activities included science experiments and basic robot design workshops.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Bottle Collection (Ongoing)",
    description:
      "This year we collected 1,200 bottles. We earned from deposits (approx. 350–400 NIS) used to buy science-related games donated to “Gan HaHalomot” (a kindergarten for children recovering from cancer in Ramat Gan). In 2023–2024, collected about 3,300 bottles and purchased scientific board games for donation.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Activities for Evacuees",
    description:
      "In Maccabim, we conducted 7 activities with evacuees, including building simple NXT robots and teaching robotics. Later, we hosted a Day of Activities with all local FIRST teams, showcasing robots and conducting science experiments.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "CodeKids Project (with Team Elysium #1937)",
    description:
      "Teaching Scratch programming to 4th–8th grade students. We ran 3 successful cycles of the course. During the war, we conducted a remote Scratch programming course with about 50 students from diverse backgrounds (Jews and Arabs).",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Apartment for Adults on the Autism Spectrum",
    description:
      "Worked with residents (ages 20–30) on creative problem-solving and building NXT robots together.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Family Conference",
    description:
      "Annual community gathering with our school families.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Recruitment of Girls (Awareness Activity)",
    description:
      "We noticed a lack of girls in our summer recruitment, so we held additional sessions targeting girls. We introduced them to basic mechanics and electronics.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Lotem Kindergarten (and 1st Grade classes)",
    description:
      " Continued activity from previous year. In 2023: ran a “Day of Activities” at the kindergarten and another at our workshop (children toured, designed their own robots, and conducted experiments). In 2024: expanded to 1st grade classes, including science experiments and robotics activities.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "School Food Sales (Fundraising & Outreach)",
    description:
      "About once a month, we hold a sales booth at school. We display the robot and explain about the team to students and teachers.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Production of Parts for Other Teams",
    description:
      "Manufactured CNC parts for teams Elysium #1937 and Atlantis #2679 and more.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
  {
    title: "Hosting Italian Delegation",
    description:
      "Presented our team’s activities and FIRST program to visiting students from Italy.",
    images: ["/images/community/charity1.jpg", "/images/community/charity2.jpg"],
  },
];

const Community = () => {
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

      {/* Community Activities (wrapped in its own scrollable container) */}
      <div className="max-h-screen overflow-y-auto space-y-8">
        {communityActivities.map((activity, index) => (
          <Card
            key={index}
            className="grid grid-cols-2 gap-6 items-center p-6 relative overflow-hidden"
            style={{ height: 320 }}
          >
            <div className="flex flex-col justify-center h-full">
              <EditableText 
                contentKey={`community-activity-title-${index}`} 
                defaultContent={activity.title} 
                tag="h3" 
                className="text-3xl font-bold text-foreground mb-4"
              />
              <EditableText 
                contentKey={`community-activity-description-${index}`} 
                defaultContent={activity.description} 
                contentType="paragraph"
                tag="p" 
                className="text-muted-foreground text-lg leading-relaxed"
              />
            </div>
            <AutoCarousel images={activity.images} />
          </Card>
        ))}
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

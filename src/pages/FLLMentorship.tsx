import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Trophy, Award, Star, Users, Target, Lightbulb } from "lucide-react";

//group picturs
const boeing = "/FLL/Boeing.jpeg"
const toxicPandas = "/FLL/ToxicPandas.jpeg"
const comingSoon = "/FLL/comingSoon.png"

//GalleryPhotos
const fllGallery1 = "/FLL/fllGallery_1.JPG"
const fllGallery2 = "/FLL/fllGallery_2.JPG"
const fllGallery3 = "/FLL/fllGallery_3.JPG"
const fllGallery4 = "/FLL/fllGallery_4.JPG"
const fllGallery5 = "/FLL/fllGallery_5.JPG"
const fllGallery6 = "/FLL/fllGallery_6.JPG"

//Mentors Pictures
const ShayKalisher = "/TeamProfiles/ShayKalisher.jpg"
const arielIvri = "/TeamProfiles/ArielIvri.JPG"
const drorMargalit = "/TeamProfiles/DrorMargalit.png"
const ofirShafran = "/TeamProfiles/OfirShafran.JPG"
const arielMevorahLevi = "/TeamProfiles/ArielMevorachLevy.JPG"
const itamarIvri = "/TeamProfiles/ItamarIvri.JPG"
const danielLevi = "/TeamProfiles/DanielLevi.JPG"
const adamDeshevsky = "/TeamProfiles/AdamDashevsky.JPG"



const FLLMentorship = () => {
  const fllTeams = [
    {
      name: "Boeing 727",
      description: "A highly creative and innovative team, known for pushing boundaries and excelling in programming and professional-quality building.",
      achievements: [
        { icon: Trophy, text: "Qualified For Nation Competition", type: "gold" },
        { icon: Award, text: "First Place Robot Design", type: "blue" },
      ],
      image: boeing
    },
    {
      name: "Toxic Pandas 506", 
      description: "A values-driven team from Dorot School (Modi’in), emphasizing enjoyment in their work, collaboration, and strong teamwork.",
      achievements: [
        { icon: Lightbulb, text: "Qualified For Nation Competition", type: "gold" },
        { icon: Users, text: "Core Values First Place", type: "green" },
      ],
      image: toxicPandas
    },
    {
      name: "Hatulego", 
      description: "A team that participated in the last off-season FLL in Modi’in, from Alonim School, Modi’in. They will return this year as a competitive team.",
      achievements: [
        //{ icon: Lightbulb, text: "Qualified For Nation Competition", type: "gold" },
        //{ icon: Users, text: "Core Values First Place", type: "green" },
      ],
      image: comingSoon
    },
    {
      name: "Ironi G", 
      description: "A team from a middle school in Modi’in. This is a new team.",
      achievements: [
        //{ icon: Lightbulb, text: "Qualified For Nation Competition", type: "gold" },
        //{ icon: Users, text: "Core Values First Place", type: "green" },
      ],
      image: comingSoon
    },
    {
      name: "Shivtei Israel", 
      description: "A team from Shivtei Israel School, Modi’in.",
      achievements: [
        //{ icon: Lightbulb, text: "Qualified For Nation Competition", type: "gold" },
        //{ icon: Users, text: "Core Values First Place", type: "green" },
      ],
      image: comingSoon
    }
  ];

  const fllMentors = [
    {
      name: "Shay Kalisher",
      role: "Boeing's Mentor",
      image: ShayKalisher,
      since: "2023"
    },
    {
      name: "Ariel Ivri",
      role: "Boeing's Mentor",
      image: arielIvri,
      since: "2023"
    },
    {
      name: "Dror Margalit",
      role: "Toxic Pandas's Mentor",
      image: drorMargalit,
      since: "2024"
    },
    {
      name: "Ofir Shafran",
      role: "Toxic Pandas's Mentor",
      image: ofirShafran,
      since: "2024"
    },
    {
      name: "Ariel Mevorach",
      role: "Hatulego's Mentor",
      image: arielMevorahLevi,
      since: "2025"
    },
    {
      name: "Itamar Ivri",
      role: "Hatulego's Mentor",
      image: itamarIvri,
      since: "2025"
    },
    {
      name: "Daniel Levi",
      role: "Ironi G's Mentor",
      image: danielLevi,
      since: "2025"
    },
    {
      name: "Sapir Rosner",
      role: "Ironi G's Mentor",
      image: comingSoon,
      since: "2025"
    },
    {
      name: "Adam Dashevsky",
      role: "Shivtei Israel's Mentor",
      image: adamDeshevsky,
      since: "2025"
    }
  ];

  const galleryItems = [fllGallery1, fllGallery2, fllGallery3, fllGallery4, fllGallery5, fllGallery6];

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'gold': return 'bg-yellow-500 text-white';
      case 'blue': return 'bg-blue-500 text-white';
      case 'purple': return 'bg-purple-500 text-white';
      case 'yellow': return 'bg-yellow-600 text-white';
      case 'green': return 'bg-green-500 text-white';
      case 'red': return 'bg-red-500 text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            FLL <span className="bg-gradient-primary bg-clip-text text-transparent">Mentorship</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In FLL, teams focus on research, building, and programming to solve challenges and complete robot missions. 
            They also learn core values like teamwork, Gracious Professionalism, and respect for others. Together, 
            these elements teach students problem-solving, creativity, and collaboration.
          </p>
        </div>
      </section>

      {/* FLL Teams Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our FLL Teams
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dynamic teams competing in FIRST LEGO League, each bringing 
            unique strengths and perspectives to robotics challenges.
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-8
          ${fllTeams.length === 1 ? 'sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1' : ''}
          ${fllTeams.length === 2 ? 'sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2' : ''}
          ${fllTeams.length > 2 ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3' : ''}
        `}>
          {fllTeams.map((team, index) => (
            <Card key={index} className="overflow-hidden bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
              <div className="relative">
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 shadow-vivid-glow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {team.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {team.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Achievements:</h4>
                  {team.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center space-x-2">
                      <achievement.icon className="h-4 w-4 text-primary" />
                      <Badge className={`text-xs ${getBadgeColor(achievement.type)}`}>
                        {achievement.text}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            FLL Gallery
          </h2>
          <p className="text-xl text-muted-foreground">
            Capturing moments from competitions, practice sessions, and team building activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <img
                src={image}
                alt={`FLL Gallery image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 shadow-vivid-glow"
              />
            </Card>
          ))}
        </div>
      </section>

      {/* FLL Mentors Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            FLL Mentors
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experienced mentors who guide our FLL teams with expertise in robotics, 
            project development, and FIRST core values.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fllMentors.map((mentor, index) => (
            <Card
              key={index}
              className="relative p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-vivid-glow"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {mentor.name}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {mentor.role}
                </p>
              </div>
              
              {/* Since label in bottom-left */}
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  since {mentor.since}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Learn to Become a Mentor
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Interested in guiding and inspiring younger students? Join us to develop your mentorship skills and make a difference!
          </p>
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

export default FLLMentorship;

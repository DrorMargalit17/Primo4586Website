import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditableText } from "@/components/editor/EditableText";

// Placeholder images - will be replaced with actual 2026 content
const robotImage = "/FLL/comingSoon.webp";
const seasonLogo = "/FLL/comingSoon.webp";
const teamPhoto = "/FLL/comingSoon.webp";

// Placeholder gallery images
const robotGallery1 = "/FLL/comingSoon.webp";
const robotGallery2 = "/FLL/comingSoon.webp";
const robotGallery3 = "/FLL/comingSoon.webp";
const robotGallery4 = "/FLL/comingSoon.webp";
const robotGallery5 = "/FLL/comingSoon.webp";
const robotGallery6 = "/FLL/comingSoon.webp";

const Robot2026 = () => {
  const systems = [
    { label: "Drive System", value: "Coming Soon" },
    { label: "Manipulator", value: "Coming Soon" },
    { label: "Scoring Mechanism", value: "Coming Soon" },
    { label: "Climb System", value: "Coming Soon" },
  ];
  
  const achievements = [
    "Season in progress...",
    "Achievements will be updated",
    "Stay tuned for updates!",
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <img
                  src={seasonLogo}
                  alt="2026 Season Logo"
                  className="h-20 w-auto opacity-50"
                />
              </div>
              <EditableText 
                contentKey="robot2026-hero-title" 
                defaultContent="Coming Soon" 
                tag="h1" 
                className="text-5xl md:text-6xl font-bold mb-6 text-foreground"
              >
                <span className="bg-gradient-primary bg-clip-text text-transparent">2026 Robot</span>
              </EditableText>
              <EditableText 
                contentKey="robot2026-hero-description" 
                defaultContent="Our 2026 robot is currently in development. Stay tuned for updates as we prepare for the upcoming season!" 
                contentType="paragraph"
                tag="p" 
                className="text-xl text-muted-foreground mb-8"
              />
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge className="bg-muted text-muted-foreground">Coming Soon</Badge>
                <Badge className="bg-muted text-muted-foreground">In Development</Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src={robotImage}
                alt="2026 Robot - Coming Soon"
                className="w-full h-auto rounded-lg shadow-vivid-glow opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground bg-background/80 px-6 py-3 rounded-lg">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Info Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Season Mission */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Season Mission</h2>
            <p className="text-xl text-muted-foreground">
              The 2026 season game will be announced soon. Our team is preparing for the new challenge and working on innovative solutions. Stay tuned for details about this year's competition!
            </p>
          </div>

          {/* About Our Robot */}
          <div>
            <EditableText 
              contentKey="robot2026-about-title" 
              defaultContent="About Our Robot" 
              tag="h2" 
              className="text-4xl font-bold text-foreground mb-4"
            />
            <EditableText 
              contentKey="robot2026-about-description" 
              defaultContent="Our 2026 robot is currently in the design and development phase. We're applying lessons learned from previous seasons to create our most capable robot yet. Technical specifications and features will be revealed as we progress through the build season." 
              contentType="paragraph"
              tag="p" 
              className="text-xl text-muted-foreground"
            />
          </div>
        </div>

        {/* Achievements + Group Photo */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Season Achievements</h2>
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="p-4 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300"
                >
                  <p className="font-medium text-muted-foreground">{achievement}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Group Photo */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Team Photo</h2>
            <Card className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 shadow-lg relative">
              <img
                src={teamPhoto}
                alt="Team group photo - Coming Soon"
                className="w-full h-80 object-cover shadow-vivid-glow opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground bg-background/80 px-4 py-2 rounded-lg">
                  Coming Soon
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Robot Systems Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Robot Systems
          </h2>
          <p className="text-xl text-muted-foreground">
            Technical specifications will be revealed during the season
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 text-center"
            >
              <h3 className="text-md text-muted-foreground mb-2">{system.label}</h3>
              <p className="text-base font-medium text-muted-foreground">{system.value}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-4">Season Challenge</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              <span className="text-muted-foreground text-lg">Video Coming Soon</span>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-4">Robot Reveal</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              <span className="text-muted-foreground text-lg">Video Coming Soon</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6 pb-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Robot Gallery
          </h2>
          <p className="text-xl text-muted-foreground">
            Gallery images will be added during the season
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[robotGallery1, robotGallery2, robotGallery3, robotGallery4, robotGallery5, robotGallery6].map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group relative"
            >
              <img
                src={image}
                alt={`Robot gallery image ${index + 1} - Coming Soon`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 shadow-vivid-glow opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium text-foreground bg-background/80 px-3 py-1 rounded">
                  Coming Soon
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Robot2026;
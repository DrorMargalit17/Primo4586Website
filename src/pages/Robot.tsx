import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditableText } from "@/components/editor/EditableText";

//Pictures
const sparrow = "/Robot_2025/2025Robot.jpg";
const SeasonLogo = "/Robot_2025/Reefscape_FRC_Logo.png"
const teamPhoto = "/Robot_2025/teamPhoto.JPG"

//Gallery Pictures
const robotGallery1 = "/Robot_2025/RobotGallery_1.JPG";
const robotGallery2 = "/Robot_2025/RobotGallery_2.JPG";
const robotGallery3 = "/Robot_2025/RobotGallery_3.JPG";
const robotGallery4 = "/Robot_2025/RobotGallery_4.JPG";
const robotGallery5 = "/Robot_2025/RobotGallery_5.JPG";
const robotGallery6 = "/Robot_2025/RobotGallery_6.JPG";


const Robot = () => {
  const systems = [
    { label: "Swerve", value: "Swerve MK4N traffic vehicle" },
    { label: "Elevator", value: "Consists of 3 floors & built of aluminum" },
    { label: "Feeder and outtake", value: "Made of polycabronte, two axles & compliant wheels" },
    { label: "Algae Gripper", value: "TMade of polycarbonate & compliant wheels" },
  ];

  const achievements = [
    "District #2 Winners",
    "Gracious Professionalism Award",
    "District #2 - 2nd Pick of Alliance 1",
    "District #4 - 2nd Pick of Alliance 4"
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
                  src={SeasonLogo}
                  alt="2025 Season Logo"
                  className="h-20 w-auto"
                />
              </div>
              <EditableText 
                contentKey="robot-hero-title" 
                defaultContent="Meet SPARROW" 
                tag="h1" 
                className="text-5xl md:text-6xl font-bold mb-6 text-foreground"
              >
                Meet <span className="bg-gradient-primary bg-clip-text text-transparent">SPARROW</span>
              </EditableText>
              <EditableText 
                contentKey="robot-hero-description" 
                defaultContent="Sparrow is our latest robot, engineered for precision, efficiency, and adaptability. It represents the result of years of innovation and hard work." 
                contentType="paragraph"
                tag="p" 
                className="text-xl text-muted-foreground mb-8"
              />
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge className="bg-primary text-primary-foreground">Autonomous</Badge>
                <Badge className="bg-accent text-accent-foreground">Competition Ready</Badge>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-surface rounded-2xl p-8 border border-border">
                <img
                  src={sparrow}
                  alt="Sparrow Robot"
                  className="w-full h-auto rounded-lg shadow-elevated"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
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
              Each match has two alliances of three robots competing to score points.
              In the first 15 seconds (autonomous), robots act on their own: moving, placing coral on the reef, or shifting algae.
              During teleop, drivers take control: collecting coral from stations, placing it on the reef, and clearing algae. Algae can be scored in the processor or returned to the field.
              In the final 30 seconds (endgame), robots climb onto barge cages near the reef, with climb points often deciding the match outcome.
            </p>
          </div>

          {/* About Our Robot */}
          <div>
            <EditableText 
              contentKey="robot-about-title" 
              defaultContent="About Our Robot" 
              tag="h2" 
              className="text-4xl font-bold text-foreground mb-4"
            />
            <EditableText 
              contentKey="robot-about-description" 
              defaultContent="Our robot features the MK4N swerve drivetrain, offering a low profile for easier attachment of additional mechanisms while remaining fast, precise, and reliable. The three-stage aluminum elevator, fully designed and built in-house, uses a belt system with custom plastic bearings for smooth, fast, and accurate operation, with all stages rising together to simplify control. The coral feeder and outtake (“shooter”) are primarily made of polycarbonate for durability, lightweight construction, and easy machining; the feeder collects coral from the loading station and transfers it to the outtake, which uses two shafts and compliant wheels, guided by an optical sensor to hold the coral securely, and is mounted on the elevator to reach all reef levels. The algae gripper, also polycarbonate with compliant wheels, was positioned next to the coral outtake after testing showed this improved cycle speed and allowed future expansions; it rotates on a custom CNC-machined timing wheel and bearing assembly, enabling it to both collect algae directly from the reef and score it into the processor." 
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
                  <p className="font-medium text-foreground">{achievement}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Group Photo */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Team Photo</h2>
            <Card className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 shadow-lg">
              <img
                src={teamPhoto}
                alt="Team group photo"
                className="w-full h-80 object-cover"
              />
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
            Explore the integrated subsystems powering SPARROW
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 text-center"
            >
              <h3 className="text-md text-muted-foreground mb-2">{system.label}</h3>
              <p className="text-base font-medium text-foreground">{system.value}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-4">Season Challenge</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/YWbxcjlY9JY"
                title="2025 Season Challenge"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-4">Robot Reveal</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/7z1XOWeTpB4"
                title="Robot Reveal"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
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
            See Sparrow in action and development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[robotGallery1, robotGallery2, robotGallery3, robotGallery4, robotGallery5, robotGallery6].map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <img
                src={image}
                alt={`Robot gallery image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Robot;

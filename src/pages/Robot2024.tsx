import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

//Pictures
const Punk = "/Robot_2024/2024Robot.jpeg";
const SeasonLogo = "/Robot_2024/Crescendo_FRC_Logo.png";
const teamPhoto = "/Robot_2024/TeamPhoto.jpg"

//Robot Gallery
const robotGallery1 = "/Robot_2024/RobotGallery_1.jpg";
const robotGallery2 = "/Robot_2024/RobotGallery_2.jpg";
const robotGallery3 = "/Robot_2024/RobotGallery_3.jpg";
const robotGallery4 = "/Robot_2024/RobotGallery_4.jpg";
const robotGallery5 = "/Robot_2024/RobotGallery_5.jpg";
const robotGallery6 = "/Robot_2024/RobotGallery_6.jpg";


const Robot2024 = () => {
  const systems = [
    { label: "Swerve", value: "Swerve MK4I traffic vehicle" },
    { label: "Intake", value: "Consists of 4 axles & timing belts" },
    { label: "Shooter", value: "Consists of 2 axles & 8 timing wheels" },
    { label: "Climb", value: "Consists of 2 aluminum hooks" },
  ];

  const achievements = [
    "District #2 - Captain of Alliance 4",
    "Off Season - 2nd Pick of Alliance 3",
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
                  alt="2024 Season Logo"
                  className="h-16 w-auto"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Meet{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Punk
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Our 2024 competition robot designed for strategic gameplay and
                reliable performance. Punk showcased our team's growth in
                engineering and competitive strategy.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge className="bg-primary text-primary-foreground">
                  2024 Season
                </Badge>
                <Badge className="bg-accent text-accent-foreground">
                  Autonomus
                </Badge>
                <Badge className="bg-success text-white">Disassembled</Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src={Punk}
                alt="Punk Robot 2024"
                className="w-full h-auto rounded-lg shadow-vivid-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Info & Achievements Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Season Mission */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Season Mission
            </h2>
            <p className="text-xl text-muted-foreground">
              The 2024 FRC season, Crescendo, was themed around
              music and live performances. Teams built robots to
              handle orange foam rings called Notes, which had
              to be scored into targets called Speakers and Amps,
              representing audio equipment. In the final stage of
              each match, robots climbed onto the Stage structure.
            </p>
          </div>

          {/* About Our Robot */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              About Our Robot
            </h2>
            <p className="text-xl text-muted-foreground">
              Our 2024 robot, Punk, is designed to perform the main scoring
              tasks of the Crescendo game. It uses a swerve MK4I drivetrain for
              smooth and agile movement, an intake system to collect Notes from
              the floor, and a feeder that transfers them efficiently to the
              shooter. The shooter can accurately score Notes into the Speaker
              from different positions on the field, and Punk can also place
              Notes into the Amp for extra points.
            </p>
          </div>
        </div>

        {/* Achievements + Group Photo */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Season Achievements
            </h2>
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
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Team Photo
            </h2>
            <Card className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 shadow-lg">
              <img
                src={teamPhoto}
                alt="Team group photo"
                className="w-full h-80 object-cover shadow-vivid-glow"
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
            Explore the integrated subsystems powering PUNK
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 text-center"
            >
              <h3 className="text-md text-muted-foreground mb-2">
                {system.label}
              </h3>
              <p className="text-base font-medium text-foreground">
                {system.value}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Season Challenge
            </h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/9keeDyFxzY4?t=1"
                title="2024 Season Challenge"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Robot Reveal
            </h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/JaSdbmQUUUQ"
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
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Robot Gallery
          </h2>
          <p className="text-xl text-muted-foreground">
            Punk in action during the 2024 season
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
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 shadow-vivid-glow"
              />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Robot2024;

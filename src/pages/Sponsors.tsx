import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import logoCodeValue from "@/assets/sponsors/codeValue.png";
import logoChemograf from "@/assets/sponsors/Chemograf.png";
import logoPlaskolite from "@/assets/sponsors/plaskolite.png";
import logoWeissGroup from "@/assets/sponsors/Weiss_Group.png";
import logoArgentools from "@/assets/sponsors/Argentols.png";
import logoKursia from "@/assets/sponsors/Kursia.png";
import logoIroniB from "@/assets/sponsors/ironiB.png";
import logoModiin from "@/assets/sponsors/modiin.png";



const Sponsors = () => {
  const sponsors = [
    {
      id: 1,
      name: "CodeValue",
      logo: logoCodeValue,
      website: "https://www.codevalue.com/",
      description: "CodeValue is a leading software development company, specializing in advanced technological solutions and driving innovation across organizations. Since 2025, they have been one of our main sponsors, providing essential financial support as well as top-tier professional and technological guidance.",
      
      since: "2025",
    },
    {
      id: 2,
      name: "CHEMOGRAF",
      logo: logoChemograf,
      website: "https://chemograf.com/?lang=he",
      description: "Chemograf is a pioneering company in the field of chemical technologies and advanced materials. Since 2024, they have been a key sponsor of ours, offering vital funding and expert knowledge to support our initiatives and growth.",
      
      since: "2024",
    },
    {
      id: 3,
      name: "PLASKOLITE",
      logo: logoPlaskolite,
      website: "https://plaskolite.com/",
      description: "Plaskolite is a leading manufacturer specializing in innovative plastic solutions and engineered acrylic products. Since 2025, they have been a valued sponsor of ours, providing crucial financial support and technical expertise to help advance our projects.",
      
      since: "2022",
    },
    {
      id: 4,
      name: "WEISS GROUP",
      logo: logoWeissGroup,
      website: "https://weissgroup.co.il/en/",
      description: "Weiss Group is a distinguished company specializing in high-precision industrial equipment and automation solutions. Since 2025, they have been a proud sponsor of ours, contributing essential funding and expert technical support to drive our success.",
      
      since: "2025",
    },
    {
      id: 5,
      name: "Argentools",
      logo: logoArgentools,
      website: "https://www.argentools.co.il/",
      description: "Argentools is a dynamic company specializing in advanced tooling solutions and precision engineering services. Since 2025, they have been a key sponsor of ours, offering vital financial backing and expert industry knowledge to support our development.",
      
      since: "2019",
    },
    {
      id: 6,
      name: "Kursia",
      logo: logoKursia,
      website: "https://modiinapp.com/he/page/7500/%D7%A7%D7%95%D7%A8%D7%A1%D7%99%D7%94-%D7%91%D7%99%D7%AA-%D7%A9%D7%9C-%D7%98%D7%A2%D7%9E%D7%99%D7%9D",
      description: "Kursia is a renowned establishment in Modi’in, Israel, offering a diverse range of culinary experiences with a focus on high-quality, flavorful dishes. Since 2025, they have been a valued sponsor of ours, providing essential support and contributing to the success of our initiatives.",
      since: "2025",
    },
    {
      id: 7,
      name: "Ironi B",
      logo: logoIroniB,
      website: "https://ironibetrabin.mashov.info/",
      description: "Ironi B is our local high school, providing quality education and fostering growth in academics, arts, and community engagement. It plays a central role in shaping the future of its students and the wider community.",
      since: "2012",
    },
    {
      id: 8,
      name: "Modi'in City",
      logo: logoModiin,
      website: "https://www.modiin.muni.il/ModiinWebSite/MainPage.aspx",
      description: "Modi’in City is our vibrant hometown, known for its modern infrastructure, rich history, and dynamic community life. It serves as a center for culture, education, and innovation in the region, offering a high quality of life to its residents.",
      
      since: "2012",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Sponsors</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are grateful to our amazing sponsors who make our robotics journey
            possible. Their support enables us to innovate, compete, and inspire
            the next generation of engineers.
          </p>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="container mx-auto px-6">
        <div className="space-y-12">
          {sponsors.map((sponsor, index) => (
            <Card
              key={sponsor.id}
              className="bg-gradient-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Text Content */}
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                      Since {sponsor.since}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    {sponsor.name}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                    {sponsor.description}
                  </p>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-fit group"
                  >
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>

                {/* Logo/Image */}
                <div className={`relative group cursor-pointer ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="relative h-80 lg:h-full overflow-hidden bg-white flex items-center justify-center p-8">
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-gray-800 font-semibold text-lg">{sponsor.name}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Support Us Section */}
      <section className="bg-gradient-hero py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Partnership CTA */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Interested in Partnering with Us?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join our mission to inspire the next generation of engineers and
                innovators. Let's build the future together.
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="/contact">
                  Become a Sponsor
                </a>
              </Button>
            </div>

            {/* Donation Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Support Our Team
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Help us continue our robotics journey with a donation. Every
                contribution makes a difference in our pursuit of excellence.
              </p>
              <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a 
                  href="https://www.paypal.com/donate" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Donate via PayPal
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
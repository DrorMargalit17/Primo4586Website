import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Sponsors = () => {
  const sponsors = [
    {
      id: 1,
      name: "TechCorp Industries",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=150&fit=crop&crop=center",
      website: "https://techcorp.com",
      description: "TechCorp Industries is a leading technology company specializing in advanced manufacturing solutions and industrial automation. They have been our primary sponsor since 2020, providing essential funding and technical expertise.",
      partnership: "Primary Sponsor",
      since: "2020",
    },
    {
      id: 2,
      name: "Innovation Labs",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=150&fit=crop&crop=center",
      website: "https://innovationlabs.com",
      description: "Innovation Labs is a research and development company focused on emerging technologies. Their support has been instrumental in our advanced sensor integration and AI development projects.",
      partnership: "Technology Partner",
      since: "2021",
    },
    {
      id: 3,
      name: "Precision Engineering Co.",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=150&fit=crop&crop=center",
      website: "https://precisioneng.com",
      description: "Precision Engineering Co. provides high-quality machining and fabrication services. They manufacture critical components for our robot chassis and mechanical systems with exceptional precision.",
      partnership: "Manufacturing Partner",
      since: "2019",
    },
    {
      id: 4,
      name: "Future Electronics",
      logo: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=150&fit=crop&crop=center",
      website: "https://futureelectronics.com",
      description: "Future Electronics supplies cutting-edge electronic components and systems. Their contribution includes sensors, microcontrollers, and custom PCB designs that power our robot's intelligence.",
      partnership: "Component Supplier",
      since: "2022",
    },
    {
      id: 5,
      name: "Metro University",
      logo: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=300&h=150&fit=crop&crop=center",
      website: "https://metrouniversity.edu",
      description: "Metro University provides educational support, mentorship, and access to advanced laboratory facilities. Their engineering faculty actively mentors our team and provides valuable guidance.",
      partnership: "Educational Partner",
      since: "2018",
    },
    {
      id: 6,
      name: "Green Energy Solutions",
      logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=150&fit=crop&crop=center",
      website: "https://greenenergy.com",
      description: "Green Energy Solutions specializes in sustainable power systems. They have helped us develop energy-efficient power management systems and eco-friendly battery solutions for our robots.",
      partnership: "Sustainability Partner",
      since: "2023",
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
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {sponsor.partnership}
                    </span>
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
                    <div className="relative h-64 lg:h-full overflow-hidden">
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-gray-800 font-semibold text-lg">{sponsor.name}</p>
                          <p className="text-gray-600 text-sm">{sponsor.partnership}</p>
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

      {/* Partnership CTA */}
      <section className="bg-surface py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Interested in Partnering with Us?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our mission to inspire the next generation of engineers and
            innovators. Let's build the future together.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:partnerships@robotics.edu">
              Become a Sponsor
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
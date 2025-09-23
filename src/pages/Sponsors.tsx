import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  since: string;
  display_order: number;
}

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching sponsors:", error);
        return;
      }

      setSponsors(data || []);
    };

    fetchSponsors();

    // Set up real-time subscription for sponsors
    const subscription = supabase
      .channel('sponsors')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sponsors' }, () => {
        fetchSponsors();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
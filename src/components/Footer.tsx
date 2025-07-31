import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Github, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Facebook} from "lucide-react";
import logoPng from '@/assets/PrimaryLogo.png';


const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/people/Primo-4586/100064748286068/#", label: "FaceBook" },
    { icon: Instagram, href: "https://www.instagram.com/primo_4586/", label: "Instagram" },
    { icon: Twitter, href: "https://www.tiktok.com/@primo4586", label: "Twitter" },
    { icon: Youtube, href: "https://www.youtube.com/@Primo_4586", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/team" },
    { name: "Our Robot", path: "/robot" },
    { name: "Community", path: "/community" },
  ];

  const resourceLinks = [
    { name: "Resources", path: "/resources" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gradient-surface border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div>
              <img src={logoPng} alt="Primo4586 logo" className="h-14 w-21" />
            </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Primo4586</h3>
                <p className="text-sm text-muted-foreground">Innovation in Motion</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Building the future through robotics, one innovation at a time. Join our
              journey of technological excellence.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">team@robotics.edu</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Tech Avenue, Innovation City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Primo4586. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">
            Built with passion for robotics and innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
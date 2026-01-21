import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube} from "lucide-react";
import { TikTokIcon } from "@/components/ui/tiktok-icon";
import { FooterAuth } from "@/components/auth/FooterAuth";
import { AdminModeToggle } from "@/components/admin/AdminModeToggle";
import { EditableText } from "@/components/editor/EditableText";
import logoPng from '@/assets/PrimaryLogo.png';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/people/Primo-4586/100064748286068/#", label: "FaceBook" },
    { icon: Instagram, href: "https://www.instagram.com/primo_4586/", label: "Instagram" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@primo4586", label: "TikTok" },
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
                <img 
                  src={logoPng} 
                  alt="Primo4586 logo" 
                  width={88}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-auto" 
                />
              </div>
              <div>
                <EditableText
                  contentKey="footer-brand-title"
                  defaultContent="Primo4586"
                  contentType="heading"
                  tag="h3"
                  className="text-lg font-bold text-foreground"
                />
                <EditableText
                  contentKey="footer-brand-subtitle"
                  defaultContent="Giving A Chance, Making A Change"
                  contentType="text"
                  tag="p"
                  className="text-sm text-muted-foreground"
                />
              </div>
            </div>
            <EditableText
              contentKey="footer-brand-description"
              defaultContent="Building the future through robotics, one innovation at a time. Join our journey of technological excellence."
              contentType="paragraph"
              tag="p"
              className="text-muted-foreground text-sm"
            />
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
            <EditableText
              contentKey="footer-quicklinks-title"
              defaultContent="Quick Links"
              contentType="heading"
              tag="h4"
              className="text-foreground font-semibold mb-4"
            />
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
            <EditableText
              contentKey="footer-resources-title"
              defaultContent="Resources"
              contentType="heading"
              tag="h4"
              className="text-foreground font-semibold mb-4"
            />
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
            <EditableText
              contentKey="footer-contact-title"
              defaultContent="Get in Touch"
              contentType="heading"
              tag="h4"
              className="text-foreground font-semibold mb-4"
            />
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <EditableText
                  contentKey="footer-contact-email"
                  defaultContent="4586media@gmail.com"
                  contentType="text"
                  tag="span"
                  className="text-sm"
                />
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <EditableText
                  contentKey="footer-contact-phone"
                  defaultContent="+972-58-727-4170"
                  contentType="text"
                  tag="span"
                  className="text-sm"
                />
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <EditableText
                  contentKey="footer-contact-address"
                  defaultContent="Nahal Ayun 1, Modiin Maccabim Reut"
                  contentType="text"
                  tag="span"
                  className="text-sm"
                />
              </div>
            </div>

            {/* Admin Login Button under Get in Touch */}
            <div className="mt-6">
              <FooterAuth />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <EditableText
            contentKey="footer-copyright"
            defaultContent="© 2024 Primo4586. All rights reserved."
            contentType="text"
            tag="p"
            className="text-muted-foreground text-sm"
          />
          <EditableText
            contentKey="footer-tagline"
            defaultContent="Built with passion for robotics and innovation."
            contentType="text"
            tag="p"
            className="text-muted-foreground text-sm mt-2 md:mt-0"
          />
        </div>
        <AdminModeToggle />
      </div>
    </footer>
  );
};

export default Footer;
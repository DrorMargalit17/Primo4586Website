import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/ui/tiktok-icon";
import logoPng from '@/assets/PrimaryLogo.png';

const validUsers = [
  { username: "DrorM", password: "124890" },
  { username: "MayaG", password: "PrimoGoz" },
  { username: "ShayK", password: "PrimoShay" },
];

const Footer = () => {
  const navigate = useNavigate();

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

  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setUsername("");
    setPassword("");
    setError("");
    setShowPassword(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = validUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setShowLogin(false);
      setUsername("");
      setPassword("");
      setError("");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowLogin(false);
      setError("");
    }
  };

  return (
    <>
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
                  <span className="text-sm">4586media@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+972-58-727-4170</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Migdal Oz 24, Modiin Maccabim Reut</span>
                </div>
              </div>

              {/* Admin Login Button under Get in Touch */}
              <div className="mt-6">
                <Button onClick={handleLoginClick} variant="outline" size="sm" className="w-full">
                  Admin Login
                </Button>
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

      {/* Login Popup */}
      {showLogin && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <form
            onSubmit={handleLoginSubmit}
            className="bg-background p-8 rounded-xl shadow-xl max-w-md w-full text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-4 p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
              autoFocus
              required
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10 text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0112 20a10.94 10.94 0 01-5.94-2.06M1 1l22 22" />
                    <path d="M10.58 10.58a3 3 0 014.24 4.24" />
                    <path d="M14.12 14.12a3 3 0 01-4.24-4.24" />
                    <path d="M12 12a3 3 0 013 3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

            <div className="flex justify-between space-x-2">
              <Button type="submit" className="w-full text-white">
                Login
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowLogin(false);
                  setError("");
                }}
                className="w-full text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Footer;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import logoPng from '@/assets/PrimaryLogo.png';
import { AdminToggle } from '@/components/admin/AdminToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Team & Mentors", path: "/team" },
    { name: "Robot", isDropdown: true }, // placeholder for dropdown
    { name: "Community", isDropdown: true }, // placeholder for dropdown
    { name: "Resources", path: "/resources" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Contact", path: "/contact" },
  ];

  const robotYears = [
    { name: "2025 REEFSCAPE", path: "/robot" },
    { name: "2024 CRESCENDO", path: "/robot2024" },
  ];

  const communityItems = [
    { name: "Community Impact", path: "/community" },
    { name: "FLL Mentorship", path: "/fll-mentorship" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div>
              <img src={logoPng} alt="Primo4586 logo" className="h-20 w-15" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Primo4586</h1>
              <p className="text-xs text-muted-foreground">Innovation in Motion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => {
              if (item.isDropdown && item.name === "Robot") {
                return (
                  <DropdownMenu key="robot">
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          location.pathname.startsWith("/robot")
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                        }`}
                      >
                        Robot <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {robotYears.map((robot) => (
                        <DropdownMenuItem key={robot.path} asChild>
                          <Link to={robot.path}>{robot.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              if (item.isDropdown && item.name === "Community") {
                return (
                  <DropdownMenu key="community">
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          location.pathname.startsWith("/community") || location.pathname.startsWith("/fll-mentorship")
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                        }`}
                      >
                        Community <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {communityItems.map((communityItem) => (
                        <DropdownMenuItem key={communityItem.path} asChild>
                          <Link to={communityItem.path}>{communityItem.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  {item.name}
                </Link>
              );
              })}
            </nav>
            <AdminToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                if (item.isDropdown && item.name === "Robot") {
                  return (
                    <div key="robot-mobile" className="px-4">
                      <p className="text-muted-foreground mb-1">Robot</p>
                      <div className="pl-2 space-y-1">
                        {robotYears.map((robot) => (
                          <Link
                            key={robot.path}
                            to={robot.path}
                            className={`block px-3 py-2 rounded-md transition-all duration-300 ${
                              isActive(robot.path)
                                ? "bg-primary text-primary-foreground shadow-glow"
                                : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {robot.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.isDropdown && item.name === "Community") {
                  return (
                    <div key="community-mobile" className="px-4">
                      <p className="text-muted-foreground mb-1">Community</p>
                      <div className="pl-2 space-y-1">
                        {communityItems.map((communityItem) => (
                          <Link
                            key={communityItem.path}
                            to={communityItem.path}
                            className={`block px-3 py-2 rounded-md transition-all duration-300 ${
                              isActive(communityItem.path)
                                ? "bg-primary text-primary-foreground shadow-glow"
                                : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {communityItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

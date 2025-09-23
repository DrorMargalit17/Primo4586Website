import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SponsorsManager from "@/components/admin/SponsorsManager";
import UpcomingEventsManager from "@/components/admin/UpcomingEventsManager";
import CommunityActivitiesManager from "@/components/admin/CommunityActivitiesManager";
import UserManager from "@/components/admin/UserManager";
import ResourcesManager from "@/components/admin/ResourcesManager";
import TeamCardsManager from "@/components/admin/TeamCardsManager";

import { CalendarDays, Users, Hammer, Image, UserCog, FolderOpen } from "lucide-react";

type SectionKey = "upcoming" | "community" | "users" | "resources" | "team" | "sponsors" | null;

const sections = [
  { key: "upcoming", title: "Upcoming Events", icon: CalendarDays },
  { key: "community", title: "Community Activities", icon: Users },
  { key: "users", title: "Admin Management", icon: UserCog },
  { key: "resources", title: "Resources", icon: FolderOpen },
  { key: "team", title: "Team Cards", icon: Hammer },
  { key: "sponsors", title: "Sponsors", icon: Image },
] as const;

export default function AdminPanel() {
  const [openSection, setOpenSection] = useState<SectionKey>(null);

  const renderSectionContent = () => {
    switch (openSection) {
      case "upcoming":
        return <UpcomingEventsManager />;
      case "community":
        return <CommunityActivitiesManager />;
      case "users":
        return <UserManager />;
      case "resources":
        return <ResourcesManager />;
      case "team":
        return <TeamCardsManager />;
      case "sponsors":
        return <SponsorsManager />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen bg-background">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-foreground">
        Admin <span className="bg-gradient-primary bg-clip-text text-transparent">Panel</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {sections.map(({ key, title, icon: Icon }) => (
          <Card
            key={key}
            onClick={() => setOpenSection(key)}
            className="cursor-pointer p-6 bg-gradient-surface border-border hover:border-primary/50 hover:shadow-glow transform transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center"
          >
            <div className="bg-gradient-primary p-3 rounded-full mb-4 shadow-lg">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="font-bold text-xl text-foreground">{title}</h2>
          </Card>
        ))}
      </div>

      <Dialog open={openSection !== null} onOpenChange={() => setOpenSection(null)}>
        <DialogContent className="max-w-2xl w-full p-8 rounded-xl shadow-lg overflow-y-auto max-h-[80vh] bg-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground mb-6">
              {sections.find(s => s.key === openSection)?.title}
            </DialogTitle>
          </DialogHeader>
          {renderSectionContent()}
        </DialogContent>
      </Dialog>
    </div>
  );
}

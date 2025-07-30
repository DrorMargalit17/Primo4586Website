import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const FloatingContactButton = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        variant="floating"
        size="floating"
        asChild
        className="shadow-accent-glow"
      >
        <Link to="/contact" aria-label="Contact Us">
          <MessageCircle className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
};

export default FloatingContactButton;
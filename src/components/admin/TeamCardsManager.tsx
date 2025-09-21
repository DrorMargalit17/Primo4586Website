import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminMode } from "@/hooks/useAdminMode";

const TeamCardsManager = () => {
  const navigate = useNavigate();
  const { setAdminMode } = useAdminMode();

  useEffect(() => {
    // Set admin mode to edit when this component mounts
    setAdminMode('edit');
    
    // Navigate to the Team page
    navigate('/team');
  }, [navigate, setAdminMode]);

  // This component doesn't render anything as it redirects immediately
  return null;
};

export default TeamCardsManager;
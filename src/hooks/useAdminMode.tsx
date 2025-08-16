import { createContext, useContext, useState, ReactNode } from 'react';

type AdminMode = 'panel' | 'edit' | null;

interface AdminModeContextType {
  adminMode: AdminMode;
  setAdminMode: (mode: AdminMode) => void;
  isEditMode: boolean;
  isPanelMode: boolean;
}

const AdminModeContext = createContext<AdminModeContextType | undefined>(undefined);

export const useAdminMode = () => {
  const context = useContext(AdminModeContext);
  if (context === undefined) {
    throw new Error('useAdminMode must be used within an AdminModeProvider');
  }
  return context;
};

interface AdminModeProviderProps {
  children: ReactNode;
}

export const AdminModeProvider = ({ children }: AdminModeProviderProps) => {
  const [adminMode, setAdminMode] = useState<AdminMode>(null);

  const value = {
    adminMode,
    setAdminMode,
    isEditMode: adminMode === 'edit',
    isPanelMode: adminMode === 'panel',
  };

  return (
    <AdminModeContext.Provider value={value}>
      {children}
    </AdminModeContext.Provider>
  );
};
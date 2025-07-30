import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContactButton from "./FloatingContactButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Layout;
import { AppShell } from "@mantine/core";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Header />
      <AppShell.Main>{children}</AppShell.Main>
      <Footer />
    </AppShell>
  );
};

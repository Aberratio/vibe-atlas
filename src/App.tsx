import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { PlaylistSearchButton } from "./components/playlists/PlaylistSearchButton";
import { useEffect, useState } from "react";
import { Hero } from "./components/hero/Hero";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  return (
    <MantineProvider defaultColorScheme="light">
      <Layout>{isLoggedIn ? <PlaylistSearchButton /> : <Hero />}</Layout>
    </MantineProvider>
  );
}

export default App;

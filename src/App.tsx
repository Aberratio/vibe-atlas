import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { PlaylistSearchButton } from "./components/playlists/PlaylistSearchButton";
import { useEffect, useState } from "react";
import { Hero } from "./components/hero/Hero";
import { FeaturesCards } from "./components/features/FeaturesCards";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <MantineProvider defaultColorScheme="light">
      <Layout>
        {isLoggedIn ? (
          <PlaylistSearchButton />
        ) : (
          <>
            <Hero />
            <FeaturesCards />
          </>
        )}
      </Layout>
    </MantineProvider>
  );
}

export default App;

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { PlaylistSearchButton } from "./components/playlists/PlaylistSearchButton";
import { useEffect, useState } from "react";
import { Hero } from "./components/hero/Hero";
import { FeaturesCards } from "./components/features/FeaturesCards";
import { Favorites } from "./components/favorites/Favorites";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const url = window.location.href;
  const activeLink = url.split("/").pop();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <MantineProvider forceColorScheme="dark">
      <Layout>
        {isLoggedIn ? (
          activeLink === "playlists" ? (
            <PlaylistSearchButton />
          ) : (
            <Favorites />
          )
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

import { Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  SPOTIFY_AUTHORIZE_URL,
  CLIENT_ID,
  REDIRECT_URL_AFTER_LOGIN,
  SPOTIFY_TOKEN_URL,
} from "../../api/consts";
import { refreshAccessToken } from "../../api/refreshAccessToken";

export const SpotifyLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const SCOPES = [
    "user-read-private",
    "user-read-email",
    "user-read-recently-played",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ].join("%20");

  const AUTH_URL = `${SPOTIFY_AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES}&show_dialog=true`;

  const handleLogin = () => {
    window.location.href = AUTH_URL;
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URL_AFTER_LOGIN,
          client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("expiresIn", data.expires_in);
        localStorage.setItem(
          "expiresAt",
          (new Date().getTime() + data.expires_in * 1000).toString()
        );
        // window.history.replaceState({}, document.title, "/");
        setIsLoggedIn(true);
        window.location.href = "/";
      } else {
        console.error("Błąd wymiany kodu na token:", data);
      }
    } catch (error) {
      console.error("Błąd podczas wymiany kodu na token:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      exchangeCodeForToken(code);
    }

    const now = new Date().getTime();
    const expiresAt = localStorage.getItem("expiresAt");
    if (expiresAt && parseInt(expiresAt) < now) {
      refreshAccessToken();
    }

    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAt");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return isLoggedIn ? (
    <Button color="grape" variant="light" onClick={handleLogout}>
      Wyloguj się
    </Button>
  ) : (
    <Button color="grape" size="xl" variant="light" onClick={handleLogin}>
      <Text mr="xs">{`Zaloguj się przez `}</Text>
      <img src="/spotify.webp" alt="Spotify" width={100} />
    </Button>
  );
};

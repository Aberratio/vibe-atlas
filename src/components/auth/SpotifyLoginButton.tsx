import { Button, Text } from "@mantine/core";
import { useEffect } from "react";

export const SpotifyLoginButton = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

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
        window.history.replaceState({}, document.title, "/");
      } else {
        console.error("Błąd wymiany kodu na token:", data);
      }
    } catch (error) {
      console.error("Błąd podczas wymiany kodu na token:", error);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("Brak refreshToken w localStorage");
      return;
    }

    try {
      const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: "refresh_token",
          refresh_token: refreshToken!,
          client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("expiresIn", data.expires_in);
      } else {
        console.error("Błąd odświeżania tokena:", data);
      }
    } catch (error) {
      console.error("Błąd podczas odświeżania tokena:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log(code);

    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  useEffect(() => {
    const expiresIn = localStorage.getItem("expiresIn");
    if (expiresIn) {
      setTimeout(refreshAccessToken, parseInt(expiresIn) * 1000);
    }
  }, []);

  return (
    <Button color="grape" size="xl" variant="light" onClick={handleLogin}>
      <Text mr="xs">{`Zaloguj się przez `}</Text>
      <img src="/spotify.webp" alt="Spotify" width={100} />
    </Button>
  );
};

import { Button } from "@mantine/core";
import { useEffect } from "react";

export const SpotifyLoginButton = () => {
  const CLIENT_ID = "7e5f4d1d57d94bc7a259018542b80cac";
  const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/";

  const SCOPES = [
    "user-read-private",
    "user-read-email",
    "user-read-recently-played",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ];
  const SPACE_DELIMITER = "%20";

  const SCOPES_STRING = SCOPES.join(SPACE_DELIMITER);

  const AUTH_URL = `${SPOTIFY_AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_STRING}&show_dialog=true`;

  const handleLogin = () => {
    window.location.href = AUTH_URL;
  };

  const getAccessTokenFromUrlAndSetLocalStorage = (hash: string) => {
    const tokenMatch = hash.match(/access_token=([^&]+)/);
    const expiresInMatch = hash.match(/expires_in=([^&]+)/);

    if (tokenMatch && expiresInMatch) {
      const accessToken = tokenMatch[1];
      const expiresIn = parseInt(expiresInMatch[1], 10);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("expiresIn", expiresIn.toString());
    }
  };

  useEffect(() => {
    if (window.location.hash) {
      getAccessTokenFromUrlAndSetLocalStorage(window.location.hash);
    }
  }, []);

  return (
    <Button variant="light" onClick={handleLogin}>
      Zaloguj się przez Spotify
    </Button>
  );
};

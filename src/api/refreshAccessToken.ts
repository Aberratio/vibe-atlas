import { CLIENT_ID, CLIENT_SECRET } from "./consts";

import { SPOTIFY_TOKEN_URL } from "./consts";

export const refreshAccessToken = async () => {
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
        client_secret: CLIENT_SECRET,
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

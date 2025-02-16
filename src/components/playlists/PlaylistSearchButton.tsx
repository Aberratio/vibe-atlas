/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Loader, Title } from "@mantine/core";
import { useState } from "react";
import { PlaylistItem } from "../../types/PlaylistItem";
import { PlaylistCard } from "./playlist-card/PlaylistCard";
import { useDisclosure } from "@mantine/hooks";
import { PlaylistDetailsItem } from "../../types/PlaylistDetailsItem";
import { PlaylistDetailsDrawer } from "./PlaylistDetailsDrawer";
import { PlaylistSearchFilters } from "./PlaylistSearchFilters";
import { IconSearch } from "@tabler/icons-react";
import { refreshAccessToken } from "../../api/refreshAccessToken";

export const PlaylistSearchButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [genre, setGenre] = useState<{ localName: string; value: string }>({
    localName: "",
    value: "",
  });
  const [location, setLocation] = useState<string>("");
  const [playlistDetails, setPlaylistDetails] =
    useState<PlaylistDetailsItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPlaylistSearch = async () => {
    setPlaylists([]);
    setIsLoading(true);
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        `${genre.localName} ${location}`
      )}&${genre.localName}+${location}&type=playlist&genre=${
        genre.value
      }&location=${location}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    ).catch((error) => {
      console.error("Error fetching playlist details:", error);
    });

    if (!response?.ok) {
      refreshAccessToken();
      setTimeout(() => {
        fetchPlaylistSearch();
      }, 1000);
      return null;
    }

    if (response) {
      const data = await response.json();
      if (data?.playlists?.items) setPlaylists(data.playlists.items);
    }

    setIsLoading(false);
    return null;
  };

  const fetchPlaylistDetails = async (playlistId: string) => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    ).catch((error) => {
      console.error("Error fetching playlist details:", error);
    });

    if (!response?.ok) {
      refreshAccessToken();
      setTimeout(() => {
        fetchPlaylistDetails(playlistId);
      }, 1000);
      return null;
    }

    if (response) {
      const data = await response.json();
      return data;
    }
    return null;
  };

  const handlePlaylistClick = async (playlist: PlaylistItem) => {
    const details = await fetchPlaylistDetails(playlist.id);

    setPlaylistDetails({ ...playlist, ...details });

    open();
  };

  return (
    <Flex gap="md" direction="column">
      <PlaylistDetailsDrawer
        opened={opened}
        onClose={close}
        playlistDetails={playlistDetails}
      />
      <PlaylistSearchFilters
        genre={genre}
        location={location}
        setGenre={setGenre}
        setLocation={setLocation}
      />
      <Button
        leftSection={<IconSearch size={16} />}
        color="grape"
        variant="light"
        disabled={
          isLoading || (genre.localName.length === 0 && location.length === 0)
        }
        onClick={() => {
          fetchPlaylistSearch();
        }}
        w={300}
        mx="auto"
      >
        Wyszukaj playlisty
      </Button>
      <Flex direction="column" gap="md" maw={1200} mx="auto" justify="center">
        {isLoading && <Loader mx="auto" mt="md" />}
        {playlists.length > 0 && (
          <>
            <Title order={2} ta="center" my="md">
              Playlisty dla Ciebie
            </Title>
            <Flex gap="md" wrap="wrap" justify="center">
              {playlists?.map((playlist: PlaylistItem) => {
                if (!playlist || !playlist?.external_urls?.spotify) {
                  return null;
                }

                return (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onClick={() => {
                      handlePlaylistClick(playlist);
                    }}
                  />
                );
              })}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

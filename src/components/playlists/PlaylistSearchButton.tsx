/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Loader } from "@mantine/core";
import { useState } from "react";
import { PlaylistItem } from "../../types/PlaylistItem";
import { PlaylistCard } from "./playlist-card/PlaylistCard";
import { useDisclosure } from "@mantine/hooks";
import { PlaylistDetailsItem } from "../../types/PlaylistDetailsItem";
import { PlaylistDetailsDrawer } from "./PlaylistDetailsDrawer";
import { PlaylistSearchFilters } from "./PlaylistSearchFilters";
import { IconSearch } from "@tabler/icons-react";

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
      `https://api.spotify.com/v1/search?q=${genre.localName}+${location}&type=playlist&genre=${genre.value}&location=${location}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = await response.json();
    if (data?.playlists?.items) setPlaylists(data.playlists.items);
    setIsLoading(false);
  };

  const fetchPlaylistDetails = async (playlistId: string) => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = await response.json();
    return data;
  };

  const handlePlaylistClick = async (playlist: PlaylistItem) => {
    const details = await fetchPlaylistDetails(playlist.id);

    setPlaylistDetails({ ...playlist, ...details });

    open();
  };

  return (
    <>
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
      >
        Wyszukaj playlisty
      </Button>
      <div>
        {isLoading && <Loader />}
        {playlists.length > 0 && (
          <>
            <h2>Playlisty</h2>
            <Flex gap="md" wrap="wrap">
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
      </div>
    </>
  );
};

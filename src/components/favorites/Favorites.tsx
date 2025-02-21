import {
  Loader,
  Button,
  Flex,
  Group,
  Table,
  Image,
  Text,
  Badge,
  Anchor,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { atomWithStorage } from "jotai/utils";
import { useState } from "react";
import { useAtom } from "jotai";
import { refreshAccessToken } from "../../api/refreshAccessToken";
import { FavoriteItem } from "../../types/PlaylistDetailsItem";

const favoritesAtom = atomWithStorage<FavoriteItem[]>("favorites", []);

export const Favorites = () => {
  const [favorites, setFavorites] = useAtom<FavoriteItem[]>(favoritesAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFavoritesSearch = async () => {
    setFavorites([]);
    setIsLoading(true);
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50`,
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
        fetchFavoritesSearch();
      }, 1000);
      return null;
    }

    if (response) {
      const data = await response.json();
      if (data?.items) setFavorites(data.items);
    }

    setIsLoading(false);
    return null;
  };

  const rows = favorites?.map((item: FavoriteItem) => {
    if (!item) return null;

    return (
      <Table.Tr key={item.name}>
        <Table.Td>
          <Group
            gap="sm"
            onClick={() => {
              window.open(item.external_urls.spotify, "_blank");
            }}
            style={{ cursor: "pointer" }}
          >
            <Image src={item.album.images[0].url} alt={item.name} height={30} />
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>

        <Table.Td>
          <Badge
            color="grape"
            variant="light"
            onClick={() => {
              window.open(item.artists[0].external_urls?.spotify, "_blank");
            }}
            style={{ cursor: "pointer" }}
          >
            {item.artists[0].name}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Anchor
            component="button"
            size="sm"
            onClick={() => {
              window.open(item.album.external_urls.spotify, "_blank");
            }}
            style={{ cursor: "pointer" }}
          >
            {item.album.name}
          </Anchor>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Flex gap="md" direction="column">
      <Button
        leftSection={<IconSearch size={16} />}
        color="grape"
        variant="light"
        disabled={isLoading}
        onClick={() => {
          fetchFavoritesSearch();
        }}
        w={300}
        mx="auto"
      >
        Wyszukaj ulubione utwory
      </Button>
      <Flex maw={1200} mx="auto" mt="md">
        {isLoading && <Loader mx="auto" mt="md" />}
        {!isLoading && (
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Utwór</Table.Th>
                  <Table.Th>Wykonawca</Table.Th>
                  <Table.Th>Album</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Flex>
    </Flex>
  );
};

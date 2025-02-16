import {
  Box,
  Button,
  Collapse,
  Flex,
  Group,
  Highlight,
  Text,
} from "@mantine/core";
import { GenreFilter } from "./genre-filter/GenreFilter";
import { LocationFilter } from "./location-filter/LocationFilter";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";

interface PlaylistSearchFiltersProps {
  genre: { localName: string; value: string };
  location: string;
  setGenre: (genre: { localName: string; value: string }) => void;
  setLocation: (location: string) => void;
}

export const PlaylistSearchFilters = ({
  genre,
  location,
  setGenre,
  setLocation,
}: PlaylistSearchFiltersProps) => {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <Box w="100%" mx="auto" my="md">
      <Group justify="center" mb={5}>
        {!genre.localName && !location && (
          <Text>Nie wybrano żadnych filtrów</Text>
        )}
        {genre.localName.length > 0 && (
          <Text>
            <Highlight
              highlightStyles={{
                backgroundImage:
                  "linear-gradient(45deg, var(--mantine-color-cyan-5), var(--mantine-color-indigo-5))",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              highlight={genre.localName}
            >
              {`Wybrany gatunek: ${genre.localName}`}
            </Highlight>
          </Text>
        )}
        {location && (
          <Text>
            <Highlight
              highlightStyles={{
                backgroundImage:
                  "linear-gradient(45deg, var(--mantine-color-cyan-5), var(--mantine-color-indigo-5))",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              highlight={location}
            >
              {`Wybrana lokalizacja: ${location}`}
            </Highlight>
          </Text>
        )}
        <Button
          variant="light"
          onClick={toggle}
          leftSection={<IconFilter size={16} />}
        >
          {opened ? "Zwiń  filtry" : "Otwórz filtry"}
        </Button>
      </Group>
      <Collapse in={opened} p="md">
        <Flex gap="md" wrap="wrap" w="100%" maw={900} mx="auto">
          <GenreFilter setGenre={setGenre} />
          <LocationFilter setLocation={setLocation} />
        </Flex>
      </Collapse>
    </Box>
  );
};

import { IconMusic, IconUser } from "@tabler/icons-react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Text,
} from "@mantine/core";
import classes from "./PlaylistCard.module.css";
import { PlaylistItem } from "../../../types/PlaylistItem";

interface PlaylistCardProps {
  playlist: PlaylistItem;
  onClick: () => void;
}

export const PlaylistCard = ({ playlist, onClick }: PlaylistCardProps) => {
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src={playlist.images?.[0]?.url}
          alt={playlist.name}
          height={180}
          onClick={onClick}
          style={{ cursor: "pointer" }}
        />
        <Group justify="apart" p="md">
          <Text fz="lg" fw={500}>
            {playlist.name}
          </Text>
          <Flex gap="xs">
            <Badge
              size="md"
              variant="light"
              color="grape"
              leftSection={<IconUser size={14} />}
            >
              {playlist.owner.display_name}
            </Badge>
            <Badge
              size="md"
              variant="dark"
              leftSection={<IconMusic size={14} />}
            >
              {playlist.tracks.total} utworów
            </Badge>
          </Flex>
          <Text fz="sm" mt="xs">
            {playlist.description}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section} p="xs">
        <Divider color="gray" />
        <Group my="xs" w="100%">
          <Button
            color="grape"
            variant="light"
            radius="md"
            style={{ flex: 1 }}
            onClick={onClick}
          >
            Pokaż szczegóły
          </Button>
        </Group>
        <Button
          radius="md"
          size="lg"
          variant="light"
          onClick={() => {
            window.open(playlist.external_urls.spotify, "_blank");
          }}
          style={{ width: "100%" }}
        >
          <Text mr="xs">{`Otwórz w `}</Text>
          <img src="/spotify.webp" alt="Spotify" width={100} />
        </Button>
      </Card.Section>
    </Card>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Drawer,
  Text,
  Flex,
  Table,
  Anchor,
  Group,
  Badge,
  Image,
  Title,
  Divider,
} from "@mantine/core";
import { PlaylistDetailsItem } from "../../types/PlaylistDetailsItem";

interface PlaylistDetailsDrawerProps {
  opened: boolean;
  onClose: () => void;
  playlistDetails: PlaylistDetailsItem | null;
}

export const PlaylistDetailsDrawer = ({
  opened,
  onClose,
  playlistDetails,
}: PlaylistDetailsDrawerProps) => {
  if (!playlistDetails) {
    return null;
  }

  const rows = playlistDetails.items.map((item) => (
    <Table.Tr key={item.track.name}>
      <Table.Td>
        <Group
          gap="sm"
          onClick={() => {
            window.open(item.track.external_urls.spotify, "_blank");
          }}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={item.track.album.images[0].url}
            alt={item.track.name}
            height={30}
          />
          <Text fz="sm" fw={500}>
            {item.track.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge
          color="grape"
          variant="light"
          onClick={() => {
            window.open(item.track.artists[0].external_urls.spotify, "_blank");
          }}
          style={{ cursor: "pointer" }}
        >
          {item.track.artists[0].name}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor
          component="button"
          size="sm"
          onClick={() => {
            window.open(item.track.album.external_urls.spotify, "_blank");
          }}
          style={{ cursor: "pointer" }}
        >
          {item.track.album.name}
        </Anchor>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Szczegóły playlisty"
      size={"xl"}
    >
      <Image
        src={playlistDetails?.images?.[0]?.url}
        alt={playlistDetails?.name}
      />
      <Group justify="space-between" my="md">
        <Title order={2}>{playlistDetails?.name}</Title>
        <Text>{playlistDetails?.description}</Text>
      </Group>
      <Divider />
      <Flex>
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
      </Flex>
    </Drawer>
  );
};

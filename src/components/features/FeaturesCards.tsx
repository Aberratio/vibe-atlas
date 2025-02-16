import { IconCookie, IconGauge, IconUser } from "@tabler/icons-react";
import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import classes from "./FeaturesCards.module.css";

const mockdata = [
  {
    title: "Personalizowane playlisty",
    description:
      "Znajdź muzykę idealnie dopasowaną do Twojego gustu i lokalizacji – bez zbędnego szukania.",
    icon: IconGauge,
  },
  {
    title: "Słuchaj tam, gdzie chcesz",
    description:
      "Połącz się z aplikacją Spotify i odtwarzaj ulubione listy jednym kliknięciem.",
    icon: IconUser,
  },
  {
    title: "Odkrywaj nowe brzmienia",
    description:
      "Poznaj lokalne hity i globalne trendy – idealne do każdej sytuacji.",
    icon: IconCookie,
  },
];

export const FeaturesCards = () => {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={50} stroke={1} color={theme.colors.grape[7]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge
          variant="gradient"
          gradient={{ from: "grape", to: "blue" }}
          size="lg"
        >
          Twój osobisty atlas muzyczny
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Dźwięki, które podróżują razem z Tobą
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Nasza aplikacja łączy muzykę i podróże, dostarczając idealnie dopasowane
        playlisty na każdą okazję.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

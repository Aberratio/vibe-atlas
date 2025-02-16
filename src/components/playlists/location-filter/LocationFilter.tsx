import {
  Text,
  Button,
  TextInput,
  Box,
  Title,
  Flex,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface LocationFilterProps {
  setLocation: (localName: string) => void;
}

export const LocationFilter = ({ setLocation }: LocationFilterProps) => {
  const [value, setValue] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<string>("");

  const translateText = async (text: string, targetLanguage: string) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${text}&langpair=pl|${targetLanguage}`
      );
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        const userLanguage = localStorage.getItem("USER_LANGUAGE") || "en";
        const locationName =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          "Nieznana lokalizacja";

        const countryName = data.address?.country || "Nieznane państwo";

        // Tłumaczenie nazwy lokalizacji
        const translatedLocation = await translateText(
          locationName,
          userLanguage
        );

        const translatedCountryName = await translateText(
          countryName,
          userLanguage
        );

        setCurrentLocation(`${translatedLocation}, ${translatedCountryName}`);
      });
    }
  }, []);

  return (
    <Box
      mx="auto"
      p="md"
      bd="1px solid #ccc"
      maw={400}
      w="100%"
      style={{ borderRadius: "10px" }}
    >
      <Title order={3}>Lokalizacja</Title>
      <Flex direction="column" gap="md" w="100%" mt="md" p="md">
        {currentLocation && (
          <>
            <Button
              onClick={() => {
                setValue(currentLocation);
                setLocation(currentLocation);
              }}
              variant="light"
            >
              Użyj mojej lokalizacji: {currentLocation}
            </Button>
            <Text>LUB</Text>
          </>
        )}
        <Text>
          Wpisz lokalizację ręcznie
          <Tooltip label="Wpisz miasto i kraj, najlepiej w lokalnym języku">
            <ActionIcon size="sm" variant="transparent" aria-label="Info">
              <IconInfoCircle
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        </Text>
        <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          disabled={value.length < 2}
          size="sm"
          variant="outline"
          onClick={() => setLocation(value)}
        >
          Wybierz
        </Button>
        <Button
          color="red"
          variant="light"
          leftSection={<IconTrash size={16} />}
          onClick={() => {
            setLocation("");
            setValue("");
          }}
        >
          Resetuj
        </Button>
      </Flex>
    </Box>
  );
};

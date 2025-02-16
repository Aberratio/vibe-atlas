import {
  Autocomplete,
  AutocompleteProps,
  Box,
  Button,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { genresData } from "./genresData";

interface GenreFilterProps {
  setGenre: (genre: { localName: string; value: string }) => void;
}

export const GenreFilter = ({ setGenre }: GenreFilterProps) => {
  const [value, setValue] = useState<string>("");

  const genres = Object.keys(genresData);

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => {
    if (!option || !genresData[option.value]) {
      return null;
    }
    const genre = genresData[option.value];
    return <Text size="sm">{genre.pl}</Text>;
  };

  return (
    <Flex
      direction="column"
      mx="auto"
      p="md"
      bd="1px solid #ccc"
      maw={400}
      w="100%"
      style={{ borderRadius: "10px" }}
    >
      <Title order={3} ta="center">
        Gatunek
      </Title>
      <Flex direction="column" gap="md" w="100%" mt="md" p="md">
        <Text>Wybierz gatunek</Text>
        <Autocomplete
          data={genres}
          renderOption={renderAutocompleteOption}
          value={value}
          onChange={(value) => {
            if (genresData[value]?.pl) {
              setValue(genresData[value].pl);
            } else {
              setValue(value);
            }
          }}
        />
        <Button
          disabled={value.length < 2}
          size="sm"
          variant="outline"
          onClick={() => {
            if (genresData[value]?.pl) {
              setGenre({ localName: genresData[value].pl, value });
            } else {
              setGenre({ localName: value, value });
            }
          }}
        >
          Wybierz
        </Button>
        <Button
          color="red"
          variant="light"
          leftSection={<IconTrash size={16} />}
          onClick={() => {
            setGenre({ localName: "", value: "" });
            setValue("");
          }}
        >
          Resetuj
        </Button>
      </Flex>
    </Flex>
  );
};

import { Container, Flex, Text } from "@mantine/core";
import classes from "./Hero.module.css";
import { SpotifyLoginButton } from "../auth/SpotifyLoginButton";

export const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Odkryj{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "grape" }}
            inherit
          >
            muzykę, którą kochasz
          </Text>{" "}
          w miejscu, które odwiedzasz!
        </h1>

        <Text className={classes.description} color="dimmed">
          Masz ochotę na playlistę dopasowaną do Twojego nastroju i lokalizacji?
          Nasza aplikacja to Twój osobisty przewodnik po świecie muzyki!
        </Text>

        <Flex className={classes.controls} justify="center">
          <SpotifyLoginButton />
        </Flex>
      </Container>
    </div>
  );
};

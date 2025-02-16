import {
  AppShell,
  Burger,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
// import { SpotifyLoginButton } from "../auth/SpotifyLoginButton";
import { LanguagePicker } from "../language-picker/LanguagePicker";
import { SpotifyLoginButton } from "../auth/SpotifyLoginButton";

export const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <AppShell.Header>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}

          <Group h="100%" gap={0} visibleFrom="sm">
            {/* <a href="/" className={classes.link}>
              Strona Główna
            </a>
            <a href="/playlists" className={classes.link}>
              Playlisty
            </a> */}
            {/* <a href="/albums" className={classes.link}>
              Albumy
            </a>
            <a href="/tracks" className={classes.link}>
              Utwory
            </a> */}
          </Group>

          <Group visibleFrom="sm">
            <LanguagePicker />
            <SpotifyLoginButton />
            {/* <Button>Sign up</Button> */}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Nawigacja"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          {/* <a href="#" className={classes.link}>
            Strona Główna
          </a>
          <a href="/playlists" className={classes.link}>
            Playlisty
          </a> */}
          {/* <a href="/albums" className={classes.link}>
            Albumy
          </a>
          <a href="/tracks" className={classes.link}>
            Utwory
          </a> */}

          {/* <Divider my="sm" /> */}

          <Group justify="center" gap="md" dir="column" grow pb="xl" px="md">
            {/* <LanguagePicker /> */}
            <SpotifyLoginButton />
          </Group>
        </ScrollArea>
      </Drawer>
    </AppShell.Header>
  );
};

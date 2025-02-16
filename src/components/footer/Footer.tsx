// import { Anchor, Container, Group } from "@mantine/core";
import { Anchor, Container, Text } from "@mantine/core";
import classes from "./Footer.module.css";

// const links = [
//   { link: "#", label: "Contact" },
//   { link: "#", label: "Privacy" },
//   { link: "#", label: "Blog" },
//   { link: "#", label: "Careers" },
// ];

export const Footer = () => {
  //   const items = links.map((link) => (
  //     <Anchor<"a">
  //       c="dimmed"
  //       key={link.label}
  //       href={link.link}
  //       onClick={(event) => event.preventDefault()}
  //       size="sm"
  //     >
  //       {link.label}
  //     </Anchor>
  //   ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text>
          Copyright © 2025
          <Anchor<"a">
            href="https://webcodesign.pl"
            size="sm"
            variant="filled"
            target="_blank"
            mx="xs"
            c="grape"
          >
            webco.design
          </Anchor>
          ☕ All rights reserved.
        </Text>
        {/* <MantineLogo size={28} /> */}
        {/* <Group className={classes.links}>{items}</Group> */}
      </Container>
    </div>
  );
};

import { useState} from "react";
import { Link, Box, Flex, Text, Button, Stack, useColorMode, IconButton } from "@chakra-ui/react";
import Logo from "./Logo";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="10em"
        color={["black", "black", "primary.500", "primary.500"]}
      />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};



const MenuLinks = ({ isOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <IconButton
            icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
            isRound="true"
            size="md"
            alignSelf="flex-end"
            onClick={toggleColorMode}
          />
        <MenuItem to="/signup" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["primary.500", "primary.500", "white", "white"]}
            bg={["black", "black", "primary.500", "primary.500"]}
            _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
            }}
          >
            Create Account
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["black", "black", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
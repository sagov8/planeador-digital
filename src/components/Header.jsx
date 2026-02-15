import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Heading, Box, Center } from "@chakra-ui/layout";
import { FaSun, FaMoon } from "react-icons/fa";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  
  return (
    <Center>
      <Flex w="100%" my={5}>
        <Center>
          <Box>
            <Heading ml="8" size="md" fontWeight="semibold" color="primary.400">
              Random Company Inc.
            </Heading>
          </Box>
          <IconButton
            ml={8}
            icon={isDark ? <FaSun /> : <FaMoon />}
            isRound="true"
            onClick={toggleColorMode}
          ></IconButton>
        </Center>
      </Flex>
    </Center>
  );
}

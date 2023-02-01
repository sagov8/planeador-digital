import { Center, Flex, Heading, VStack } from "@chakra-ui/react";
import { DateDaily } from "../../utils/DateDaily";
import { LayoutDaily } from "./LayoutDaily";

export function Daily() {
  return (
    <>
      <Flex justifyContent="end">
        <DateDaily />
      </Flex>
      <VStack spacing={3}>
        <Heading
          p="5"
          fontWeight="extrabold"
          size="xl"
          bgGradient="linear(to-r, primary.200, primary.500)"
          bgClip="text"
        >
          ¡Planifica tu día para ser productivo!
        </Heading>
        <LayoutDaily />
      </VStack>
    </>
  );
}

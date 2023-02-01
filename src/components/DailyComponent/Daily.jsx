import { Center, Heading, Stack } from "@chakra-ui/react";
import { DateDaily } from "../../utils/DateDaily";
import { LayoutDaily } from "./LayoutDaily";

export function Daily() {
  return (
    <Stack spacing={4}>
      <DateDaily />
      <Center>
        <Heading
          p="5"
          fontWeight="extrabold"
          size="xl"
          bgGradient="linear(to-r, primary.200, primary.500)"
          bgClip="text"
        >
          ¡Planifica tu día para ser productivo!
        </Heading>
      </Center>
      <LayoutDaily />
    </Stack>
  );
}

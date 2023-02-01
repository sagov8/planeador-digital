import React from "react";
import { Box, Stack, Text, Icon } from "@chakra-ui/react";
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function Logo() {
  return (
    <Stack isInline align='baseline'>
        <Text fontSize="md" fontWeight="bold" letterSpacing={2}>
          Random Company Inc.
        </Text>
        <Icon as={GiPerspectiveDiceSixFacesRandom} boxSize={4} />
    </Stack>
  );
}

import React from "react";
import { Box, Stack, Text, Icon } from "@chakra-ui/react";
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function Logo(props) {
  return (
    <Stack isInline>
      <Box {...props}>
        <Text fontSize="md" fontWeight="bold" letterSpacing={3}>
          Random Company
        </Text>
        <Icon as={GiPerspectiveDiceSixFacesRandom} boxSize={7}/>
      </Box>
    </Stack>
  );
}

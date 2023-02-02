import {
  Card,
  CardBody,
  Stack,
  VStack,
  Heading,
  Icon,
  Text,
  Divider,
  Box
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import * as API from "../../../services/QuoteService";
import { BsFillChatQuoteFill } from "react-icons/bs";

export function Quote(props) {
  const [quote, setQuote] = useState();
  const [autor, setAutor] = useState();

  useEffect(() => {
    setQuote(API.getQuote().phrase);
    setAutor(API.getQuote().author);
  }, []);

  return (
    <Card>
      <CardBody>
        <VStack spacing="12">
          <Stack isInline align="baseline">
            <Heading
              p="3"
              fontWeight="extrabold"
              size="xl"
              bgGradient="linear(to-r, primary.200, primary.500)"
              bgClip="text"
            >
              Cita del día
            </Heading>
            <Box>
              <Icon as={BsFillChatQuoteFill} boxSize={7} color="primary.300" />
            </Box>
          </Stack>
          <VStack spacing={10}>
            <Text as="cite" fontSize="xl">
              "{quote}"
            </Text>
            <Divider />
            <Text as="b" fontSize="sm" letterSpacing="widest">
              {autor}
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
}

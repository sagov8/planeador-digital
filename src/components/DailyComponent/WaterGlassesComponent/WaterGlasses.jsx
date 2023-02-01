import {
  Card,
  CardBody,
  Stack,
  Heading,
  Icon,
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import Rating from "react-rating";
import { MdLocalDrink } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

import { useState } from "react";

export function WaterGlasses(props) {
  const [waterRate, setWaterRate] = useState();

  return (
    <Card maxW="sm">
      <CardBody>
        <Stack spacing="3" isInline>
          <Heading
            p="3"
            fontWeight="extrabold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Recuerda Hidratarte
          </Heading>
          <Box>
            {waterRate === 8 ?
            <Icon as={BsCheckCircleFill} color='green.300' boxSize={6}></Icon>
            :
            ''}
          </Box>
        </Stack>
        <Stack>
          <Heading size="sm" my={5} letterSpacing='wide'>¿Cuántos vasos de agua tomaste hoy?</Heading>
          <Rating
            stop={8}
            emptySymbol={
              <Icon as={MdLocalDrink} boxSize={7} color="gray.300"/>
            }
            fullSymbol={<Icon as={MdLocalDrink} boxSize={7} color="blue.400" />}
            onClick={(rate) => setWaterRate(rate)}
          />
          <Divider />
          <Text as="b" color="gray.500" fontSize="sm">
            Total de vasos: {waterRate > 0 ? waterRate : 0}
          </Text>
          <Text as="b" fontSize="xs" color="gray.500" letterSpacing='widest'>
            {waterRate === 8 ? "¡Felicidades has cumplido la meta diaria!" : ""}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

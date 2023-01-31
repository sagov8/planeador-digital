import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import Rating from "react-rating";
import { MdLocalDrink } from "react-icons/md";
import { useState } from "react";

export function WaterGlasses(props) {
  const [waterRate, setWaterRate] = useState();

  return (
    <Card maxW="sm">
      <CardBody>
        <Stack spacing="3">
          <Heading
            p="3"
            fontWeight="extrabold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Recuerda Hidratarte
          </Heading>
          <Heading size="md" color="primary.400">
            ¿Cuántos vasos de agua tomaste hoy?
          </Heading>
          <Rating
            stop={8}
            emptySymbol={
              <Icon as={MdLocalDrink} boxSize={7} color="gray.300" />
            }
            fullSymbol={<Icon as={MdLocalDrink} boxSize={7} color="blue.200" />}
            onChange={(rate) => setWaterRate(rate)}
          />
          <Text as="b" color="primary.700">
            Total de vasos: {waterRate > 0 ? waterRate : 0}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

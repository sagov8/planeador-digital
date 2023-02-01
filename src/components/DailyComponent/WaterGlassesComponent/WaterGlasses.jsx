import {
  Card,
  CardBody,
  VStack,
  Heading,
  Icon,
  Text,
  Divider,
  Box,
  Center,
  Flex
} from "@chakra-ui/react";
import Rating from "react-rating";
import { MdLocalDrink } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

import { useState } from "react";

export function WaterGlasses(props) {
  const [waterRate, setWaterRate] = useState();

  return (
    <Card>
      <CardBody>
        <Flex justifyContent="right">
          {waterRate === 8 
          ? 
          (
            <Icon as={BsCheckCircleFill} color="green.300" boxSize={6}></Icon>
          ) : (
            ""
          )}
        </Flex>
        <Center>
          <Heading
            p="3"
            fontWeight="extrabold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Recuerda Hidratarte
          </Heading>
        </Center>
        <VStack>
            <Heading size="sm" my={5} letterSpacing="wide">
              ¿Cuántos vasos de agua tomaste hoy?
            </Heading>
            <Box>
              <Rating
              stop={8}
              emptySymbol={
                <Icon as={MdLocalDrink} boxSize={7} color="gray.300" />
              }
              fullSymbol={
                <Icon as={MdLocalDrink} boxSize={7} color="blue.400" />
              }
              onClick={(rate) => setWaterRate(rate)}
            />
            </Box>
          
          <Divider />
          <Text as="b" color="gray.500" fontSize="sm">
            Total de vasos: {waterRate > 0 ? waterRate : 0}
          </Text>
          <Text as="b" fontSize="xs" color="gray.500" letterSpacing="widest">
            {waterRate === 8 ? "¡Felicidades has cumplido la meta diaria!" : ""}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}

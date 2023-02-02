import {
  Card,
  CardBody,
  Heading,
  VStack,
  Textarea,
  Stack,
  Button,
  Spacer
} from "@chakra-ui/react";

export function Reminder() {
  return (
    <Card>
      <CardBody>
        <VStack spacing={2}>
          <Heading
            p="3"
            fontWeight="extrabold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Recordatorio - Notas
          </Heading>
          <Textarea
            placeholder="Coloca aquí algo que quieras recordar o anotar"
            variant="filled"
            background="primary.100"
            fontFamily="Verdana"
            fontSize={"lg"}
            letterSpacing={1}
            _dark={{
              background: "gray.600",
              color: "gray.200",
              _placeholder: { color: "gray.400" },
            }}
          />
          <Spacer />
          <Stack direction="row" spacing={4} align="center">
            <Button colorScheme="teal" variant="solid">
              Guardar
            </Button>
            <Button colorScheme="teal" variant="outline">
              Limpiar
            </Button>
          </Stack>
        </VStack>
      </CardBody>
    </Card>
  );
}

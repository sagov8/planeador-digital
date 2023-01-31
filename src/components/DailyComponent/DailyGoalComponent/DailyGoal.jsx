import {
  Card,
  CardBody,
  Stack,
  Image,
  Heading,
  CardHeader,
} from "@chakra-ui/react";
import EditTarget from "./EditGoal";

export function DailyTarget() {
  return (
    <Card maxW="sm">
      <CardBody>
        <CardHeader>
          <Heading
            p="0"
            fontWeight="extrabold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Daily Goal
          </Heading>
        </CardHeader>
        <Image
          src="https://images.pexels.com/photos/7581118/pexels-photo-7581118.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <EditTarget />
        </Stack>
      </CardBody>
    </Card>
  );
}

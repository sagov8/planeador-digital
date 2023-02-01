import {
  Card,
  CardBody,
  Stack,
  Image,
  Heading,
  CardHeader,
} from "@chakra-ui/react";
import EditGoal from "./EditGoal";

export function DailyTarget() {
  return (
    <Card maxW="sm">
      <CardBody>
        <CardHeader>
          <Heading
            p="0"
            fontWeight="bold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Objetivo del día
          </Heading>
        </CardHeader>
        <Image
          src="https://cdn.elearningindustry.com/wp-content/uploads/2020/01/5-tips-for-settting-up-smart-training-goals.jpg"
          alt="Daily Goal"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <EditGoal />
        </Stack>
      </CardBody>
    </Card>
  );
}

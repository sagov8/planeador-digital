import { Grid, GridItem } from "@chakra-ui/react";
import { DailyTarget } from "./DailyGoalComponent/DailyGoal";
import { TodoList } from "./TodoListComponent/TodoList";
import { WaterGlasses } from "./WaterGlassesComponent/WaterGlasses";
import { Quote } from "./QuoteComponent/Quote";

export function LayoutDaily() {
  return (
    <Grid
      templateRows='repeat(4,1fr)'
      templateColumns="repeat(4, 1fr)"
      gap={1}
    >
      <GridItem>
        <DailyTarget />
      </GridItem>
      <GridItem>
        <TodoList />
      </GridItem>
      <GridItem>
        <WaterGlasses />
      </GridItem>
      <GridItem>
        <Quote />
      </GridItem>
    </Grid>
  );
}

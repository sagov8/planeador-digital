import { Grid, GridItem } from "@chakra-ui/react";
import { DailyTarget } from "./DailyGoalComponent/DailyGoal";
import { TodoList } from "./TodoListComponent/TodoList";
import { WaterGlasses } from "./WaterGlassesComponent/WaterGlasses";

export function LayoutDaily() {
  return (
    <Grid
    
      templateColumns="repeat(4, 2fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={1}>
        <DailyTarget />
      </GridItem>
      <GridItem colSpan={1}>
        <TodoList />
      </GridItem>
      <GridItem colSpan={1}>
        <WaterGlasses />
      </GridItem>
    </Grid>
  );
}

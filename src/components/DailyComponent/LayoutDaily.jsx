import { Grid, GridItem } from "@chakra-ui/react";
import { DailyTarget } from "./DailyGoalComponent/DailyGoal";
import { TodoList } from "./TodoListComponent/TodoList";
import { WaterGlasses } from "./WaterGlassesComponent/WaterGlasses";
import { Quote } from "./QuoteComponent/Quote";
import { EmojiSelector } from "./EmojiSelectorComponent/EmojiSelector";

export function LayoutDaily() {
  return (
    <Grid
      templateRows='repeat(2,1fr)'
      templateColumns="repeat(4, 1fr)"
      
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
      <GridItem>
        <EmojiSelector />
      </GridItem>
    </Grid>
  );
}

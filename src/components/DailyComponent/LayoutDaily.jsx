import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { DailyTarget } from "./DailyGoalComponent/DailyGoal";
import { TodoList } from "./TodoListComponent/TodoList";
import { WaterGlasses } from "./WaterGlassesComponent/WaterGlasses";
import { Quote } from "./QuoteComponent/Quote";
import { EmojiSelector } from "./EmojiSelectorComponent/EmojiSelector";

export function LayoutDaily() {
  return (
    <SimpleGrid columns={{base: 1, lg: 2, xl:3}} spacing={{base: 20, lg: 18, xl:10}}>
        <DailyTarget />
        <TodoList />
        <Quote />
        <WaterGlasses />
        <EmojiSelector />
    </SimpleGrid>
  );
}

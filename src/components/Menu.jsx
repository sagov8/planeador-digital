import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { Daily } from "./DailyComponent/Daily";
import { Monthly } from "./MonthlyComponent/Monthly";
import { Weekly } from "./WeeklyComponent/Weekly";
import { Yearly } from "./YearlyComponent/Yearly";

export function Menu() {
  return (
    <>
      <Tabs isFitted variant="soft-rounded" colorScheme="green" ml='3em' mr='3em'>
        <TabList mb="1em">
          <Tab>
            <Text as="b">Diario</Text>
          </Tab>
          <Tab>
            <Text as="b">Semanal</Text>
          </Tab>
          <Tab>
            <Text as="b">Mensual</Text>
          </Tab>
          <Tab>
            <Text as="b">Anual</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Daily />
          </TabPanel>
          <TabPanel>
            <Weekly />
          </TabPanel>
          <TabPanel>
            <Monthly />
          </TabPanel>
          <TabPanel>
            <Yearly />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

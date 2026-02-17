import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Daily } from "./DailyComponent/Daily";
import { Monthly } from "./MonthlyComponent/Monthly";
import { Weekly } from "./WeeklyComponent/Weekly";
import { Yearly } from "./YearlyComponent/Yearly";

export function Menu() {
  const [tabIndex, setTabIndex] = useState(0);

  // Shared state for navigation between views (Monthly -> Weekly, etc)
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentWeek, setCurrentWeek] = useState(0);

  // Function to switch to Weekly view and set specific date/month
  const navigateToWeekly = (year, month, weekIndex = 0) => {
    setCurrentYear(year);
    setCurrentMonth(month);
    setCurrentWeek(weekIndex);
    setTabIndex(1); // 1 is the index for Weekly tab
  };

  return (
    <>
      <Tabs
        isFitted
        variant="soft-rounded"
        colorScheme="green"
        ml='3em'
        mr='3em'
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
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
            <Weekly
              externalYear={currentYear}
              externalMonth={currentMonth}
              externalWeek={currentWeek}
            />
          </TabPanel>
          <TabPanel>
            <Monthly
              onNavigateToWeekly={navigateToWeekly}
            />
          </TabPanel>
          <TabPanel>
            <Yearly />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

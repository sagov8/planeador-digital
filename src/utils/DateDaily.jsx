import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";

export function DateDaily() {
  const [date, setDate] = useState();

  const currentDate = () => {
    return dayjs().locale("es").format("D MMMM YYYY - HH:mm:ss");
  };

  function refreshClock() {
    setDate(currentDate());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Text as="b" fontSize="15px">
      {date}
    </Text>
  );
}

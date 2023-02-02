import { useState, useEffect } from "react";
import { Text, Badge } from "@chakra-ui/react";
import dayjs from "dayjs";

export function DateDaily() {
  const [date, setDate] = useState();

  const currentDate = () => {
    return dayjs().locale("es").format("dddd - D MMM YY - HH:mm a");
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
    <Badge
      variant="outline"
      rounded="full"
      px={5}
      py={1}
    >
      <Text>{date}</Text>
    </Badge>
  );
}

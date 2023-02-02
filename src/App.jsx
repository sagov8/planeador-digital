import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { VStack } from "@chakra-ui/react";

export function App() {
  return (
    <VStack p={5}>
      <Header />
      <Menu />
    </VStack>
  );
}

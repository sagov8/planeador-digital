import {
  Card,
  CardBody,
  Text,
  Button,
  Heading,
  VStack,
  useColorMode
} from "@chakra-ui/react";
import EmojiPicker, { Categories, Theme }  from "emoji-picker-react";
import { useState } from "react";

export function EmojiSelector() {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState();
  const { colorMode } = useColorMode();

  const categories = [
    {
      name: "Smiles & Emotions",
      category: Categories.SMILEYS_PEOPLE,
    },
  ];

  return (
    <Card display="flex">
      <CardBody>
        <VStack spacing={2}>
          <Heading
            p="3"
            fontWeight="extrabold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Mood del día
          </Heading>

          <Text fontSize={60}>{currentEmoji}</Text>

          <Button
            colorScheme="green"
            onClick={() => setPickerVisible(!isPickerVisible)}
          >
            Seleccionar Emoji
          </Button>

          {isPickerVisible ? (
            <EmojiPicker
              theme={colorMode === 'light' ? Theme.LIGHT : Theme.DARK}
              onEmojiClick={(e) => {
                setCurrentEmoji(e.emoji);
                setPickerVisible(!isPickerVisible);
                console.log(e);
              }}
              categories={categories}
              width="100%"
            />
          ) : (
            ""
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}

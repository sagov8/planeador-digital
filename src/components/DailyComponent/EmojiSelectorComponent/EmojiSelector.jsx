import {
  Card,
  CardBody,
  Text,
  Button,
  Heading,
  VStack,
} from "@chakra-ui/react";
import EmojiPicker, { Categories } from "emoji-picker-react";
import { useState } from "react";

export function EmojiSelector() {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState();

  const categories = [
    {
      name: "Smiles & Emotions",
      category: Categories.SMILEYS_PEOPLE,
    },
  ];

  return (
    <Card display="flex">
      <CardBody>
        <VStack>
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
            my={4}
            onClick={() => setPickerVisible(!isPickerVisible)}
          >
            Seleccionar Emoji
          </Button>

          {isPickerVisible ? (
            <EmojiPicker
              onEmojiClick={(e) => {
                setCurrentEmoji(e.emoji);
                setPickerVisible(!isPickerVisible);
                console.log(e);
              }}
              categories={categories}
              theme='auto'
            />
          ) : (
            ""
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}

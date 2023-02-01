import {
  Card,
  CardBody,
  Text,
  Center,
  Button,
  Heading,
} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export function EmojiSelector() {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState();

  return (
    <Card maxW="sm" display="flex" mt={3}>
      <CardBody>
        <Center>
          <Heading
            p="3"
            fontWeight="extrabold"
            size="xl"
            bgGradient="linear(to-r, primary.200, primary.500)"
            bgClip="text"
          >
            Mood del día
          </Heading>
        </Center>

        <Center>
          <Text fontSize={45}>{currentEmoji}</Text>
        </Center>
        <Center>
          <Button colorScheme="green" my={4} onClick={() => setPickerVisible(!isPickerVisible)}>
            Seleccionar Emoji
          </Button>
        </Center>
        {isPickerVisible ? <EmojiPicker onEmojiClick={(e) => {
            setCurrentEmoji(e.emoji);
            setPickerVisible(!isPickerVisible);
        }} height={400} width={350} /> : ''}
        
      </CardBody>
    </Card>
  );
}

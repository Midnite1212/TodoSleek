import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  HStack,
  Radio,
  Flex,
  Stack,
  Divider,
  Text,
  Image,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const SubtaskCard = (props) => {
  const { index, title, done, handleSubtaskDelete, handleEditSubChange } =
    props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [defaultValue, setDefaultValue] = useState();

  const getDefaultValues = () => {
    setDefaultValue({ title: title, done: done });
  };
  const handleSubtaskSubmit = () => {
    onClose();
  };
  const handleSubDelete = () => {
    handleSubtaskDelete(index);
    onClose();
  };

  const handleSubtaskChange = (e) => {
    handleEditSubChange(e, index);
  };

  const handleClose = () => {
    handleEditSubChange(
      { target: { name: "title", value: defaultValue.title } },
      index
    );
    handleEditSubChange(
      { target: { name: "done", value: defaultValue.done } },
      index
    );
    onClose();
  };

  useEffect(() => {
    getDefaultValues();
  }, []);
  // console.log(done);
  return (
    <>
      <Flex onClick={onOpen} direction="column" cursor="pointer">
        <Stack direction="row" display="flex" alignItems="center" spaicng={4}>
          {done === true ? (
            <Image
              onClick={() => {}}
              src={`${process.env.PUBLIC_URL}/Images/check.svg`}
              cursor="pointer"
            />
          ) : (
            <Button
              padding="0px"
              minW="20px"
              width="20px"
              height="20px"
              background="transparent"
              border="1.2px solid black"
            />
          )}
          <Text margin="0px">{title}</Text>
        </Stack>
        <Divider
          style={{
            opacity: 1,
            borderBottomWidth: "1.2px",
            borderColor: "black",
            height: "1px",
          }}
        />
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Subtask</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={title === ""}>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                onChange={handleSubtaskChange}
                value={title}
                name="title"
              />
              <FormErrorMessage>Title is required.</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Status</FormLabel>
              <RadioGroup
                value={`${done}`}
                name="Done"
                onChange={(stat) =>
                  handleSubtaskChange({
                    target: { value: stat, name: "done" },
                  })
                }
              >
                <HStack spacing="24px">
                  <Radio value="true">Completed</Radio>
                  <Radio value="false">Unfinished</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubtaskSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={handleClose} mr={3}>
              Cancel
            </Button>
            <Button onClick={handleSubDelete} colorScheme="red" mr={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubtaskCard;

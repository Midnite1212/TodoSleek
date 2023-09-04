import {
  Flex,
  Stack,
  TabList,
  Tabs,
  Text,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
import Notes from "../Notes/Notes";
import Links from "../Links/Links";
import axios from "axios";

const TodoMain = (props) => {
  const { data, showData, width, height, overviewTitle } = props;
  const SERVER = process.env.REACT_APP_SERVER;
  const today = new Date(new Date().toDateString());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const defaultFormValues = {
    title: "New Task",
    description: "Describe task...",
    dueDate: new Date(),
    status: 2,
    tags: [],
  };
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleChange = (e) => {
    var fieldName = e.target.name;
    var value = e.target.value;
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
    console.log(formValues.title);
  };

  const handleSubmit = async () => {
    const { title, description, dueDate, status, tags } = formValues;
    const submittedValues = {
      Title: title,
      Description: description,
      DueDate: dueDate,
      Status: status,
      Priority: false,
      Order: data && data.length,
      Subtasks: [],
      Tags: tags,
    };
    console.log(JSON.stringify(submittedValues));
    try {
      await axios.post(`${SERVER}api/Todo`, JSON.stringify(submittedValues), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
    onClose();
    window.location.reload();
  };

  return (
    <>
      <Flex width={width} height={height}>
        <Stack direction="column" width="100%" height="100%">
          <Text>Hi, Tony!</Text>
          <Stack direction="row">
            <Stack direction="row">
              <Text>{overviewTitle}</Text>
              <Text>{showData && showData.length}</Text>
            </Stack>
            <Text>
              {today.toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
                weekday: "long",
              })}
            </Text>
          </Stack>
          <Tabs height="90%">
            <TabList>
              <Tab>Todos</Tab>
              <Tab>Notes</Tab>
              <Tab>Links</Tab>
            </TabList>
            <TabPanels height="95%" overflowY="auto">
              <TabPanel>
                <Stack>
                  <Button onClick={onOpen}>Open Modal</Button>
                </Stack>
                {showData &&
                  showData.map((item, key) => {
                    return <TaskCard key={key} {...item} />;
                  })}
              </TabPanel>
              <TabPanel>
                <Notes />
              </TabPanel>
              <TabPanel>
                <Links />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new To Do!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={formValues.title === ""}>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                onChange={handleChange}
                value={formValues.title}
                name="title"
              />
              <FormErrorMessage>Title is required.</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isRequired
              isInvalid={formValues.description === ""}
            >
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                onChange={handleChange}
                value={formValues.description}
                name="description"
              />
              <FormErrorMessage>Descripiton is required.</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <Input placeholder="" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Input placeholder="" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tags</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoMain;

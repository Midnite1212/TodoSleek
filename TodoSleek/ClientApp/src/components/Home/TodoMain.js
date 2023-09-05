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
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import Notes from "../Notes/Notes";
import Links from "../Links/Links";
import axios from "axios";

const TodoMain = (props) => {
  const { data, showData, width, height, overviewTitle, setActiveTask } = props;
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
  };

  const handleSubmit = async () => {
    const { title, description, dueDate, status, tags } = formValues;
    const submittedValues = {
      Title: title,
      Description: description,
      DueDate: dueDate,
      Status: parseInt(status),
      Priority: false,
      Order: data && data.length,
      Subtasks: [],
      Tags: tags,
    };
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

  const handleClose = () => {
    onClose();
    setFormValues(defaultFormValues);
  };

  return (
    <>
      <Flex width={width} height={height} padding="0 20px">
        <Stack direction="column" width="100%" height="100%">
          <Text fontSize="20px" fontWeight={500}>Hi, Tony!</Text>
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
            <Stack direction="row" display="flex" alignItems="center" spacing={8}>
              <Text fontSize="32px" fontWeight={700}>{overviewTitle}</Text>
              <Text fontSize="24px" fontWeight={600}>{showData && showData.length}</Text>
            </Stack>
            <Text fontSize="24px">
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
            <TabPanels height="92%" overflowY="auto">
              <TabPanel>
                <Stack>
                  <Button onClick={onOpen}>+ Add New Task</Button>
                </Stack>
                {showData &&
                  showData.map((item, key) => {
                    return <TaskCard key={key} setActiveTask={setActiveTask} {...item} />;
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
          <ModalCloseButton onClick={handleClose} />
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
              <DatePicker
                selected={formValues.dueDate}
                showTimeSelect
                onChange={(date) =>
                  handleChange({ target: { value: date, name: "dueDate" } })
                }
                dateFormat="Pp"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <RadioGroup
                defaultValue="2"
                name="Status"
                onChange={(stat) =>
                  handleChange({ target: { value: stat, name: "status" } })
                }
              >
                <HStack spacing="24px">
                  <Radio value="0">Completed</Radio>
                  <Radio value="1">In Progress</Radio>
                  <Radio value="2">Not Started</Radio>
                </HStack>
              </RadioGroup>
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
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoMain;

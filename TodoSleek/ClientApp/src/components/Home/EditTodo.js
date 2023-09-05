import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  HStack,
  Radio,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useRef } from "react";
import SubtaskCard from "../SubtaskCard/SubtaskCard";

const EditTodo = (props) => {
  const { data, width, height, currTask } = props;
  const defaultSubtask = {
    title: "New subtask",
    done: false,
  };
  const SERVER = process.env.REACT_APP_SERVER;
  const [formValues, setFormValues] = useState();
  const [subtasks, setSubtasks] = useState(defaultSubtask);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const getDefaultFormValues = () => {
    setFormValues({
      id: currTask ? currTask.id : "",
      title: currTask ? currTask.title : "",
      description: currTask ? currTask.description : "",
      dueDate: currTask ? new Date(currTask.dueDate) : new Date(),
      priority: currTask ? currTask.priority : false,
      status: currTask ? currTask.status : 2,
      tags: currTask ? currTask.tags : [],
      subtasks: currTask
        ? currTask.subtasks === null
          ? []
          : currTask.subtasks
        : [],
    });
  };

  const handleChange = (e) => {
    var fieldName = e.target.name;
    var value = e.target.value;
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
  };

  const handleSubtaskChange = (e) => {
    var fieldName = e.target.name;
    var value = e.target.value;
    setSubtasks({
      ...subtasks,
      [fieldName]: value,
    });
  };

  const handleEditSubChange = (e, index) => {
    var fieldName = e.target.name;
    var value = e.target.value;
    var tempSubtask = currTask
      ? currTask.subtasks === null
        ? []
        : currTask.subtasks
      : [];
    if (tempSubtask !== []) {
      tempSubtask[index][fieldName] = value;
    }
    setFormValues({
      ...formValues,
      subtasks: tempSubtask,
    });
    handleSubtaskClose();
  };

  const handleSubtaskSubmit = () => {
    var tempSubtask = currTask
      ? currTask.subtasks === null
        ? []
        : currTask.subtasks
      : [];
    tempSubtask.push(subtasks);
    setFormValues({
      ...formValues,
      subtasks: tempSubtask,
    });
    handleSubtaskClose();
  };

  const handleSubtaskDelete = (index) => {
    var tempSubtask = currTask
      ? currTask.subtasks === null
        ? []
        : currTask.subtasks
      : [];
    tempSubtask.splice(index, 1);
    setFormValues({
      ...formValues,
      subtasks: tempSubtask,
    });
    handleSubtaskClose();
  };

  const handleSubtaskClose = () => {
    setSubtasks(defaultSubtask);
    onClose();
  };

  const handleSubmit = async () => {
    const {
      id,
      title,
      description,
      dueDate,
      status,
      tags,
      priority,
      subtasks,
    } = formValues;
    const submittedValues = {
      Id: id,
      Title: title,
      Description: description,
      DueDate: dueDate,
      Status: parseInt(status),
      Priority: priority === "true",
      Order: data && data.length,
      Subtasks: subtasks.map((item) => {
        return {
          title: item.title,
          done: item.done === "true" || item.done === true ? true : false,
        };
      }),
      Tags: tags,
    };
    console.log(submittedValues);
    try {
      await axios.put(
        `${SERVER}api/Todo/${currTask.id}`,
        JSON.stringify(submittedValues),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    window.alert("Changes saved!");
    window.location.reload();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${SERVER}api/Todo/${currTask.id}`);
    } catch (e) {
      console.log(e);
    }
    window.alert("Task deleted");
    window.location.reload();
  };

  useEffect(() => {
    getDefaultFormValues();
  }, [currTask]);

  return (
    <>
      <Flex
        width={width}
        height={height}
        background="rgba(189,224,254,0.32)"
        borderRadius="0 5px 5px 0"
        direction="column"
        padding="20px 30px 20px 30px"
      >
        <Text fontSize="24px" fontWeight={700}>
          Task:
        </Text>
        {currTask && (
          <Stack display="flex" height="77%" justifyContent="space-between">
            <Stack height="100%">
              <FormControl isRequired isInvalid={formValues.title === ""}>
                <Input
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
                <Input
                  placeholder="Description"
                  onChange={handleChange}
                  value={formValues.description}
                  name="description"
                />
                <FormErrorMessage>Descripiton is required.</FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <Stack direction="row">
                  <Text>Due Date</Text>
                  <DatePicker
                    selected={formValues.dueDate}
                    showTimeSelect
                    onChange={(date) =>
                      handleChange({ target: { value: date, name: "dueDate" } })
                    }
                    dateFormat="Pp"
                  />
                </Stack>
              </FormControl>

              <FormControl mt={4}>
                <Stack direction="row">
                  <Text>Priority</Text>
                  <RadioGroup
                    value={`${formValues.priority}`}
                    name="Priority"
                    onChange={(prio) =>
                      handleChange({
                        target: { value: prio, name: "priority" },
                      })
                    }
                  >
                    <HStack spacing="24px">
                      <Radio value="true">Priority</Radio>
                      <Radio value="false">Not Priority</Radio>
                    </HStack>
                  </RadioGroup>
                </Stack>
              </FormControl>

              <FormControl mt={4}>
                <Stack direction="row">
                  <Text>Status</Text>
                  <RadioGroup
                    value={`${formValues.status}`}
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
                </Stack>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tags</FormLabel>
                <Input placeholder="" />
              </FormControl>

              <Stack height="45%" overflowY="auto">
                <Text>Subtasks:</Text>
                <Stack height="100%" overflowY="auto" paddingBottom="20px">
                  <Button onClick={onOpen}>+ Add New Subtask</Button>
                  {currTask &&
                    currTask.subtasks &&
                    currTask.subtasks.map((subtask, i) => {
                      return (
                        <>
                          <SubtaskCard
                            key={i}
                            index={i}
                            handleSubtaskDelete={handleSubtaskDelete}
                            handleEditSubChange={handleEditSubChange}
                            onOpen={onOpen}
                            {...subtask}
                          />
                        </>
                      );
                    })}
                </Stack>
              </Stack>
            </Stack>
            <Stack marginBottom="20px">
              <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button
                onClick={() => {
                  getDefaultFormValues();
                }}
              >
                Discard Changes
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete Task
              </Button>
            </Stack>
          </Stack>
        )}
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Subtask!</ModalHeader>
          <ModalCloseButton onClick={handleSubtaskClose} />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={subtasks.title === ""}>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                onChange={handleSubtaskChange}
                value={subtasks.title}
                name="title"
              />
              <FormErrorMessage>Title is required.</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isRequired
              isInvalid={subtasks.description === ""}
            >
              <FormLabel>Status</FormLabel>
              <RadioGroup
                value={`${subtasks.done}`}
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
            <Button onClick={handleSubtaskClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTodo;

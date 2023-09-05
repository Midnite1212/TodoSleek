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
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

const EditTodo = (props) => {
  const { data, width, height, currTask } = props;
  const SERVER = process.env.REACT_APP_SERVER;
  const [formValues, setFormValues] = useState();

  const getDefaultFormValues = () => {
    setFormValues({
      id: currTask ? currTask.id : "",
      title: currTask ? currTask.title : "",
      description: currTask ? currTask.description : "",
      dueDate: currTask ? new Date(currTask.dueDate) : new Date(),
      priority: currTask ? currTask.priority : false,
      status: currTask ? currTask.status : 2,
      tags: currTask ? currTask.tags : [],
      subtasks: currTask ? currTask.subtasks : [],
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
      Subtasks: subtasks,
      Tags: tags,
    };
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
    window.alert("Task deleted")
    window.location.reload();
  };

  useEffect(() => {
    getDefaultFormValues();
  }, [currTask]);
  console.log(formValues);
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
        <Text>Task:</Text>
        {currTask && (
          <Stack>
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
                    handleChange({ target: { value: prio, name: "priority" } })
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
        )}
      </Flex>
    </>
  );
};

export default EditTodo;

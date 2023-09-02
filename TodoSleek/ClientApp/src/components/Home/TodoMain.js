import { Flex } from "@chakra-ui/react";
import * as React from "react";
import axios from "axios";

const TodoMain = () => {
  const [todoList, setTodoList] = React.useState();

  const getList = async () => {
    try {
      const { data, status } = await axios.get(
        "mongodb+srv://richiewee01:Ciek10281212@todolist.i2evpsm.mongodb.net/"
      );
      console.log(data)
      if (status === 200) {
        setTodoList(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getList();
  }, []);
console.log(`${process.env.MONGO_USERNAME}`)
  return (
    <>
      <Flex>
        <p>blablabla</p>
      </Flex>
    </>
  );
};

export default TodoMain;

import { Flex, Text } from "@chakra-ui/react";
import * as React from "react";

const EditTodo = (props) => {
  const { data, width, height } = props;
  return (
    <>
      <Flex
        width={width}
        height={height}
        background="rgba(189,224,254,0.32)"
        borderRadius="0 5px 5px 0"
      >
        <Text>Task:</Text>
      </Flex>
    </>
  );
};

export default EditTodo;

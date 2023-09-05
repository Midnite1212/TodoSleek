import {
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const TaskCard = (props) => {
  const {
    id,
    title,
    description,
    dueDate,
    status,
    tags,
    order,
    priority,
    subtasks,
    setActiveTask,
  } = props;

  const imageButtonStyle = {
    cursor: "pointer",
    width: "20px",
    height: "20px",
  };

  const stackStyle = {
    display: "flex",
    alignItems: "center",
  };

  const handlePriorityChange = () => {};

  return (
    <>
      <Flex width="auto" margin="10px" padding="10px" direction="column">
        <Stack
          direction="row"
          width="100%"
          display="flex"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={4} style={stackStyle}>
            {status === 0 ? (
              <Image
                onClick={() => {}}
                src={`${process.env.PUBLIC_URL}/Images/check.svg`}
                cursor="pointer"
              />
            ) : (
              <Button
                style={imageButtonStyle}
                padding="0px"
                minW="20px"
                background="transparent"
                border="1.2px solid black"
              />
            )}
            <Text margin="0px">{title}</Text>
          </Stack>
          <Stack direction="row" spacing={4} style={stackStyle}>
            {priority ? (
              <Image
                onClick={() => {}}
                src={`${process.env.PUBLIC_URL}/Images/priorityTrue.png`}
                style={imageButtonStyle}
              />
            ) : (
              <Image
                onClick={() => {}}
                src={`${process.env.PUBLIC_URL}/Images/priorityFalse.png`}
                style={imageButtonStyle}
              />
            )}
            <IconButton
              onClick={() => setActiveTask(id)}
              icon={
                <Image
                  src={`${process.env.PUBLIC_URL}/Images/arrow.png`}
                  style={imageButtonStyle}
                />
              }
            />
          </Stack>
        </Stack>
        <Stack
          margin="20px 0 0 20px"
          direction="row"
          spacing={6}
          style={stackStyle}
        >
          <Stack direction="row" style={stackStyle}>
            <Image
              src={`${process.env.PUBLIC_URL}/Images/dates.png`}
              style={imageButtonStyle}
            />
            <Text margin="0px">{new Date(dueDate).toLocaleDateString()}</Text>
          </Stack>
          <Divider
            orientation="vertical"
            style={{
              borderColor: "black",
              height: "20px",
              margin: "0px",
              borderWidth: "1px",
            }}
          />
          <Stack direction="row" style={stackStyle}>
            <Text
              margin="0px"
              background="rgba(189,224,254,0.5)"
              padding="2px 10px 2px 10px"
              borderRadius="5px"
            >
              {subtasks && subtasks.length ? subtasks.length : 0}
            </Text>
            <Text margin="0px">Subtasks</Text>
          </Stack>
          <Divider
            orientation="vertical"
            style={{
              borderColor: "black",
              height: "20px",
              margin: "0px",
              borderWidth: "1px",
            }}
          />
          <Stack direction="row" style={stackStyle}>
            {tags &&
              tags.map((tag) => {
                return (
                  <Stack direction="row" style={stackStyle}>
                    <Flex
                      borderRadius="5px"
                      width="20px"
                      height="20px"
                      background={tag.color}
                    />
                    <Text margin="0px">{tag.title}</Text>
                  </Stack>
                );
              })}
          </Stack>
        </Stack>
      </Flex>
      <Divider
        style={{
          background: "#000000",
          opacity: 1,
          borderBottomWidth: "0px",
          height: "1.2px",
        }}
      />
    </>
  );
};

export default TaskCard;

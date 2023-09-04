import { Flex, Image, Stack, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const HomeMenu = (props) => {
  const { data, width, height, overviewNumber, setOverview } = props;
  const [tags, setTags] = useState([]);

  const titleTextStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
  };
  const settingTextStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: 0,
  };
  const subTextStyle = {
    margin: "0px",
    fontWeight: 500,
  };
  const subNumberStyle = {
    margin: "0px",
    fontWeight: 500,
    background: "#A8D7FF",
    borderRadius: 5,
    padding: "2px 10px 2px 10px",
  };
  const menuTitleStackStyle = {
    display: "flex",
    alignItems: "center",
  };
  const menuStackStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  };

  const getAllTags = () => {
    var allTags = [];
    data && data.map((item) => {
      item.tags && item.tags.map((tag) => {
        allTags.push(tag);
      });
    });
    allTags = [...new Map(allTags.map((obj) => [obj["title"], obj])).values()];
    setTags([...allTags]);
  };

  useEffect(() => {
    getAllTags();
  }, [data]);

  return (
    <>
      <Flex
        width={width}
        height={height}
        background="#BDE0FE"
        borderRadius="5px 0 0 5px"
        padding="20px"
      >
        <Stack direction="column" width="100%" justifyContent="space-between">
          <Stack>
            <Text fontSize="1.5em" fontWeight="bold" marginBottom="1em">
              Menu
            </Text>
            <Stack direction="column" marginBottom="5em">
              <Text style={titleTextStyle}>Overview</Text>
              <Tabs onChange={(index) => setOverview(index)}>
                <TabList flexDirection="column">
                  <Tab>
                    <Stack direction="row" style={menuStackStyle}>
                      <Stack direction="row" style={menuTitleStackStyle}>
                        <Image
                          src={process.env.PUBLIC_URL + "Images/upcoming.png"}
                          width="20px"
                          height="20px"
                        />
                        <Text style={subTextStyle}>Upcoming</Text>
                      </Stack>
                      <Text style={subNumberStyle}>{overviewNumber[0]}</Text>
                    </Stack>
                  </Tab>
                  <Tab>
                    <Stack direction="row" style={menuStackStyle}>
                      <Stack direction="row" style={menuTitleStackStyle}>
                        <Image
                          src={process.env.PUBLIC_URL + "Images/today.png"}
                          width="20px"
                          height="20px"
                        />
                        <Text style={subTextStyle}>Today</Text>
                      </Stack>
                      <Text style={subNumberStyle}>{overviewNumber[1]}</Text>
                    </Stack>
                  </Tab>
                  <Tab>
                    <Stack direction="row" style={menuStackStyle}>
                      <Stack direction="row" style={menuTitleStackStyle}>
                        <Image
                          src={process.env.PUBLIC_URL + "Images/past.png"}
                          width="20px"
                          height="20px"
                        />
                        <Text style={subTextStyle}>Past</Text>
                      </Stack>
                      <Text style={subNumberStyle}>{overviewNumber[2]}</Text>
                    </Stack>
                  </Tab>
                  <Tab>
                    <Stack direction="row" style={menuStackStyle}>
                      <Stack direction="row" style={menuTitleStackStyle}>
                        <Image
                          src={process.env.PUBLIC_URL + "Images/all-todo.png"}
                          width="20px"
                          height="20px"
                        />
                        <Text style={subTextStyle}>All Todos</Text>
                      </Stack>
                      <Text style={subNumberStyle}>{overviewNumber[3]}</Text>
                    </Stack>
                  </Tab>
                </TabList>
              </Tabs>
            </Stack>
            <Stack direction="column">
              <Text style={titleTextStyle}>Tags</Text>
              <Stack spacing={4}>
                {tags &&
                  tags.map((tag, key) => {
                    return (
                      <Stack
                        direction="row"
                        key={key}
                        style={menuTitleStackStyle}
                      >
                        <Flex
                          borderRadius="5px"
                          width="20px"
                          height="20px"
                          background={tag.color}
                        />
                        <Text style={subTextStyle}>{tag.title}</Text>
                      </Stack>
                    );
                  })}
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="column" marginBottom="20px">
            <Stack direction="row" style={menuTitleStackStyle}>
              <Image
                src={process.env.PUBLIC_URL + "Images/settings.png"}
                width="20px"
                height="20px"
              />
              <Text style={settingTextStyle}>Settings</Text>
            </Stack>
            <Stack direction="row" style={menuTitleStackStyle}>
              <Image
                src={process.env.PUBLIC_URL + "Images/signout.png"}
                width="20px"
                height="20px"
              />
              <Text style={settingTextStyle}>Sign out</Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default HomeMenu;

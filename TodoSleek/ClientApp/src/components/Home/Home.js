import { useState, useEffect } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import HomeMenu from "./HomeMenu";
import TodoMain from "./TodoMain";
import EditTodo from "./EditTodo";
import axios from "axios";

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [overview, setOverview] = useState(
    localStorage.getItem("overview") ? localStorage.getItem("overview") : 1
  );
  const [showData, setShowData] = useState();
  const [overviewTitle, setOverviewTitle] = useState();
  const [overviewNumber, setOverviewNumber] = useState([0, 0, 0, 0]);

  const SERVER = process.env.REACT_APP_SERVER;
  const today = new Date(new Date().toDateString());

  const getList = async () => {
    try {
      const { data, status } = await axios.get(`${SERVER}api/Todo`);
      if (status === 200) {
        setTodoList(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sortData = () => {
    var upcomingDates = [];
    var todayDates = [];
    var pastDates = [];

    todoList.map((item) => {
      var date = new Date(new Date(item.dueDate).toDateString());
      if (today - date < 0) {
        upcomingDates.push(item);
      } else if (today - date === 0) {
        todayDates.push(item);
      } else pastDates.push(item);
    });
    setOverviewNumber([
      upcomingDates.length,
      todayDates.length,
      pastDates.length,
      todoList.length,
    ]);

    switch (parseInt(overview)) {
      case 0:
        setShowData(upcomingDates);
        setOverviewTitle("Upcoming");
        break;
      case 1:
        setShowData(todayDates);
        setOverviewTitle("Today");
        break;
      case 2:
        setShowData(pastDates);
        setOverviewTitle("Past");
        break;
      case 3:
        setShowData(todoList);
        setOverviewTitle("All Todos");
        break;
      default:
        setOverviewTitle("Invalid");
        break;
    }
  };

  useEffect(() => {
    getList();
    sortData();
  }, []);

  useEffect(() => {
    sortData();
  }, [todoList, overview]);

  return (
    <>
      <Flex height="100vh" width="100vw">
        <Stack height="100%" width="100%" direction="row" padding="2.5em">
          <HomeMenu
            width="20%"
            height="100%"
            data={todoList}
            overviewNumber={overviewNumber}
            overview={overview}
            setOverview={setOverview}
          />
          <TodoMain
            width="45%"
            height="100%"
            data={todoList}
            showData={showData}
            overviewTitle={overviewTitle}
          />
          <EditTodo width="35%" height="100%" data={todoList} />
        </Stack>
      </Flex>
    </>
  );
};

export default Home;

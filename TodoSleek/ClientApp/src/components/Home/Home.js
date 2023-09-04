import React from 'react';
import { Flex } from '@chakra-ui/react'
import HomeMenu from './HomeMenu';
import TodoMain from './TodoMain';
import EditTodo from './EditTodo';
import axios from "axios";

const Home = () => {
    const [todoList, setTodoList] = React.useState([]);
    const SERVER = process.env.REACT_APP_SERVER;

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

    React.useEffect(() => {
        getList();
    }, []);
    return (
        <>
            <Flex direction = 'row'>
                <HomeMenu data={todoList} />
                <TodoMain data={todoList} />
                <EditTodo data={todoList} />
            </Flex>
        </>
    )
}

export default Home

import React from 'react';
import { Flex } from '@chakra-ui/react'
import HomeMenu from './HomeMenu';
import TodoMain from './TodoMain';
import EditTodo from './EditTodo';

const Home = () => {
    return (
        <>
            <Flex direction = 'row'>
                <HomeMenu />
                <TodoMain />
                <EditTodo />
            </Flex>
        </>
    )
}

export default Home

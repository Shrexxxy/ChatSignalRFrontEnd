import {Button, Heading, Input, Text } from "@chakra-ui/react"
import {useState} from "react";

export const WaitingRoom = ({joinChat}) =>
{

    const [userName, setUserName] = useState();
    const [chatRoom, setChatRoom] = useState();
    const onSubmit = (e) =>
    {
        e.preventDefault();
        joinChat(userName, chatRoom);
    }
    return(
        <form
            onSubmit={onSubmit}
            className="max-w-sm w-full bg-white p-8 rounded shadow-lg">
            <Heading>
                Онлайн чат
            </Heading>
            <div className="mb-4">
                <Text fontSize={"sm"}>Имя пользователя</Text>
                <Input
                    onChange={(e) => setUserName(e.target.value)}
                    name="userName"
                    placeholder="Введите ваше имя"></Input>
            </div>
            <div className="mb-4">
                <Text fontSize={"sm"}>Название чата</Text>
                <Input
                    onChange={(e) => setChatRoom(e.target.value)}
                    name="chatRoom"
                    placeholder="Введите название чата"></Input>
            </div>
            <Button type="submit" colorScheme="blue">
                Присоединиться
            </Button>
        </form>
    )
}
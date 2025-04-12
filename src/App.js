import { Provider } from './components/ui/provider';
import {WaitingRoom} from "./components/WaitingRoom";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {useState} from "react";
import {Chat} from "./components/Chat";

export default function App() {
    const [connection, setConnection] = useState(null);
    const [chatRoom, setChatRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const joinChat = async (userName, chatRoom) =>
    {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:7001/chat")
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", (userName, message) => {
            console.log(userName);
            console.log(message);
        });

        try
        {
            await connection.start();
            await connection.invoke("JoinChat", {userName, chatRoom});

            setConnection(connection);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {connection ? <Chat messages={messages} chatRoom={chatRoom} closeChat/> : <WaitingRoom joinChat={joinChat}/>}
        </div>
    );
}
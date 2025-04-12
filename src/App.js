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
            setMessages(messages => [...messages, {userName, message}]);
        });

        try
        {
            await connection.start();
            await connection.invoke("JoinChat", {userName, chatRoom});

            setChatRoom(chatRoom);
            setConnection(connection);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    const sendMessage = (message) =>
    {
      connection.invoke("SendMessage", message);
    };

    const closeChat = async () =>
    {
        await connection.stop();
        setConnection(null);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {connection
                ? <Chat
                messages={messages}
                chatRoom={chatRoom}
                closeChat={closeChat}
                sendMessage={sendMessage}/>
                : <WaitingRoom joinChat={joinChat}/>}
        </div>
    );
}
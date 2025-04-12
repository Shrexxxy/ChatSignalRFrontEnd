import { Provider } from './components/ui/provider';
import {WaitingRoom} from "./components/WaitingRoom";
import {HubConnectionBuilder} from "@microsoft/signalr";

export default function App() {
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
            console.log(connection);
        }
        catch (error)
        {
            console.log(error);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <WaitingRoom joinChat={joinChat}></WaitingRoom>
        </div>
    );
}
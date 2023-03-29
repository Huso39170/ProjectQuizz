import io from "socket.io-client";
import { createContext,useEffect,useState } from "react";
const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [loader,setLoader] = useState(false)
    useEffect(() => {
        if(!loader){
            const socket = io.connect('wss://quizzeo-socket.onrender.com'); //https://localhost:3001
            setSocket(socket);
            setLoader(true)
        }
        return () => {
            if (socket) { // Vérifier que "socket" n'est pas null
                socket.disconnect();
            }
        };
    }, [loader])
    return (
        <>
        {loader&&(
            <SocketContext.Provider value={{ socket }}>
                {children}
            </SocketContext.Provider>
        )}
        </>

    )
}

export default SocketContext;
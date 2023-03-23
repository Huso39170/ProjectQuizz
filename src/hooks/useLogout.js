import api from "../api/quizz";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        try {
            const response = await api.post(`/auth/logout`, {
                withCredentials: true
            });
            if(response){
                navigate('/');
                localStorage.removeItem('persist');
                localStorage.removeItem("user_email");

            }
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
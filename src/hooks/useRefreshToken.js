import api from '../api/quizz'
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try{
            const response = await api.get('/auth/refresh', {
                withCredentials: true
            });
    
            setAuth(prev => {
                return { ...prev, accessToken: response.data.accessToken }
            });
            return response.data.accessToken;
        }catch{
            console.log("refresh expirer")
        }

    }
    return refresh;
};

export default useRefreshToken;
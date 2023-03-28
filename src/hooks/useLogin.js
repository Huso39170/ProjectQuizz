import api from "../api/quizz";
import useAuth from "./useAuth";

const useLogin = (resetModal,toggleModal,setErrors) => {
    const { setAuth } = useAuth();


    const login = async (userInfo) => {
        try{
            //Requete post pour envoyer les données du nouvelle utilisateur dans la BD
            const response = await api.post(`/auth`, 
                userInfo,
                {
                    withCredentials: true 
                }
            );
            StockToken(response.data)
            console.log(response);
        } catch (err){
            const errorMessage = err.response?.data?.message ?? "Une erreur s'est produite";
            setErrors(errorMessage);
            console.log(errorMessage);
            console.log(err);
        }
    }
    //Stock le token dans un provider puis reset et ferme le modal
    const StockToken = (data)=>{
        const accessToken = data.accessToken;
        const user = data.user;
        setAuth({user,accessToken})
        localStorage.setItem("user_email",user.email);
        resetModal();
        toggleModal();
    }

    return login;
}

export default useLogin
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
        } catch (err){
            //Erreur affichée dans la console
            setErrors(err.response.data.message);

            console.log(err.response.data);
        }
    }
    //Stock le token dans un provider puis reset et ferme le modal
    const StockToken = (data)=>{
        const accessToken = data.accessToken;
        const user = data.user;
        setAuth({user,accessToken})
        resetModal();
        toggleModal();
    }

    return login;
}

export default useLogin
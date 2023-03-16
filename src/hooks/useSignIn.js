import api from "../api/quizz";


const useSignIn = (setIsLogin,setErrors) => {
    const signin = async (newUser) => {
        try{
            //Requete post pour envoyer les données du nouvelle utilisateur dans la BD
            const response = await api.post(`/auth/register`, newUser);
            setIsLogin(true);
            console.log(response.data)
        } catch (err){
            //Erreur affichée dans la console
            setErrors(err.response.data.message);
            console.log(err.response.data);
        }
    }
    return signin;
}

export default useSignIn
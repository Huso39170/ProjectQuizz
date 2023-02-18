import api from "../api/quizz";


const useSignIn = (setIsLogin) => {
    const signin = async (newUser) => {
        try{
            //Requete post pour envoyer les données du nouvelle utilisateur dans la BD
            const response = await api.post(`/auth/register`, newUser);
            setIsLogin(true);
            console.log(response.data)
        } catch (err){
            //Erreur affichée dans la console
            console.log(err.response.data);
        }
    }
    return signin;
}

export default useSignIn
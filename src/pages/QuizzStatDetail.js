import React,{useEffect, useState} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const QuizzStatDetail = () => {

    const [reponses,setReponses]=useState([{}])
    const [loader,setLoader]=useState(false)


    //Fait appel au hook qui permet de refresh l'acces token si ce dernier est expiré
    const axiosPrivate=useAxiosPrivate()

    // La fonction asynchrone getQuestions récupère les données de plusieurs questions avec les IDs spécifiés
    const getQuestions = async (questions) => {
        let promises = questions.map(question => {
        return axiosPrivate.get(`/question/${question._id}`)
        .then(response => response.data)
        .catch(error => console.error(error));
        });
        return Promise.all(promises);
    }

    function assemble(array1, array2) {
        return array1.map(question => {
          const question2 = array2.find(q => q._id === question._id);
          if (question2) {
            return {
              ...question2,
              reponses: question2.reponses.map(reponse => {
                const nb_rep = question.reponse[reponse.libelle] || 0;
                return { ...reponse, nb_rep };
              }),
            };
          }
          return question;
        });
    }


    useEffect(() => {
        const formatReponses = async () => {
            try {
                const reponses = [
                    {
                      _id: '63f0db605782f0bbf9675f2f',
                      name: 'Question 1',
                      reponse: { '1': 2, '2': 3, '3': 3 }
                    },
                    { 
                        _id: '63f0e5480e25fe2fbd610b2f', 
                        name: 'Question 2',
                        reponse: { '1': 1, '2': 2 } ,
                    }
                ]
    
                const questions = await getQuestions(reponses);
                const result = assemble(reponses,questions)
                console.log(result)
                setReponses(result)       
                setLoader(true)
    
            } catch (error) {
                console.error(error);
            }
        }
        
        formatReponses();
        
    }, []);






    return (
        <>
            {loader===true?(
                <div>
                    {reponses.map((question) => (
                        <div key={question._id}>
                        <h3>{question.libelle}</h3>
                        <ul>
                            {question.reponses.map((reponse) => (
                            <li
                                key={reponse._id}
                                className={reponse.isCorrect ? 'reponse_true' : 'reponse_false'}
                            >
                                Réponse {reponse.libelle}: {reponse.nb_rep}
                            </li>
                            ))}
                        </ul>
                        </div>
                    ))}
                </div>
                
            ):
            (
                <div className="dot-flashing"></div>
            )
            }
        </>
    )
}

export default QuizzStatDetail
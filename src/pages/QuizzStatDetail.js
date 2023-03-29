import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import './QuizzStatDetail.css';

const QuizzStatDetail = () => {
    //État pour stocker les réponses et gérer l'affichage du loader
    const [reponses, setReponses] = useState([]);
    const [loader, setLoader] = useState(false);

    //Recuperation de l'id dans l'url
    const { id } = useParams();

     // Hook pour accéder à l'API privée avec un token d'accès actualisé automatiquement si nécessaire
    const axiosPrivate = useAxiosPrivate();

    // Fonction pour récupérer les données des questions en fonction de leur ID
    const getQuestions = async (questions) => {
        const promises = questions.map((question) => {
        return axiosPrivate
            .get(`/question/${question.id}`)
            .then((response) => response.data)
            .catch((error) => console.error(error));
        });
        return Promise.all(promises);
    };

  // Fonction pour fusionner les réponses avec les données des questions correspondantes
    const assemble = (answers, questions) => {

        const mergedArray = questions.map((question) => {
            const answerObj = answers.find((answer) => answer.id === question._id);
          
            if (answerObj) {
              question.reponses = question.reponses.map((reponse) => {
                const answerCount = answerObj.reponse[reponse.libelle];
                return { ...reponse, nb_rep: answerCount ? answerCount : 0 };
              });
            } else {
              question.reponses = question.reponses.map((reponse) => {
                return { ...reponse, nb_rep: 0 };
              });
            }
          
            return question;
        });
        return mergedArray

    };

  //useEffect pour récupérer et formater les données des réponses et des questions au chargement de la page
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axiosPrivate.get(`/session/${id}`);
                if(response) {
                    // Récupération des données des questions correspondantes
                    const questions = await getQuestions(response.data.reponses);
                    const result = assemble(response.data.reponses, questions);
                    // Enregistrement des données des réponses formatées dans le state
                    setReponses(result);
                    console.log(result)
                    // Changement de l'état du loader à "true"
                    setLoader(true);

                }
                } catch (err) {
                    console.log(err);
                    
            }

        };
        fetchSession();
    }, [axiosPrivate]);

  // Rendu conditionnel en fonction de l'état du loader
    return (
        <>
            {loader ? (
                <div className="quizz_session_details">
                    {reponses.map((question) => {
                        const questionTotal = question.reponses.reduce(
                            (acc, curr) => acc + curr.nb_rep,
                            0
                        );
                        return (
                            <div key={question._id}>
                            <h3>{question.libelle}</h3>
                            <ul>
                                {question.reponses.map((reponse) => {
                                    const percentage = (
                                        (reponse.nb_rep / questionTotal) *
                                        100
                                    ).toFixed(1);
                                    return (
                                        <li
                                        key={reponse._id}
                                        className={
                                            reponse.isCorrect
                                            ? 'reponse_true'
                                            : 'reponse_false'
                                        }
                                        >
                                            <div className="progress-bar-container">
                                                <div
                                                className="progress-bar"
                                                style={{ width: `${percentage}%` }}
                                                ></div>
                                                <span className="percentage-label">
                                                {percentage}% ({reponse.libelle})
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <p className='total_rep'>Nombre total de réponses : {questionTotal}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="dot-flashing"></div>
            )}
        </>
    );};

export default QuizzStatDetail
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import './QuizzStatDetail.css';

const QuizzStatDetail = () => {
    // State pour les réponses et le loader
    const [reponses, setReponses] = useState([]);
    const [loader, setLoader] = useState(false);

    // Hook pour accéder à l'API privée avec un accès token rafraîchi automatiquement si nécessaire
    const axiosPrivate = useAxiosPrivate();

    // Fonction pour récupérer les données des questions en fonction de leur ID
    const getQuestions = async (questions) => {
        const promises = questions.map((question) => {
        return axiosPrivate
            .get(`/question/${question._id}`)
            .then((response) => response.data)
            .catch((error) => console.error(error));
        });
        return Promise.all(promises);
    };

  // Fonction pour fusionner les réponses avec les données des questions correspondantes
    const assemble = (array1, array2) => {
        return array1.map((question) => {
        const question2 = array2.find((q) => q._id === question._id);
        if (question2) {
            return {
                ...question2,
                reponses: question2.reponses.map((reponse) => {
                    const nb_rep = question.reponse[reponse.libelle] || 0;
                    return { ...reponse, nb_rep };
                }),
            };
        }
        return question;
        });
    };

  // Effet pour récupérer et formater les données des réponses et des questions au chargement de la page
    useEffect(() => {
        const formatReponses = async () => {
            try {
                // Données des réponses initiales
                const reponses = [
                    {
                        _id: '63f0db605782f0bbf9675f2f',
                        libelle: 'Question 1',
                        reponse: { '1': 2, '2': 3, '3': 3 },
                    },
                    {
                        _id: '63f0e5480e25fe2fbd610b2f',
                        libelle: 'Question 2',
                        reponse: { '1': 1, '2': 2 },
                    },
                ];
                // Récupération des données des questions correspondantes
                const questions = await getQuestions(reponses);
                // Fusion des données des réponses et des questions
                const result = assemble(reponses, questions);
                // Enregistrement des données des réponses formatées dans le state
                setReponses(result);
                // Changement de l'état du loader à "true"
                setLoader(true);
            } catch (error) {
                console.error(error);
            }
        };
        formatReponses();
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
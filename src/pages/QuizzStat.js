import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const QuizzStat =() => {
    const [quizzData,setQuizzData]=useState([{}])
    const [loader,setLoader] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
    }


    useEffect(() => {
        const quizzes = [{quizz_id:'63f0db555782f0bbf9675f2a',date:'14/03/2023, 08:33',session_name:'L3 TD1 Web',_id:1},
                        {quizz_id:'63f0db555782f0bbf9675f2a',date:'17/03/2023, 14:53',session_name:'L2 TD2 Web',_id:2},
                        {quizz_id:'63f0db555782f0bbf9675f2a',date:'15/03/2023, 11:49',session_name:'L1 TD1 Web',_id:3}]
        setQuizzData(quizzes)       
        setLoader(true)
    }, []);

    function parseCustomDate(dateString) {
        const [day, month, yearAndTime] = dateString.split('/');
        const [year, time] = yearAndTime.split(', ');
        return new Date(`${year}-${month}-${day}T${time}`);
    }

    const handleChange = (event) => {
        setSelectedOption(event.target.value);


        if(event.target.value==="name"){
            let quizzes = quizzData;
            quizzes.sort((a, b) => a.session_name.localeCompare(b.session_name));
            console.log(quizzes)
            setQuizzData(quizzes)
        }else if(event.target.value==="date"){
            let quizzes = quizzData;
            quizzes.sort((a, b) => {
                const dateA = parseCustomDate(a.date);
                const dateB = parseCustomDate(b.date);
                return dateA - dateB;
            });
            console.log(quizzes)
            setQuizzData(quizzes)
        }
    };

    const navigate = useNavigate();
    return (
        <>
        {loader===true?(
            <div className='content_main'>

            <div className='search_session'>
                <input 
                type='text' 
                placeholder='Rechercher par nom ...' 
                name='searchBar'
                onChange={handleSearchTerm}
                />

            <select value={selectedOption} onChange={handleChange}>
                <option value="">Trier par :</option>
                <option value="name">Nom</option>
                <option value="date">Date</option>
            </select>
            </div>

            {quizzData.length>0&&(
                <div className='quizz_display'>
                    <ul>
                        {quizzData
                            .filter((val) => {
                                return val.session_name.includes(searchTerm);
                                })
                            .map((val,index) => {
                            return (
                                <li className='quizz quizz_stat' key={index} onClick={()=>{navigate(`/mesquizz/stat/details/${val._id}`)}}>
                                    <p className='quizz_name'>{`Session ${val.session_name} du ${val.date}`}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
            </div>
        ):
        (
            <div className="dot-flashing"></div>
        )
        }
        </>
    )
}

export default QuizzStat
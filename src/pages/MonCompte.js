import React,{useState}from 'react'
import InputComp from '../component/Input/InputComp'

const MonCompte = () => {
    const [userEmail, setUserEmail] = useState('')
    const [loader,setLoader]= useState(true)

    return (
        <div className='create_update_quizz_form'>
        <h2>Mon compte</h2>


        {loader===true? (<form onSubmit={(e) => e.preventDefault()}>

            <InputComp 
                placeholder={"Email"}
                setValue={setUserEmail}
                modalValue={userEmail}
                inputType={"text"}
                required={true}
                erreur={""}
                className={'input_field'}
                label={"Email"}
            />

            <input type="submit" value="Modifier" />
            
            </form>):
            (
                <div className="dot-flashing"></div>
            )}
        
            
        </div>
    )
}

export default MonCompte
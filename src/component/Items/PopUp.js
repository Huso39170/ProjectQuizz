import React from 'react'
import './PopUp.css'

const PopUp = (props) => {
	return (
		<div className='pop_up'>
			<input type="checkbox" id="one" className="hidden" name="ossm"/>  
			<label htmlFor="one" className="alert-message" style={{background: props.Succes ? 'green' : 'red'}} >
				{props.Type === 'create'&&<p>{props.Succes ? 'Création réussie' : 'Création échouée'}</p>}
				{props.Type === 'update'&&<p>{props.Succes ? 'Modification réussie' : 'Modification échouée'}</p>}
				{props.Type === 'delete'&&<p>{props.Succes ? 'Suppression réussie' : 'Suppression échouée'}</p>}
			</label>
		</div>                         
	)
}

export default PopUp
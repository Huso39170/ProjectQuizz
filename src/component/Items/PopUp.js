import React from 'react'
import './PopUp.css'
const PopUp = () => {
	return (
		<div className='pop_up'>


			<input type="checkbox" id="one" className="hidden" name="ossm"/>  
			<label htmlFor="one" className="alert-message">
				<strong> <i className="fa fa-heart"></i> Attention</strong> CSS is Awesome, click me  !! ...
				<span className="close">×</span>
			</label> 
		</div>
	)
}

export default PopUp
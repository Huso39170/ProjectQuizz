import React from 'react'
import "./Header.css"
import { FaUserAlt } from 'react-icons/fa'

const Navbar = () => {
  return (
		<div className='header'>
			<h2>Quizzeo</h2>
			<FaUserAlt className='header_account' role='button' title='Compte'/>
		</div>
  )
}

export default Navbar
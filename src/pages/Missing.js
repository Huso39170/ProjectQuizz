import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main>
        <h2>Page non trouvé</h2>
        <p>
            <Link to= '/' >Retour à la page d'acceuil</Link>
        </p>
    </main>
  )
}

export default Missing
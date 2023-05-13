import React from 'react'
import './FormUser.css'




const FormUser = () => {

  return (
    <form autoComplete='off'>
        <br/>
        
        <div className="form-group">
            <label htmlFor="typeCompte" className="form-label">Type Compte</label>
            <select className='form-select' name='typeCompte' >
                <option value="Dropbox">Dropbox</option>
                <option value="Dropbox">OneDrive</option>
                <option value="Dropbox">Google Drive</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" type='email' name="email" placeholder='Enter your email' />
        </div>

        <div className="form-group">
            <label htmlFor="cle" className="form-label">Clé</label>
            <input id="cle" type='text' name="cle" placeholder='Enter your key' />
        </div>

        <div className="form-group">
            <label htmlFor="name" className="form-label">Nom</label>
            <input id="name" type='text' name="name" placeholder='Enter your name'/>
        </div>
    </form>
  )
}

export default FormUser
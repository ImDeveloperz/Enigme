import React, { useEffect } from 'react'
// import AuthUser from './utils/AuthUser'

import ProfileEdit from './ProfileEdit';
// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProfileView from './ProfileView';
// import { useStateContext } from '../config/AuthContext';
import axiosClient from '../axios-client';

const Profile = () => {
  // const { user } = AuthUser()
  // const { user, token, setUser,setToken } = useStateContext();
  // useEffect(() => {
  //   axiosClient.get('/user')
  //     .then(({data}) => {
  //        setUser(data)
  //     })
  // }, [])
  return (
    <div>
        {/* <Routes>
          <Route path='/:id' element={<ProfileEdit/>}/>
          <Route path='/'  element={<ProfileView/>}/>
        </Routes> */}
        <ProfileView/>
    </div>
    
  )
}

export default Profile
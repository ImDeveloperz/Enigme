'use-client'
import {createContext,useContext,useEffect,useState} from "react"


const StateContext =createContext({
    currentUser : null,
    token: null,
    setUser : ()=>{},
    setToken : ()=>{}
})

export const AuthContext =({children})=>{
    const [user ,setUser]=useState({})
    const [token,_setToken]=useState();
    const  setToken=(token) => {
        _setToken(token);
        if(token) localStorage.setItem('ACCESS_TOKEN',token);
        else localStorage.removeItem('ACCESS_TOKEN');
      }
    useEffect(()=>{ 
          // 👉️ true
    _setToken(localStorage.getItem('ACCESS_TOKEN'));
   
    }
,[]  )


           return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }} >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () =>useContext(StateContext)
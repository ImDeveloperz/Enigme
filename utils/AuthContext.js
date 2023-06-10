'use-client'
import {createContext,useContext,useEffect,useState} from "react"


const StateContext =createContext({
    currentUser : null,
    token: null,

    tokenAccess :null,
    countId: 23,
    setCountId:()=>{},
    codeCloud : null,
    setCodeCloud : ()=>{},
    setTokenAccess : ()=>{},
    setUser : ()=>{},
    setToken : ()=>{}
})

export const AuthContext =({children})=>{
    const [user ,setUser]=useState({})
    const [token,_setToken]=useState();

    const [codeCloud,_setCodeCloud]=useState();
    const [countId,_setCountId]=useState()
    const [tokenAccess,_setTokenAccess]=useState();
    const setTokenAccess=(token)=>{
        _setTokenAccess(token)
        if(token) localStorage.setItem('TOKEN_ACCESS',token);
        // else localStorage.removeItem('TOKEN_ACCESS');
    }
    const setCountId=(id)=>{
        _setTokenAccess(id)
        if(id) localStorage.setItem('COUNT_ID',id);
        // else localStorage.removeItem('TOKEN_ACCESS');
    }
    const setCodeCloud=(token)=>{
        _setTokenAccess(token)
        if(token) localStorage.setItem('CODE_CLOUD',token);
        // else localStorage.removeItem('TOKEN_ACCESS');
    }

    const  setToken=(token) => {
        _setToken(token);
        if(token) localStorage.setItem('ACCESS_TOKEN',token);
        else localStorage.removeItem('ACCESS_TOKEN');
      }
    useEffect(()=>{ 
          // 👉️ true

          _setCountId(localStorage.getItem('COUNT_ID'))
          _setCodeCloud(localStorage.getItem('CODE_CLOUD'))
          _setTokenAccess(localStorage.getItem('TOKEN_ACCESS'))

    _setToken(localStorage.getItem('ACCESS_TOKEN'));
   
    }
,[]  )


           return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,

            setToken,
            setCountId,
            countId,
            setCodeCloud,
            codeCloud,
            setTokenAccess,
            tokenAccess
        }} >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () =>useContext(StateContext)
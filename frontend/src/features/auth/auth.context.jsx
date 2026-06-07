import { createContext , useState} from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(false) //set it true in production

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
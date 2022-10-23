import React from "react";
import { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { isEnumDeclaration } from "typescript";


export function useAuthuser() {
    return useContext(UserContext)
}

export type Authuser = {
    firstName: string
    lastName: string
    email: string
}
type UserContextType = {
    user: Authuser | null
    setUser: React.Dispatch<React.SetStateAction<Authuser | null>>
}
type UserContextProviderProps = {
    children: React.ReactNode
}
//export const UserContext = createContext<UserContextType | null>(null)
//with above isEnumDeclaration, we will have to check for null each time will call the context

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({children}:UserContextProviderProps) => {
    const [user, setUser] = useState<Authuser | null>(null)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}


/*
export function AuthUserProvider({children}:any) {
    const [authUser, setUser] = useState({"firstName":"", "lastName":"","email":""})
    //const [authUser, setUser] = useState({})
    //const [user, setUser] = useState({"firstName":"", "lastName":""})
    const [isuserAuth, setUserAuth] = useState(false)
    const [userName, setUserName] = useState('')

    //const updateAuthUser = (u:any) => {
       // setUser(u)
   // }

    const updateAuthUserName = (authUserName: "") => {
        setUserName("")
    }

    function updateUserName(name:""){
        setUserName(name)
    }


    useEffect(()=>{
        (
            async () => fetch("http://localhost:8086/api/user", {
                headers: {'Content-Type':'application/json'},
                credentials: 'include'
            }).then(resp => {
                console.log()
                const contentType = resp.headers.get("content-type")
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    console.log("the resp", resp)
                    resp.json().then(d=> {
                        console.log("the resp d", d.data)
                        setUser(d.data.user);
                        if(d.data.user.id) {
                            setUserAuth(true);
                            Cookies.set("reloaded", "false");
                        }
                    })
                } else {
                    console.log("User not found")
                }
            }).catch(err=>{
                console.log("User not found",err)
            })
        )();
    },[isuserAuth])






    return (
        <UserContext.Provider value={{authUser}} >
        {children}
    
        </UserContext.Provider>
    
    )
}

*/
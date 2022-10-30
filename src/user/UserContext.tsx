import React from "react";
import { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { isEnumDeclaration } from "typescript";
import { ITask } from "../components/task/taskinterface";


export function useAuthuser() {
    return useContext(UserContext)
}

export type Authuser = {
    firstName: string
    lastName: string
    email: string
    roles: string[]
    profileImagePath: string,
    tasks:ITask[]
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


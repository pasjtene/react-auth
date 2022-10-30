import React from "react";
import { createContext, useContext, useState } from "react";
//import { theme } from "./Theme";

export function useThemeContext() {
    return useContext(ThemeContext)
}

/*
export type ThemeSave ={
    bgColor: string,
    textColor: string,
    debugBorder: string

}
*/
export type Theme ={
    primary: {
        color: string,
        backgroundColor: string,
        padding: string,
        //fontFamily: "Sans-Serif"
        fontFamily: string,
        border: string

    },
    secondary: {
        color: string,
        backgroundColor: string,
        padding: string,
        //fontFamily: "Sans-Serif"
        fontFamily: string,
        border: string
    }
    
}


type ThemeContextType = {
    theme: Theme| null
    setTheme: React.Dispatch<React.SetStateAction<Theme | null>>
}


type ThemContextProviderProps = {
    children: React.ReactNode
}
export const ThemeContext = createContext({} as ThemeContextType)

export const ThemContextProvider = ({children}: ThemContextProviderProps) => {
    const [theme, setTheme] = useState<Theme | null>(null)

return <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
}
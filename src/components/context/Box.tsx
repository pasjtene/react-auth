import React from "react"
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import { useThemeContext } from "./ThemeContext"

export const Box = () => {





    //const theme = useContext(ThemeContext)

    const theme = useThemeContext()
    /*
    theme?.setTheme({
        primary: {
            main: '#fff',
            text: '#fff'
        },
    
        secondary: {
            main: '#f50057',
            text: '#fff'
        }
      })  
      */

      

    const changeTheme = () => {
        theme?.setTheme({
            bgColor: '#231942',
            textColor: '#fff',
        
          })  
     }



          
    return <div onClick={changeTheme}   style={{backgroundColor: theme.theme?.bgColor, color: theme.theme?.textColor}}>Theme context</div>
}
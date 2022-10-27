import React from "react"
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import { useThemeContext } from "./ThemeContext"

export const Box = () => {





    //const theme = useContext(ThemeContext)

    const theme = useThemeContext()
    
      const changeTheme = () => {
        theme?.setTheme({
            primary: {
                color: '#fff',
                backgroundColor: '#231942',
                padding: '2px',
                //fontFamily: "Sans-Serif"
                fontFamily: "Sans-Serif",
                border: ""
        
            },
            secondary: {
                color: "#1c1e21",
                backgroundColor: "#CCCCCC;",
                padding: "2px",
                //fontFamily: "Sans-Serif"
                fontFamily: "Sans-Serif",
                border: "1px solid #F2F3F5"
            }
        
          })  
     }

      
/*
style={{  backgroundColor: theme.theme?.bgColor, color: theme.theme?.textColor, border:theme.theme?.debugBorder}}>Theme context</div>
    const changeTheme = () => {
        theme?.setTheme({
            bgColor: '#231942',
            textColor: '#fff',
            debugBorder: 'none'
        
          })  
     }
*/


          
    return <div onClick={changeTheme}  style={{ ...theme.theme?.primary}}>Theme context</div> 
    
}
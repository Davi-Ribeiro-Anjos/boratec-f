import { ReactNode, createContext, useState } from "react";

import { getCookie, setCookie } from "../services/Cookies";


interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    console.log("theme provider")

    const [theme, setTheme] = useState(getCookie("theme"))

    const changeTheme = () => {
        if (theme === "light") {
            setCookie("theme", "dark", 100)
            setTheme("dark")
        }
        if (theme === "dark") {
            setCookie("theme", "light", 100)
            setTheme("light")
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
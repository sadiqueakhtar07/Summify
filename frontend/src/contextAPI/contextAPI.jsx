import { createContext, useState } from "react";

export const MyContext = createContext(null);

const MyContextProvider = (props) => {
    const [showSignup, setShowSignup] = useState(false);
    const [token, setToken] = useState("");
    const [userRole, setUserRole] = useState("");
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [activePage, setActivePage] = useState("home");

    const providerValues = {
        showSignup, setShowSignup,
        token, setToken,
        userRole, setUserRole,      
        selectedHistory, setSelectedHistory,
        activePage, setActivePage
    };

    return (
        <MyContext.Provider value={providerValues}>
            {props.children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
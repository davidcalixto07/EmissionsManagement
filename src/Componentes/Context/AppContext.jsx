import React, { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const AppContext = React.createContext();


function AppProvider({ children }) {

    const [tenant, setTenant] = useState('colwest2');

    useEffect(() => {
        const tentninfourl = 'api/tenantmanagement/v4/tenantInfo';
        axios.get(tentninfourl)
            .then(response => {
                console.log("TenantResponse ", response.data)
                setTenant(response.data.prefix ?? '');
            })
            .catch(error => {
                console.warn("Error Getting Data");
                setTenant('colwest2')
            });

    }, []);



    return (
        <AppContext.Provider value={{
            tenant
        }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };

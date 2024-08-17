
import React, { createContext, useContext, useEffect, useState } from "react";
import AccountApi from "src/api/accounts";
import { getFormData } from "src/api/api-requests";
import useFunction, { UseFunctionReturnType,DEFAULT_FUNCTION_RETURN } from "src/hooks/use-function";
import { Account } from "src/types/account";

interface contextValue {
    getUsersApi: UseFunctionReturnType<FormData, { data: Account[] }>
    getDoctorsApi?: UseFunctionReturnType<FormData, { data: Account[] }>
    getManagersApi?: UseFunctionReturnType<FormData, { data: Account[] }>
    createUsers?: (requests: Omit<Account, "id">) => Promise<void>;
    updateUsers?: (user: Partial<Account>) => Promise<void>;
    deleteUsers?: (id: string) => Promise<void>;
}

export const UsersContext = createContext<contextValue>({
    getUsersApi:DEFAULT_FUNCTION_RETURN,
    getDoctorsApi:DEFAULT_FUNCTION_RETURN,
    getManagersApi:DEFAULT_FUNCTION_RETURN,
    createUsers: async () => {},
    updateUsers: async () => {},
    deleteUsers: async () => {},
});

const UsersProvider = ({children}: {children: React.ReactNode}) => {
    const getUsersApi =useFunction(AccountApi.getAccount);
    const getDoctorsApi = useFunction(AccountApi.getAccount);
    const getManagersApi = useFunction(AccountApi.getAccount);
    useEffect(() => {
        const userRolePatient = getFormData({role: "patient"});
        // const userRoleDoctor = getFormData({role: "doctor"});
        // const userRoleManager = getFormData({role: "manager"});
        getUsersApi.call(userRolePatient);
        // getDoctorsApi.call(userRoleDoctor);
        // getManagersApi.call(userRoleManager);
    },[]);
    return (
        <UsersContext.Provider 
            value={{
                getUsersApi,
                getDoctorsApi,
                getManagersApi
            }}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext);

export default UsersProvider;


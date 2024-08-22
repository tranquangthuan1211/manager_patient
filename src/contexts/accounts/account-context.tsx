import { createContext, ReactNode, useEffect, useContext, use } from "react";
import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
import { Account } from "src/types/account";
import AccountApi from "src/api/accounts";
import { getFormData } from "src/api/api-requests";
interface contextValue {
    getAccountPatients : UseFunctionReturnType<FormData, any>;
    getAccountDoctors : UseFunctionReturnType<FormData, any>;
    getAccountManagers : UseFunctionReturnType<FormData, any>;
    createAccount?: (requests: Partial<Account>) => Promise<void>;
    updateAccount?: (activity: Account) => Promise<void>;
    deleteAccount?: (ids: string[], role: string) => Promise<void>;
}

export const AccountContext = createContext<contextValue>({
    getAccountPatients: DEFAULT_FUNCTION_RETURN,
    getAccountDoctors: DEFAULT_FUNCTION_RETURN,
    getAccountManagers: DEFAULT_FUNCTION_RETURN,
});

const AccountProvider = ({ children }:{ children: ReactNode }) => {
    const getAccountPatients = useFunction(AccountApi.getAccount);
    const getAccountDoctors = useFunction(AccountApi.getAccount);
    const getAccountManagers = useFunction(AccountApi.getAccount);

    useEffect(() => {
        const patientsRequest = getFormData({role: "patient"});
        const doctorsRequest = getFormData({role: "doctor"});
        const officersRequest = getFormData({role: "manager"});

        getAccountPatients.call(patientsRequest);
        getAccountDoctors.call(doctorsRequest);
        getAccountManagers.call(officersRequest);
    },[])
    return (
        <AccountContext.Provider
            value={{
                getAccountPatients,
                getAccountDoctors,
                getAccountManagers
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}
export const useAccount = () => useContext(AccountContext);
export default AccountProvider;
import { createContext, ReactNode, useEffect, useContext, use, useCallback } from "react";
import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
import { Account } from "src/types/account";
import AccountApi from "src/api/accounts";
import { getFormData } from "src/api/api-requests";
interface contextValue {
    getAccountPatients : UseFunctionReturnType<FormData, any>;
    getAccountDoctors : UseFunctionReturnType<FormData, any>;
    getAccountManagers : UseFunctionReturnType<FormData, any>;
    createAccount?: (requests: Partial<Account>) => Promise<void>;
    updateAccount: (account: Partial<Account>) => Promise<void>;
    deleteAccount: (id: string, role: string) => Promise<void>;
}

export const AccountContext = createContext<contextValue>({
    getAccountPatients: DEFAULT_FUNCTION_RETURN,
    getAccountDoctors: DEFAULT_FUNCTION_RETURN,
    getAccountManagers: DEFAULT_FUNCTION_RETURN,
    updateAccount: async () => {},
    deleteAccount: async () => {}
});

const AccountProvider = ({ children }:{ children: ReactNode }) => {
    const getAccountPatients = useFunction(AccountApi.getAccount);
    const getAccountDoctors = useFunction(AccountApi.getAccount);
    const getAccountManagers = useFunction(AccountApi.getAccount);

    const updateAccount = useCallback(
        async(account: Partial<Account>) => {
            try{
                const response = await AccountApi.updateAccount(account); 
                if(response) {
                    if(account.role === "patient") {
                        getAccountPatients.setData({
                            data: (getAccountPatients.data?.data || []).map((patient: Account) => {
                                if(patient.id === account.id) {
                                    return {...patient, ...account};
                                }
                                return patient;
                            })
                        })
                    }
                    if(account.role === "doctor") {
                        getAccountDoctors.setData({
                            data: (getAccountDoctors.data?.data || []).map((doctor: Account) => {
                                if(doctor.id === account.id) {
                                    return {...doctor, ...account};
                                }
                                return doctor;
                            })
                        })
                    }
                    if(account.role === "manager"){
                        getAccountManagers.setData({
                            data: (getAccountManagers.data?.data || []).map((manager: Account) => {
                                if(manager.id === account.id) {
                                    return {...manager, ...account};
                                }
                                return manager;
                            })
                        })
                    }
                }
            }
            catch(err){
                throw err;
            }
        },
        [
            getAccountPatients,
            getAccountDoctors,
            getAccountManagers
        ]
    );
    const deleteAccount = useCallback(async (id: string, role: string) => {
        try{
            const response = await AccountApi.deleteAccount(id);
            if(response) {
                if(role === "patient") {
                    getAccountPatients.setData({
                        data: (getAccountPatients.data?.data || []).filter((patient: Account) => patient.id !== id)
                    })
                }
                if(role === "doctor") {
                    getAccountDoctors.setData({
                        data: (getAccountDoctors.data?.data || []).filter((doctor: Account) => doctor.id !== id)
                    })
                }
                if(role === "manager") {
                    getAccountManagers.setData({
                        data: (getAccountManagers.data?.data || []).filter((manager: Account) => manager.id !== id)
                    })
                }
            }
        }
        catch(err){
            throw err;
        }
    },[getAccountPatients, getAccountDoctors, getAccountManagers]);
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
                getAccountManagers,
                updateAccount,
                deleteAccount
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}
export const useAccount = () => useContext(AccountContext);
export default AccountProvider;
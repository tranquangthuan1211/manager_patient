import { createContext, ReactNode, useEffect, useContext, use, useCallback } from "react";
import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
import { Account, initialAccount } from "src/types/account";
import AccountApi from "src/api/accounts";
import { getFormData } from "src/api/api-requests";
import useAppSnackbar from "src/hooks/use-app-snackbar";
import PaitientsApi from "src/api/patients";
interface contextValue {
    getAccountPatients : UseFunctionReturnType<FormData, any>;
    getAccountDoctors : UseFunctionReturnType<FormData, any>;
    getAccountManagers : UseFunctionReturnType<FormData, any>;
    createAccount: (requests: Partial<Account>) => Promise<void>;
    createAccounts: (requests: Partial<Account[]>) => Promise<void>;
    updateAccount: (account: Partial<Account>) => Promise<void>;
    deleteAccount: (id: string, role: string) => Promise<void>;
}

export const AccountContext = createContext<contextValue>({
    getAccountPatients: DEFAULT_FUNCTION_RETURN,
    getAccountDoctors: DEFAULT_FUNCTION_RETURN,
    getAccountManagers: DEFAULT_FUNCTION_RETURN,
    createAccount: async () => {},
    createAccounts: async () => {},
    updateAccount: async () => {},
    deleteAccount: async () => {}
});

const AccountProvider = ({ children }:{ children: ReactNode }) => {
    const { showSnackbarError, showSnackbarSuccess } = useAppSnackbar();
    const getAccountPatients = useFunction(AccountApi.getAccount);
    const getAccountDoctors = useFunction(AccountApi.getAccount);
    const getAccountManagers = useFunction(AccountApi.getAccount);
    const createAccount = useCallback(
        async(request: Partial<Account>) => {
            try{
                const response = await AccountApi.createAccount(request);
                // if(response.error !== 0) {
                //     console.log(response.message);  
                //     showSnackbarError(response.message);
                //     return;
                // } 
                if(response) {
                    if(request.role === "patient") {
                        const newAccount = [
                            {
                                ...initialAccount,
                                ...request,
                                ...response
                            },
                            ...(getAccountPatients.data?.data || [])
                        ];
                        getAccountPatients.setData({
                            data: newAccount
                        });
                    }
                    if(request.role === "doctor") {
                        const newAccount = [
                            {
                                ...initialAccount,
                                ...request,
                                ...response
                            },
                            ...(getAccountDoctors.data?.data || [])
                        ];
                        getAccountDoctors.setData({
                            data: newAccount
                        });
                    }
                    if(request.role === "manager") {
                        const newAccount = [
                            {
                                ...initialAccount,
                                ...request,
                                ...response
                            },
                            ...(getAccountManagers.data?.data || [])
                        ];
                        getAccountManagers.setData({
                            data: newAccount
                        });
                    }
                }
            }
            catch(error){
                console.log(error)
                showSnackbarError(error.message);
            }
        },
    [
        getAccountPatients,
        getAccountDoctors,
        getAccountManagers
    ]);
    const createAccounts = useCallback(
        async(request: Partial<Account[]>) => {
            try{
                const response = await AccountApi.createManyAccounts(request);
                if (response) {
                    if (request[0]?.role === "patient") {
                      const newAccount = [
                        {
                          ...initialAccount,
                          ...request,
                          ...response,
                        },
                        ...(getAccountPatients.data?.data || []),
                      ];
                      getAccountPatients.setData({
                        data: newAccount,
                      });
                    }
          
                    if (request[0]?.role === "doctor") {
                      const newAccount = [
                        {
                          ...initialAccount,
                          ...request,
                          ...response,
                        },
                        ...(getAccountDoctors.data?.data || []),
                      ];
                      getAccountDoctors.setData({
                        data: newAccount,
                      });
                    }
          
                    if (request[0]?.role === "manager") {
                      const newAccount = [
                        {
                          ...initialAccount,
                          ...request,
                          ...response,
                        },
                        ...(getAccountManagers.data?.data || []),
                      ];
                      getAccountManagers.setData({
                        data: newAccount,
                      });
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
    const updateAccount = useCallback(
        async(account: Partial<Account>) => {
            try{
                const response = await AccountApi.updateAccount(account); 
                console.log(response);
                if(response) {
                    if(account.role === "patient") {
                        getAccountPatients.setData({
                            data: (getAccountPatients.data?.data || []).map((patient: Account) => {
                                if(patient._id === account._id) {
                                    return {...patient, ...account};
                                }
                                return patient;
                            })
                        })
                    }
                    if(account.role === "Doctor") {
                        getAccountDoctors.setData({
                            data: (getAccountDoctors.data?.data || []).map((doctor: Account) => {
                                if(doctor._id === account._id) {
                                    return {...doctor, ...account};
                                }
                                return doctor;
                            })
                        })
                    }
                    if(account.role === "manager"){
                        getAccountManagers.setData({
                            data: (getAccountManagers.data?.data || []).map((manager: Account) => {
                                if(manager._id === account._id) {
                                    return {...manager, ...account};
                                }
                                return manager;
                            })
                        })
                    }
                }
            }
            catch(error:any){
                showSnackbarError(error.message);
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
                        data: (getAccountPatients.data?.data || []).filter((patient: Account) => patient._id !== id)
                    })
                }
                if(role === "Doctor") {
                    getAccountDoctors.setData({
                        data: (getAccountDoctors.data?.data || []).filter((doctor: Account) => doctor._id !== id)
                    })
                }
                if(role === "manager") {
                    getAccountManagers.setData({
                        data: (getAccountManagers.data?.data || []).filter((manager: Account) => manager._id !== id)
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
        const doctorsRequest = getFormData({role: "Doctor"});
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
                createAccount,
                createAccounts,
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
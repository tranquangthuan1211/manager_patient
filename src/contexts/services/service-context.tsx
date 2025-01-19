import {createContext, FC, ReactNode, useCallback, useContext, useEffect} from  'react';
import useFunction, { DEFAULT_FUNCTION_RETURN, UseFunctionReturnType } from 'src/hooks/use-function';
import {initialService, Service} from "src/types/service";
import { useAuth } from 'src/hooks/use-auth';
import ApiService from "src/api/services";

interface contextValue {
    getServiceClinicApi: UseFunctionReturnType<FormData, {data: Service[]}>;
    setServices?: (services: Service[]) => void;
    createService: (service: Service) => void;
    updateService: (service: Service) => void;
}

export const ServiceContext = createContext<contextValue>({
    getServiceClinicApi: DEFAULT_FUNCTION_RETURN,
    setServices: () => {},
    createService: () => {},
    updateService: () => {}
});

const ServiceProvider: FC<{children: ReactNode}> = ({children}) => {
    const getServiceClinicApi = useFunction(ApiService.getServiceClinic);
    const {user} = useAuth();
    const updateService = useCallback(
            async(account: Partial<Service>) => {
                try{
                    const response = await ApiService.updateAccount(account); 
                    getServiceClinicApi.setData(
                        {
                            data: (getServiceClinicApi.data?.data || []).map((manager: Service) => {
                                if(manager._id === account._id) {
                                    return {...manager, ...account};
                                }
                                return manager;
                            })
                        }
                    )
                }
                catch(error:any){
                    // showSnackbarError(error.message);
                }
            },
            [
                getServiceClinicApi
            ]
        );
    const createService = useCallback(
            async(request: Partial<Service>) => {
                try{
                    const response = await ApiService.createService(request);
                          const newAccount = [
                            {
                              ...initialService,
                              ...request,
                              ...response,
                            },
                            ...(getServiceClinicApi.data?.data || []),
                          ];
                          getServiceClinicApi.setData({
                            data: newAccount,
                          });
              
                }
                catch(err){
                    throw err;
                }
            },
            [
                getServiceClinicApi
            ]
        );
    useEffect(() => {
        getServiceClinicApi.call(new FormData());
    },[]);
    return (
        <ServiceContext.Provider
            value={{
                getServiceClinicApi,
                createService,
                updateService

            }}
        >
            {children}
        </ServiceContext.Provider>
    );
}
export const useService = () => useContext(ServiceContext);
export default ServiceProvider;
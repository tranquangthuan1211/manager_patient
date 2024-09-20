import {createContext, FC, ReactNode, useContext, useEffect} from  'react';
import useFunction, { DEFAULT_FUNCTION_RETURN, UseFunctionReturnType } from 'src/hooks/use-function';
import {Service} from "src/types/service";
import ApiService from "src/api/services";

interface contextValue {
    getServiceClinicApi: UseFunctionReturnType<FormData, Service[]>;
    setServices?: (services: Service[]) => void;
}

export const ServiceContext = createContext<contextValue>({
    getServiceClinicApi: DEFAULT_FUNCTION_RETURN,
    setServices: () => {},
});

const ServiceProvider: FC<{children: ReactNode}> = ({children}) => {
    const getServiceClinicApi = useFunction(ApiService.getServiceClinic);

    useEffect(() => {
        getServiceClinicApi.call(new FormData());
    },[]);
    return (
        <ServiceContext.Provider
            value={{
                getServiceClinicApi
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
}
export const useService = () => useContext(ServiceContext);
export default ServiceProvider;
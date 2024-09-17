import {createContext, FC, ReactNode, useContext, useEffect} from  'react';
import useFunction, { DEFAULT_FUNCTION_RETURN, UseFunctionReturnType } from 'src/hooks/use-function';
import {Service} from "src/types/service";
import ApiService from "src/api/services";

interface contextValue {
    getServiceApi: UseFunctionReturnType<FormData, Service[]>;
    setServices?: (services: Service[]) => void;
}

export const ServiceContext = createContext<contextValue>({
    getServiceApi: DEFAULT_FUNCTION_RETURN,
    setServices: () => {},
});

const ServiceProvider: FC<{children: ReactNode}> = ({children}) => {
    const getServiceApi = useFunction(ApiService.getServiceByName);

    useEffect(() => {
        getServiceApi.call(new FormData());
    },[]);
    return (
        <ServiceContext.Provider
            value={{
                getServiceApi
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
}
export const useService = () => useContext(ServiceContext);
export default ServiceProvider;
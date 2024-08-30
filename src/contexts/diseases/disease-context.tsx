import DiseaseApi from "src/api/diseases";
import { Disease } from "src/types/diseases";
import useFunction, { UseFunctionReturnType, DEFAULT_FUNCTION_RETURN } from "src/hooks/use-function";
import { createContext, useContext, useEffect } from "react";
import { getFormData } from "src/api/api-requests";
interface contextValue{
    getDiseasesApi: UseFunctionReturnType<FormData,{data:Disease[]}>,
    createDisease?: (requests: Omit<Disease, "id">) => Promise<void>,
    updateDisease?: (doctor: Partial<Disease>) => Promise<void>;
    deleteDisease?: (id: string) => Promise<void>;
}

export const DiseaseContext = createContext<contextValue>({
    getDiseasesApi: DEFAULT_FUNCTION_RETURN,
    createDisease: async () => {},
    updateDisease: async () => {},
    deleteDisease: async () => {},
});

const DiseaseProvider = ({children}: {children: React.ReactNode}) => {
    const getDiseasesApi = useFunction(DiseaseApi.getDiseases);

    useEffect(() => {
        const data = getFormData({
            id:"66b2df6f57fd0d9f23b65d4a"
        })
        getDiseasesApi.call(data)
    },[]);
    return (
        <DiseaseContext.Provider 
            value={{getDiseasesApi}}
        >
            {children}
        </DiseaseContext.Provider>
    )
}

export const useDiseaseContext = () => useContext(DiseaseContext);
export default DiseaseProvider;

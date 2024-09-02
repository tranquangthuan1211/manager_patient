import { ReactNode, FC, use, createContext, useEffect, useContext } from "react";
import useFunction, { DEFAULT_FUNCTION_RETURN, UseFunctionReturnType } from "src/hooks/use-function";
import {Complaint} from "src/types/complaint";
import ComplaintApi from "src/api/complaints";
interface contextValue {
    getComplaintsApi: UseFunctionReturnType<FormData,{data:Complaint[]}>,
}
const ComplaintContext = createContext<contextValue>({
    getComplaintsApi: DEFAULT_FUNCTION_RETURN,
}); 

const ComplaintProvider: FC<{children: ReactNode}> = ({children}) => {
    const getComplaintsApi = useFunction(ComplaintApi.getComplaints);

    useEffect(() => {
        getComplaintsApi.call(new FormData());
    },[]);
    return (
        <ComplaintContext.Provider 
            value={{getComplaintsApi}}
        >
            {children}
        </ComplaintContext.Provider>
    )
}
export const useComplaintContext = () => useContext(ComplaintContext);
export default ComplaintProvider;
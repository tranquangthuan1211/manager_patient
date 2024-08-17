import { createContext, useEffect, useContext } from "react";
import useFunction, { UseFunctionReturnType, DEFAULT_FUNCTION_RETURN } from "src/hooks/use-function";
import { Doctor } from "src/types/doctors";
import DoctorsApi from "src/api/doctor";
interface contextValue {
    getDoctorsApi: UseFunctionReturnType<FormData,Doctor[]>;
    createDoctor?: (requests: Omit<Doctor, "id">) => Promise<void>;
    updateDoctor?: (doctor: Partial<Doctor>) => Promise<void>;
    deleteDoctor?: (id: string) => Promise<void>;
}

export const DoctorContext = createContext<contextValue>({
    getDoctorsApi: DEFAULT_FUNCTION_RETURN,
    createDoctor: async () => {},
    updateDoctor: async () => {},
    deleteDoctor: async () => {},
});
const DoctorProvider = ({children}: {children: React.ReactNode}) => {
    const getDoctorsApi = useFunction(DoctorsApi.getDoctors);

    useEffect(() => {
        getDoctorsApi.call(new FormData());
    },[]);
    return (
        <DoctorContext.Provider 
            value={{getDoctorsApi}}
        >
            {children}
        </DoctorContext.Provider>
    )
}

export const useDoctorsContext = () => useContext(DoctorContext);

export default DoctorProvider;
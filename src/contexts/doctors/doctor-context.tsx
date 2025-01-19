import { createContext, useEffect, useContext, useCallback } from "react";
import useFunction, { UseFunctionReturnType, DEFAULT_FUNCTION_RETURN } from "src/hooks/use-function";
import { Doctor } from "src/types/doctors";
import DoctorsApi from "src/api/doctor";
interface contextValue {
    getDoctorsApi: UseFunctionReturnType<FormData,{data: Doctor[]}>;
    createDoctor?: (requests: Omit<Doctor, "id">) => Promise<void>;
    updateDoctor: (doctor: Partial<Doctor>) => Promise<void>;
    deleteDoctor: (id: string) => Promise<void>;
}

export const DoctorContext = createContext<contextValue>({
    getDoctorsApi: DEFAULT_FUNCTION_RETURN,
    createDoctor: async () => {},
    updateDoctor: async () => {},
    deleteDoctor: async () => {},
});
const DoctorProvider = ({children}: {children: React.ReactNode}) => {
    const getDoctorsApi = useFunction(DoctorsApi.getDoctors);
    const updateDoctor = useCallback(async (doctor: Partial<Doctor>) => {
        try {
            const response = await DoctorsApi.updateDoctor(doctor);
                if(response) {
                getDoctorsApi.setData({
                    data: (getDoctorsApi.data?.data || []).map((item: Doctor) => {
                        if (doctor.id === item.id) {
                            return { ...item, ...doctor };
                        }
                        return item;
                    })
                })
                }
        }
        catch(err) {
            throw err;
        }
        
    },[getDoctorsApi]);
    const deleteDoctor = useCallback(async (id: string) => {
        try {
            const response = await DoctorsApi.deleteDoctor(id);
            if(response) {
                getDoctorsApi.setData(
                    { data: (getDoctorsApi.data?.data || []).filter((item: Doctor) => item.id !== id) }
                );
            }
        }
        catch(err) {
            throw err;
        }
    },[getDoctorsApi]);
    useEffect(() => {
        getDoctorsApi.call(new FormData());
    },[]);
    return (
        <DoctorContext.Provider 
            value={{
                getDoctorsApi,
                updateDoctor,
                deleteDoctor
                
            }}
        >
            {children}
        </DoctorContext.Provider>
    )
}

export const useDoctorsContext = () => useContext(DoctorContext);

export default DoctorProvider;
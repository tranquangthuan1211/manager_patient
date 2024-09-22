import { createContext, use, useCallback, useContext, useEffect } from "react";
import {Appointment} from "src/types/appointment";
import useFunction, {DEFAULT_FUNCTION_RETURN, UseFunctionReturnType} from "src/hooks/use-function";
import AppointmentApi from "src/api/appointments";
import { get } from "lodash";
interface contextValue {
    getAppointments: UseFunctionReturnType<FormData, any>;
    createAppointment?: (requests: Partial<Appointment>) => Promise<void>;
    updateAppointment: (requests: Partial<Appointment>) => Promise<void>;
    deleteAppointment: (id: string) => Promise<void>;
}

const AppointmentContext = createContext<contextValue>({
    getAppointments: DEFAULT_FUNCTION_RETURN,
    createAppointment: async () => {},
    updateAppointment: async () => {},
    deleteAppointment: async () => {}
});

const AppointmentProvider = ({ children }:{ children: React.ReactNode }) => {
    const getAppointments = useFunction(AppointmentApi.getAppointments);

    const updateAppointment = useCallback(async (request: Partial<Appointment>) => {
        console.log(request);
        try{
            const response = await AppointmentApi.updateAppointment(request);
            if(response) {
                getAppointments.setData(
                    (getAppointments.data || []).map((item: Appointment) =>{
                        if(request.id === item.id) {
                            return {...request, ...item};
                        }
                        return item;
                    })
                )
            }
        }
        catch(err){
            throw err;
        }
    }
    ,[getAppointments]);
    const deleteAppointment = useCallback(async (id: string) => {
        try{
            const response = await AppointmentApi.deleteAccount(id);
            if(response) {
                getAppointments.setData(
                    (getAppointments.data || []).filter((item: Appointment) => item.id !== id)
                )
            }
        }
        catch(err){
            throw err;
        }
    },[getAppointments.data]);
    useEffect(() => {
        getAppointments.call(new FormData());
    },[])
    return (
        <AppointmentContext.Provider 
            value={{ 
                getAppointments, 
                updateAppointment,
                deleteAppointment

            }}
        >
            {children}
        </AppointmentContext.Provider>
    )
}
export const useAppointment = () => useContext(AppointmentContext);

export default AppointmentProvider;
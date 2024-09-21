import { createContext, use, useCallback, useContext, useEffect } from "react";
import {Appointment} from "src/types/appointment";
import useFunction, {DEFAULT_FUNCTION_RETURN, UseFunctionReturnType} from "src/hooks/use-function";
import AppointmentApi from "src/api/appointments";
interface contextValue {
    getAppointments: UseFunctionReturnType<FormData, any>;
    createAppointment?: (requests: Partial<Appointment>) => Promise<void>;
    updateAppointment?: (requests: Partial<Appointment>) => Promise<void>;
    deleteAppointment?: (id: string) => Promise<void>;
}

const AppointmentContext = createContext<contextValue>({
    getAppointments: DEFAULT_FUNCTION_RETURN,
    createAppointment: async () => {},
    updateAppointment: async () => {},
    deleteAppointment: async () => {}
});

const AppointmentProvider = ({ children }:{ children: React.ReactNode }) => {
    const getAppointments = useFunction(AppointmentApi.getAppointments);

    useEffect(() => {
        getAppointments.call(new FormData());
    },[])
    return (
        <AppointmentContext.Provider value={{ getAppointments }}>
            {children}
        </AppointmentContext.Provider>
    )
}
export const useAppointment = () => useContext(AppointmentContext);

export default AppointmentProvider;
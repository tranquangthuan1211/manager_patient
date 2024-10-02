import { createContext, use, useCallback, useContext, useEffect } from "react";
import {Appointment} from "src/types/appointment";
import useFunction, {DEFAULT_FUNCTION_RETURN, UseFunctionReturnType} from "src/hooks/use-function";
import AppointmentApi from "src/api/appointments";
import { get } from "lodash";
interface contextValue {
    getAppointments: UseFunctionReturnType<FormData, any>;
    getAppointment: UseFunctionReturnType<FormData, any>;
    createAppointment: (requests: Partial<Appointment>) => Promise<void>;
    completeAppointment: (requests: Partial<Appointment>) => Promise<void>;
    updateAppointment: (requests: Partial<Appointment>) => Promise<void>;
    deleteAppointment: (id: string) => Promise<void>;
}

const AppointmentContext = createContext<contextValue>({
    getAppointments: DEFAULT_FUNCTION_RETURN,
    getAppointment: DEFAULT_FUNCTION_RETURN,
    createAppointment: async () => {},
    completeAppointment: async () => {},
    updateAppointment: async () => {},
    deleteAppointment: async () => {}
});

const AppointmentProvider = ({ children }:{ children: React.ReactNode }) => {
    const getAppointments = useFunction(AppointmentApi.getAppointments);
    const getAppointment = useFunction(AppointmentApi.getAppointment);
    const createAppointment = useCallback(async (request: Partial<Appointment>) => {
        try{
            const response = await AppointmentApi.createAppointment(request);
            if(response) {
                getAppointments.setData({
                    data: [...(getAppointments.data?.data || []), response]
                })
            }
        }
        catch(err){
            throw err;
        }
    },[getAppointments]);
    const updateAppointment = useCallback(async (request: Partial<Appointment>) => {
        const { _id, ...rest } = request;
        // console.log(request);
        try{
            const response = await AppointmentApi.updateAppointment({ ...rest, id: _id });
            if(response) {
                getAppointments.setData({
                    data: (getAppointments.data?.data || []).map((item: Appointment) => {
                        if (_id === item._id) {
                            return { ...item, ...request };
                        }
                        return item;
                    })
                })
            }
        }
        catch(err){
            throw err;
        }
    }
    ,[getAppointments]);
    const completeAppointment = useCallback(async (request: Partial<Appointment>) => {
        const { _id, ...rest } = request;
        try{
            const response = await AppointmentApi.completeAppointment({ ...rest, id: _id });
            if(response) {
                getAppointments.setData({
                    data: (getAppointments.data?.data || []).map((item: Appointment) => {
                        // console.log(rest);
                        if (_id === item._id) {
                            return { ...item, ...request };
                        }
                        return item;
                    })
                })
            }
        }
        catch(err){
            throw err;
        }
    }
    ,[getAppointments]);
    const deleteAppointment = useCallback(async (id: string) => {
        console.log(id);
        try{
            const response = await AppointmentApi.deleteAccount(id);
            if(response) {
                getAppointments.setData(
                    { data: (getAppointments.data?.data || []).filter((item: Appointment) => item._id !== id) }
                )
            }
        }
        catch(err){
            throw err;
        }
    },[getAppointments.data]);
    useEffect(() => {
        getAppointments.call(new FormData());
        getAppointment.call(new FormData());
    },[])
    return (
        <AppointmentContext.Provider 
            value={{ 
                getAppointments, 
                getAppointment,
                completeAppointment,
                createAppointment,
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
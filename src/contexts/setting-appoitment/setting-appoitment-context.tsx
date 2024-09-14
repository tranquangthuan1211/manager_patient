import { createContext, useContext,ReactNode, useEffect } from "react";
import useFunction, {
    UseFunctionReturnType,
    DEFAULT_FUNCTION_RETURN
} from "src/hooks/use-function";
import { SettingAppoitment } from "src/types/setting-appoitments";
import SettingAppoitmentsApi from "src/api/setting-appoitments";
import { getFormData } from "src/api/api-requests";
import { useAuth } from "src/hooks/use-auth";
interface ContextValue{
    getSettingAppoitmentApi: UseFunctionReturnType<FormData, SettingAppoitment>,
    createSettingAppoitment?: (request: Omit<SettingAppoitment, "id">) => Promise<void>,
    updateSettingAppoitment?: (settingAppoitment: Partial<SettingAppoitment>) => Promise<void>,
}

export const SettingAppoitmentContext = createContext<ContextValue>({
    getSettingAppoitmentApi: DEFAULT_FUNCTION_RETURN,
    createSettingAppoitment: async () => {},
    updateSettingAppoitment: async () => {},
});

const SettingAppoitmentProvider = ({ children }: { children: ReactNode }) => {
    const getSettingAppoitmentApi = useFunction(SettingAppoitmentsApi.getAppointments);

    useEffect(() => {
        const id_clinic = getFormData({id_clinic: user?.id});
        getSettingAppoitmentApi.call(id_clinic);
    }, []); 
    const {user} = useAuth();
    return (
        <SettingAppoitmentContext.Provider
            value={{
                getSettingAppoitmentApi
            }}
        >
            {children}
        </SettingAppoitmentContext.Provider>
    );

}
export const useSettingAppoitment = () => useContext(SettingAppoitmentContext);
export default SettingAppoitmentProvider;
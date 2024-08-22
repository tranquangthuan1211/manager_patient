import {
    createContext,
    useContext,
    useEffect,
    useCallback,
    ReactNode,
    use
} from "react";
import useFunction, {
    UseFunctionReturnType,
    DEFAULT_FUNCTION_RETURN
} from "src/hooks/use-function";
import { Patient } from "src/types/patients";
import PatientsApi from "src/api/patients";

interface ContextValue {
    getPatientsApi: UseFunctionReturnType<FormData, Patient[]>;
    createPatients?: (requests: Omit<Patient, "id">) => Promise<void>;
    updatePatients?: (patient: Partial<Patient>) => Promise<void>;
    deletePatient: (id: string) => Promise<void>;
}

export const PatientContext = createContext<ContextValue>({
    getPatientsApi: DEFAULT_FUNCTION_RETURN,
    createPatients: async () => {},
    updatePatients: async () => {},
    deletePatient: async () => {},
});

const PatientProvider = ({ children }: { children: ReactNode }) => {
    const getPatientsApi = useFunction(PatientsApi.getPatients);
//    useEffect(() => {
//         console.log(getPatientsApi)
//    },[getPatientsApi.data])

    const deletePatient = useCallback(
        async (id: string) => {
            try {
                await PatientsApi.deletePatient(id);
                console.log("Deleted successfully");
                const updatedData = (getPatientsApi.data || []).filter((item) => item.id != id);
                getPatientsApi.setData(updatedData);
                // console.log("Updated data:", updatedData);
            } catch (error) {
                console.error("Error deleting patient:", error);
                throw error;
            }
        },
        [getPatientsApi]
    );

    useEffect(() => {
        getPatientsApi.call(new FormData());
    }, []);

    return (
        <PatientContext.Provider
            value={{
                getPatientsApi,
                deletePatient,
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};

export const usePatientsContext = () => useContext(PatientContext);

export default PatientProvider;

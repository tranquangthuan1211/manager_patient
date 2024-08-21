
import { format, getMonth, getYear } from "date-fns";
interface paitient_year_id {
    year_id: number;
}

export interface Patient {
    id: string,
    patient_code: string,
    consulting_day: string,
    id_doctor: string,
    doctor_name: string,
    name: string,
    age: number,
    address: string,
    gender: string,
    phone: string,
    status: string,
}
export const patientFilterFunction = (
    patient: Patient,
    filter: Partial<Patient>
  ): boolean => {
    return (
      (!filter.name ||
        patient.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter.status ||
        filter.status.toLowerCase() === "all" ||
        patient.status?.toLowerCase().includes(filter.status.toLowerCase())) &&
      (!filter.age || patient.age === filter.age) &&
      (!filter.phone || patient.phone.toLowerCase().includes(filter.phone.toLowerCase())) &&
      (!filter.address || patient.address.toLowerCase().includes(filter.address.toLowerCase()))&&
      (!filter.consulting_day ||
        !patient.consulting_day ||
        format(new Date(patient.consulting_day), "dd/MM/yyyy")
          .toLowerCase()
          .includes(filter.consulting_day.toLowerCase()))
    );
  };
interface CategorizedPatients {
    completed: Patient[];   
    wait: Patient[]; 
}
  
export const categorizePatientsByStatus = (patients: Patient[]): CategorizedPatients => {
    const categorizedPatients: CategorizedPatients = {
      completed: [],
      wait: [],
    };
  
    patients.forEach((patient) => {
      if (patient.status?.toLowerCase() === "đã điều trị") {
        categorizedPatients.completed.push(patient);
      } else if (patient.status?.toLowerCase() === "đang đợi") {
        categorizedPatients.wait.push(patient);
      }
    });
  
    return categorizedPatients;
};
interface CategorizedPatientsByMonth {
  january: Patient[],
  february: Patient[],
  march: Patient[],
  april: Patient[],
  may: Patient[],
  june: Patient[],
  july: Patient[],
  august: Patient[],
  september: Patient[],
  october: Patient[],
  november: Patient[],
  december: Patient[],
}
export const categorizedPatientsByYear = (patients: Patient[]): CategorizedPatientsByMonth => {
  const categorizedPatients: CategorizedPatientsByMonth = {
    january: [],
    february: [],
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
  };
  patients.forEach((patient) => {
    if (getMonth(new Date(patient.consulting_day)) === 0) {
      categorizedPatients.january.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 1) {
      categorizedPatients.february.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 2) {
      categorizedPatients.march.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 3) {
      categorizedPatients.april.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 4) {
      categorizedPatients.may.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 5) {
      categorizedPatients.june.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 6) {
      categorizedPatients.july.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 7) {
      categorizedPatients.august.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 8) {
      categorizedPatients.september.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 9) {
      categorizedPatients.october.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 10) {
      categorizedPatients.november.push(patient);
    } else if (getMonth(new Date(patient.consulting_day)) === 11) {
      categorizedPatients.december.push(patient);
    }
  });
  return categorizedPatients;
}
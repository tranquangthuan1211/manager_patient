
import { ReactNode, use, useEffect, useState } from 'react';
import {getDashboardAdminConfigs} from './dashboard-admin-config';
import {getDashboardManagerConfigs} from './dashboard-manager-config';
import {getDashboardPatientConfigs} from "./dashboard-patient-config"
import { useAuth } from 'src/hooks/use-auth';
export interface DashboardItem {
    disabled?: boolean;
    external?: boolean;
    icon?: ReactNode;
    items?: DashboardItem[];
    label?: ReactNode;
    path?: string;
    title: string;
  }
  
export interface DashboardSection{
    items: DashboardItem[];
    subheader?: string;
}
export const useSections = (): DashboardSection[] => {
    const {user} = useAuth();
  const [sections, setSections] = useState<DashboardSection[]>([]);

  useEffect(() => {
    async function fetchSections() {
    
      let configs: DashboardSection[] = [];
      if (user?.role === "admin") {
        configs = getDashboardAdminConfigs;
      }else if(user?.role === "manager"){
        configs = getDashboardManagerConfigs;
      }else if(user?.role === "patient"){
        configs = getDashboardPatientConfigs;
      }
      setSections(configs);
    }

    fetchSections();
  }, [user]);

  return sections;
}

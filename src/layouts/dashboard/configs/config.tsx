
import { ReactNode } from 'react';
import {getDashboardAdminConfigs} from './dashboard-admin-config';
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
const textSection: DashboardSection[] = 
[
    {
      subheader:"Quan Ly",
      items:[
        {
          title: "Home",
          path: "/home",
        },
        {
          title: "Settings",
          path: "/settings",
        },
        {
          title: "dashboard",
          path: "/dashboard",
        }
      ]
    }
]
export const useSections = (): DashboardSection[] => {
    return getDashboardAdminConfigs;
}

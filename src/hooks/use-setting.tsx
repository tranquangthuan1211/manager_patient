
import { useContext } from "react";
import { SettingsContext } from "src/contexts/setting-context";

export const useSettings = () => useContext(SettingsContext);
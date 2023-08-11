import DataContext from "../context/DataContext";
import { useContext } from "react";

export const useDataProvider = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useDataProvider must be used within a DataProvider");
    }
    return context;
}

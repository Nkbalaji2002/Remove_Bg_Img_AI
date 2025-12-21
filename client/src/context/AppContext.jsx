import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [credit, setCredit] = useState(false);
  const { getToken } = useAuth();

  const loadUserCredits = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/users/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCredit(response.data.data.credits);
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      toast.error("Error loading credits...." + error.message);
    }
  };

  const contextValue = { BACKEND_URL, credit, setCredit, loadUserCredits };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export default AppContextProvider;

import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const contextValue = { BACKEND_URL };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export default AppContextProvider;

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
      setReady(true);
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ user, setUser, ready }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;

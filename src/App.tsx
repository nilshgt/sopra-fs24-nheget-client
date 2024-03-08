import React, { useEffect } from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";
import { api } from "./helpers/api";

const App = () => {
  useEffect(() => {
    const validateSession = async () => {
      try {
        // Replace "/validate-session" with your actual session validation endpoint
        await api.get("/validate-session");
      } catch (error) {
        // If session is invalid, clear the "id" from localStorage
        localStorage.removeItem("id");
      }
    };

    validateSession();
  }, []);

  return (
    <div>
      <Header height="100" />
      <AppRouter />
    </div>
  );
};

export default App;
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useState } from "react";
import { createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Result from "./components/Result";
import Uploader from "./components/Uploader";

const theme = createTheme({
  typography: {
    fontFamily: `"Poppins", sans-serif`,
  },
});

export const AppContext = createContext(null);

function App() {
  const [imageAsset, setImageAsset] = useState(null);
  const [loader, setLoader] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          imageAsset,
          setImageAsset,
          loader,
          setLoader,
          copyAlert,
          setCopyAlert,
          navigate,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/result/:id" element={<Result />} />
            <Route path="/*" element={<Uploader />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;

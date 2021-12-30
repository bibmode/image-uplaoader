import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useState } from "react";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
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
        }}
      >
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Uploader />} />
            <Route exact path="/result/:id" element={<Result />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;

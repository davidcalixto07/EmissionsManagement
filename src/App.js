import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Componentes/Context/AppContext";
import EmissionsAppV2, { EmissionsAppV2Routes } from "./Aplication/EmissionsAppv2/EmissionsAppv2.jsx";
import Reporter from "./Aplication/EmissionsAppv2/Reports/Reporter.jsx";
import "./App.css"
function App() {
  return (
    <AppProvider>
      <Router>
      <Routes>
        <Route path="/" element={<EmissionsAppV2/>}>
          {EmissionsAppV2Routes}
        </Route>
      </Routes>
    </Router>
    </AppProvider>
      
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Space from "./components/Space";


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/spaces/:id" element={<Space/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

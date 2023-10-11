// import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Homepages from "./pages/Homepages";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar>
        <Routes>
          <Route path="/" element={<Homepages />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Navbar>
    </>
  );
}

export default App;

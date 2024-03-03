import { ClassList } from "./Components/ClassList"; 
import "./App.css";
import { List } from "./Components/List";
import AddClass from "./Components/addclass";
import { Start } from "./Components/start";
import { WithNavbar } from "./Components/withnavbar";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Signin } from "./Components/signin";
import { SignUp } from "./Components/signup";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signin" element={<Signin/>}/>          
          <Route path="/signup" element={<SignUp/>}/>          
          <Route path="/home" element={<WithNavbar><ClassList /></WithNavbar>} />
          <Route path="/list" element={<WithNavbar><List /></WithNavbar>} />
          <Route path="/addclass" element={<WithNavbar><AddClass /></WithNavbar>} />
        </Routes>
    </Router>
  );
}

export default App;

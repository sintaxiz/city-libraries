import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Libraries from '../pages/Libraries';
import Readers from "../pages/Readers";
import Publications from "../pages/Publications";
import Literature from "../pages/Literature";
import SideNavigation from "./SideNavigation";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <SideNavigation/>
                <Routes>
                    <Route path="/libraries" element={<Libraries/>}/>
                    <Route path="/readers" element={<Readers/>}/>
                    <Route path="/publications" element={<Publications/>}/>
                    <Route path="/literature" element={<Literature/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;

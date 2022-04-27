import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Libraries from '../pages/Libraries';
import Readers from "../pages/Readers";
import Publications from "../pages/Publications";
import Literature from "../pages/Literature";

function App() {
    return (
        <BrowserRouter>
            <h1>Library Fond</h1>
            <Link to="/libraries">Libraries</Link>
            <Link to="/readers">Readers</Link>
            <Link to="/publications">Publications</Link>
            <Link to="/literature">Literature</Link>

            <Routes>
                <Route path="/libraries" element={<Libraries/>}/>
                <Route path="/readers" element={<Readers/>}/>
                <Route path="/publications" element={<Publications/>}/>
                <Route path="/literature" element={<Literature/>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;

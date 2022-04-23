import './App.css';
import Libraries from './Libraries';

function App() {
    function showLibraries() {
    }

    return (
        <div className="App">
            <h1>Library Fond</h1>
            <button onClick={showLibraries}>Libraries</button>
            <button>Readers</button>
            <button>Publications</button>
            <button>Literature</button>
            <Libraries/>
        </div>
    );
}

export default App;

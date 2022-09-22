import logo from './logo.svg';
import './App.css';
import Game from './components/Game';
import Navbar  from './components/Navbar';
function App() {
  return (
    
    <>
      <Navbar>

      </Navbar>
      <div className='wordle-app-main'>
        <Game></Game>
      </div>
    </>
  );
}

export default App;

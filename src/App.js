import './App.css';
import Game from './components/Game';

function App() {
  return (
    <>
      <div className="row d-flex align-items-center">
        <div className="col-12 text-center p-0">
          <Game className="mx-auto" />
        </div>
      </div>
    </>
  );
};

export default App;

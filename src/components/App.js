import '../index.css';
import Main from './Main';
import Header from './Header';
import Player from './Player';
import { listOfSongs } from '../utils/constants';

function App() {
  return (
    <div className="page">
      <Header />
      <Player song={listOfSongs[0]} />
      <Main />
    </div>
  );
}

export default App;

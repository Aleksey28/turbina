import '../index.css';
import Main from './Main';
<<<<<<< HEAD
import Header from './Header'
=======
import Player from './Player';
import { listOfSongs } from '../utils/constants';
>>>>>>> 5c54676... feat: added player

function App() {
  return (
    <div className="page">
<<<<<<< HEAD
      <Header />
=======
      <Player song={listOfSongs[0]} />
>>>>>>> 5c54676... feat: added player
      <Main />
    </div>
  );
}

export default App;

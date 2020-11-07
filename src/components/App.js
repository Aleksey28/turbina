import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { bakgroundColors } from '../utils/constants';

import Ripple from './Ripple';
// import Ripple from './Ripple/Ripple';

function App() {
  const [firstColor, secondColor, thirdColor] = bakgroundColors;

  return (
    <Ripple duration={10000} firstColor={firstColor} secondColor={thirdColor} size={250}>
      <div
        className="page"
        style={{
          backgroundImage: `radial-gradient(at bottom, ${firstColor} 0%, ${secondColor} 30%, ${thirdColor} 100%)`,
        }}
      >
        <Header />
        <Main />
        <Footer />
      </div>
    </Ripple>
  );
}

export default App;

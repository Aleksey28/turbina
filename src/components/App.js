import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { bakgroundColors } from '../utils/constants';
import { api } from '../utils/api';

import Ripple from './Ripple';

function App() {
  const [firstColor, secondColor, thirdColor] = bakgroundColors;

  function handleFormSubmit({ name, phone, email, text }) {
    console.log(name, phone, email, text);
    api
      .addLyrics({ name, phone, email, text })
      .then((data) => {})
      .catch((err) => console.log(`Error ${err}`));
  }

  return (
    <Ripple duration={10000} firstColor={firstColor} secondColor={thirdColor} size={250}>
      <div
        className="page"
        style={{
          backgroundImage: `radial-gradient(at bottom, ${firstColor} 0%, ${secondColor} 30%, ${thirdColor} 100%)`,
        }}
      >
        <Header />
        <Main onFormSubmit={handleFormSubmit} />
        <Footer />
      </div>
    </Ripple>
  );
}

export default App;

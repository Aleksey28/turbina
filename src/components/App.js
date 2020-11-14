import React from 'react';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { bakgroundColors } from '../utils/constants';
import { api } from '../utils/api';

import Ripple from './Ripple';
// import Ripple from './Ripple/Ripple';

function App() {
  const [firstColor, secondColor, thirdColor] = bakgroundColors;
  const [isSpinnerLoading, setIsSpinnerLoading] = React.useState(false);
  const [isSubmitError, setIsSubmitError] = React.useState(false);

  function handleFormSubmit(data) {
    setIsSpinnerLoading(true);
    api.addLyrics(data)
    .then((data) => {
      ;
    })
    .catch(err => {
      console.log(`Error ${err}`);
      setIsSubmitError(true);
    })
    .finally(() => {
      setIsSpinnerLoading(false);
    });
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
        <Main onFormSubmit={handleFormSubmit} isLoading={isSpinnerLoading} isSubmitError={isSubmitError} />
        <Footer />
      </div>
    </Ripple>
  );
}

export default App;

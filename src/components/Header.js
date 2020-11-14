import React from 'react';
import Player from './Player';
import turbina from '../images/turbina.svg';
import Link from './Link';
import LogoIcon from './icons/LogoIcon';
import CloseIcon from './icons/CloseIcon';
import { links, streamings } from '../utils/constants';
import cn from 'classnames';

function Header({ onSetBlur }) {
  const [isLinksOpen, setIsLinksOpen] = React.useState(false);
  const [isButtonVisible, setIsButtonVisible] = React.useState(true);
  const [blurOn, setBlueOn] = React.useState(false);

  const handleSetBlur = (value) => {
    setBlueOn(value);
  };

  const handleClick = () => {
    setIsLinksOpen(true);
    setIsButtonVisible(false);
  };

  const handleClose = () => {
    setIsLinksOpen(false);
    setIsButtonVisible(true);
  };

  return (
    <header className="header">
      <div className={cn('header__blur', { header__blur_hidden: !blurOn })}>
        <div className="header__section">
          <a href={links.marshak} target="_blank" rel="noreferrer">
            <LogoIcon />
          </a>
          <button
            className={`link link_streaming ${!isButtonVisible && `link_streaming-hidden`} `}
            onClick={handleClick}
          >
            Стриминги
          </button>
          <div className={`header__links ${isLinksOpen && `header__links_visible`} `}>
            <button className="header__links-close" onClick={handleClose}>
              <CloseIcon />
            </button>
            {streamings.map((item) => (
              <Link key={item.id} title={item.title} path={item.link} />
            ))}
          </div>
        </div>
        <h1 className="header__title">
          <img className="header__pic" src={turbina} alt="Турбина" />
        </h1>
      </div>
      <Player onSetBlur={handleSetBlur} />
    </header>
  );
}

export default Header;

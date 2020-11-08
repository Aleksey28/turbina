import React from 'react';
import Player from './Player';
import turbina from '../images/turbina.svg';
import Link from './Link';
import LogoIcon from './icons/LogoIcon'
import CloseIcon from './icons/CloseIcon'
import { links, streamings } from '../utils/constants'

function Header() {
  return (
    <header className="header">
      <div className="header__section">
        <a href={links.marshak} target="_blank" rel="noreferrer">
          <LogoIcon />
        </a>
        <button className="link link_streaming">Стриминги</button>
        <div className="header__links">
          <button className="header__links-close">
            <CloseIcon />
          </button>
          {streamings.map((item) => (
            <Link
              key={item.id}
              title={item.title}
              path={item.link} />
          ))}
        </div>
      </div>
      <h1 className="header__title">
        <img className="header__pic" src={turbina} alt="Турбина" />
      </h1>
      <Player />
    </header>
  );
}

export default Header;

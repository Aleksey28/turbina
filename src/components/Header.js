import React from 'react';
import Player from './Player';
import turbina from '../images/turbina.svg';
import Link from './Link';
import LogoIcon from './icons/LogoIcon';
import CloseIcon from './icons/CloseIcon';
import { links, streamings } from '../utils/constants';
import cn from 'classnames';
import { use100vh } from 'react-div-100vh';

function Header({ onSetBlur }) {
  const [isLinksOpen, setIsLinksOpen] = React.useState(false);
  const [isButtonVisible, setIsButtonVisible] = React.useState(true);
  const [blurOn, setBlueOn] = React.useState(false);
  const height = use100vh()
  const headerHeight = height ? `${height - 10}px` : '100vh'


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
    <header className="header" style={{ height: headerHeight }}>
      <div className={cn('header__blur', { header__blur_hidden: !blurOn })}>
        <div className="header__section">
          <a href={links.marshak} target="_blank" rel="noreferrer">
            <LogoIcon />
          </a>
          <button
            className={cn('link link_streaming', { 'link_streaming-hidden': !isButtonVisible })}
            onClick={handleClick}
          >
            Стриминги
          </button>
          <div className={cn('header__links', { header__links_visible: isLinksOpen })}>

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

import React from 'react';
import logo  from '../images/Logo.svg';
import turbina from '../images/turbina.svg';
import Link from './Link';

function Header() {

  return (
    <header className="header">
      <div className="header__section">
        <a href="https://marshakbooks.ru/">
          <img src={logo} className="logo" alt="Логотип" />
        </a>
        <button className="link link_streaming link__title">Стриминги</button>
        <div className="header__links">
          <button className="header__links-close"></button>
          <Link title="Яндекс.Музыка ↗" path="https://music.yandex.ru/home" />
          <Link title="Spotify ↗" path="https://www.spotify.com/ru-ru/" />
          <Link title="Apple Music ↗" path="https://www.apple.com/ru/apple-music/" />
          <Link title="VK Music ↗" path="https://vk.com/vkmusic" />
        </div>
      </div>
      <h1 className="header__title">
        <img className="header__pic" src={turbina} alt="Турбина"/>
      </h1>
    </header>
  )
};

export default Header

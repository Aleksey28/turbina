import { links } from '../utils/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__sing">© Маршак, {new Date().getFullYear()}.</p>
      <p className="footer__author">
        Сделано студентами{' '}
        <a href={links.author} target="_blank" className="footer__link" rel="noreferrer">
          Яндекс.Практикум
        </a>
      </p>
    </footer>
  );
}

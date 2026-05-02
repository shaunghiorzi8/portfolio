import { useEffect, useState } from 'react';
import { company } from '../data/siteContent.js';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderPosition = () => {
      setIsScrolled(window.scrollY > 0);
    };

    updateHeaderPosition();
    window.addEventListener('scroll', updateHeaderPosition, { passive: true });

    return () => window.removeEventListener('scroll', updateHeaderPosition);
  }, []);

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label={`${company.name} home`}>
          <img src="/morningstar-header-logo.svg" alt={company.name} className="brand-logo" />
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#top">Home</a>
          <a href="#why">Why</a>
          <a href="#talent">Strategy</a>
          <a href="#blog">Blog</a>
          <a href="#about">About</a>
          <a href="#expertise">Stack</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">
          Contact Us
        </a>
      </header>
      <div className={`header-spacer${isScrolled ? ' is-visible' : ''}`} aria-hidden="true" />
    </>
  );
}

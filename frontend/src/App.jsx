import { useEffect } from 'react';
import ContactForm from './components/ContactForm.jsx';
import Header from './components/Header.jsx';
import {
  benefits,
  company,
  guarantees,
  portfolioLinks,
  processSteps,
  strategyCards,
  technologies,
  trustCards,
} from './data/siteContent.js';

function Card({ title, text }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

const talentCards = [
  ['hero-match-2.png', 'Senior Frontend Developer', 'Available now'],
  ['hero-match-3.png', 'Backend API Specialist', 'Matched today'],
  ['hero-match-4.png', 'Product Automation Lead', 'Ready to onboard'],
];

const sliderLogos = [
  { name: 'Python', icon: 'python' },
  { name: 'React', icon: 'react' },
  { name: 'PHP', icon: 'php' },
  { name: 'Figma', icon: 'figma' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Node', icon: 'nodedotjs' },
  { name: 'Angular', icon: 'angular' },
  { name: 'Next', icon: 'nextdotjs' },
  { name: 'Shopify', icon: 'shopify' },
  { name: 'WordPress', icon: 'wordpress' },
  { name: 'Webflow', icon: 'webflow' },
  { name: 'Ecommerce', icon: 'woocommerce' },
  { name: 'Nuxt', icon: 'nuxt' },
];

const realResultImageOrder = [1, 2, 3];
export default function App() {
  useEffect(() => {
    const animatedText = document.querySelectorAll(
      '.section-title-animate:not(.is-visible), .image-animate:not(.is-visible)',
    );

    if (!('IntersectionObserver' in window)) {
      animatedText.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.22,
      },
    );

    animatedText.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow section-title-animate is-visible">
              Hire top remote developers and dev teams
            </p>
            <h1 className="section-title-animate is-visible">
              Hire senior developers who think beyond code
            </h1>
            <p className="hero-text section-title-animate is-visible">
              Build better software, faster, with development teams who solve problems, understand
              users, and drive projects forward. Morningstar Enterprises matches you with the
              technical talent that fits your mission.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#contact">
                Contact Us
              </a>
            </div>
          </div>
          <div className="hero-panel talent-board" aria-label="Morningstar developer matching preview">
            <div className="match-card primary-match">
              <img className="match-avatar-image" src="/hero-match-1.png" alt="" aria-hidden="true" />
              <div>
                <strong>Morningstar Talent Match</strong>
                <p>Remote developers selected for your product goals.</p>
              </div>
            </div>
            {talentCards.map(([image, title, status]) => (
              <div className="match-card" key={title}>
                <img className="match-avatar-image" src={`/${image}`} alt="" aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <p>{status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="section-divider" aria-label="Technology logo slider">
            <div className="logo-slider">
              {[...sliderLogos, ...sliderLogos].map((logo, index) => (
                <span className="logo-pill" key={`${logo.name}-${index}`}>
                  <img
                    src={`https://cdn.simpleicons.org/${logo.icon}/ffffff`}
                    alt=""
                    aria-hidden="true"
                  />
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section intro" id="why">
          <div className="section-heading">
            <h2 className="section-title-animate">Real Results, Reliably Delivered</h2>
          </div>
          <div className="real-results-list">
            {benefits.map((benefit, index) => (
              <article className="real-result-row" key={benefit.title}>
                <div className="real-result-copy">
                  <h3 className="section-title-animate">{benefit.title}</h3>
                  <p className="section-title-animate">{benefit.text}</p>
                </div>
                <img
                  src={`/real-results-${realResultImageOrder[index]}.png`}
                  alt=""
                  className="real-result-image image-animate"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </section>

        <section className="section strategy-section" id="talent">
          <div>
            <p className="eyebrow section-title-animate">Transform your tech strategy</p>
            <h2 className="section-title-animate">
              Turn the gap between product vision and technology into momentum
            </h2>
            <p className="section-title-animate">
              Morningstar Enterprises supports your roadmap with skilled developers, thoughtful
              planning, and practical delivery systems.
            </p>
          </div>
          <div className="feature-grid strategy-card-grid">
            {strategyCards.map((card, index) => (
              <article className="strategy-card" key={card.title}>
                <img
                  className="strategy-icon-image"
                  src={`/transform-${index + 1}.png`}
                  alt=""
                  aria-hidden="true"
                />
                <h3 className="section-title-animate">{card.title}</h3>
                <p className="section-title-animate">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section story" id="about">
          <div>
            <p className="eyebrow section-title-animate">About Morningstar Enterprises</p>
            <h2 className="section-title-animate">
              Built for companies that need reliable
              <br />
              software execution
            </h2>
            <p className="section-title-animate">
              Morningstar Enterprises helps businesses assemble practical development teams,
              modernize systems, and launch digital products with less uncertainty.
            </p>
          </div>
          <div className="feature-grid compact">
            {trustCards.map((card, index) => (
              <article className="story-card" key={card.title}>
                <img
                  src={`/section-four-${index + 1}.png`}
                  alt=""
                  className="story-card-image"
                  aria-hidden="true"
                />
                <h3 className="section-title-animate">{card.title}</h3>
                <p className="section-title-animate">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section process-section" id="blog">
          <p className="eyebrow section-title-animate">Blog</p>
          <div className="section-heading">
            <h2 className="section-title-animate">Insights for building better software teams</h2>
            <p className="section-title-animate">
              Practical notes on planning, team matching, onboarding, and delivery momentum.
            </p>
          </div>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3 className="section-title-animate">{step.title}</h3>
                <p className="section-title-animate">{step.text}</p>
              </article>
            ))}
          </div>
          <div className="guarantee-row">
            {guarantees.map((guarantee) => (
              <span key={guarantee}>{guarantee}</span>
            ))}
          </div>
        </section>

        <section className="section split-section" id="expertise">
          <div>
            <p className="eyebrow section-title-animate">Expertise across the stack</p>
            <h2 className="section-title-animate">
              Developers proficient in today’s in-demand technologies
            </h2>
            <p className="section-title-animate">
              From web and mobile development to AI-supported workflows, Morningstar Enterprises
              helps you find the right technical skills for your product.
            </p>
          </div>
          <div className="tech-grid">
            {technologies.map((technology) => (
              <span key={technology.label}>
                <span className="tech-icon-stack">
                  <img
                    className="tech-icon tech-icon-muted"
                    src={`https://cdn.simpleicons.org/${technology.icon}/cbd1dc`}
                    alt={technology.label}
                  />
                  <img
                    className="tech-icon tech-icon-color"
                    src={`https://cdn.simpleicons.org/${technology.icon}/${technology.color}`}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <strong>{technology.label}</strong>
              </span>
            ))}
          </div>
        </section>

        <section className="section portfolio-section" id="portfolio">
          <div className="section-heading">
            <p className="eyebrow section-title-animate">Portfolio</p>
            <h2 className="section-title-animate">Web experiences that inspire our creative direction</h2>
            <p className="section-title-animate">
              A curated set of references for motion design, storytelling, product interaction, and
              polished digital presentation.
            </p>
          </div>
          <div className="portfolio-grid">
            {portfolioLinks.map((item, index) => (
              <a
                className="portfolio-card image-animate"
                href={item.url}
                key={item.title}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="portfolio-image"
                  src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=900`}
                  alt={`${item.title} website preview`}
                  loading="lazy"
                />
                <div className="portfolio-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div>
            <p className="eyebrow section-title-animate">Contact</p>
            <h2 className="section-title-animate">Chat with a Morningstar success specialist</h2>
            <p className="section-title-animate">
              Send a few details and Morningstar Enterprises will follow up at the email address
              you provide. You can also reach us directly at{' '}
              <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
      <a className="page-up-button" href="#top" aria-label="Back to top">
        ↑
      </a>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <img src="/morningstar-header-logo.svg" alt={company.name} className="footer-logo" />
            <h2>
              Engineering Excellence
              <span>One Roadmap at a Time</span>
            </h2>
          </div>

          <nav className="footer-column" aria-label="Work with us">
            <h3>Work With Us</h3>
            <a href="#top">Home</a>
            <a href="#why">Why</a>
            <a href="#talent">Strategy</a>
            <a href="#blog">Blog</a>
            <a href="#about">About</a>
            <a href="#expertise">Stack</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </nav>

        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.name}, Inc. All Rights Reserved.</span>
        </div>
      </footer>
    </>
  );
}

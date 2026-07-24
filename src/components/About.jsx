import Reveal from './Reveal'
import ProfileCard from './ProfileCard'
import mtLogoSrc from '../img/coinicon.png'
import avatarPhoto from '../img/Me.jpeg'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container-vf">
        <Reveal>
          <div className="about-grid">
            <div className="about-left">
              <div className="impact-panel">
                <div className="kicker-row">
                  <svg className="spark-burst" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2 L4 14 h6 l-1 8 9-12h-6z" fill="#F5B700" />
                  </svg>
                  <span className="kicker">ABOUT VISION FORGE</span>
                </div>
                <h1>
                  Built in Belize.
                  <br />
                  Built with <span className="accent">purpose.</span>
                </h1>
                <p className="lead">
                  We&apos;re a <strong>Belizean-owned company</strong> based in Central America,
                  helping young entrepreneurs and growing businesses across Belize build something
                  real, from first sketch to shipped product. We&apos;re also proud partners with{' '}
                  <strong>MoneyTykes</strong>, helping raise the region&apos;s next generation of
                  money-smart builders.
                </p>
              </div>

              <div className="chips">
                <div className="chip" title="Belizean-owned, Central America">
                  <span className="flag">
                    <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true">
                      <rect width="24" height="16" fill="#1E3A8A" />
                      <rect width="24" height="2.4" fill="#CE1126" />
                      <rect y="13.6" width="24" height="2.4" fill="#CE1126" />
                      <circle cx="12" cy="8" r="4.4" fill="#fff" />
                      <circle cx="12" cy="8" r="3.1" fill="#0B1122" />
                    </svg>
                  </span>
                  <span className="chip-text">
                    <span className="t1">Belizean-Owned</span>
                    <span className="t2">Central America</span>
                  </span>
                </div>

                <a
                  className="chip"
                  href="https://moneytykes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Proud partner with MoneyTykes"
                >
                  {mtLogoSrc ? (
                    <img className="mt-badge" src={mtLogoSrc} alt="MoneyTykes" />
                  ) : (
                    <span className="mt-badge">MT</span>
                  )}
                  <span className="chip-text">
                    <span className="t1">Proud Partner</span>
                    <span className="t2">MoneyTykes.com</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="profile-stage">
              <ProfileCard
                avatarUrl={avatarPhoto}
                name="Glenrick Spain"
                title="Co-Owner & Senior Dev"
                handle="visionforge"
                status="Available for projects"
                contactText="WhatsApp Me"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(47,111,237,0.28)"
                behindGlowSize="40%"
                innerGradient="linear-gradient(145deg,#2F6FED18 0%,#F5B70012 100%)"
                onContactClick={() => {
                  const a = document.createElement('a')
                  a.href = 'https://wa.me/5016157575'
                  a.target = '_blank'
                  a.rel = 'noopener noreferrer'
                  a.click()
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

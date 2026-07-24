import Reveal from './Reveal'
import './ConsultationConsole.css'

const POINTS = ['Quality solutions', 'Transparent process', 'Real results']

function HexCheck({ className = '' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 2 36 11.4V28.6L20 38 4 28.6V11.4L20 2Z"
        stroke="var(--color-blue-bright)"
        strokeWidth="2"
      />
      <path
        d="M20 8 30 13.7V25.3L20 31 10 25.3V13.7L20 8Z"
        stroke="var(--color-mist-dim)"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M13.5 20.5 18 25l8.5-10"
        stroke="var(--color-yellow)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ConsultationConsole() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-vf">
        <Reveal as="div" className="cc-layout">
          <div className="cc-copy">
            <p className="cc-kicker">SOLUTIONS THAT WORK. RESULTS THAT MATTER.</p>
            <h2 className="cc-headline">Budget-friendly. No obligation. Just a conversation.</h2>
            <p className="cc-body">
              Great digital work shouldn&apos;t be out of reach. We scope every project around what
              you actually need, then talk it through with you directly. No forms, no
              back-and-forth over email.
            </p>

            <ul className="cc-points">
              {POINTS.map((point) => (
                <li key={point} className="cc-point">
                  <HexCheck className="cc-hex-check" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cc-panel">
            <span className="cc-bracket cc-bracket-tl" aria-hidden="true" />
            <span className="cc-bracket cc-bracket-br" aria-hidden="true" />

            <div className="cc-panel-top">
              <span className="cc-panel-label">VISIONFORGE // COMMS</span>
              <span className="cc-status">
                <span className="cc-status-dot" aria-hidden="true" />
                ONLINE
              </span>
            </div>

            <div className="cc-terminal" aria-hidden="true">
              <div>&gt; secure channel ready</div>
              <div>&gt; replies same day, WhatsApp only</div>
              <div>
                &gt; awaiting transmission
                <span className="cc-cursor" />
              </div>
            </div>

            <h3 className="cc-panel-heading">Let&apos;s talk about your project.</h3>
            <p className="cc-panel-sub">
              Tap below to start a conversation on WhatsApp.
            </p>

            <a
              href="https://wa.me/5016157575"
              target="_blank"
              rel="noopener noreferrer"
              className="cc-connect"
            >
              ▶ CONNECT ON WHATSAPP
            </a>

            <div className="cc-signal-row">
              <span className="cc-signal-label">SIGNAL: +501 615 7575</span>
              <span className="cc-bars" aria-hidden="true">
                <span className="cc-bar" />
                <span className="cc-bar" />
                <span className="cc-bar" />
                <span className="cc-bar" />
              </span>
            </div>

            <p className="cc-footnote">WhatsApp only.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

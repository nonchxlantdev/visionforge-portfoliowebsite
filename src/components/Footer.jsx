import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-wrap">
        <div className="brand-col">
          <div className="brand-copy">
            <div className="logo">
              <span>
                VISION <span className="f">FORGE</span>
              </span>
            </div>
            <p>
              Powering your vision. Building your success. We help businesses and entrepreneurs
              grow with innovative digital solutions that make an impact.
            </p>
            <div className="origin-tag">
              <span className="flag">
                <svg viewBox="0 0 24 16" width="18" height="12" aria-hidden="true">
                  <rect width="24" height="16" fill="#1E3A8A" />
                  <rect width="24" height="2.4" fill="#CE1126" />
                  <rect y="13.6" width="24" height="2.4" fill="#CE1126" />
                  <circle cx="12" cy="8" r="4.4" fill="#fff" />
                  <circle cx="12" cy="8" r="3.1" fill="#0B1122" />
                </svg>
              </span>
              BELIZE · CENTRAL AMERICA
            </div>
          </div>

          <svg
            className="brand-stickman"
            width="160"
            height="145"
            viewBox="0 0 160 145"
            aria-hidden="true"
          >
            <rect
              x="15"
              y="6"
              width="110"
              height="46"
              rx="8"
              fill="#0F1526"
              stroke="#2F6FED"
              strokeWidth="2"
            />
            <text
              x="70"
              y="34"
              textAnchor="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700"
              fontSize="15"
            >
              <tspan fill="#E8ECF5">YOUR </tspan>
              <tspan fill="#2F6FED">VISION</tspan>
            </text>

            <g stroke="#2F6FED" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M70 74 L32 52" />
              <path d="M70 74 L108 52" />
              <line x1="70" y1="74" x2="70" y2="98" />
              <path d="M70 98 L58 122" />
              <path d="M70 98 L82 122" />
            </g>
            <circle cx="32" cy="52" r="2.2" fill="#2F6FED" />
            <circle cx="108" cy="52" r="2.2" fill="#2F6FED" />
            <circle cx="70" cy="66" r="7.5" fill="#0A0E1A" stroke="#2F6FED" strokeWidth="2" />
            <path d="M62 62 A8 7 0 0 1 78 62 Z" fill="#F5B700" />
            <rect x="60" y="61" width="20" height="2.4" rx="1.2" fill="#F5B700" />
            <circle cx="70" cy="58.5" r="1.3" fill="#0A0E1A" />
          </svg>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div className="col-kicker">NAVIGATE</div>
          <ul className="footer-links">
            <li>
              <Link to="/#home">Home</Link>
            </li>
            <li>
              <Link to="/#about">About</Link>
            </li>
            <li>
              <Link to="/#services">Services</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="footer-bottom">
          <span className="copy">© {new Date().getFullYear()} Vision Forge. All rights reserved.</span>
          <span className="status-line">
            <span className="dot" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  )
}

import Reveal from './Reveal'
import TiltedCard from './TiltedCard'
import websiteAppImg from '../img/website-app-development.svg'
import customSoftwareImg from '../img/custom-software.svg'
import aiSolutionsImg from '../img/ai-solutions.svg'
import brandIdentityImg from '../img/brand-identity.svg'
import businessSystemsImg from '../img/business-systems.svg'

const services = [
  {
    img: websiteAppImg,
    tag: '01',
    title: 'Website & App Development',
    description:
      "Custom websites and applications built around how your business actually works, from a first online presence to a full customer-facing platform, designed and launched so it's ready to grow with you.",
  },
  {
    img: customSoftwareImg,
    tag: '02',
    title: 'Custom Software',
    description:
      "Purpose-built tools shaped around your existing workflow instead of forcing you into someone else's template. If a task is repetitive, disconnected, or held together by spreadsheets, we build something that actually fits.",
  },
  {
    img: aiSolutionsImg,
    tag: '03',
    title: 'AI Solutions',
    description:
      'Practical automation that handles the repetitive parts of your day: data entry, reporting, routine replies, so your time goes toward the decisions only you can make. No hype, just tools that quietly save hours.',
  },
  {
    img: brandIdentityImg,
    tag: '04',
    title: 'Brand Identity',
    description:
      'A visual identity that looks as sharp as the work you do: logo, color, typography, and templates your team will actually reuse, consistent across your site, socials, and proposals.',
  },
  {
    img: businessSystemsImg,
    tag: '05',
    title: 'Business Systems',
    description:
      'Back-office systems that bring scattered tools into one place, so operations, scheduling, and reporting run off a single source of truth. Less time juggling logins, more time running the business.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative overflow-visible py-24 md:py-32">
      <div className="container-vf overflow-visible">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">Our Services</p>
          <h2 className="text-balance mt-4 font-display text-3xl font-semibold text-paper sm:text-4xl">
            Everything you need to build, launch and grow.
          </h2>
        </Reveal>

        {/*
          Stagger Reveal on flex children (the figures). GSAP owns y/opacity on
          the figure; Motion owns rotateX/Y/scale on .tilted-card-inner — no
          shared transform property, so they don't fight.
        */}
        <Reveal as="div" stagger className="services-grid mt-14">
          {services.map((s) => (
            <TiltedCard
              key={s.tag}
              imageSrc={s.img}
              altText={s.title}
              containerHeight="380px"
              imageHeight="380px"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1.04}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div>
                  <span
                    style={{
                      color: '#F5B700',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                    }}
                  >
                    {s.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#F4F7FF',
                      margin: '6px 0 8px',
                      textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: '#D7DCEB',
                      margin: 0,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              }
            />
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <a
            href="#contact"
            className="group flex flex-col justify-between gap-4 rounded-2xl border border-dashed border-line p-7 transition-colors hover:border-yellow sm:flex-row sm:items-end"
          >
            <div>
              <p className="font-display text-lg font-semibold text-paper">Not sure what you need?</p>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-mist">
                Tell us your goals. We&apos;ll map the right mix of services for your budget.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-yellow">
              Get a free consultation
              <span aria-hidden="true">→</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

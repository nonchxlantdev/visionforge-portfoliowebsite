import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import {
  CARE_OPTIONS,
  HOSTING_OPTIONS,
  SERVICES,
} from '../data/pricing'
import { bookAiConsultation, sendPackageQuote } from '../lib/quote'

function InfoIcon({ info, activeId, setActiveId, id }) {
  const isActive = activeId === id
  return (
    <button
      type="button"
      className={`inline-flex h-[15px] w-[15px] shrink-0 cursor-help items-center justify-center rounded-full border text-[10px] italic leading-none font-[Georgia,'Times_New_Roman',serif] select-none ${
        isActive
          ? 'border-blue bg-[rgba(47,111,237,0.12)] text-blue'
          : 'border-mist text-mist hover:border-blue hover:bg-[rgba(47,111,237,0.12)] hover:text-blue'
      }`}
      aria-label="More info"
      aria-expanded={isActive}
      data-info-id={id}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setActiveId(isActive ? null : id)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          setActiveId(isActive ? null : id)
        }
      }}
    >
      i
      <span className="sr-only">{info}</span>
    </button>
  )
}

function InfoTooltip({ activeId, infos }) {
  const tipRef = useRef(null)
  const [pos, setPos] = useState({ left: 0, top: 0, visible: false })

  useEffect(() => {
    if (!activeId) {
      setPos((p) => ({ ...p, visible: false }))
      return
    }
    const icon = document.querySelector(`[data-info-id="${activeId}"]`)
    if (!icon) return
    const rect = icon.getBoundingClientRect()
    const tw = 240
    let left = rect.left + rect.width / 2 - tw / 2
    left = Math.max(12, Math.min(left, window.innerWidth - tw - 12))
    let top = rect.bottom + 8
    setPos({ left, top, visible: true })

    requestAnimationFrame(() => {
      const tip = tipRef.current
      if (!tip) return
      const th = tip.offsetHeight
      if (top + th > window.innerHeight - 12) {
        setPos({ left, top: rect.top - th - 8, visible: true })
      }
    })
  }, [activeId])

  if (!activeId || !infos[activeId]) return null

  return (
    <div
      ref={tipRef}
      role="tooltip"
      className="pointer-events-none fixed z-[100] max-w-[240px] rounded-[10px] border border-blue bg-[#1B2340] px-3 py-2.5 font-body text-xs leading-relaxed text-paper shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
      style={{
        width: 240,
        left: pos.left,
        top: pos.top,
        display: pos.visible ? 'block' : 'none',
      }}
    >
      {infos[activeId]}
    </div>
  )
}

function TierCard({
  tier,
  selected,
  locked,
  onSelect,
  infoId,
  activeInfoId,
  setActiveInfoId,
}) {
  return (
    <div
      role={locked ? undefined : 'radio'}
      aria-checked={locked ? undefined : selected}
      tabIndex={locked ? undefined : 0}
      onClick={() => {
        if (!locked) onSelect(tier.id)
      }}
      onKeyDown={(e) => {
        if (locked) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(tier.id)
        }
      }}
      className={`relative rounded-[14px] border-[1.5px] bg-[#141A30] py-[18px] pr-[18px] pl-[38px] text-left ${
        locked ? 'cursor-default' : 'cursor-pointer'
      } ${
        selected
          ? 'border-blue shadow-[0_0_0_1px_#2F6FED_inset]'
          : 'border-line'
      }`}
    >
      {tier.tag ? (
        <span className="absolute -top-2.5 right-3.5 rounded-full bg-yellow px-2.5 py-[3px] text-[10.5px] font-bold tracking-[0.3px] text-[#141A30]">
          {tier.tag}
        </span>
      ) : null}
      <span
        className={`absolute top-4 left-4 h-4 w-4 rounded-full border-2 ${
          selected
            ? 'border-blue bg-[radial-gradient(circle,#2F6FED_0_40%,transparent_42%)]'
            : 'border-line'
        }`}
        aria-hidden="true"
      />
      <h5 className="mb-1 flex items-center gap-1.5 font-display text-[15px] font-semibold text-paper">
        {tier.displayName || tier.name}{' '}
        <InfoIcon
          id={infoId}
          info={tier.info}
          activeId={activeInfoId}
          setActiveId={setActiveInfoId}
        />
      </h5>
      <div className="mb-2.5 font-display text-[17px] font-bold text-blue">
        {tier.priceLabel}
      </div>
      <ul className="m-0 list-disc pl-4 text-[12.5px] leading-[1.7] text-mist">
        {tier.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  )
}

function AddonRow({
  addon,
  checked,
  onToggle,
  infoId,
  activeInfoId,
  setActiveInfoId,
}) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => onToggle(addon.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle(addon.id)
        }
      }}
      className={`flex cursor-pointer items-center justify-between gap-2.5 rounded-[10px] border bg-[#141A30] px-3.5 py-3 text-[13.5px] ${
        checked ? 'border-blue' : 'border-line hover:border-[#33406b]'
      }`}
    >
      <span className="flex items-center gap-2.5 text-left text-paper">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-[1.5px] text-[11px] ${
            checked
              ? 'border-blue bg-blue text-white'
              : 'border-line text-transparent'
          }`}
          aria-hidden="true"
        >
          ✓
        </span>
        <span>{addon.name}</span>
        <InfoIcon
          id={infoId}
          info={addon.info}
          activeId={activeInfoId}
          setActiveId={setActiveInfoId}
        />
      </span>
      <span className="shrink-0 whitespace-nowrap text-[12.5px] text-mist">
        +${addon.price.toLocaleString()}
      </span>
    </div>
  )
}

function EstimatePanel({
  service,
  tier,
  selectedAddons,
  hosting,
  setHosting,
  care,
  setCare,
  onQuote,
}) {
  const total = useMemo(() => {
    const addonsSum = selectedAddons.reduce((s, a) => s + a.price, 0)
    return (tier?.price || 0) + addonsSum
  }, [tier, selectedAddons])

  const monthlyTotal = Number(hosting) + Number(care)

  return (
    <aside className="sticky top-[88px] self-start rounded-2xl border border-line bg-[#141A30] p-[22px]">
      <h4 className="mb-3.5 font-display text-sm font-semibold tracking-[0.5px] text-mist uppercase">
        Your Estimate
      </h4>
      <div>
        {tier ? (
          <div className="flex justify-between border-b border-dashed border-line py-[7px] text-[13px] text-mist">
            <span>{tier.name}</span>
            <span className="font-medium text-paper">
              ${tier.price.toLocaleString()}
            </span>
          </div>
        ) : null}
        {selectedAddons.map((a) => (
          <div
            key={a.id}
            className="flex justify-between border-b border-dashed border-line py-[7px] text-[13px] text-mist"
          >
            <span>{a.name}</span>
            <span className="font-medium text-paper">
              +${a.price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3.5">
        <span className="text-[13px] text-mist">Estimated Total</span>
        <span className="font-display text-[26px] font-bold text-yellow">
          ${total.toLocaleString()} BZD
        </span>
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed text-mist">{service.note}</p>

      {service.hasMonthly ? (
        <div className="mt-5 border-t border-line pt-[18px]">
          <h5 className="mb-2.5 text-[12.5px] tracking-[0.4px] text-mist uppercase">
            Monthly (separate from build price)
          </h5>
          <select
            className="mb-2 w-full rounded-lg border border-line bg-[#10152A] px-2.5 py-2 font-body text-[13px] text-paper"
            value={hosting}
            onChange={(e) => setHosting(Number(e.target.value))}
          >
            {HOSTING_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            className="mb-2 w-full rounded-lg border border-line bg-[#10152A] px-2.5 py-2 font-body text-[13px] text-paper"
            value={care}
            onChange={(e) => setCare(Number(e.target.value))}
          >
            {CARE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <div className="mt-1 flex justify-between text-[12.5px] text-mist">
            <span>Monthly total</span>
            <span className="font-semibold text-blue">${monthlyTotal} BZD/mo</span>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onQuote}
        className={`mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border-0 px-3 py-3.5 font-body text-sm font-bold ${
          service.ctaVariant === 'blue'
            ? 'bg-blue text-white'
            : 'bg-[#25D366] text-navy'
        }`}
      >
        {service.ctaLabel}
      </button>
    </aside>
  )
}

function BuilderPanel({ service }) {
  const [tierId, setTierId] = useState(service.defaultTierId)
  const [addonIds, setAddonIds] = useState(() => new Set())
  const [hosting, setHosting] = useState(25)
  const [care, setCare] = useState(0)
  const [activeInfoId, setActiveInfoId] = useState(null)

  const infos = useMemo(() => {
    const map = {}
    service.tiers.forEach((t) => {
      map[`${service.id}-tier-${t.id}`] = t.info
    })
    service.addons.forEach((a) => {
      map[`${service.id}-addon-${a.id}`] = a.info
    })
    return map
  }, [service])

  useEffect(() => {
    const close = () => setActiveInfoId(null)
    document.addEventListener('click', close)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('click', close)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [])

  const tier = service.tiers.find((t) => t.id === tierId) || service.tiers[0]
  const selectedAddons = service.addons.filter((a) => addonIds.has(a.id))

  const toggleAddon = useCallback((id) => {
    setAddonIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const onQuote = async () => {
    const hostingOpt = HOSTING_OPTIONS.find((o) => o.value === hosting)
    const careOpt = CARE_OPTIONS.find((o) => o.value === care)
    const est = {
      tierName: tier.name,
      tierPrice: tier.price,
      addons: selectedAddons.map((a) => ({ name: a.name, price: a.price })),
      total: tier.price + selectedAddons.reduce((s, a) => s + a.price, 0),
      hostingLabel: service.hasMonthly ? hostingOpt?.label : null,
      careLabel: service.hasMonthly ? careOpt?.label : null,
      monthlyTotal: service.hasMonthly ? hosting + care : 0,
    }
    await sendPackageQuote(service.name, est)
  }

  const tierGridClass =
    service.tierGridClass === 'tier-grid-4'
      ? 'grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4'
      : service.tiers.length === 1
        ? 'grid grid-cols-1 gap-3.5'
        : 'grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-8 px-[max(1.25rem,env(safe-area-inset-left))] pb-20 sm:px-6 lg:grid-cols-[1fr_320px] lg:gap-[34px] lg:px-8">
      <div>
        <div className="mt-2 mb-4 flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(47,111,237,0.12)] text-[12.5px] font-bold text-blue">
            1
          </div>
          <h4 className="font-display text-[15px] font-semibold text-paper">
            {service.step1Title}
          </h4>
        </div>

        <div className={tierGridClass}>
          {service.tiers.map((t) => (
            <TierCard
              key={t.id}
              tier={t}
              selected={tierId === t.id}
              locked={!!service.lockedTier}
              onSelect={setTierId}
              infoId={`${service.id}-tier-${t.id}`}
              activeInfoId={activeInfoId}
              setActiveInfoId={setActiveInfoId}
            />
          ))}
        </div>

        {service.hint ? (
          <p className="mt-1.5 text-[11.5px] text-mist">{service.hint}</p>
        ) : null}

        <div className="mt-6 mb-4 flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(47,111,237,0.12)] text-[12.5px] font-bold text-blue">
            2
          </div>
          <h4 className="font-display text-[15px] font-semibold text-paper">
            {service.step2Title}
          </h4>
        </div>

        <div className="mt-1.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {service.addons.map((a) => (
            <AddonRow
              key={a.id}
              addon={a}
              checked={addonIds.has(a.id)}
              onToggle={toggleAddon}
              infoId={`${service.id}-addon-${a.id}`}
              activeInfoId={activeInfoId}
              setActiveInfoId={setActiveInfoId}
            />
          ))}
        </div>
      </div>

      <EstimatePanel
        service={service}
        tier={tier}
        selectedAddons={selectedAddons}
        hosting={hosting}
        setHosting={setHosting}
        care={care}
        setCare={setCare}
        onQuote={onQuote}
      />

      <InfoTooltip activeId={activeInfoId} infos={infos} />
    </div>
  )
}

function AiConsultPanel({ service }) {
  return (
    <div className="mx-auto max-w-[1080px] px-[max(1.25rem,env(safe-area-inset-left))] pb-20 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-line bg-[#141A30] p-7 text-left sm:p-[34px]">
        <h3 className="mb-2.5 font-display text-[19px] font-semibold text-paper">
          {service.name}
        </h3>
        <p className="mb-[18px] text-sm leading-[1.7] text-mist">{service.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {service.useCases.map((u) => (
            <span
              key={u}
              className="rounded-full border border-[rgba(47,111,237,0.3)] bg-[rgba(47,111,237,0.12)] px-3 py-1.5 text-xs text-[#a9c3ff]"
            >
              {u}
            </span>
          ))}
        </div>
        <div className="mb-5 font-display text-[15px] text-yellow">
          {service.priceLabel}
        </div>
        <button
          type="button"
          onClick={bookAiConsultation}
          className="flex w-full max-w-[280px] cursor-pointer items-center justify-center gap-2 rounded-[10px] border-0 bg-blue px-3 py-3.5 font-body text-sm font-bold text-white"
        >
          {service.ctaLabel}
        </button>
      </div>
    </div>
  )
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('web')
  const active = SERVICES.find((s) => s.id === activeTab) || SERVICES[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative min-h-screen pt-24 pb-8">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,150 C300,80 500,220 800,140 S1300,60 1600,160"
            stroke="#2F6FED"
            strokeWidth="1.4"
            fill="none"
            opacity="0.22"
          />
          <path
            d="M0,320 C260,420 520,260 780,360 S1240,300 1600,380"
            stroke="#2F6FED"
            strokeWidth="1.2"
            fill="none"
            opacity="0.16"
          />
          <path
            d="M0,560 C300,480 560,640 860,540 S1320,460 1600,540"
            stroke="#2F6FED"
            strokeWidth="1.4"
            fill="none"
            opacity="0.18"
          />
          <path
            d="M0,760 C280,840 540,700 820,780 S1300,820 1600,740"
            stroke="#F5B700"
            strokeWidth="1.1"
            fill="none"
            opacity="0.12"
          />
        </svg>
      </div>

      <Reveal className="mx-auto max-w-[760px] px-5 pt-8 pb-8 text-center sm:px-8 sm:pt-12">
        <span className="mb-[18px] inline-block rounded-full border border-[rgba(245,183,0,0.3)] bg-[rgba(245,183,0,0.1)] px-3 py-[5px] text-[12.5px] tracking-[1.5px] text-yellow uppercase">
          Budget Friendly · Transparent Pricing
        </span>
        <h1 className="font-display text-[28px] leading-tight font-semibold text-paper sm:text-[34px]">
          Build Your Package
        </h1>
        <p className="mt-3.5 text-[15.5px] leading-relaxed text-mist">
          Pick a service, choose your starting tier, and check off the extras you need. Your
          estimate updates instantly, with no waiting on a quote to know where you stand.
        </p>
      </Reveal>

      <Reveal
        as="div"
        className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-2.5 px-5 sm:px-8"
      >
        {SERVICES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveTab(s.id)}
            className={`cursor-pointer rounded-[30px] border px-4 py-[11px] text-sm font-medium sm:px-5 ${
              activeTab === s.id
                ? 'border-blue bg-blue text-white'
                : 'border-line bg-[#141A30] text-mist'
            }`}
          >
            {s.label}
          </button>
        ))}
      </Reveal>

      <div className="mt-10">
        {active.kind === 'consult' ? (
          <AiConsultPanel service={active} />
        ) : (
          <BuilderPanel key={active.id} service={active} />
        )}
      </div>
    </main>
  )
}

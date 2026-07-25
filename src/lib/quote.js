import { WHATSAPP_NUMBER } from '../data/pricing'

export function buildWhatsAppMessage(serviceName, est, clientNote) {
  const lines = []
  lines.push('Hello Vision Forge, I would like a quote.')
  lines.push('')
  lines.push(`Service: ${serviceName}`)
  lines.push(`Tier: ${est.tierName} ($${est.tierPrice.toLocaleString()} BZD)`)
  if (est.addons.length) {
    lines.push('Add ons:')
    est.addons.forEach((a) =>
      lines.push(`  + ${a.name} ($${a.price.toLocaleString()} BZD)`)
    )
  }
  lines.push(`Estimated Total: $${est.total.toLocaleString()} BZD`)
  if (est.hostingLabel) {
    const firstMonth = est.total + est.monthlyTotal
    lines.push('')
    lines.push(
      `Monthly: ${est.hostingLabel} + ${est.careLabel} ($${est.monthlyTotal} BZD/mo)`
    )
    lines.push(`First month: $${firstMonth.toLocaleString()} BZD`)
    lines.push(`Then: $${est.monthlyTotal} BZD/mo after`)
  }
  lines.push('')
  lines.push('My name:')
  lines.push('My business:')
  if (clientNote) lines.push(clientNote)
  return lines.join('\n')
}

export async function generateQuotePDF(serviceName, est) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()
  let y = 20

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(10, 14, 26)
  doc.text('Vision Forge', 14, y)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(90, 90, 90)
  y += 7
  doc.text('Estimated Quote (final price confirmed after a free consultation)', 14, y)
  y += 10
  doc.setDrawColor(200, 200, 200)
  doc.line(14, y, 196, y)
  y += 10

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(10, 14, 26)
  doc.text(serviceName, 14, y)
  y += 9

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(`Tier: ${est.tierName}`, 14, y)
  doc.text(`$${est.tierPrice.toLocaleString()} BZD`, 196, y, { align: 'right' })
  y += 8

  if (est.addons.length) {
    doc.setFont('helvetica', 'bold')
    doc.text('Add ons', 14, y)
    y += 7
    doc.setFont('helvetica', 'normal')
    est.addons.forEach((a) => {
      doc.text(a.name, 18, y)
      doc.text(`+$${a.price.toLocaleString()} BZD`, 196, y, { align: 'right' })
      y += 7
    })
    y += 2
  }

  doc.setDrawColor(220, 220, 220)
  doc.line(14, y, 196, y)
  y += 9
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('Estimated Total', 14, y)
  doc.setTextColor(47, 111, 237)
  doc.text(`$${est.total.toLocaleString()} BZD`, 196, y, { align: 'right' })
  doc.setTextColor(10, 14, 26)
  y += 12

  if (est.hostingLabel) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Monthly (separate from build price)', 14, y)
    y += 7
    doc.text(`${est.hostingLabel}  +  ${est.careLabel}`, 14, y)
    doc.text(`$${est.monthlyTotal} BZD/mo`, 196, y, { align: 'right' })
    y += 10
    const firstMonth = est.total + est.monthlyTotal
    doc.setFont('helvetica', 'bold')
    doc.text('First month', 14, y)
    doc.setTextColor(47, 111, 237)
    doc.text(`$${firstMonth.toLocaleString()} BZD`, 196, y, { align: 'right' })
    doc.setTextColor(10, 14, 26)
    y += 7
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(90, 90, 90)
    doc.text(`Then $${est.monthlyTotal} BZD/mo after`, 14, y)
    doc.setTextColor(10, 14, 26)
    y += 10
  }

  doc.setFontSize(9)
  doc.setTextColor(140, 140, 140)
  doc.text(
    'Generated from the Vision Forge package builder. This is an estimate, not a final invoice.',
    14,
    285
  )

  doc.save(
    `vision-forge-quote-${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`
  )
}

export function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export async function sendPackageQuote(serviceName, est) {
  await generateQuotePDF(serviceName, est)
  const message = buildWhatsAppMessage(
    serviceName,
    est,
    "I've also saved a PDF copy of this quote, happy to send it over if useful."
  )
  openWhatsApp(message)
}

export function bookAiConsultation() {
  openWhatsApp(
    "Hello Vision Forge, I'd like to book a free consultation about an AI Solutions project."
  )
}

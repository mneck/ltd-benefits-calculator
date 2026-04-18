import {
  BC_INCOME_LOSS_RATE,
  calculateBCIncomeLoss,
  getMultiplier,
} from '../../data/presentValueTable.ts'

export type PolicyValuationInputs = {
  policyEndDate: string
  retirementDate: string
  monthlyBenefit: number
}

export type PolicyValuationResult = {
  benefitEndDate: string
  yearsForTable: number
  multiplier: number
  presentValue: number
  warnings: string[]
}

export function parseLocalDateString(s: string): Date {
  const trimmed = s.trim()
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed)
  if (!m) {
    throw new Error('Date must be YYYY-MM-DD.')
  }
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  const dt = new Date(y, mo - 1, d)
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) {
    throw new Error('Invalid calendar date.')
  }
  return dt
}

export function formatLocalDate(d: Date): string {
  const y = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${mo}-${day}`
}

export function benefitEndDate(policyEnd: Date, retirement: Date): Date {
  return policyEnd.getTime() <= retirement.getTime() ? policyEnd : retirement
}

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000

export function yearsForTable(valuation: Date, benefitEnd: Date): {
  years: number
  warnings: string[]
} {
  const ms = benefitEnd.getTime() - valuation.getTime()
  if (ms <= 0) {
    throw new Error('Benefit end date must be after the valuation date.')
  }
  const rounded = Math.round(ms / MS_PER_YEAR)
  const warnings: string[] = []
  if (rounded > 50) {
    warnings.push('Discount period exceeds 50 years; using the table maximum of 50 years.')
  }
  if (rounded < 1) {
    warnings.push('Discount period is under one year; using the table minimum of 1 year.')
  }
  const years = Math.max(1, Math.min(50, rounded))
  return { years, warnings }
}

export function ageAtDate(birth: Date, at: Date): number {
  let age = at.getFullYear() - birth.getFullYear()
  const hadBirthday =
    at.getMonth() > birth.getMonth() ||
    (at.getMonth() === birth.getMonth() && at.getDate() >= birth.getDate())
  if (!hadBirthday) {
    age -= 1
  }
  return age
}

export function computePolicyValuation(
  inputs: PolicyValuationInputs,
  valuation: Date
): PolicyValuationResult {
  const policyEnd = parseLocalDateString(inputs.policyEndDate)
  const retirement = parseLocalDateString(inputs.retirementDate)
  const end = benefitEndDate(policyEnd, retirement)
  const { years, warnings } = yearsForTable(valuation, end)
  const multiplier = getMultiplier(years, BC_INCOME_LOSS_RATE)
  const presentValue = calculateBCIncomeLoss(inputs.monthlyBenefit, years)
  return {
    benefitEndDate: formatLocalDate(end),
    yearsForTable: years,
    multiplier,
    presentValue,
    warnings,
  }
}

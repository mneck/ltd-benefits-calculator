import { describe, expect, it } from 'vitest'
import { calculateBCIncomeLoss, getMultiplier } from '../../data/presentValueTable.ts'
import {
  ageAtDate,
  benefitEndDate,
  computePolicyValuation,
  parseLocalDateString,
  yearsForTable,
} from './policyValuation.ts'

describe('parseLocalDateString', () => {
  it('parses valid YYYY-MM-DD in local calendar', () => {
    const d = parseLocalDateString('2024-03-15')
    expect(d.getFullYear()).toBe(2024)
    expect(d.getMonth()).toBe(2)
    expect(d.getDate()).toBe(15)
  })

  it('rejects invalid format', () => {
    expect(() => parseLocalDateString('03/15/2024')).toThrow(/YYYY-MM-DD/)
  })

  it('rejects impossible dates', () => {
    expect(() => parseLocalDateString('2023-02-30')).toThrow(/Invalid/)
  })
})

describe('benefitEndDate', () => {
  it('returns the earlier of policy end and retirement', () => {
    const policy = parseLocalDateString('2030-06-01')
    const retire = parseLocalDateString('2040-01-01')
    expect(benefitEndDate(policy, retire)).toEqual(policy)
    expect(benefitEndDate(retire, policy)).toEqual(policy)
  })
})

describe('yearsForTable', () => {
  it('throws when benefit end is on or before valuation', () => {
    const v = new Date(2025, 0, 1)
    const e = new Date(2025, 0, 1)
    expect(() => yearsForTable(v, e)).toThrow(/after the valuation/)
  })

  it('rounds a ten-year span to 10 table years', () => {
    const valuation = new Date(2020, 0, 1)
    const end = new Date(2030, 0, 1)
    expect(yearsForTable(valuation, end).years).toBe(10)
    expect(yearsForTable(valuation, end).warnings).toHaveLength(0)
  })

  it('caps at 50 years with a warning', () => {
    const valuation = new Date(2000, 0, 1)
    const end = new Date(2100, 0, 1)
    const { years, warnings } = yearsForTable(valuation, end)
    expect(years).toBe(50)
    expect(warnings.some(w => w.includes('50 years'))).toBe(true)
  })

  it('uses 1 year minimum with a warning for a short period', () => {
    const valuation = new Date(2020, 0, 1)
    const end = new Date(2020, 5, 1)
    const { years, warnings } = yearsForTable(valuation, end)
    expect(years).toBe(1)
    expect(warnings.some(w => w.includes('under one year'))).toBe(true)
  })
})

describe('computePolicyValuation', () => {
  it('matches table-based BC income loss for the resolved year count', () => {
    const valuation = new Date(2020, 0, 1)
    const inputs = {
      policyEndDate: '2030-01-01',
      retirementDate: '2040-01-01',
      monthlyBenefit: 2500,
    }
    const result = computePolicyValuation(inputs, valuation)
    expect(result.yearsForTable).toBe(10)
    expect(result.multiplier).toBe(getMultiplier(10, 1.5))
    expect(result.presentValue).toBe(calculateBCIncomeLoss(2500, 10))
    expect(result.benefitEndDate).toBe('2030-01-01')
  })
})

describe('ageAtDate', () => {
  it('returns completed age at valuation when birthday has passed', () => {
    const birth = parseLocalDateString('1980-04-10')
    const at = parseLocalDateString('2026-04-18')
    expect(ageAtDate(birth, at)).toBe(46)
  })

  it('subtracts one year if birthday not yet reached', () => {
    const birth = parseLocalDateString('1980-06-01')
    const at = parseLocalDateString('2026-04-18')
    expect(ageAtDate(birth, at)).toBe(45)
  })
})

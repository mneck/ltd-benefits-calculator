import { type FormEvent, useMemo, useState } from 'react'
import { BC_INCOME_LOSS_RATE } from '../../data/presentValueTable.ts'
import {
  ageAtDate,
  computePolicyValuation,
  formatLocalDate,
  parseLocalDateString,
  type PolicyValuationResult,
} from './policyValuation.ts'
import './App.css'

const cad = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
})

function App() {
  const [clientName, setClientName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [policyEndDate, setPolicyEndDate] = useState('')
  const [monthlyAmount, setMonthlyAmount] = useState('')
  const [retirementDate, setRetirementDate] = useState('')
  const [valuationDate, setValuationDate] = useState(() => formatLocalDate(new Date()))

  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PolicyValuationResult | null>(null)

  function clearOutcome() {
    setResult(null)
    setError(null)
  }

  const valuationAsDate = useMemo(() => {
    try {
      return parseLocalDateString(valuationDate)
    } catch {
      return null
    }
  }, [valuationDate])

  const ageAtValuation = useMemo(() => {
    if (!birthday || !valuationAsDate) return null
    try {
      return ageAtDate(parseLocalDateString(birthday), valuationAsDate)
    } catch {
      return null
    }
  }, [birthday, valuationAsDate])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)

    const monthly = Number(monthlyAmount)
    if (!clientName.trim()) {
      setError('Enter the client name.')
      return
    }
    if (!Number.isFinite(monthly) || monthly <= 0) {
      setError('Enter a positive monthly benefit amount.')
      return
    }
    if (!valuationAsDate) {
      setError('Valuation date must be a valid YYYY-MM-DD.')
      return
    }

    try {
      parseLocalDateString(birthday)
      parseLocalDateString(policyEndDate)
      parseLocalDateString(retirementDate)
      const computed = computePolicyValuation(
        {
          policyEndDate,
          retirementDate,
          monthlyBenefit: monthly,
        },
        valuationAsDate
      )
      setResult(computed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not compute valuation.')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>LTD policy valuation</h1>
        <p className="lede">
          Present value using the BC prescribed{' '}
          <strong>{BC_INCOME_LOSS_RATE}%</strong> discount rate for future income loss.
        </p>
      </header>

      <form className="valuation-form" onSubmit={handleSubmit} noValidate>
        <div className="field-grid">
          <label className="field">
            <span className="label">Client name</span>
            <input
              type="text"
              autoComplete="name"
              value={clientName}
              onChange={e => {
                clearOutcome()
                setClientName(e.target.value)
              }}
              placeholder="Jane Doe"
            />
          </label>

          <label className="field">
            <span className="label">Birthday</span>
            <input
              type="date"
              value={birthday}
              onChange={e => {
                clearOutcome()
                setBirthday(e.target.value)
              }}
            />
          </label>

          <label className="field">
            <span className="label">Policy end date</span>
            <input
              type="date"
              value={policyEndDate}
              onChange={e => {
                clearOutcome()
                setPolicyEndDate(e.target.value)
              }}
            />
          </label>

          <label className="field">
            <span className="label">Date of retirement</span>
            <input
              type="date"
              value={retirementDate}
              onChange={e => {
                clearOutcome()
                setRetirementDate(e.target.value)
              }}
            />
          </label>

          <label className="field field-span">
            <span className="label">Monthly policy benefit</span>
            <input
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              value={monthlyAmount}
              onChange={e => {
                clearOutcome()
                setMonthlyAmount(e.target.value)
              }}
              placeholder="0.00"
            />
          </label>

          <label className="field field-span">
            <span className="label">Valuation as of</span>
            <input
              type="date"
              value={valuationDate}
              onChange={e => {
                clearOutcome()
                setValuationDate(e.target.value)
              }}
            />
            <span className="hint">
              Benefit period runs from this date to the earlier of policy end and retirement.
            </span>
          </label>
        </div>

        <button type="submit" className="submit">
          Calculate present value
        </button>
      </form>

      {error && (
        <div className="panel panel-error" role="alert">
          {error}
        </div>
      )}

      {result && (
        <section className="panel panel-result" aria-live="polite">
          <h2>Valuation — {clientName.trim()}</h2>
          <dl className="result-grid">
            {ageAtValuation !== null && (
              <>
                <dt>Age at valuation</dt>
                <dd>{ageAtValuation}</dd>
              </>
            )}
            <dt>Benefit end (earlier of policy / retirement)</dt>
            <dd>{result.benefitEndDate}</dd>
            <dt>Table years (rounded)</dt>
            <dd>{result.yearsForTable}</dd>
            <dt>Multiplier @ {BC_INCOME_LOSS_RATE}%</dt>
            <dd>{result.multiplier.toFixed(4)}</dd>
            <dt className="pv-label">Present value</dt>
            <dd className="pv-value">{cad.format(result.presentValue)}</dd>
          </dl>
          {result.warnings.length > 0 && (
            <ul className="warnings">
              {result.warnings.map(w => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  )
}

export default App

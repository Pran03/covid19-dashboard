import './index.css'

const StateTotalCases = props => {
  const {
    confirmedCases,
    activeCases,
    recoveredCases,
    deceasedCases,
    confirmedData,
    activeData,
    recoveredData,
    deceasedData,
    districtTotal,
  } = props

  const {confirmed, active, recovered, deceased} = districtTotal

  console.log(active)

  const activeConfirmedCases = confirmedCases ? 'confirmed-active' : ''
  const activeActiveCases = activeCases ? 'active-active' : ''
  const activeRecoveredCases = recoveredCases ? 'recovered-active' : ''
  const activeDeceasedCases = deceasedCases ? 'deceased-active' : ''

  console.log(confirmedCases)
  const onClickConfirmed = () => {
    confirmedData()
  }

  const onClickActive = () => {
    activeData()
  }

  const onClickRecovered = () => {
    recoveredData()
  }

  const onClickDeceased = () => {
    deceasedData()
  }

  return (
    <ul className="total-cases-container">
      <li onClick={onClickConfirmed} className="list-item">
        <div
          testid="stateSpecificConfirmedCasesContainer"
          className={`total-cases ${activeConfirmedCases}`}
        >
          <h1 className="statsName confirmed-stat">Confirmed</h1>
          <img
            src="https://res.cloudinary.com/praneeth34/image/upload/v1638026409/check-mark_1_nzpy4e.png"
            alt="state specific confirmed cases pic"
          />
          <p className="count confirmed-stat">{confirmed.toLocaleString()}</p>
        </div>
      </li>
      <li onClick={onClickActive} className="list-item">
        <div
          className={`total-cases ${activeActiveCases}`}
          testid="stateSpecificActiveCasesContainer"
        >
          <h1 className="statsName active-stat">Active</h1>
          <img
            src="https://res.cloudinary.com/praneeth34/image/upload/v1638337148/protection_1_sv2drf.png"
            alt="state specific active cases pic"
          />
          <p className="count active-stat">{active.toLocaleString()}</p>
        </div>
      </li>
      <li onClick={onClickRecovered} className="list-item">
        <div
          className={`total-cases ${activeRecoveredCases}`}
          testid="stateSpecificRecoveredCasesContainer"
        >
          <h1 className="statsName recovered-stat">Recovered</h1>
          <img
            src="https://res.cloudinary.com/praneeth34/image/upload/v1638337355/recovered_1_vaaivg.png"
            alt="state specific recovered cases pic"
          />
          <p className="count recovered-stat">{recovered.toLocaleString()}</p>
        </div>
      </li>
      <li onClick={onClickDeceased} className="list-item">
        <div
          className={`total-cases ${activeDeceasedCases}`}
          testid="stateSpecificDeceasedCasesContainer"
        >
          <h1 className="statsName deceased">Deceased</h1>
          <img
            src="https://res.cloudinary.com/praneeth34/image/upload/v1638066148/breathing_1_tsrhch.png"
            alt="state specific deceased cases pic"
          />
          <p className="count deceased-stat">{deceased.toLocaleString()}</p>
        </div>
      </li>
    </ul>
  )
}

export default StateTotalCases

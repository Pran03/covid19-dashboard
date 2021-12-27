import './index.css'

const AllStatesCases = props => {
  const {stateCasesDetails} = props
  const {
    stateName,
    confirmed,
    other,
    deceased,
    population,
    recovered,
  } = stateCasesDetails
  const active = confirmed - recovered - deceased - other
  return (
    <li className="ul-list-container">
      <p className="name case">{stateName}</p>
      <p className="confirmed case">{confirmed.toLocaleString()}</p>
      <p className="active case">{active.toLocaleString()}</p>
      <p className="recovered case">{recovered.toLocaleString()}</p>
      <p className="deceased case">{deceased.toLocaleString()}</p>
      <p className="population case">{population.toLocaleString()}</p>
    </li>
  )
}

export default AllStatesCases

import './index.css'

const DistrictCasesDetails = props => {
  const {
    districtDetails,
    confirmedCases,
    activeCases,
    recoveredCases,
    deceasedCases,
  } = props
  const {districtName, confirmed, active, deceased, recovered} = districtDetails

  console.log(active)

  return (
    <li className="district-details-container">
      {confirmedCases && <p className="district-count">{confirmed}</p>}
      {activeCases && <p className="district-count">{active}</p>}
      {recoveredCases && <p className="district-count">{recovered}</p>}
      {deceasedCases && <p className="district-count">{deceased}</p>}
      <p className="district-name">{districtName}</p>
    </li>
  )
}

export default DistrictCasesDetails

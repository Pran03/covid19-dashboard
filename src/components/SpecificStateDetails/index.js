import {Component} from 'react'

import Loader from 'react-loader-spinner'

import StateTotalCases from '../StateTotalCases'

import DistrictCasesDetails from '../DistrictCasesDetails'

import RechartsData from '../RechartsData'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

let specificStateTableData = []

class SpecificStateDetails extends Component {
  state = {
    specificStateList: [],
    specificDistrictData: [],
    testedValue: '',
    stateName: '',
    lastUpdatedValue: '',
    confirmedCases: true,
    activeCases: false,
    recoveredCases: false,
    deceasedCases: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getSpecificStateDetails()
  }

  getSpecificStateDetails = async () => {
    const {match} = this.props
    const {params} = match
    const id = params.stateCode
    //* console.log(id)
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data`
    const response = await fetch(apiUrl)
    const specificStateData = await response.json()
    console.log(specificStateData[id])
    const stateObject = statesList.find(
      eachState => eachState.state_code === id,
    )
    console.log('sts', stateObject)
    console.log(stateObject.state_name)
    const testedCount = specificStateData[id].total.tested
    const updatedValueCount = specificStateData[id].meta.last_updated
    const districtData = specificStateData[id].districts
    //* console.log(districtData)
    this.setState({
      specificStateList: specificStateData,
      specificDistrictData: districtData,
      testedValue: testedCount,
      lastUpdatedValue: updatedValueCount,
      stateName: stateObject.state_name,
      isLoading: false,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const {specificStateList} = this.state

    // getting keys of an object object
    const specificStateKeyNames = Object.keys(specificStateList)
    //* console.log(specificStateKeyNames)

    specificStateKeyNames.forEach(keyName => {
      if (specificStateList[keyName]) {
        const {total} = specificStateList[keyName]
        // if the state's covid data is available we will store it or we will store 0

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = specificStateList[keyName].meta.population
          ? specificStateList[keyName].meta.population
          : 0
        const lastUpdate = specificStateList[keyName].meta.last_updated
          ? specificStateList[keyName].meta.last_updated
          : 'No Report'

        resultList.push({
          stateCode: keyName,
          state: statesList.find(state => state.state_code === keyName),
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          lastUpdate,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  convertDistrictObjectDataIntoListItemUsingForInMethod = () => {
    const districtResultList = []
    const {specificDistrictData} = this.state
    const districtKeyNames = Object.keys(specificDistrictData)
    //* console.log(districtKeyNames)

    districtKeyNames.forEach(keyName => {
      if (specificDistrictData[keyName]) {
        const {total} = specificDistrictData[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0

        districtResultList.push({
          districtName: keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (recovered + deceased),
        })
      }
    })
    return districtResultList.sort((a, b) => b.value - a.value)
  }

  render() {
    const {
      stateName,
      testedValue,
      lastUpdatedValue,
      confirmedCases,
      activeCases,
      recoveredCases,
      deceasedCases,
      isLoading,
    } = this.state
    specificStateTableData = this.convertObjectsDataIntoListItemsUsingForInMethod()
    console.log('sre', specificStateTableData)

    console.log(testedValue)
    console.log(lastUpdatedValue)
    const date = new Date(lastUpdatedValue)
    const districtDataList = this.convertDistrictObjectDataIntoListItemUsingForInMethod()
    console.log('district', districtDataList)
    districtDataList.sort((a, b) => b.value - a.value)

    const confirmedData = () => {
      this.setState({
        confirmedCases: true,
        activeCases: false,
        recoveredCases: false,
        deceasedCases: false,
      })
    }

    const activeData = () => {
      this.setState({
        confirmedCases: false,
        activeCases: true,
        recoveredCases: false,
        deceasedCases: false,
      })
    }

    const recoveredData = () => {
      this.setState({
        confirmedCases: false,
        activeCases: false,
        recoveredCases: true,
        deceasedCases: false,
      })
    }

    const deceasedData = () => {
      this.setState({
        confirmedCases: false,
        activeCases: false,
        recoveredCases: false,
        deceasedCases: true,
      })
    }

    const {match} = this.props
    const {params} = match
    const specificStateCode = params.stateCode
    console.log('state', specificStateCode)

    const specificState = specificStateTableData.filter(
      eachState => eachState.stateCode === specificStateCode,
    )
    console.log('specific', [specificState])

    return (
      <>
        {isLoading ? (
          <div testid="stateDetailsLoader" className="home-container-app">
            <Loader type="Oval" color="#007bff" height={50} width={50} />
          </div>
        ) : (
          <div className="state-specific-details">
            <div className="state-container">
              <div>
                <h1 className="heading">{stateName}</h1>
                <p className="last-update">
                  Last update on{' '}
                  {`${date.toLocaleString('default', {
                    month: 'long',
                  })} ${date.getDate()}th ${date.getFullYear()}`}
                </p>
              </div>
              <div>
                <h1 className="tested">Tested</h1>
                <p className="tested-count">{testedValue.toLocaleString()}</p>
              </div>
            </div>
            <ul className="unordered-list-total-states">
              {specificState.map(eachDistrict => (
                <StateTotalCases
                  key={eachDistrict.stateCode}
                  districtTotal={eachDistrict}
                  confirmedCases={confirmedCases}
                  activeCases={activeCases}
                  recoveredCases={recoveredCases}
                  deceasedCases={deceasedCases}
                  confirmedData={confirmedData}
                  activeData={activeData}
                  recoveredData={recoveredData}
                  deceasedData={deceasedData}
                />
              ))}
            </ul>
            <h1 className="top-district">Top Districts</h1>
            <ul
              className="district-unordered-list"
              testid="topDistrictsUnorderedList"
            >
              {districtDataList.map(eachDistrictCount => (
                <DistrictCasesDetails
                  key={eachDistrictCount.districtName}
                  districtDetails={eachDistrictCount}
                  confirmedCases={confirmedCases}
                  activeCases={activeCases}
                  recoveredCases={recoveredCases}
                  deceasedCases={deceasedCases}
                />
              ))}
            </ul>
            <div testid="lineChartsContainer">
              <RechartsData
                confirmedCases={confirmedCases}
                activeCases={activeCases}
                recoveredCases={recoveredCases}
                deceasedCases={deceasedCases}
                stateCode={specificStateCode}
              />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default SpecificStateDetails

import {Component} from 'react'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import AllStatesCases from '../AllStatesCases'
import SearchSuggestions from '../SearchSuggestions'
import Footer from '../Footer'

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

let covidTableData = []

class Home extends Component {
  state = {
    listOfStatesData: [],
    searchInput: '',
    totalConfirmed: 0,
    totalRecovered: 0,
    totalActive: 0,
    totalDeceased: 0,
    isLoading: true,
  }

  componentDidMount() {
    this.getStatesData()
  }

  getStatesData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()
      let confirmedCases = 0
      let activeCases = 0
      let recoveredCases = 0
      let deceasedCases = 0

      statesList.forEach(stateCode => {
        if (fetchedData[stateCode.state_code]) {
          const {total} = fetchedData[stateCode.state_code]
          confirmedCases += total.confirmed ? total.confirmed : 0
          recoveredCases += total.recovered ? total.recovered : 0
          deceasedCases += total.deceased ? total.deceased : 0
        }
      })
      activeCases += confirmedCases - (recoveredCases + deceasedCases)

      const listOfCovidTableStates = statesList.map(eachItem => ({
        stateName: eachItem.state_name,
        stateCode: eachItem.state_code,
        confirmed: Object.keys(fetchedData)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => fetchedData[each].total.confirmed),
        recovered: Object.keys(fetchedData)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => fetchedData[each].total.recovered),
        deceased: Object.keys(fetchedData)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => fetchedData[each].total.deceased),
        other: Object.keys(fetchedData)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => fetchedData[each].total.other),
        population: Object.keys(fetchedData)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => fetchedData[each].meta.population),
      }))
      this.setState({
        listOfStatesData: listOfCovidTableStates,
        totalConfirmed: confirmedCases,
        totalDeceased: deceasedCases,
        totalRecovered: recoveredCases,
        totalActive: activeCases,
        isLoading: false,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  ascendingSort = () => {
    const {listOfStatesData} = this.state
    const sort = listOfStatesData.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({listOfStatesData: sort})
  }

  descendingSort = () => {
    const {listOfStatesData} = this.state
    const sort = listOfStatesData.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })
    this.setState({listOfStatesData: sort})
  }

  totalCountCards = () => {
    const {
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
    } = this.state

    return (
      <>
        <div className="case-cards-container">
          <div className="home-cases-container">
            <div className="home-cases" testid="countryWideConfirmedCases">
              <h1 className="statsName confirmed-state">Confirmed</h1>
              <img
                src="https://res.cloudinary.com/praneeth34/image/upload/v1638026409/check-mark_1_nzpy4e.png"
                alt="country wide confirmed cases pic"
              />
              <p className="count confirmed-stat">
                {totalConfirmed.toLocaleString()}
              </p>
            </div>
            <div className="home-cases" testid="countryWideActiveCases">
              <h1 className="statsName active-state">Active</h1>
              <img
                src="https://res.cloudinary.com/praneeth34/image/upload/v1638337148/protection_1_sv2drf.png"
                alt="country wide active cases pic"
              />
              <p className="count active-state">
                {totalActive.toLocaleString()}
              </p>
            </div>
            <div className="home-cases" testid="countryWideRecoveredCases">
              <h1 className="statsName recovered-state">Recovered</h1>
              <img
                src="https://res.cloudinary.com/praneeth34/image/upload/v1638337355/recovered_1_vaaivg.png"
                alt="country wide recovered cases pic"
              />
              <p className="count recovered-state">
                {totalRecovered.toLocaleString()}
              </p>
            </div>
            <div className="home-cases" testid="countryWideDeceasedCases">
              <h1 className="statsName deceased">Deceased</h1>
              <img
                src="https://res.cloudinary.com/praneeth34/image/upload/v1638066148/breathing_1_tsrhch.png"
                alt="country wide deceased pic"
              />
              <p className="count deceased-state">
                {totalDeceased.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderHomeComponent = () => {
    const {searchInput, listOfStatesData} = this.state

    covidTableData = listOfStatesData

    console.log('s', listOfStatesData)
    console.log('table', covidTableData)

    const searchSuggestionsList = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (searchInput === '') {
      return (
        <div className="home-container">
          {this.totalCountCards()}
          <div
            className="state-wise-container"
            testid="stateWiseCovidDataTable"
          >
            <div className="table">
              <div className="states-head-container">
                <div className="state-name-con">
                  <div className="btn-con">
                    <p className="state-head-details">States/UT</p>
                    <button
                      type="button"
                      className="sorting-button"
                      testid="ascendingSort"
                      onClick={this.ascendingSort}
                    >
                      <FcGenericSortingAsc className="sort-icon" />
                    </button>
                    <button
                      type="button"
                      className="sorting-button"
                      testid="descendingSort"
                      onClick={this.descendingSort}
                    >
                      <FcGenericSortingDesc className="sort-icon" />
                    </button>
                  </div>
                  <div className="cases-heading-container">
                    <p className="state-head-details">Confirmed</p>
                    <p className="state-head-details">Active</p>
                    <p className="state-head-details">Recovered</p>
                    <p className="state-head-details">Deceased</p>
                    <p className="state-head-details">Population</p>
                  </div>
                </div>
              </div>
              <hr className="horizontal-line" />
              <ul className="unordered-list">
                {covidTableData.map(eachState => (
                  <AllStatesCases
                    stateCasesDetails={eachState}
                    key={eachState.stateCode}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }
    return (
      <ul className="search-unordered" testid="searchResultsUnorderedList">
        <SearchSuggestions statesList={searchSuggestionsList} />
      </ul>
    )
  }

  renderHomeFinalComponent = () => {
    const {searchInput, isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div testid="homeRouteLoader" className="home-container-app">
            <Loader type="Oval" color="#007bff" height={50} width={50} />
          </div>
        ) : (
          <div className="home-container-app">
            <div className="search-container">
              <BsSearch className="search-icon" testid="searchIcon" />
              <input
                type="search"
                placeholder="Enter the State"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
            {this.renderHomeComponent()}
            <Footer />
          </div>
        )}
      </>
    )
  }

  render() {
    return <div>{this.renderHomeFinalComponent()}</div>
  }
}

export default Home

import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

class SearchSuggestions extends Component {
  render() {
    const {statesList} = this.props

    return (
      <ul
        testid="searchResultsUnorderedList"
        className="search-suggestions-main-container"
      >
        {statesList.map(eachState => (
          <Link className="link-item" to={`/state/${eachState.state_code}`}>
            <li className="search-suggestions-container">
              <p>{eachState.state_name}</p>
              <div>
                <button type="button" className="button">
                  {eachState.state_code}
                  <BiChevronRightSquare />
                </button>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }
}

export default SearchSuggestions

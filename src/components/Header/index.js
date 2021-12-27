import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {isToggle: false}

  onClickToggle = () => {
    this.setState(prevState => ({isToggle: !prevState.isToggle}))
  }

  onClickToggleOff = () => {
    this.setState({isToggle: false})
  }

  dropMenu = () => (
    <>
      <ul className="nav-bar">
        <li className="nav-menu-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-menu-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li className="nav-menu-item">
          <button
            type="button"
            className="close"
            onClick={this.onClickToggleOff}
          >
            <AiFillCloseCircle />
          </button>
        </li>
      </ul>
    </>
  )

  render() {
    const {isToggle} = this.state

    return (
      <>
        <div className="nav-container">
          <div className="nav-content-desktop">
            <Link to="/" className="nav-link">
              <h1 className="covid-text">
                COVID19<span className="covid-span">INDIA</span>
              </h1>
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="nav-content-mobile">
          <Link to="/" className="nav-link">
            <h1 className="covid-text">
              COVID19<span className="covid-span">INDIA</span>
            </h1>
          </Link>
          <button
            type="button"
            className="button-toggle"
            onClick={this.onClickToggle}
          >
            <img
              src="https://res.cloudinary.com/praneeth34/image/upload/v1640156087/add-to-queue_1_1_hxjq4k.png"
              alt="menu"
            />
          </button>
        </div>
        <div className="drop-down">{isToggle ? this.dropMenu() : ''}</div>
      </>
    )
  }
}

export default Header

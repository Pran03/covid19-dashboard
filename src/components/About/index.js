import {Component} from 'react'

import './index.css'

import Loader from 'react-loader-spinner'
import Faqs from './Faqs'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {
    faqsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getFaqsData()
  }

  getFaqsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({faqsList: data.faq, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="aboutRouteLoader">
      <Loader type="Oval" color="#007bff" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-head">Oops! Something went wrong</h1>
      <p className="failure-des">
        We cannot seem to find the page you are looking for
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {faqsList} = this.state

    return (
      <div className="about-container">
        <h1 className="about">About</h1>
        <p className="para">Last update on march 28th 2021</p>
        <h1 className="heading-about">
          COVID-19 vaccines be ready for distribution
        </h1>
        <ul className="ul-container" testid="faqsUnorderedList">
          {faqsList.map(eachFaq => (
            <Faqs faqsDetails={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderAboutView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="about-container">{this.renderAboutView()}</div>
  }
}

export default About

import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="covid-error-view-container">
    <img
      src="https://res.cloudinary.com/praneeth34/image/upload/v1637762618/Group_7484_nnpasf.png"
      alt="not-found-pic"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="home-button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound

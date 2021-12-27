import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="covid-text-footer">
        COVID19<span className="covid-span-footer">INDIA</span>
      </h1>
      <p className="description">
        we stand with everyone fighting on the front lines
      </p>
      <div className="icons-container">
        <VscGithubAlt className="icon-footer" />
        <FiInstagram className="icon-footer" />
        <FaTwitter className="icon-footer" />
      </div>
    </div>
  )
}

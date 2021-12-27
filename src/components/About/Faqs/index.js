import './index.css'

const Faqs = props => {
  const {faqsDetails} = props
  const {question, answer} = faqsDetails

  return (
    <li className="list-item">
      <p className="question">{question}</p>
      <p className="answer">{answer}</p>
    </li>
  )
}

export default Faqs

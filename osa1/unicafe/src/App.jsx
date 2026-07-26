import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
      <td>{props.text} {props.value}</td>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={props.good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={props.neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={props.bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={props.total} />
          </tr>
          <tr>
            <StatisticLine text="average" value={props.average} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={props.positive} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)
    setAverage((updatedGood + 0 * neutral - bad) / updatedTotal)
    setPositive((updatedGood / updatedTotal) * 100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal= updatedNeutral + good + bad
    setTotal(updatedTotal)
    setAverage((0 * updatedNeutral + good - bad) / updatedTotal)
    setPositive((good / updatedTotal) * 100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = updatedBad + neutral + good
    setTotal(updatedTotal)
    setAverage((good - updatedBad + 0 * neutral) / updatedTotal)
    setPositive((good / updatedTotal) * 100)
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button onClick={() => handleGoodClick()} text="good" />
        <Button onClick={() => handleNeutralClick()} text="neutral" />
        <Button onClick={() => handleBadClick()} text="bad" />
      </div>
      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
      </div>
    </div>
    )  
}

export default App
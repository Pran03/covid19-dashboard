import {Component} from 'react'

import './index.css'

import Loader from 'react-loader-spinner'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'

class RechartsData extends Component {
  state = {
    chartData: '',
    chartLine: '',
    isLoading: true,
  }

  componentDidMount() {
    this.renderChartsData()
  }

  renderChartsData = async () => {
    const {stateCode} = this.props
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    const rechartsData = Object.keys(fetchedData[stateCode].dates)

    const specificState = rechartsData.map(date => ({
      date,
      confirmed: fetchedData[stateCode].dates[date].total.confirmed,
      recovered: fetchedData[stateCode].dates[date].total.recovered,
      deceased: fetchedData[stateCode].dates[date].total.deceased,
      tested: fetchedData[stateCode].dates[date].total.deceased,
      active:
        fetchedData[stateCode].dates[date].total.confirmed -
        (fetchedData[stateCode].dates[date].total.deceased +
          fetchedData[stateCode].dates[date].total.recovered),
    }))
    console.log('R', specificState)

    const specificStateLineChart = rechartsData.map(date => ({
      date,
      confirmed: fetchedData[stateCode].dates[date].total.confirmed,
      recovered: fetchedData[stateCode].dates[date].total.recovered,
      deceased: fetchedData[stateCode].dates[date].total.deceased,
      tested: fetchedData[stateCode].dates[date].total.deceased,
      active:
        fetchedData[stateCode].dates[date].total.confirmed -
        (fetchedData[stateCode].dates[date].total.deceased +
          fetchedData[stateCode].dates[date].total.recovered),
    }))
    console.log('l', specificStateLineChart)

    this.setState({
      chartData: specificState,
      chartLine: specificStateLineChart,
      isLoading: false,
    })
  }

  specificStateBarChart = () => {
    const {chartData} = this.state
    const {
      confirmedCases,
      activeCases,
      recoveredCases,
      deceasedCases,
    } = this.props

    let status = ''

    if (confirmedCases) {
      status = 'confirmed'
    } else if (recoveredCases) {
      status = 'recovered'
    } else if (activeCases) {
      status = 'active'
    } else if (deceasedCases) {
      status = 'deceased'
    }

    const tenStates = chartData.slice(Math.max(chartData.length - 10, 0))
    console.log('limit', tenStates)

    let colorStyle = '#9A0E31'
    if (status === 'confirmed') {
      colorStyle = '#9A0E31'
    } else if (status === 'active') {
      colorStyle = '#0A4FA0'
    } else if (status === 'recovered') {
      colorStyle = '#216837'
    } else if (status === 'deceased') {
      colorStyle = '#474C57'
    }

    return (
      <div className="barChart">
        <BarChart data={tenStates} width={800} height={350} barSize={40}>
          <XAxis
            dataKey="date"
            stroke={`${colorStyle}`}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={`${status}`}
            fill={`${colorStyle}`}
            label={{position: 'top', fill: '#fff'}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  specificStateGraph = (caseData, color) => {
    const {chartLine} = this.state
    console.log('line', chartLine)
    return (
      <div>
        <LineChart
          width={730}
          height={250}
          data={chartLine}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={caseData} stroke={color} />
        </LineChart>
      </div>
    )
  }

  charts = () => (
    <>
      <div className="bar-chart-container">{this.specificStateBarChart()}</div>
      <h1 className="charts-heading">Daily Spread Trends</h1>
      <div className="line-chart-container">
        <div className="line-charts confirmed-chart">
          {this.specificStateGraph('confirmed', '#FF073A')}
        </div>
        <div className="line-charts active-chart">
          {this.specificStateGraph('active', '#007BFF')}
        </div>
        <div className="line-charts recovered-chart">
          {this.specificStateGraph('recovered', '#27A243')}
        </div>
        <div className="line-charts deceased-chart">
          {this.specificStateGraph('deceased', '#6C757D')}
        </div>
        <div className="line-charts tested-chart">
          {this.specificStateGraph('tested', '#9673B9')}
        </div>
      </div>
    </>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div testid="timelinesDataLoader" className="home-container-app">
            <Loader type="Oval" color="#007bff" height={50} width={50} />
          </div>
        ) : (
          <div>{this.charts()}</div>
        )}
      </>
    )
  }
}

export default RechartsData

import { useState, useEffect } from 'react'
import './dashboard.scss'
import { ResponsiveContainer, BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Bar, Legend } from 'recharts'
import { getOverview } from '../../../services/apiService'


const Dashboard = (props) => {
  const [dataOverView, setDataOverView] = useState([])
  const [dataChart, setDataChart] = useState([])

  useEffect(() => {
    fetchDataOverView()
  }, [])

  const fetchDataOverView = async () => {
    let response = await getOverview()
    if (response && response.EC === 0) {
      setDataOverView(response.DT)
      // process chart data
      let Qz = 0, Qs = 0, As = 0; 
      Qz = response?.DT?.others?.countQuiz
      Qs = response?.DT?.others?.countQuestions;
      As = response?.DT?.others?.countAnswers;
      const data = [
        {
          "name": "Quizzes",
          "Qz": Qz
        },
        {
          "name": "Questions",
          "Qs": Qs
        },
        {
          "name": "Asnwers",
          "As": As
        }
      ]
      setDataChart(data)
    }
  }
  return (
    <div className='dashboard__container'>
      <div className="title">
        Dashboard
      </div>
      <div className="content">
        <div className="c__left">
          <div className='child'>
            <span className="text__1">Total User</span>
            <span className="text__2">
              {dataOverView && dataOverView.users && dataOverView.users.total ? <>{dataOverView.users.total}</> : <>0</>}
            </span>
          </div>
          <div className='child'>
            <span className="text__1">Total Quizz</span>
            <span className="text__2">
              {dataOverView.others && dataOverView.others.countQuiz ? <>{dataOverView.others.countQuiz}</> : <>0</>}
            </span>
          </div>
          <div className='child'>
            <span className="text__1">Total Questions</span>
            <span className="text__2">
              {dataOverView.others && dataOverView.others.countQuestions ? <>{dataOverView.others.countQuestions}</> : <>0</>}
            </span>
          </div>
          <div className='child'>
            <span className="text__1">Toal Answers</span>
            <span className="text__2">
              {dataOverView.others && dataOverView.others.countAnswers ? <>{dataOverView.others.countAnswers}</> : <>0</>}
            </span>
          </div>
        </div>
        <div className="c__right">
          <ResponsiveContainer width="95%" height={"100%"} >
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
import React from 'react'
import videoHomePage from "../../assets/for-them-lg.mp4"
import './home.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated) // state.user - ở rootReducer. isAuthenticated ở userReducer : Lấy giá trị biến isAuthenticated ở userReducer

  const navigate = useNavigate()

  return (
    <div className='container home-container'>
      <div className="row justify-content-end">
        <div className="col-md-6">
          <video autoPlay muted loop className='video__homePage'>
            <source src={videoHomePage} type="video/mp4" />
          </video>
        </div>
        <div className="col-md-6 float-right">
          {isAuthenticated === false 
          ?
          <>
            <h5 className='text-center text__item'>Hello, Wellcome My Web Quizz Test by:David William</h5>
            <button className='text-center button__item' onClick={() => navigate('/login')}>Get's start free</button>
          </>
          :
          <button onClick={() => navigate('/user')} className='button__start'>Doing Quizz Now</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Home
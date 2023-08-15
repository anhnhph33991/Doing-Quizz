import React from 'react'
import videoHomePage from "../../assets/for-them-lg.mp4"
import './home.scss'

const Home = () => {
  return (
    <div className='container home-container'>
      <div className="row justify-content-end">
        <div className="col-md-6">
          <video autoPlay muted loop className='video__homePage'>
            <source src={videoHomePage} type="video/mp4" />
          </video>
        </div>
        <div className="col-md-6 float-right">
          <h5 className='text-center text__item'>Hello, Wellcome My Web Quizz Test by:David William</h5>
        </div>
      </div>
    </div>
  )
}

export default Home
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getQuizByUser } from '../../services/apiService'
import "./listQuizz.scss"
import { useNavigate } from 'react-router-dom'

const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        const response = await getQuizByUser()
        if (response && response.EC === 0) {
            setArrQuiz(response.DT)
        }
    }
    return (
        <div className='listQuiz__container container'>
            {arrQuiz && arrQuiz.length > 0
                ?
                (
                    arrQuiz.map((quiz, index) => {
                        return (
                            <div key={`${index}-quiz`} className="card quiz__container" style={{ width: "18rem" }}>
                                <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top card__img" />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{quiz.description
                                    }</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/quiz/${quiz.id}`, {state: {quizTitle: quiz.description}})}
                                    /** sang trang deltailQuizz có id === quiz.id */
                                    >Start Now</button>
                                </div>
                            </div>
                        )
                    })
                )
                :
                (
                    <div>You don't have any quiz now...</div>
                )
            }

        </div>
    )
}

export default ListQuiz
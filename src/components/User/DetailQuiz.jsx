import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuiz } from '../../services/apiService'
import _ from 'lodash'

const DetailQuiz = (props) => {
  const params = useParams()
  const quizId = params.id


  useEffect(() => {
    fetchQuestions()
  }, [quizId])

  const fetchQuestions = async () => {
    let response = await getDataQuiz(quizId)
    if (response && response.EC === 0) {
      let raw = response.DT;

      let data = _.chain(raw) // convert để lodash hiểu
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = []
          let questionDescription, image = null

          value.forEach((item, index) => {
            if(index === 0){ // nếu index === 0
              questionDescription = item.description // lấy câu hỏi đầu tiên vì câu hỏi trùng nhau
              image = item.image // lấy image
            }
            answers.push(item.answers)
          })
          
          return { questionId: key, answers, questionDescription, image }
        })
        .value() // lấy ra / đọc dữ liệu
        console.log(data)
    }
  }

  return (
    <div className='detail__quiz__container'>
      <h1>xin chao</h1>
    </div>
  )
}

export default DetailQuiz
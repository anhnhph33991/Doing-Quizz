import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService'
import _ from 'lodash'
import "./detailQuiz.scss"
import Question from './Question'
import ModalResult from './ModalResult'
import { RightContent } from './Content/RightContent'

const DetailQuiz = (props) => {
  const params = useParams()
  const location = useLocation()
  const quizId = params.id
  const [dataQuiz, setDataQuiz] = useState([])
  const [index, setIndex] = useState(0)
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataModalResult, setDataModalResult] = useState({})

  useEffect(() => {
    fetchQuestions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            if (index === 0) { // nếu index === 0
              questionDescription = item.description // lấy câu hỏi đầu tiên vì câu hỏi trùng nhau
              image = item.image // lấy image
            }
            item.answers.isSelected = false // thêm thuộc tính isSelected vào answers 
            answers.push(item.answers)
          })

          return { questionId: key, answers, questionDescription, image }
        })
        .value() // lấy ra / đọc dữ liệu
      setDataQuiz(data)
    }
  }

  const handleBack = () => {
    if (index - 1 < 0) return; // nếu index - 1 < 0 thì return k cần chạy hàm dưới
    setIndex(index - 1)
  }

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) // nếu dataQuiz > index + 1 thì k làm gì nữa
      setIndex(index + 1)
  }

  const handleFinish = async () => {
    console.log("check data finish", dataQuiz);

    let payload = {
      quizId: +quizId,
      answers: []
    };

    let answers = [];

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = []

        question.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id)
          }
        })

        answers.push({
          questionId: +questionId,
          userAnswerId
        })
      })
      payload.answers = answers
      // console.log('final payload', payload)

      // submit api
      let response = await postSubmitQuiz(payload)
      console.log("check res: ", response)
      if (response && response.EC === 0) {
        setDataModalResult({
          countCorrect: response.DT.countCorrect,
          countTotal: response.DT.countTotal,
          quizData: response.DT.quizData
        })
        setIsShowModalResult(true)
      } else {
        alert("something wrongs...");
      }
    }
  }

  const handleCheckBox = (answersId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); //_.cloneDeep(array cần coppy) coppy tất cả các mảng trong array chính

    let question = dataQuizClone.find(item => +item.questionId === +questionId) // + convert string sang number

    if (question && question.answers) {

      question.answers = question.answers.map((item) => {
        if (+item.id === +answersId) {
          item.isSelected = !item.isSelected
        }
        return item
      })
      // console.log(b)
    }

    let index = dataQuiz.findIndex(item => +item.questionId === +questionId)
    if (index > -1) {
      dataQuizClone[index] = question
      setDataQuiz(dataQuizClone)
    }
  }
  return (
    <div className='detail__quiz__container'>
      <div className='left__content'>
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q__body">
          <img src="" alt="" />
        </div>
        <div className="q__content">
          <Question
            data={dataQuiz && dataQuiz.length > 0
              ? dataQuiz[index] // nếu có dataQuiz sẽ lấy dataQuizz[truyền state index vào - index là 0 - id là 1 , có nghĩa dùng phải + 1 và trừ 1]
              : []} /** Viết mã js thay vì truyền props trực tiếp trong sate */
            index={index}
            handleCheckBox={handleCheckBox}
          />
        </div>
        <div className="footer">
          <button
            className='btn btn-secondary'
            onClick={() => handleBack()}
          >
            Back
          </button>
          <button
            className='btn btn-primary'
            onClick={() => handleNext()}
          >
            Next
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleFinish()}
          >
            Finish
          </button>
        </div>
      </div>

      <div className='right__content'>
        <RightContent 
          dataQuiz={dataQuiz}
          handleFinish={handleFinish}
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  )
}

export default DetailQuiz
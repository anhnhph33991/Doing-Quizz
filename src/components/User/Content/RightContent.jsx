import { useRef } from "react"
import { CountDown } from "./CountDown"


export const RightContent = (props) => {
    const { dataQuiz, setIndex } = props
    const refDiv = useRef([])

    const onTimeUp = () => {
        props.handleFinish()
    }

    const getClassQuestion = (index, question) => {
        // check ansersed

        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.find(a => a.isSelected === true)
            if (isUnAnswered) {
                return 'question selected'
            }
        }
        return 'question'
    }

    const handleClickQuestion = (index, question) => {
        setIndex(index) /** set index === index của câu hỏi khi ấn vào câu nào sẽ hiện câu đó */
        if (refDiv.current) {
            console.log(refDiv.current)
            refDiv.current.forEach((item) => {
                if (item && item.className === 'question clicked') {
                    item.className = "question"
                }
            })
        }

        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.find(a => a.isSelected === true)
            if (isUnAnswered) {
                return; // nếu câu hỏi đã được trả lời sẽ k thêm gì return;
            }
        }

        refDiv.current[index].className = 'question clicked'
    }

    return (
        <>
            <div className="main__timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main__question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                className={getClassQuestion(index, item)}
                                key={`question-${index}`}
                                onClick={() => handleClickQuestion(index, item)}
                                ref={element => refDiv.current[index] = element}>
                                {index + 1}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

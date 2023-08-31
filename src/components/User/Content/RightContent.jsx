import { CountDown } from "./CountDown"


export const RightContent = (props) => {
    const {dataQuiz} = props
    console.log(dataQuiz)

    const onTimeUp = () => {
        props.handleFinish()
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
                    return(
                        <div className="question" key={`question-${index}`}>{index + 1}</div>
                    )
                })
                }
            </div>
        </>
    )
}

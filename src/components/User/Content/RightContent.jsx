

export const RightContent = (props) => {
    const {dataQuiz} = props
    console.log(dataQuiz)
    return (
        <>
            <div className="main__timer">
                08:00
            </div>
            <div className="main__question">
                {dataQuiz && dataQuiz.length > 0 &&
                dataQuiz.map((item, index) => {
                    return(
                        <div className="question">{index + 1}</div>
                    )
                })
                }
            </div>
        </>
    )
}

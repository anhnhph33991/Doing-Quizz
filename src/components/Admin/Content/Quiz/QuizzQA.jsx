import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './QuizzQA.scss'
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCloudUpload } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../../services/apiService';
import { toast } from 'react-toastify';


const QuizzQA = () => {

    const initQuestions = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false
                }
            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestions)

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: ""
    })

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let response = await getAllQuizForAdmin()
        if (response && response.EC === 0) {
            let newQuiz = response.DT.map((item) => { // thay vì set respone.DT như thường thì phải map qua và return trả về object như mảng options cần 
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }


    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isCorrect: false
                    }
                ]
            }

            setQuestions([...questions, newQuestion]) // push newQuestion vào state question
        }

        if (type === "REMOVE") {
            let questionClone = _.cloneDeep(questions); // clone questions
            questionClone = questionClone.filter(item => item.id !== id)
            setQuestions(questionClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions)
        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false
            }

            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers.push(newAnswer)
            setQuestions(questionClone)

        }

        if (type === "REMOVE") {
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone)
        }
    }

    const handleOnChange = (type, questionId, value) => {

        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionClone[index].description = value // đã tìm được tk id nào nhập vào thì sẽ cho desc = value => e.target.value
            setQuestions(questionClone)
        }
    }

    const handleOnChangeFileQuestion = (questionId, e) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            questionClone[index].imageFile = e.target.files[0] // gán file[0] cho imageFile
            questionClone[index].imageName = e.target.files[0].name
            setQuestions(questionClone)
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map((answer) => {
                    if (answer.id === answerId) {
                        if (type === "CHECKBOX") {
                            answer.isCorrect = value
                        }

                        if (type === "INPUT") {
                            answer.description = value;
                        }
                    }
                    return answer
                })
            setQuestions(questionClone)
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        // todo

        // validate data
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Vui lòng chọn quiz')
            return;
        }

        // validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }

        if (isValidAnswer === false) {
            toast.error(`Câu trả lời trống tại Answer - ${indexA + 1} của Question - ${indexQ + 1}`)
            return;
        }


        // validate question
        let isValidQ = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false
                indexQ1 = i
                break
            }
        }

        if (isValidQ === false) {
            toast.error(`Vui lòng nhập desc cho question - ${indexQ1 + 1}`)
            return;
        }


        // submit questions
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            )
            //submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }
        }

        toast.success("Create questions and ansers succed!");
        setQuestions(initQuestions)
    }

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile), // convert image preview 
                title: questionClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }

    return (
        <div className='question__container'>
            <div className="addNew__question">
                <div className="col-6 form-group">
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>


                <div className="mt-3 mb-2">
                    Add question:
                </div>

                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div className='q__main mb-4' key={question.id}>
                                <div className='question__content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(e) => handleOnChange("QUESTION", question.id, e.target.value)}
                                        />
                                        <label>Question {index + 1} Description</label>
                                    </div>
                                    <div className="group__upload">
                                        <motion.label
                                            whileTap={{ scale: 1.1 }}
                                            htmlFor={`${question.id}`}
                                        >
                                            <AiOutlineCloudUpload className='lable__upload' />
                                        </motion.label>
                                        <input
                                            id={`${question.id}`}
                                            type="file"
                                            hidden
                                            onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                                        />
                                        <span>
                                            {
                                                question.imageName
                                                    ? <span
                                                        onClick={() => handlePreviewImage(question.id)}>
                                                        {question.imageName}
                                                    </span>
                                                    : '0 file is uploaded'
                                            }
                                        </span>
                                    </div>
                                    <div className="btn__add">
                                        <motion.span
                                            whileTap={{ scale: 1.2 }}
                                            onClick={() => handleAddRemoveQuestion("ADD", "")}
                                        >
                                            <AiFillPlusCircle className='icon__add' />
                                        </motion.span>

                                        {questions.length > 1 &&
                                            <motion.span
                                                whileTap={{ scale: 1.2 }}
                                                onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}
                                            >
                                                <AiFillMinusCircle className='icon__remove' />
                                            </motion.span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div className="answes__content" key={answer.id}>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(e) => handleAnswerQuestion("CHECKBOX", question.id, answer.id, e.target.checked)}
                                                />
                                                <div className="form-floating answes__name">
                                                    <input type="text" className="form-control" placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(e) => handleAnswerQuestion("INPUT", question.id, answer.id, e.target.value)}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className="btn__group">
                                                    <motion.span
                                                        whileTap={{ scale: 1.2 }}
                                                        onClick={() => handleAddRemoveAnswer("ADD", question.id)}
                                                    >
                                                        <AiOutlinePlusCircle className='icon__add' />
                                                    </motion.span>
                                                    {
                                                        question.answers.length > 1 &&
                                                        <motion.span
                                                            whileTap={{ scale: 1.2 }}
                                                            onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}
                                                        >
                                                            <AiOutlineMinusCircle className='icon__remove' />
                                                        </motion.span>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }

                {
                    questions && questions.length > 0 &&
                    <div className='d-flex'>
                        <button
                            className='btn btn-success'
                            onClick={() => handleSubmitQuestionForQuiz()}
                        >Save Question</button>
                    </div>
                }

                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                }
            </div>


        </div>
    )
}

export default QuizzQA
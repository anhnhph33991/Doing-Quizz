import React, { useState } from 'react'
import Select from 'react-select';
import './question.scss'
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCloudUpload } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"

const Question = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: "question 1",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "answer 1",
                        isCorrect: false
                    }
                ]
            }
        ]
    )

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
    console.log(questions)



    return (
        <div className='question__container'>
            <div className="title">
                Manage Question
            </div>
            <hr />

            <div className="addNew__question">
                <div className="col-6 form-group">
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
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
                                        />
                                        <label>Question {index + 1} Description</label>
                                    </div>
                                    <div className="group__upload">
                                        <motion.label whileTap={{ scale: 1.1 }}>
                                            <AiOutlineCloudUpload className='lable__upload' />
                                        </motion.label>
                                        <input type="file" hidden />
                                        <span>0 file is uploaded</span>
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
                                                />
                                                <div className="form-floating answes__name">
                                                    <input type="text" className="form-control" placeholder="name@example.com"
                                                        value={answer.description}
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



            </div>
        </div>
    )
}

export default Question
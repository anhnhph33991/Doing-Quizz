import React, { useState } from 'react'
import Select from 'react-select';
import './question.scss'
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCloudUpload } from 'react-icons/ai';
import { motion } from 'framer-motion';

const Question = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})

    return (
        <div className='question__container'>
            <div className="title">
                Manage Question
            </div>

            <div className="addNew__question">
                <div className="col-6 form-group">
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>


                <div className="mt-3">
                    Add question:
                </div>

                <div>
                    <div className='question__content'>
                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label>Description</label>
                        </div>
                        <div className="group__upload">
                            <motion.label className='lable__upload' whileTap={{ scale: 1.1 }}>
                                <AiOutlineCloudUpload/>
                            </motion.label>
                            <input type="file" hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className="btn__add">
                            <motion.span whileTap={{ scale: 1.2 }}>
                                <AiFillPlusCircle className='icon__add' />
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }}>
                                <AiFillMinusCircle className='icon__remove' />
                            </motion.span>
                        </div>
                    </div>
                    <div className="answes__content">
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answes__name">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label>Answer 1</label>
                        </div>
                        <div className="btn__group">
                            <motion.span whileTap={{ scale: 1.2 }}>
                            <AiOutlinePlusCircle className='icon__add' />
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }}>
                                <AiOutlineMinusCircle className='icon__remove' />
                            </motion.span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question
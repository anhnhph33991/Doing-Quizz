import React from 'react'
import './managequiz.scss'
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        // validate name,description
        if (!name || !description) {
            toast.error('Name, Description is required');
            return;
        }

        let response = await postCreateNewQuiz(description, name, type?.value, image)

        if (response && response.EC === 0) {
            toast.success(response.EM)
            setName('')
            setDescription('')
            setType('')
            setImage(null)
        } else {
            toast.error(response.EM)
        }
    }

    return (
        <div className='quiz__container'>

            <Accordion defaultActiveKey="0" className='mt-1'>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Manage Quizz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add__new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder='your quiz name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your quiz description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label>Description</label>
                                </div>

                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={'quiz type'}
                                    />
                                </div>

                                <div className="more__actions form-group">
                                    <label className='mb-1'>Upload Image</label>
                                    <input
                                        type="file"
                                        className='form-control'
                                        onChange={(e) => handleChangeFile(e)}
                                    />
                                </div>
                                <div className='mt-3 d-flex justify-content-end'>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => handleSubmitQuiz()}
                                    >Save</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className="list__detail">
                <TableQuiz />
            </div>
        </div>
    )
}

export default ManageQuiz
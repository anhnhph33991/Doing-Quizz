import React, { useState } from 'react'
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";


const Question = (props) => {
    const { data, index, handleCheckBox } = props;
    const [isPreviewImage,setIsPreviewImage] = useState(false)
    if (_.isEmpty(data)) {
        return (<></>) // nếu array rỗng thì k render ra gì
    }

    const handleHandleCheckBox = (e, aId, qId) => {
        // console.log(e.target.checked);
        handleCheckBox(aId, qId)
        // console.log(aId, qId)
    }

    return (
        <>
            {/** ? data của image thì sẽ render ra : render ra this question ...*/}
            {data.image
                ?
                <div className='q__image'>
                    <img 
                    src={`data:image/jpeg;base64,${data.image}`} 
                    alt="" 
                    onClick={() => setIsPreviewImage(true)}
                    />
                    {isPreviewImage === true &&
                    <Lightbox
                        image={`data:image/jpeg;base64,${data.image}`}
                        title={'question image'}
                        onClose={() => setIsPreviewImage(false)}
                    ></Lightbox>
                }
                </div>
                :
                <div className="q__image">
                    <p style={{ fontWeight: "500" }}>This question has no image...</p>
                </div>
            }

            <div className="question">Question {index + 1}: {data.questionDescription}</div>
            <div className="answer">
                {data.answers && data.answers.length && data.answers.map((a, index) => {
                    return (
                        <div
                            key={`answers-${index}`}
                            className='a-child'>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={(e) => handleHandleCheckBox(e, a.id, data.questionId)}
                                    checked={a.isSelected} // truyền isSelected vào để chỉ hiện những input đã chọn tại vị trí của nó // nếu k có khi chọn 1 input ở câu 1 thì tất cả các câu hỏi sẽ bị chọn câu 1
                                />
                                <label className="form-check-label">
                                    {a.description}
                                </label>
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Question
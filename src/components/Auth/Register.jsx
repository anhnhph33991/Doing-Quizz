import "./register.scss"
import { postRegister } from '../../services/apiService'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { Language } from "../Header/Language"

const Register = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const [isShowHide, setIsShowHide] = useState(false)
    const navigate = useNavigate()

    const isValidEmail = (email) => {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        if (username.length < 5) {
            toast.error('Username phải lớn hơn 5 kí tự')
            return
        }

        if (!isValidEmail(email)) {
            toast.error('Email không hợp lệ')
            return
        }

        if (!password) {
            toast.error('Password không được để trống')
            return
        }

        const response = await postRegister(username, email, password)

        if (response && response.EC === 0) {
            toast.success(response.EM)
            navigate('/')
        }

        if (response && +response.EC !== 0) {
            toast.error(response.EM)
        }
    }
    return (
        <div className='register__container'>
            <div className="header">
                <span>Bạn đã có Account ?</span>
                <button onClick={() => { navigate('/login') }}>Đăng Nhập</button>
                <Language/>
            </div>

            <div className="title col-4 mx-auto">
                Form Register
            </div>

            <div className="welcome col-4 mx-auto">
                Hãy đăng kí để xử dụng dịch vụ của chúng tôi
            </div>

            <div className="content__form col-4 mx-auto">
                <div className="form-group">
                    <label>UserName: </label>
                    <input
                        type="text"
                        className='form-control'
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        className='form-control'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group pass__group">
                    <label>Password: </label>
                    <input
                        type={isShowHide ? "text" : "password"}
                        className='form-control'
                        onChange={(e) => setPassWord(e.target.value)}
                    />

                    {
                        isShowHide ?
                            <span
                                className="icons-eye"
                                onClick={() => setIsShowHide(false)}
                            >
                                <VscEye />
                            </span> :
                            <span
                                className="icons-eye"
                                onClick={() => setIsShowHide(true)}
                            >
                                <VscEyeClosed />
                            </span>
                    }
                </div>
                <div>
                    <button className='btn__submit' onClick={() => handleRegister()}>Register</button>
                </div>
                <div className='back'>
                    <span onClick={() => { navigate('/') }}>Trở về trang chủ</span>
                </div>
            </div>
        </div>
    )
}

export default Register
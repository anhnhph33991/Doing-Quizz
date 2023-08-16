import React from 'react'
import "./login.scss"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify'
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'
import { ImSpinner10 } from 'react-icons/im';


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowHide, setIsShowHide] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const isValidEmail = (email) => {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        // validate

        if (!isValidEmail(email)) {
            toast.error('Email không đúng địng dạng')
            return
        }

        if (!password) {
            toast.error('Vui lòng nhập password')
            return
        }

        setIsLoading(true) 
        //submit
        let response = await postLogin(email, password)
        if (response && response.EC === 0) {
            dispatch(doLogin(response))
            toast.success(response.EM)
            setIsLoading(false)
            navigate('/')
        }

        if (response && +response.EC !== 0) {
            toast.error(response.EM)
            setIsLoading(false)
        }
    }

    return (
        <div className='login__container'>
            <div className="header">
                <span>Bạn chưa có Account ?</span>
                <button onClick={() => { navigate("/register") }}>Đăng Kí</button>
            </div>

            <div className="title col-4 mx-auto">
                Form Login
            </div>

            <div className="welcome col-4 mx-auto">
                Xin chào bạn của tôi, chào mừng bạn quay trở lại
            </div>

            <div className="content__form col-4 mx-auto">
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group pass-group">
                    <label>Password: </label>
                    <input
                        type={isShowHide ? 'text' : 'password'}
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isShowHide ?
                        <span className="icon-eye" onClick={() => setIsShowHide(false)}>
                            <VscEye />
                        </span> :
                        <span className="icon-eye" onClick={() => setIsShowHide(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <span className='forgot__password'>Quên mật khẩu ? </span>
                <div>
                    <button
                        className='btn__submit'
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >
                        {isLoading === true && <ImSpinner10 className='loaderIcon' />} 
                        <span>Login</span>
                    </button>
                </div>
                <div className='back'>
                    <span onClick={() => { navigate("/") }}>Trở về trang chủ</span>
                </div>
            </div>
        </div>
    )
}

export default Login
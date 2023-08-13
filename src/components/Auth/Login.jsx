import React from 'react'
import "./login.scss"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify'

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async () => {
        // validate

        //submit
        let response = await postLogin(email, password)
        if(response && response.EC === 0){
            toast.success(response.EM)
            navigate('/')
        }

        if(response && +response.EC !== 0){
            toast.error(response.EM)
        }
    }

    return (
        <div className='login__container'>
            <div className="header">
                <span>Bạn chưa có Account ?</span>
                <button >Đăng Kí</button>
            </div>

            <div className="title col-4 mx-auto">
                LuxChill
            </div>

            <div className="welcome col-4 mx-auto">
                Xin chào bạn của tôi
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
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <span className='forgot__password'>Quên mật khẩu ? </span>
                <div>
                    <button className='btn__submit' onClick={() => handleLogin()}>Login</button>
                </div>
                <div className='back'>
                    <span onClick={() => { navigate("/") }}>Trở về trang chủ</span>
                </div>
            </div>
        </div>
    )
}

export default Login
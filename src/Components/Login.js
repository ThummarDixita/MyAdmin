import { useState, useEffect } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import { URL } from './config/Config'
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const [obj, setObj] = useState({
        phoneNumber: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState({
        phoneNumber: "",
        password: ""
    })
    const navigate = useNavigate()
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        const status = JSON.parse(localStorage.getItem('Login'))
        if (status) {
            setLogin(true)
        }

    }, []);
    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === "phoneNumber" || name === "password") {
            value = parseInt(value) || ""
        }
        setObj({ ...obj, [name]: value })

        setErrorMessage({
            phoneNumber: '',
            password: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let phoneNumberError = ""
        let passwordError = ""
        let flag = true;
        if (obj.phoneNumber === "") {
            phoneNumberError = "PhoneNumber is Required.!"
            flag = false
            toast.error("Please Enter Data..")
        }
        if (obj.phoneNumber === "") {
            passwordError = "PhoneNumber is Required.!"
            flag = false
        }
        if (flag) {
            let header = { mobile_number: obj.phoneNumber, password: obj.password }
            axios.post(`${URL}/register`, header)
                .then((res) => {
                    console.log("responseeee", res.headers);
                    toast.error(res.data.message)
                    console.log("++++++++++", res);
                    if (res?.data?.data[0]?.token) {
                        toast.success("Login Successfull");
                        setObj({
                            phoneNumber: '',
                            password: ''
                        })
                        localStorage.setItem('Login', JSON.stringify(res.data.data[0].token))
                        setTimeout(() => {
                            return navigate("/")
                        }, 4000)
                    }
                }
                )
        }
        setErrorMessage({
            phoneNumber: phoneNumberError,
            password: passwordError
        })
    }
    console.log("errrrt", errorMessage);
    if (isLogin) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className='card'>
                <form>
                    <div className='d-flex justify-content-center mb-2'>
                        <i style={{ fontSize: '25px', fontWeight: '600' }}>Login</i>
                    </div>
                    <div className="col-12 mb-1">
                        <label className='title'>Phone Number : </label>
                        <input type="text" name='phoneNumber' value={obj.phoneNumber} onChange={handleChange} maxLength="10" />
                    </div>
                    <div className='mainError'>
                        {errorMessage.phoneNumber !== "" && <div className='errorMessage'>{errorMessage.phoneNumber}</div>}
                    </div>
                    <div className="col-12 mb-1">
                        <label className='title'>Password :</label>
                        <input type="password" name='password' value={obj.password} onChange={handleChange} />
                    </div>

                    <div className='mainError'>
                        {errorMessage.password !== "" && <div className='errorMessage'>{errorMessage.password}</div>}
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign in</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
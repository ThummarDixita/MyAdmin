import { useState } from 'react'
import '../Login.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { API } from '../config/Config'
import 'react-toastify/dist/ReactToastify.css';
import { FiCheckSquare } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';


function AddCategory() {
    const [obj, setObj] = useState({
        category: ""
    })
    const [errorMessage, setErrorMessage] = useState({
        category: ""
    })
    const navigate = useNavigate()


    const handleChange = (e) => {
        let { name, value } = e.target
        setObj({ ...obj, [name]: value })
        console.log("objjjjjjj", obj);

        setErrorMessage({
            category: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let CategoryError = "";
        let flag = true;
        if (obj.category === "") {
            CategoryError = "CategoryName is Required"
            flag = false
            toast.error("Please Add Category")
        }
        if (flag) {
            let header = { category: obj.category }
            axios.post(API, header).then((res) => {
                console.log("ress++++", res);
                toast.error(res.data.message)
                console.log("++++++++++", res?.data?.data[0]);
                if (res?.data?.data[0]) {
                    toast.success("Category Added Successfull");
                    setTimeout(() => {
                        return navigate("/category")
                    }, 4000)
                }
            })
        }
        setErrorMessage({
            category: CategoryError
        })
    }

    return (
        <div>
            <ToastContainer />
            <div className='card'>
                <form>
                    <div className='d-flex justify-content-center mb-2'>
                        <i style={{ fontSize: '25px', fontWeight: '600' }}>Add Category</i>
                    </div>
                    <div className="col-12 mb-1">
                        <label className='title'>Category : </label>
                        <input type="text" name='category' value={obj.category} onChange={handleChange} />
                    </div>
                    <div className='mainError'>
                        {errorMessage.category !== "" && <div className='errorMessage'>{errorMessage.category}</div>}
                    </div>

                    <div className='d-flex justify-content-end mt-4'>
                        <button type="submit" className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleSubmit}><FiCheckSquare style={{ fontSize: '16px' }} /> Submit</button>
                        <Link to="/category">
                            <button type="submit" className="btn btn-secondary" style={{ marginLeft: "5px" }}><ImCancelCircle style={{ fontSize: '17px' }} /> Cancel</button>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddCategory
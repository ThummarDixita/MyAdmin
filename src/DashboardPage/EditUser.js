import { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import '../Components/Login.css'
import { Button } from 'react-bootstrap';
import axios from 'axios'
import { toast } from 'react-toastify';

const EditUser = (props) => {
    const { editData, setEditData } = props
    const [obj, setObj] = useState({
        phoneNumber: "",
        password: ""
    })
    const id = editData.state._id
    console.log("props++", id);

    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === "phoneNumber" || name === "password") {
            value = parseInt(value) || ""
        }
        setObj({ ...obj, [name]: value })
    }

    const handleSubmit = () => {
        if(obj.phoneNumber !== "" && obj.password !== ""){
            let header = { mobile_number: obj.phoneNumber, password: obj.password }
            axios.put(`https://nodehostheroku.herokuapp.com/register/${id}`, header)
                .then((res) => {
                    toast.error(res.data.message)
                    console.log("++++++++++", res);
                    if (res.data.mobile_number && res.data.password) {
                        toast.success("Edit Data Successfully");
                        setEditData('')
                    }
                }
                )
        }else{
            toast.error("Please Enter Data")
        }

    }

    useEffect(() => {
        console.log("props", props);
        loadUser()
    }, [props]);

    const loadUser = () => {
        setObj({ phoneNumber: props.editData.state.mobile_number, password: props.editData.state.password })
    }

    return (
        <div>
            <Modal show={props.showEditModal} /* style={{ opacity: 1 }} */ dialogClassName="my-dialog"  >
                <div className='close p-2'>
                    <button type="button" class="btn-close" aria-label="Close" onClick={(e) => setEditData('')}></button>
                </div>
                <div className='row editUser'>
                    <div className='col-12 mainClass m-1'>
                        <h3><i>EditUSer Form</i></h3>
                    </div>
                    <div className="col-12 m-1">
                        <label className='title'>Phone Number : </label>
                        <input type="text" name='phoneNumber' value={obj.phoneNumber} onChange={handleChange} maxLength="10" />
                    </div>
                    <div className="col-12 m-1 mb-3">
                        <label className='title'>Password :</label>
                        <input type="password" name='password' value={obj.password} onChange={handleChange} />
                    </div>
                    <div className="col-12 m-1 mainClass">
                        <Button type="button" variant="secondary" onClick={(e) => setEditData('')} style={{ marginRight: '5px' }}>Cancel</Button>
                        <Button type="button" variant="success" onClick={(e)=> handleSubmit(e)} style={{ marginLeft: '5px' }}>Submit</Button>
                    </div>
                </div>
            </Modal >
        </div >
    )
}

export default EditUser
import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './View.css'
function ViewData() {
    const location = useLocation()
    // const id = location.state._id
    const name = location.state.username
    const mobileNo = location.state.mobile_number
    const displayImage = location.state.displayImage
    console.log("location", location);
    console.log("displayImagedisplayImage", displayImage);
    return (
        <div class="users-list-wrapper">
            <div class="users-list">
                {displayImage ?
                    <div class="user-img">
                        <img class="img rounded-img" src="displayImage" /></div> :
                    <div class="user-img">
                        <img class="img rounded-img" src="https://i.pinimg.com/736x/53/6a/1a/536a1adf40ac212182bdcdf403371ac7.jpg" /></div>
                }
                <div class="user-details">
                    <h4 class="name"><i>UserName : </i><i style={{ fontSize: '20px', marginLeft: '15px' }}>{name}</i></h4>
                    <hr />
                    <h4 class="name"><i>Mobile No. : </i> <i style={{ fontSize: '20px', marginLeft: '15px' }}>{mobileNo}</i></h4>
                </div>
            </div>
        </div>
    )
}

export default ViewData
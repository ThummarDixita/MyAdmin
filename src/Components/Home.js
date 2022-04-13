import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar/Navbar';
import img from './assets/images/home.jpg'

function Home() {
    window.onbeforeunload = () => {
        localStorage.removeItem('Login');
      }
    return (
        <div>
        <Navbar/>
       <div>
           <img src={img} width="100%" />
       </div>
        </div>
    )
}

export default Home
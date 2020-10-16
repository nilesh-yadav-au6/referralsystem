import React, { Component } from 'react'
import { connect } from "react-redux"
import pic from "../../images/image.png"
import style from "./HomePage.module.css"
import { Link } from "react-router-dom"

class HomePage extends Component {


  render() {
    return (
      <div className={style.home}>
        <h1>Referral System</h1>
        <Link style={{textDecoration:"none"}} to="/admin"><button className={style.btn}>Admin Referrals</button></Link>
        <img src={pic} alt="langingimage"/>
      </div>
    )
  }
}


const mapStateProp = (state) => {
  return {
        user:state.user.user
  };
};

export default connect(mapStateProp)(HomePage)

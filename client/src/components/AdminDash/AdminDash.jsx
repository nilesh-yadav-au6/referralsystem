import React, { Component } from "react";
import axios from "axios";
import style from "../AdminDash/AdminDash.module.css";

class AdminDash extends Component {
  state = {
    amount: "",
    adminReferral: null,
  };

  async componentDidMount() {
    const { data } = await axios.get("/get/referral");
    this.setState({ adminReferral: data.referrals });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { amount } = this.state;
    await axios.post(`/admin/referral`, { amount });
    const { data } = await axios.get("/get/referral");
    this.setState({ adminReferral: data.referrals });
  };
  handelChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {
    return (
      <div>
        <h1>Welcome Admin</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            width: "calc(100vw-20px)",
            margin: "10px",
          }}
        >
          <h3>Generate ReferralCode</h3>
          <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="amount"
              onChange={this.handelChange}
              value={this.state.amount}
              className="input"
              placeholder="Amount"
            />
            <button className={style.btn} type="submit">
              Generate
            </button>
          </form>
        </div>
        <h2>Admin Referral Code</h2>
        {this.state.adminReferral !== null
          ? this.state.adminReferral.map((referral, index) => (
              <div className={style.refDiv}>
                <h3 key={index}>{referral.referralCode}</h3>
                <small>Amount :{referral.amount}</small>
                <br />
                <small>Status : {referral.status}</small>
                <br />
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default AdminDash;

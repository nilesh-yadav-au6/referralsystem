import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { saveAs } from 'file-saver';
import style from "./Dashboard.module.css"


class UserDashboard extends Component {


  createAndDownloadPdf = (fname,lname,email,id) => {

      const token = localStorage.getItem("token")
      axios.post('/pdf',{fname,lname,email,id}, {
          headers: {
            Authorization: token
          }
        })
      .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })

  }

  createAndExportExcel = (fname,lname,email,earning) => {

    const token = localStorage.getItem("token")
    axios.post('/excel/file',{fname,lname,email,earning}, {
        headers: {
          Authorization: token
        }
      })
    .then(() => axios.get('/fetch-excel', { responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/xls' });

      saveAs(pdfBlob, 'newExcel.xls');
    })

}

  render() {
    return (
      <div>
        {this.props.user !== null ? (
          <div className={style.dashMain}>
            <div className={style.nameDiv}>
            <h2>
              Welcome :{" "}
              {`${this.props.user.user.fname} ${this.props.user.user.lname}`}
            </h2>
            <div style={{width:"10rem"}}>
            <button className={style.btn} onClick={() => this.createAndDownloadPdf(this.props.user.user.fname,this.props.user.user.lname,this.props.user.user.email,this.props.user.user._id)}>Download Id card</button>
            <button className={style.btn} onClick={() => this.createAndExportExcel(this.props.user.user.fname,this.props.user.user.lname,this.props.user.user.email,this.props.user.user.earning)}>Export Profile</button>
            </div>
            </div>
            <div style={{textAlign:"justify"}}>
            <h2>Earning : {`${this.props.user.user.earning}`}</h2>
            <h2>Email : {`${this.props.user.user.email}`}</h2>
            <h2>
              Employee Referralcode :{" "}
              {`${this.props.user.user.empReferralCode}`}
            </h2>
            </div>
              
          </div>
          
        ) : null}
      </div>
    );
  }
}

const mapStateProps = (storeState) => {
  return {
    user: storeState.user.user,
  };
};

export default connect(mapStateProps)(UserDashboard);

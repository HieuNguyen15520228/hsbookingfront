import React, { Component } from 'react';
import authService from '../../../services/auth-service';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import * as actions from 'actions';
import LoginForm from "../login/LoginForm";


class User2 extends Component {
    render() {
        return (
            <div>
                <div className="bg1">
                        <img src="/img/bg.jpg" alt="bg" />
                </div>
                <div className="container" style={{marginTop:"100px",marginBottom:"50px"}}>
                    <div className="dbox3">
                        <div className="row">
                            <div className="col-lg-6" id="rent">
                                <div className="centered1 cont ex">
                                    <img src={"./img/img_bookhouse/house.jpg"} className="image1" alt="none" style={{marginTop:"-100px"}}/>
                                    <div className="middle1">
                                        <div>
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fa fa-camera"/></button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="b b1" style={{marginTop:"10px",marginBottom:"20px",marginRight:"15%",marginLeft:"15%",width:"70%"}} >Đổi avatar</button>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="row">
                                    <button type="submit" className="b b1" style={{display:"inline-block",float:"right",marginRight:"10px"}}><i className="fa fa-edit"/>   Edit</button>
                                    <p style={{fontSize:"25px",marginLeft:"10px"}}>Username</p>
                                </div>
                                <br/>
                                <div>
                                    <label>Email:</label>
                                    <p>placeholder@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-lg-6">
                                <div>
                                    <label>Họ và Tên:</label>
                                    <p>Place Thị Holder</p>
                                </div>
                                <br/>
                                <div>
                                    <label>Số điện thoại:</label>
                                    <p>123456789</p>
                                </div>
                                <br/>
                                <div>
                                    <label>Giới tính:</label>
                                    <br/>
                                    <input list="genders" name="gender"/>
                                    <datalist id="genders">
                                        <option value="Nam"/>
                                        <option value="Nữ"/>
                                    </datalist>
                                </div>
                                <br/>
                                <div>
                                    <label>Ngày sinh:</label>
                                    <p>12/34/5678</p>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                            <div className="col-lg-6">
                                <div>
                                    <label>Địa chỉ:</label>
                                    <p>Trái Đất</p>
                                </div>
                                <br/>
                                <div>
                                    <label>Số chứng minh thư:</label>
                                    <p>123456789</p>
                                </div>
                                <br/>
                                <div>
                                    <label>Đôi điều về bạn:</label>
                                    <textarea cols="35" rows="5" style={{border:"dashed 2px gray",borderRadius:"5px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default (User2);
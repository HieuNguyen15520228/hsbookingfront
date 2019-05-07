import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import RentalImages from './RentalImages';
import { RentalAssets } from './RentalAssets';
import { RentalInfo } from './RentalDetailInfo'
import * as actions from 'actions';
import RentalDateForm from './RentalDateForm'
import Loading from "component/main/user/loading"
import { formatNumber } from 'helpers/index'
import { Link, Redirect } from 'react-router-dom'
import authService from 'services/auth-service';
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";
import "./style.scss"

class RentalDetail extends Component {
  componentWillMount() {
    // Dispatch action
    window.scrollTo(0, 0)
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }
  constructor(props) {
    super(props);
    this.state = {
      booked: false,
      errors: [],
      show: false
    }
  }
  notify = () => toast.success("Wow so easy !");
  deleteRental = (rentalId) => {
    this.props.dispatch(actions.deleteRental(rentalId))
  }
  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  book = (bookData) => {
    const booking = {
      startAt: bookData.startAt,
      endAt: bookData.endAt,
      guests: bookData.guests,
      id: this.props.match.params.id,
      price: this.props.rental.price
    }
    this.setState({
      booked: false,
      errors: []
    })
    this.props.dispatch(actions.createBooking(booking))
  }

  componentDidUpdate() {
    this.props.dispatch(actions.resetRentalState())
  }

  render() {
    const {posted} = this.props.location.state || false
    {
      posted && this.notify()
    }
    const owner = this.props.rental.user
    const errors = this.props.booking.errors
    const isSuccess = this.props.booking.isSuccess
    // const images = []
    // if (this.props.rental.image) {
    //   this.props.rental.image.map(i => {
    //     images.push({
    //       original: i,
    //       thumbnail: i
    //     })
    //   })
    // }
    if (this.props.isDeleted) {
      this.handleClose()
      return <Redirect to={{pathname:"/rental/manage", state:{isDeleted: true}}} />
    }
    if (this.props.rental._id) {

      return (
        <div id="rent">
          
          <ToastContainer/>
          <RentalImages image={this.props.rental.image} />
          <br />
          <div className="container">
            <div>
              <div className="col-sm-8">
                <div>
                  <div className="infobox slide-in-left row" style={{ marginBottom: "20px" }}>
                    <div className="col-lg-8">
                      <img src={owner.image} className="ravatar" alt="none" />
                      <h4 className="rname">{owner.username}</h4>
                    </div>
                    {(authService.getId() === owner._id) &&
                      <div className="col-lg-4">
                        <Link to={{ pathname: `/edit/${this.props.rental._id}`, state: { rental: this.props.rental } }}>
                          <button className="b b1 rbutton"><span><i className="fa fa-edit" />   Sửa</span></button>
                        </Link>
                        <button onClick={this.handleShow} className="b b1 rbutton"><span><i className="fa fa-close" />   Xóa</span></button>
                        <Modal style={{ opacity: 1 }} show={this.state.show} onHide={this.handleClose}>
                          <Modal.Body>Bạn có chắc muốn xóa?</Modal.Body>
                          <Modal.Footer>
                            <Button className="b b1" onClick={() => { this.handleClose();this.deleteRental(this.props.rental._id) }}>
                              Xóa
                            </Button>
                            <Button className="b b1" onClick={this.handleClose}>
                              Đóng
                            </Button>
                          </Modal.Footer>
                        </Modal>

                      </div>
                    }
                  </div>
                  <div className="infobox slide-in-left" style={{ backgroundColor: "#4B0082" }}>
                    <h3 id="null" style={{ fontWeight: "bold", color: "white", fontSize: "25px" }}>{this.props.rental.title}</h3>
                    <h5 style={{ color: "white" }}>{this.props.rental.address}</h5>

                  </div>
                  <div className="infobox slide-in-left">
                    <div>
                      <h3 className="text-left bor type1"
                        style={{ padding: "5px", fontSize: "27px" }}>Mô tả </h3>
                      <div>
                        <br />
                        <p style={{ whiteSpace: "pre-line", whiteSpace: "pre-wrap" }}>{this.props.rental.description}</p>
                      </div>
                      <hr />
                      <h3 className="text-left bor type1"
                        style={{ padding: "5px", fontSize: "27px" }}>Thông tin </h3>
                      <div>

                        <div className="block">
                          <i className="fa fa-bed"> {this.props.rental.bedrooms} giường</i> <br />
                        </div>
                        <div className="block">
                          <i className="fa fa-male"> Tối đa {this.props.rental.people} người ở</i> <br />
                        </div>
                        <div className="block">
                          <i className="fa fa-bath"> {this.props.rental.bathrooms} phòng tắm</i> <br />
                        </div>
                      </div>
                      <hr />
                      <h3 className="text-left bor type1"
                        style={{ padding: "5px", fontSize: "27px" }}>Tiện nghi </h3>
                      <RentalAssets rental={this.props.rental} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-sm-8">
              <div className="rental-owner">
                <p>Chủ nhà: {owner.username}</p>
                <img style={{ width: "56px", height: "56px", borderRadius: "50%" }} src={owner.image}></img>
                <p style={{ color: "#53525a" }}>Lời từ chủ nhà ví dụ {owner.message}</p>
                {authService.getId() === owner._id && <button><Link to={{ pathname: `/edit/${this.props.rental._id}`, state: { rental: this.props.rental } }}>Nút chỉnh sửa chỉ hiện khi là chủ nhà</Link></button>}
              </div>
              <div className="infobox">

                <h3>{this.props.rental.title}</h3>
                <h6 style={{ color: "gray" }}>{this.props.rental.address}</h6>
                <ul className="nav nav-tabs">
                  <li className="active"><a data-toggle="tab" href="#description">Mô tả</a></li>
                  <li><a data-toggle="tab" href="#info">Thông tin</a></li>
                  <li><a data-toggle="tab" href="#goods">Tiện nghi</a></li>
                </ul>
                <div className="tab-content">
                  <div id="description" className="tab-pane fade in active">
                    <br />
                    <p>{this.props.rental.description.replace(/✔️/g, "\n")}</p>
                  </div>
                  <RentalAssets rental={this.props.rental} />
                  <div id="info" className="tab-pane fade">
                    <br />
                    <i className="fa fa-bed"> {this.props.rental.bedrooms} giường</i> <br />
                    <br />
                    <i className="fa fa-male"> Tối đa {this.props.rental.people} người ở</i> <br />
                    <br />
                    <i className="fa fa-bath"> {this.props.rental.bathrooms} phòng tắm</i> <br />
                    <br />
                  </div>

                </div>
              </div>

            </div> */}
            <div className="col-sm-4">
              {
                !(authService.getId() === owner._id) &&
                <div className="divide">
                  <div className="infobox slide-in-right" style={{ backgroundColor: "#4B0082" }}>
                    <h3 style={{ color: "white" }}>Giá: <b>{formatNumber(this.props.rental.price)}</b> đ / ngày</h3>
                  </div>
                  <div className="infobox slide-in-right">
                    {
                      isSuccess &&
                      <div className="boxtrue">Đã đặt phòng thành công</div>
                    }
                    <RentalDateForm price={this.props.rental.price} submitCb={this.book} people={this.props.rental.people} errors={errors} />
                    <br />
                    {/* <div className="modal fade" id="payment" role="dialog">
                  <div className="modal-dialog">


                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Thanh toán</h4>
                      </div>
                      <div className="modal-body">
                        <p>Truyền prob thông tin thanh toán vào đây.</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Thanh toán</button>
                      </div>
                    </div>
                  </div>
                </div> */}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      );
    }
    else return <Fragment>
      <Loading />
    </Fragment>
  }
}
function mapStateToProps(state) {
  return {
    isCreated: state.rental.isCreated,
    isDeleted: state.rentals.isDeleted,
    deleteError: state.rentals.errors,
    isUpdated: state.rental.isUpdated,
    booking: state.userBookings,
    rental: state.rental.data,
    errors: state.rental.errors,
    auth: state.auth
  }
}
export default connect(mapStateToProps)(RentalDetail)
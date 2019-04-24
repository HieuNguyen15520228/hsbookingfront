import React from 'react';
import { Link } from "react-router-dom";

export function RentalCard(props) {
    const rental = props.rental;
    console.log(props)
    return (
        <div className="sub_home_slider_container">
            {/* <div className="sub_home_slider_container"> */}
                <Link className="sub_home_link"  to={`/detail/${rental._id}`}>
                    <img className="sub_home_fix_img" src={rental.image[0]} alt="Snow" width="100%" />
                    <p className="sub_home_text_p">{rental.address}</p>
                    <h3 className="sub_home_text_h3">{rental.title}</h3>
                    <div className="sub_home_text_price">{rental.price}</div>
                    <div className="sub_home_star"><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></div>
                </Link>
            {/* </div> */}
        </div>
    )
}
export default RentalCard;
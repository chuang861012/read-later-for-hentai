import React from "react";
import PropTypes from "prop-types";

function NavBar({num,func}) {
    return (
        <div className="nav-container">
            <p className="nav-text">{num} / 20</p>
            <button className="btn nav-clear-btn" onClick={func}>Clear</button>
        </div>
    );
}

NavBar.propTypes = {
    num:PropTypes.number,
    func:PropTypes.func
};

export default NavBar;
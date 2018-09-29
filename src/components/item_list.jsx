import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ItemList extends Component {
    renderItems({ img, link, title }, index, arr) {
        return (
            <li className="list-item">
                <a href={link} target="_blank" rel="noopener noreferrer" >
                    <div className="item-box">
                        <div className="item-img-box">
                            <img src={img} />
                        </div>
                        <div className="item-detail-box">
                            <h1 className="item-detail-title">{title}</h1>
                            <button
                                className="btn item-detail-btn"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    this.props.func(link);
                                }}>&#x2716;</button>
                        </div>
                    </div>
                </a>
                {arr.length > index + 1 ? <hr /> : <noscript />}
            </li>
        );
    }

    render() {
        return (
            <div>
                <ul className="item-container">
                    {this.props.items.map(this.renderItems.bind(this))}
                </ul>
            </div>
        );
    }
}

ItemList.propTypes = {
    items:PropTypes.arrayOf(PropTypes.object),
    func:PropTypes.func
};
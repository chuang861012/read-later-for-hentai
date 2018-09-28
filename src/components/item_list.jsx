import React, { Component } from "react";
import Navbar from "./nav_bar";

export default class ItemList extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        chrome.storage.sync.get("readAfter", ({ readAfter }) => {
            this.setState({ items: readAfter });
        });
    }

    onRemoveButtonClick(link) {
        const items = this.state.items.filter((item) => item.link !== link);
        this.setState({ items });
        chrome.storage.sync.set({ readAfter: items });
    }

    onClearButtonClick(){
        this.setState({items:[]});
        chrome.storage.sync.set({ readAfter: [] });
    }

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
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onRemoveButtonClick(link);
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
                <Navbar num={this.state.items.length} func={this.onClearButtonClick.bind(this)}/>
                <ul className="item-container">
                    {this.state.items.map(this.renderItems.bind(this))}
                </ul>
            </div>
        );
    }
}
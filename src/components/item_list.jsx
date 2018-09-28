import React, { Component } from "react";

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

    renderItems({ img, link, title }) {
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
                                }}>delete</button>
                        </div>
                    </div>
                </a>
            </li>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <p>{this.state.items.length} / 20</p>
                </div>
                <ul className="item-container">
                    {this.state.items.map(this.renderItems.bind(this))}
                </ul>
            </div>
        );
    }
}
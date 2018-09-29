import React, { Component } from "react";
import ItemList from "./item_list";
import Navbar from "./nav_bar";

export default class App extends Component {
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

    render() {
        return (
            <div>
                <Navbar num={this.state.items.length} func={this.onClearButtonClick.bind(this)}/>
                <ItemList items={this.state.items} func={this.onRemoveButtonClick.bind(this)}/>
            </div>
        );
    }
}

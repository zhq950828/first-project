import React from 'react';
import './index.styl';
const path = require('path');

console.log(__dirname);
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="index">
                hellow
            </div>
        )
    }
}
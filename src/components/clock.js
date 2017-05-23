/*
    Performing the lifecycle of component.
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Clock extends Component {
    /* Lifecycle */
    // Mounting: These methods are called when an instance of a component is being created and inserted into the DOM
    constructor(prop) {
        console.log('constructor');

        super(prop);

        this.state = {
            date: new Date(),
            count: 0
        };
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    render() {
        console.log('render');
        return(
            <div>
                <h1>Zestlifia</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.timerId = setInterval(
            () => this.tick(),
            5000
        );
    }
    // Updating: An update can be caused by changes to props or state. These methods are called when a component is being re-rendered
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps: ');
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate: ');
        return true ;
    }
    // 以上兩個 componentWillReceiveProps & shouldComponentUpdate 可以用來做redo
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    // Unmounting: This method is called when a component is being removed from the DOM
    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.timerId);
    }


    // custom function
    tick() {
        if(this.state.count > 2) {
            ReactDOM.unmountComponentAtNode(document.querySelector('.container'));
            return ;
        }
        this.setState({
            date: new Date(),
            count: this.state.count + 1
        });
    }
}
export default Clock;

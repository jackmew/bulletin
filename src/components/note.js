import React, { Component } from 'react';

class Note extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            editing: false,
            note: prop.note,
            tempContent: prop.note.content
        };
    }
    componentWillMount() {
        console.log("componentWillMount: dynamic create style");
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    }
    componentDidMount() {
        $(this.refs.note).draggable();
    }
    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }
    // display
    edit() {
        this.setState({
            editing: true,
            tempContent: this.state.note.content
        });
    }
    remove(event) {
        this.props.onRemove(this.props.index);
        event.stopPropagation();
        event.preventDefault();
    }
    // form
    onTextareaChange(value) {
        this.setState({tempContent: value});
    }
    save() {
        this.setState({
            editing: false,
            note: { content: this.state.tempContent }
        });
    }
    cancel() {
        this.setState({ editing: false});
    }

    focus() {
        this.props.onFocus(this.props.index);
    }

    renderDisplay() {
        return(
            <div className="note" style={this.style} ref="note"
                onClick={() => this.focus()}>
                <p>{this.state.note.content}</p>
                <span>
                    <button className="btn btn-primary fa fa-pencil"
                        onClick={() => this.edit()}></button>
                    <button className="btn btn-danger fa fa-trash"
                        onClick={(event) => this.remove(event)}></button>
                </span>
            </div>
        );
    }
    renderForm() {
        return(
            <div className="note" style={this.style} ref="note">
                <textarea className="form-control" value={this.state.tempContent}
                    onChange={(event) => this.onTextareaChange(event.target.value) }></textarea>
                <button className="btn btn-success btn-sm fa fa-floppy-o"
                    onClick={() => this.save()}></button>
                <button className="btn btn-warning btn-sm fa fa-reply"
                    onClick={() => this.cancel()}></button>
            </div>
        )
    }

    render() {
        if(this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderDisplay();
        }
    }
}

export default Note ;

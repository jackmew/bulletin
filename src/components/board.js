import React, { Component } from 'react';

import Note from './note';

class Board extends Component {
    constructor(prop) {
        super(prop);

        // this.state = { notes: [{id: 0, content: "My First Note"}, {id: 1, content: "My Second Note"}] };
        this.state = { notes: []};
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0 ;
        return this.uniqueId++;
    }

    componentWillMount() {
        if(this.props.count) {
            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
                            this.props.count + "&start-with-lorem=1&callback=?", (results) => {
                                results[0].split('. ').forEach((sentence) => {
                                    this.add(sentence.substring(0,40));
                                });
                            });
        }
    }

    add(text) {
        text || (text = "New Notes");

        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            content: text
        });
        this.setState({notes: arr});
    }

    remove(index) {
        var arr = this.state.notes;
        arr.splice(index, 1);
        this.setState({notes: arr});
    }

    focus(index) {
        var arr = this.state.notes;
        var currentNote = arr[index];
        arr.splice(index, 1);
        arr.push(currentNote);
        this.setState({notes: arr});
    }

    iterateNotes() {

        return this.state.notes.map((note, i) => {
                return(
                    <Note
                        key={note.id}
                        index={i}
                        note={note}
                        onRemove={(index) => this.remove(index)}
                        onFocus={(index) => this.focus(index)}
                        ></Note>
                );
            });
    }

    render() {
        return(
            <div className="board">
                {this.iterateNotes()}
                <button className="btn btn-sm btn-success fa fa-plus"
                    onClick={() => this.add()}></button>
            </div>
        );
    }
}
export default Board;

import React from 'react';
import ReactDOM from 'react-dom';

import Note from './components/note';
import Board from './components/board';

const App = () => {
    return(<Board count={10}/>);
}
ReactDOM.render(<App/>, document.querySelector('.react-container'));

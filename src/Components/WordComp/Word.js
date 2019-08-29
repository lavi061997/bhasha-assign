import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class Word extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { addToAnswerWords, word, index } = this.props;
        return (
            <Button onClick={ () => addToAnswerWords(index) } variant="outlined" color="primary" >
                {word}
            </Button>
        )
    }
}

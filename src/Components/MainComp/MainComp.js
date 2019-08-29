import React, { Component } from 'react'
import Word from '../WordComp/Word';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        height: '100px', 
        fontSize: '24px',
        width: '100%'
    },
    grid: {
        height: '150px'
    }
}

class MainComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word: 'GOT season eigth was disappointing',
            question_words: [],
            answer_words: [],
            isCorrect: false
        }
    }

    componentDidMount() {
        const question_words = this.shuffleArray(this.state.word.split(' '))
        this.setState({ question_words: question_words })
    }

    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }        
        return array;
    }
    
    addToAnswerWords = (index) => {
        let new_question_words = this.state.question_words;
        let element = new_question_words.splice(index, 1);
        
        this.setState({ answer_words: [...this.state.answer_words, element[0]], question_words: new_question_words }, () => {
            console.log(this.state.answer_words.join(' '));
            
            if(this.state.question_words.length === 0) {
                if(this.state.answer_words.join(' ') === this.state.word) {
                    this.setState({ isCorrect : true });
                } else {
                    this.setState({ isCorrect : false })
                }
            }
        })
        
    }
    
    reset = () => {
        this.setState({ answer_words: [], question_words: this.shuffleArray(this.state.word.split(' ')), isCorrect: false})
    }

    render() {
        const { classes } = this.props;
        let { question_words, answer_words, isCorrect } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid className={classes.grid} item xs={12}>
                        <Paper className={classes.paper}>Pick the words in order</Paper>
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <Paper className={classes.paper}> {this.state.word} </Paper>
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <Paper className={classes.paper}>
                            {
                                answer_words.map((answer_word, i) => (
                                    <Word key={i} word={answer_word}/>
                                ))
                            }
                        </Paper>
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <Paper className={classes.paper}>
                            {
                                question_words.map((question_word, i) => (
                                    <Word key={i} word={question_word} index={i} addToAnswerWords={this.addToAnswerWords} />
                                ))
                            }
                            {
                                question_words.length === 0 && isCorrect ? (
                                    <span>Correct!</span>
                                ) : question_words.length === 0 && !isCorrect ?  (
                                    <span>InCorrect!</span>
                                ) : ''
                            }
                        </Paper>
                    </Grid>
                    <Grid className={classes.grid} item xs={12}>
                        <Paper className={classes.paper}>
                            <Button onClick={this.reset} variant="outlined" color="primary" >
                                Reset/Reshuffle
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(MainComp)
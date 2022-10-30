import { useState } from 'react';
import Card from './Card';
import { Term, QuizMode } from '../Types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import transitionStyles from './Quiz.Transition.module.css';

type QuizProps = {
  terms: Term[];
  quizMode: QuizMode;
  callback: (finished: boolean, numIncorrect: number) => void;
};

function Quiz(props: QuizProps) {
  const [terms, setTerms] = useState(props.terms);
  const [sequence, setSequence] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);

  var onCorrect = () => {
    if (terms.length === 1) {
      props.callback(true, numIncorrect);
    } else {
      setTerms((terms) => {
        var rv = terms.slice(1, terms.length);
        return rv;
      });
      setSequence((sequence) => sequence + 1);
    }
  };

  var onIncorrect = () => {
    setTerms((terms) => {
      var term = terms[0];
      var rv = terms.slice(1, terms.length);
      rv.push(term);
      return rv;
    });
    setSequence((sequence) => sequence + 1);
    setNumIncorrect((numIncorrect) => numIncorrect + 1);
  };

  var onQuit = () => {
    props.callback(false, numIncorrect);
  };

  return (
    <div className="Quiz">
      <TransitionGroup component={null}>
        <CSSTransition
          // TODO: nodeRef (hard with functional components)
          key={sequence}
          classNames={{ ...transitionStyles }}
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
        >
          <Card
            sequence={sequence}
            term={terms[0]}
            onCorrect={onCorrect}
            onIncorrect={onIncorrect}
            quizMode={props.quizMode}
          />
        </CSSTransition>
      </TransitionGroup>
      <div>
        props.terms.length: {props.terms.length}
        <br />
        terms.length: {terms.length}
        <br />
        numIncorrect: {numIncorrect}
      </div>
      <div>quizMode: {props.quizMode}</div>

      <button onClick={onQuit}>Quit</button>
    </div>
  );
}

export default Quiz;

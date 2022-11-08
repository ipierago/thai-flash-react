import { useState } from 'react';
import Card from './Card';
import { Term } from '../Types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { QuizMode } from './QuizTypes';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

type QuizProps = {
  terms: Term[];
  quizMode: QuizMode;
  callback: (finished: boolean, numIncorrect: number) => void;
};

function QuizRun(props: QuizProps) {
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

  const StatusBar = (): JSX.Element => {
    return (
      <div className="flex justify-evenly">
        <span>remaining: {terms.length}</span>
        <span>incorrect: {numIncorrect}</span>
        <ArrowRightOnRectangleIcon
          className="inline-block btn-primary-color w-8"
          onClick={onQuit}
        />
      </div>
    );
  };

  return (
    <>
      <StatusBar />
      <TransitionGroup component={null}>
        <CSSTransition
          // TODO: nodeRef (hard with functional components)
          key={sequence}
          classNames={{
            enter: 'absolute transform -translate-x-full pointer-events-none',
            enterActive:
              'transform translate-x-0 transition ease-in-out duration-300',
            exit: 'absolute transform translate-x-0 pointer-events-none',
            exitActive:
              'absolute transform translate-x-full transition ease-in-out duration-300',
          }}
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
    </>
  );
}

export default QuizRun;

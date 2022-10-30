import { useState } from 'react';
import QuizMenu from './QuizMenu';
import QuizRun from './QuizRun';
import QuizSummary from './QuizSummary';
import { QuizMode } from './QuizTypes';
import { Term } from '../Types';
import _ from 'underscore';

enum Stage {
  Menu = 'Menu',
  Run = 'Run',
  Summary = 'Summary',
}

const Quiz = (props: { terms: Term[]; callback: () => void }): JSX.Element => {
  const [stage, setStage] = useState<Stage>(Stage.Menu);
  const [quizMode, setQuizMode] = useState<QuizMode>(null!);
  const [quizTerms, setQuizTerms] = useState<Term[]>(null!);
  const [numIncorrect, setNumIncorrect] = useState<number>(null!);

  const menuCallback = (
    quizMode: QuizMode,
    maxTerms: number,
    requiredTags: string[]
  ) => {
    setQuizMode(quizMode);
    let ar = [...props.terms];
    if (requiredTags.length > 0) {
      ar = ar.filter((term) =>
        requiredTags.every((tag) => term.tags.includes(tag))
      );
    }
    ar = _.shuffle(ar);
    let ar2 = ar.slice(0, maxTerms);
    setQuizTerms(ar2);
    //TODO: empty quiz case
    setStage(Stage.Run);
  };

  const runCallback = (finished: boolean, numIncorrect: number) => {
    setNumIncorrect(numIncorrect);
    if (finished) {
      setStage(Stage.Summary);
    } else {
      props.callback();
    }
  };

  const summaryCallback = () => {
    props.callback();
  };

  const getUniqueTags = (): string[] => {
    let tags: string[] = [];
    props.terms.forEach((term: Term) => {
      term.tags.forEach((tag: string) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    return tags;
  };

  return (
    <>
      {stage === Stage.Menu && (
        <QuizMenu callback={menuCallback} uniqueTags={getUniqueTags()} />
      )}
      {stage === Stage.Run && (
        <QuizRun terms={quizTerms} callback={runCallback} quizMode={quizMode} />
      )}
      {stage === Stage.Summary && (
        <QuizSummary
          terms={quizTerms}
          callback={summaryCallback}
          numIncorrect={numIncorrect}
        />
      )}
    </>
  );
};

export default Quiz;

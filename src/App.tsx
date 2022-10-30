import { useState, useRef } from 'react';
import Quiz from './components/Quiz';
import Menu from './components/Menu';
import _, { map } from 'underscore';
import Summary from './components/Summary';
import { QuizMode, Term } from './Types';

var terms = require('./test-data.json');

enum Stage {
  Menu = 'Menu',
  Quiz = 'Quiz',
  Summary = 'Summary',
}

function App() {
  const [stage, setStage] = useState(Stage.Menu);
  const [quizMode, setQuizMode] = useState(QuizMode.Listen);
  let maxTerms = useRef(20);
  const [quizTerms, setQuizTerms] = useState<Term[]>([]);
  const [numIncorrect, setNumIncorrect] = useState(0);

  const menuCallback = (
    quizMode: QuizMode,
    _maxTerms: number,
    requiredTags: string[]
  ) => {
    setQuizMode(quizMode);
    maxTerms.current = _maxTerms;
    let ar = [...terms];
    if (requiredTags.length > 0) {
      ar = ar.filter((term) =>
        requiredTags.every((tag) => term.tags.includes(tag))
      );
    }
    ar = _.shuffle(ar);
    let ar2 = ar.slice(0, maxTerms.current);
    setQuizTerms(ar2);
    //TODO: empty quiz case
    setStage(Stage.Quiz);
  };

  const quizCallback = (finished: boolean, numIncorrect: number) => {
    setNumIncorrect(numIncorrect);
    if (finished) {
      setStage(Stage.Summary);
    } else {
      setStage(Stage.Menu);
    }
  };

  const summaryCallback = () => {
    setStage(Stage.Menu);
  };

  const getTags = (): string[] => {
    let tags: string[] = [];
    terms.forEach((term: Term) => {
      term.tags.forEach((tag: string) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    return tags;
  };

  return (
    <div className="App">
      {stage === Stage.Menu && (
        <Menu callback={menuCallback} allTags={getTags()} />
      )}
      {stage === Stage.Quiz && (
        <Quiz terms={quizTerms} callback={quizCallback} quizMode={quizMode} />
      )}
      {stage === Stage.Summary && (
        <div>
          <Summary
            terms={quizTerms}
            callback={summaryCallback}
            numIncorrect={numIncorrect}
          />
        </div>
      )}
    </div>
  );
}

export default App;

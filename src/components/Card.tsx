import { useEffect, useMemo, useState, useRef } from 'react';
import { PlayIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './Card.module.css';
import { Term, QuizMode } from '../Types';

enum Face {
  Front = 'Front',
  Back = 'Back',
}

const Card = ({
  sequence,
  term,
  onCorrect,
  onIncorrect,
  quizMode,
}: {
  sequence: number;
  term: Term;
  onCorrect: Function;
  onIncorrect: Function;
  quizMode: QuizMode;
}) => {
  const nodeRefDiv = useRef<HTMLDivElement>(null!);

  const [face, setFace] = useState(Face.Front);

  const audio = useMemo(() => {
    return new Audio('mp3/' + term.th + '.mp3');
  }, [term.th]);

  useEffect(() => {
    if (quizMode === QuizMode.Listen) {
      audio.play();
    }
    setFace(Face.Front);
  }, [sequence, audio, quizMode]);

  const Front = ({ sequence, term }: { sequence: number; term: Term }) => {
    return (
      <div className={styles.front}>
        {quizMode === QuizMode.Speak && (
          <div>
            <div>en: {term.en}</div>
          </div>
        )}
        {quizMode === QuizMode.Listen && (
          <div>
            <PlayIcon
              className={styles.icon}
              onClick={() => {
                audio.play();
              }}
            />
          </div>
        )}
      </div>
    );
  };

  const Back = ({ sequence, term }: { sequence: number; term: Term }) => {
    return (
      <div className={styles.back}>
        <div>th: {term.th}</div>
        <div>en: {term.en}</div>
        <div>ipa: {term.ipa}</div>
        <hr />
        <PlayIcon
          className={styles.icon}
          onClick={() => {
            audio.play();
          }}
        />
        <hr />
        <CheckIcon
          className={styles.icon}
          onClick={() => {
            onCorrect();
          }}
        />
        <XMarkIcon
          className={styles.icon}
          onClick={() => {
            onIncorrect();
          }}
        />
      </div>
    );
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={face}
        nodeRef={nodeRefDiv}
        classNames={{ ...styles }}
        addEndListener={(done) => {
          nodeRefDiv.current.addEventListener('transitionend', done, false);
        }}
        onEntered={(isAppearing: boolean) => {
          if (
            (quizMode === QuizMode.Speak && face === Face.Back) ||
            (quizMode === QuizMode.Listen && face === Face.Front)
          ) {
            audio.play();
          }
        }}
      >
        <div className={styles.card} ref={nodeRefDiv}>
          {face === Face.Front && (
            <div>
              <Front sequence={sequence} term={term} />
            </div>
          )}
          {face === Face.Back && (
            <div>
              <Back sequence={sequence} term={term} />
            </div>
          )}

          <div>
            <button
              onClick={() => {
                setFace((face) =>
                  face === Face.Front ? Face.Back : Face.Front
                );
              }}
            >
              Flip
            </button>
          </div>
          <div>sequence: {sequence}</div>
          <div>face: {face}</div>
          <div>tags: {JSON.stringify(term.tags)}</div>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Card;

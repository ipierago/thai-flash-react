import { useEffect, useMemo, useState, useRef } from 'react';
import {
  PlayIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import transitionStyles from './Card.Transition.module.css';
import { Term } from '../Types';
import { QuizMode } from './QuizTypes';

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
      <>
        {quizMode === QuizMode.Speak && (
          <div className="relative h-full">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl text-center">
              {term.en}
            </div>
          </div>
        )}
        {quizMode === QuizMode.Listen && (
          <div className="relative h-full">
            <PlayIcon
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 btn-primary-color w-32 mx-auto"
              onClick={() => {
                audio.play();
              }}
            />
          </div>
        )}
      </>
    );
  };

  const Back = ({ sequence, term }: { sequence: number; term: Term }) => {
    return (
      <div className="">
        <div className="text-4xl w-fit mx-auto my-2">en: {term.en}</div>
        <div className="text-4xl w-fit mx-auto my-2">ipa: {term.ipa}</div>
        <div className="text-4xl w-fit mx-auto my-2">th: {term.th}</div>
        <PlayIcon
          className="btn-primary-color w-32 mx-auto"
          onClick={() => {
            audio.play();
          }}
        />
        <div className="flex justify-around">
          <CheckIcon
            className="btn-primary-color w-32 inline-block"
            onClick={() => {
              onCorrect();
            }}
          />
          <XMarkIcon
            className="btn-primary-color w-32 inline-block"
            onClick={() => {
              onIncorrect();
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={face}
          nodeRef={nodeRefDiv}
          classNames={{ ...transitionStyles }}
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
          <div className="h-full bg-slate-400 rounded-3xl" ref={nodeRefDiv}>
            <div className="h-4/6">
              {face === Face.Front && <Front sequence={sequence} term={term} />}
              {face === Face.Back && <Back sequence={sequence} term={term} />}
            </div>
            <ArrowPathIcon
              className="btn-primary-color h-1/4 w-32 mx-auto"
              onClick={() => {
                setFace((face) =>
                  face === Face.Front ? Face.Back : Face.Front
                );
              }}
            />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default Card;

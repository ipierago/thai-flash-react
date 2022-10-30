import { useState, useCallback } from 'react';
import { QuizMode } from './QuizTypes';
import { RadioGroup } from '@headlessui/react';
import NumberSpinner from './NumberSpinner';
import { Listbox } from '@headlessui/react';

export type Set = {
  name: string;
  requiredTags: string[];
};

export const sets: Set[] = [
  { name: 'Duke', requiredTags: ['duke'] },
  { name: 'Kruu Bank', requiredTags: ['kruu bank'] },
  { name: 'New', requiredTags: ['28 oct 2022'] },
];

const QuizMenu = (props: {
  uniqueTags: string[];
  callback: (
    quizMode: QuizMode,
    maxTerms: number,
    requiredTags: string[]
  ) => void;
}): JSX.Element => {
  const KEY_QUIZ_MODE = 'thai-flash-react-quiz-menu-quiz-mode';
  const KEY_MAX_TERMS = 'thai-flash-react-quiz-menu-max-terms';
  const KEY_SELECTED_SET = 'thai-flash-react-quiz-menu-selected-set';

  const [quizMode, setQuizMode] = useState<QuizMode>(() => {
    let key = localStorage.getItem(KEY_QUIZ_MODE);
    return key != null ? JSON.parse(key) : QuizMode.Listen;
  });

  const [maxTerms, setMaxTerms] = useState<number>(() => {
    let key = localStorage.getItem(KEY_MAX_TERMS);
    return key != null ? JSON.parse(key) : 15;
  });

  const [selectedSet, setSelectedSet] = useState<Set>(() => {
    let key = localStorage.getItem(KEY_SELECTED_SET);
    return key != null ? JSON.parse(key) : sets[0];
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem(KEY_QUIZ_MODE, JSON.stringify(quizMode));
    localStorage.setItem(KEY_MAX_TERMS, JSON.stringify(maxTerms));
    localStorage.setItem(KEY_SELECTED_SET, JSON.stringify(selectedSet));
    props.callback(quizMode, maxTerms, selectedSet.requiredTags);
  };

  const onNumberSpinnerChange = useCallback((value: number) => {
    setMaxTerms(value);
  }, []);

  const MyRadioGroup = () => {
    const onChangedQuizMode = (value: QuizMode) => {
      setQuizMode(value);
    };

    const MyCheckCircleIcon = (props: React.ComponentProps<'svg'>) => {
      return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
          <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
          <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    };

    return (
      <RadioGroup
        value={quizMode}
        onChange={onChangedQuizMode}
        className="flex justify-around"
      >
        {[QuizMode.Listen, QuizMode.Speak].map((quizMode) => (
          <RadioGroup.Option
            key={quizMode}
            value={quizMode}
            className={({ active, checked }) =>
              `${
                checked ? 'bg-sky-900' : 'bg-white'
              } w-32 h-32 rounded-lg inline-block relative shadow-md focus:outline-none`
            }
          >
            {({ active, checked }) => (
              <>
                <img
                  src={
                    quizMode === QuizMode.Listen ? 'listen.png' : 'speak.png'
                  }
                  alt={quizMode === QuizMode.Listen ? 'listen' : 'speak'}
                  className="max-h-full"
                />
                {checked && (
                  <MyCheckCircleIcon className="h-16 w-16 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 " />
                )}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    );
  };

  const MyListboxHeadless = () => {
    const onChanged = (value: Set) => {
      setSelectedSet(value);
    };

    return (
      <div className="inline-block">
        <Listbox value={selectedSet} onChange={onChanged}>
          <Listbox.Label className="mr-4">Set:</Listbox.Label>
          <div className="inline-block relative">
            <Listbox.Button className=" bg-slate-400 rounded-full p-2 border-2 border-black w-40">
              {selectedSet.name}
            </Listbox.Button>
            <Listbox.Options className="absolute w-max">
              {sets.map((obj) => (
                <Listbox.Option
                  key={obj.name}
                  value={obj}
                  className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                >
                  {/*
                  <CheckIcon className="hidden w-4 ui-selected:inline-block" />
                  */}
                  {obj.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    );
  };

  return (
    <>
      <form className="h-full flex flex-col justify-evenly" onSubmit={onSubmit}>
        <MyRadioGroup />

        <div className="my-2">
          <div className="flex my-1 items-center w-fit mx-auto">
            <span className="mr-4">Terms</span>
            <NumberSpinner
              initial={maxTerms}
              onChange={onNumberSpinnerChange}
            />
          </div>
        </div>

        <div className="w-fit mx-auto">
          <MyListboxHeadless />
        </div>

        <button
          className="block w-fit my-2 mx-auto border-black border-2 p-2 rounded-md hover:bg-slate-300
        active:bg-slate-800"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default QuizMenu;

import { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const NumberSpinner = ({
  onChange,
  initial = 20,
  step = 5,
  min = 5,
  max = 50,
}: {
  onChange: (value: number) => void;
  initial?: number;
  step?: number;
  min?: number;
  max?: number;
}) => {
  const [value, setValue] = useState(initial);
  useEffect(() => {
    onChange(value);
  }, [value, onChange]);
  const onMinus = (evt: React.FormEvent<HTMLButtonElement>) => {
    setValue((value) => {
      const newValue = Math.max(value - step, min);
      //onChange(newValue);
      return newValue;
    });
  };
  const onPlus = (evt: React.FormEvent<HTMLButtonElement>) => {
    setValue((value) => {
      const newValue = Math.min(value + step, max);
      //onChange(newValue);
      return newValue;
    });
  };

  return (
    <>
      <div className="inline-flex p-1 mx-1 w-fit rounded-full border-2 border-black">
        <button
          type="button"
          className="rounded-full p-1 bg-slate-400 hover:bg-slate-700 active:bg-white"
          onClick={onMinus}
        >
          <MinusIcon className="h-8 w-8" />
        </button>
        <div className="w-16 flex justify-center items-center">
          <span className="text-3xl">{value}</span>
        </div>
        <button
          className="rounded-full p-1 bg-slate-400 hover:bg-slate-700 active:bg-white"
          type="button"
          onClick={onPlus}
        >
          <PlusIcon className="h-8 w-8" />
        </button>
      </div>
    </>
  );
};

export default NumberSpinner;

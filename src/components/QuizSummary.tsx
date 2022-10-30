import { Term } from './../Types';

const Summary = (props: {
  terms: Term[];
  numIncorrect: number;
  callback: () => void;
}) => {
  return (
    <div className="h-full flex flex-col justify-around">
      <div className="inline-block text-5xl m-auto w-fit  ">Summary</div>

      <div className="inline-block">
        <div className=" mx-auto w-fit">
          Number of terms: {props.terms.length}
        </div>
        <div className=" mx-auto w-fit">
          Incorrect answers: {props.numIncorrect}
        </div>
      </div>

      <button
        className="inline-block w-fit m-auto border-black border-2 p-2 rounded-md hover:bg-slate-300
        active:bg-slate-800"
        onClick={props.callback}
      >
        OK
      </button>
    </div>
  );
};

export default Summary;

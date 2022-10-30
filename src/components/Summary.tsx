import { Term } from './../Types';

const Summary = (props: {
  terms: Term[];
  numIncorrect: number;
  callback: () => void;
}) => {
  return (
    <div className="Summary">
      <div>terms.length: {props.terms.length}</div>
      <div>numIncorrect: {props.numIncorrect}</div>
      <button onClick={props.callback}>OK</button>
    </div>
  );
};

export default Summary;

import { useState } from 'react';
import { QuizMode } from '../Types';

type FormData = {
  quizMode: QuizMode;
  maxTerms: number;
};

const Menu = (props: {
  allTags: string[];
  callback: (
    quizMode: QuizMode,
    maxTerms: number,
    requiredTags: string[]
  ) => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    quizMode: QuizMode.Listen,
    maxTerms: 20,
  });
  const [requiredTags, setRequiredTags] = useState<string[]>([]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.callback(formData.quizMode, formData.maxTerms, requiredTags);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="radio"
            id="listen"
            name="quizMode"
            value={QuizMode.Listen}
            {...(formData.quizMode === QuizMode.Listen && { checked: true })}
            onChange={handleChange}
          />
          <label htmlFor="listen">Listen</label>
          <input
            type="radio"
            id="speak"
            name="quizMode"
            value={QuizMode.Speak}
            {...(formData.quizMode === QuizMode.Speak && { checked: true })}
            onChange={handleChange}
          />
          <label htmlFor="speak">Speak</label>
          <input
            type="text"
            name="maxTerms"
            value={formData.maxTerms}
            onChange={handleChange}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {props.allTags.map((tag) => (
            <>
              <input
                type="checkbox"
                id={'checkbox_' + tag}
                name={tag}
                {...(requiredTags.includes(tag) && { checked: true })}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                  let includes = requiredTags.includes(evt.target.name);
                  if (evt.target.checked) {
                    if (!includes) {
                      setRequiredTags((tags) => [...tags, evt.target.name]);
                    }
                  } else {
                    if (includes) {
                      setRequiredTags((tags) => tags.filter((t) => t !== tag));
                    }
                  }
                }}
              />
              <label htmlFor={'checkbox_' + tag}>{tag}</label>
            </>
          ))}
          <button type="submit">Submit</button>
        </form>

        <div>formData: {JSON.stringify(formData)}</div>
      </div>
    </>
  );
};

export default Menu;

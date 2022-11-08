import { useState } from 'react';
import Quiz from './components/Quiz';
import MainMenu from './components/MainMenu';

var terms = require('./vocabulary-data.json');

enum Stage {
  MainMenu = 'MainMenu',
  Quiz = 'Quiz',
}

function App() {
  const [stage, setStage] = useState(Stage.MainMenu);

  const mainMenuCallback = () => {
    setStage(Stage.Quiz);
  };

  return (
    <div className="h-screen select-none text-2xl">
      <div className="max-w-lg w-full m-auto h-full max-h-[48rem] rounded-lg border-2 bg-slate-200">
        {stage === Stage.MainMenu && <MainMenu callback={mainMenuCallback} />}
        {stage === Stage.Quiz && (
          <Quiz terms={terms} callback={() => setStage(Stage.MainMenu)} />
        )}
      </div>
    </div>
  );
}

export default App;

const MainMenu = (props: { callback: () => void }): JSX.Element => {
  return (
    <>
      <div className="text-5xl m-auto w-fit my-[20%] ">Thai Flash</div>

      <button
        className="block w-fit m-auto border-black border-2 p-2 rounded-md hover:bg-slate-300
        active:bg-slate-800"
        onClick={props.callback}
      >
        Quiz
      </button>
    </>
  );
};

export default MainMenu;

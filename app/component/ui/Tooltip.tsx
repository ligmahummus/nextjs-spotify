const Tooltip = ({ children, text, pos = "bottom" }: ITooltip) => {
  const top = "-translate-x-1/2 left-1/2 -top-8";
  const left = "-translate-y-1/2 -left-16 top-1/2";
  const right = "-translate-y-1/2 -right-16 top-1/2";
  const bottom = "-translate-x-1/2 left-1/2 -bottom-8";

  let position = "";

  if (pos === "top") position = top;
  else if (pos === "left") position = left;
  else if (pos === "right") position = right;
  else if (pos === "bottom") position = bottom;

  const tTop =
    "border-b-transparent border-l-transparent border-r-transparent top-5";
  const tBottom =
    "border-t-transparent border-l-transparent border-r-transparent bottom-5";

  let triange = "";

  if (pos === "top") triange = tTop;
  else if (pos === "bottom") triange = tBottom;

  return (
    <div className="relative w-max tooltip-container">
      <span
        className={`bg-slate-800 text-sm whitespace-nowrap text-white px-4 opacity-0 ease-in-out duration-300 shadow-xl font-bold rounded-lg absolute tooltip ${position}`}
      >
        <div
          className={`bg-transparent shadow-xl absolute border-slate-800 w-0 h-0 border-[10px] border-solid ${triange} left-1/2 -translate-x-1/2`}
        ></div>
        {text}
      </span>
      {children}
    </div>
  );
};

interface ITooltip {
  text: string;
  children: React.ReactNode;
  pos?: "top" | "bottom" | "left" | "right";
}

export default Tooltip;

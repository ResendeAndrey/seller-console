/*
  This component simule a DS Button
  This component receives children and isLoading props and extends the HTMLButtonElement props
*/

import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isLoading?: boolean;
};

const Button = ({ children, isLoading, ...rest }: ButtonProps) => {
  const hasWidth = /\bw-\d+/.test(rest.className ?? "");
  const className = clsx(!hasWidth && "w-50", rest.className);
  return (
    <button {...rest} className={className} disabled={isLoading}>
      {isLoading ? (
        <div className="w-full flex justify-center ">
          <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin " />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

import React from "react";

const AuthButton = ({ children }: IAuthButtonProps) => {
  return (
    <button className="bg-green-600 px-4 py-1 border-b-4 ease-in-out duration-300 active:border-b-2 border-b-green-800 rounded-full">
      {children}
    </button>
  );
};

interface IAuthButtonProps {
  children: React.ReactNode | string;
}

export default AuthButton;

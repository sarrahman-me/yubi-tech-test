"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ImSpinner } from "react-icons/im";

interface IButton {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  type?: "submit" | "reset" | "button";
  fullWidth?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  disabled,
  startIcon,
  endIcon,
  loading,
  type,
  fullWidth,
}: IButton) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    } else {
      () => {};
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={disabled ? () => {} : handleClick}
      type={type}
      className={`${fullWidth ? "w-full" : ""} ${
        loading ? "opacity-50" : ""
      } p-1.5 px-2.5 hover:bg-primary-600/90 bg-primary-600 text-white rounded hover:shadow disabled:bg-primary-600/50 disabled:cursor-not-allowed`}
    >
      <span className="flex justify-center items-center">
        {startIcon && !loading && <span className="mr-2">{startIcon}</span>}
        {children}
        {endIcon && !loading && <span className="ml-2">{endIcon}</span>}
        {loading && (
          <span className="animate-spin ml-2">
            <ImSpinner />
          </span>
        )}
      </span>
    </button>
  );
}

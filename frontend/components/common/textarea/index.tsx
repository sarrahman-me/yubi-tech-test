import React from "react";
import Label from "../label";

// Interface Props
interface TextareaProps {
  label?: string;
  placeholder?: string;
  onChange: (v: any) => void;
  value?: any;
}

// Textarea Component
const Textarea = ({ label, placeholder, onChange, value }: TextareaProps) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={label}>{label}</Label>
      <textarea
        onChange={(e) => onChange(e.target.value)}
        value={value}
        name={label}
        id={label}
        rows={10}
        className="bg-secondary placeholder-secondary-medium/20 disabled:bg-gray-200 disabled:cursor-not-allowed outline-none border text-secondary-medium rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 min-w-36 sm:text-sm md:p-2 resize-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;

import { Eye, EyeClosed } from "lucide-react";
import React from "react";

interface EyeToogleButtonProps {
  eyeIsOpen: boolean;
  setEyeIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  eyeSize?: number;
}

export const EyeToogleButton = ({
  eyeIsOpen,
  setEyeIsOpen,
  className,
  eyeSize = 20,
}: EyeToogleButtonProps) => {
  return (
    <button
      type="button"
      className={className}
      onClick={() => setEyeIsOpen((eyeIsOpen) => !eyeIsOpen)}
    >
      {eyeIsOpen ? (
        <Eye size={eyeSize} className={className} />
      ) : (
        <EyeClosed size={eyeSize} className={className} />
      )}
    </button>
  );
};

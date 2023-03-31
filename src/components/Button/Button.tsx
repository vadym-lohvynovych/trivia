import { SyntheticEvent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: "default" | "action" | "confirm";
  disabled?: boolean;
  className?: string;
  text: string;
  onClick: (e: SyntheticEvent) => void;
}

interface Mapping {
  [propName: string]: string;
}

const BUTTON_STYLE_TYPE_MAPPINT: Mapping = {
  action: styles.actionButton,
  confirm: styles.confirmButton,
};

function Button({
  type = "default",
  text,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        BUTTON_STYLE_TYPE_MAPPINT[type] || ""
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;

import React from 'react'
import styles from './Button.module.css';

export type ButtonParams = {
  onClick?: (event?: React.SyntheticEvent) => void,
  title: string, 
  type?: "button" | "submit" | "reset" | undefined,
  theme?: "LIGHT"  | "GRAY" | undefined,
  className?: string;
};

export const Button = (props: ButtonParams) => {
    const {type, onClick, title, theme, className} = props;

    const getTheme = () => {
      switch(theme){
        case("GRAY"):
        return styles.containerGray
        default:
        return styles.container
      }
    }

    return (
      <button type={type || "button"} onClick={onClick} className={[getTheme(), className].join(" ")}>
        {title}
      </button>
    )
}
  
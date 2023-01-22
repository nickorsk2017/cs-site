import React from 'react';
import styles from './Title.module.css';

export type Params = {
  tag?: string;
  className?: string;
};

export const Title: React.FC<Params> = ({children, tag, className}) => {
  const CustomTag = `${tag}` as keyof JSX.IntrinsicElements;
  return <CustomTag className={[className, styles.title].join(" ")}>{children}</CustomTag>
}

Title.defaultProps = {
  tag: "h1",
}
  
import React from 'react';
import styles from './IconFont.module.css';

export type Params = {
  size: string,
  classes: string | string[],
  as: string,
  content?: string,
} & any;

export const IconFont = React.forwardRef(({classes, size, as, content, ...props}: Params, ref) => {
  const Tag = as || "i"
   
  return <Tag
    ref={ref}
    className={Array.isArray(classes) ? [styles.icon, ...classes].join(" ") : [styles.icon, classes].join(" ")} 
    style={{fontSize: size, ...props.style}}
    {...props}
   >{content}</Tag>
})
  
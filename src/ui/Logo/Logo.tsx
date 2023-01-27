import React from 'react';
import styles from './Logo.module.css';

export type Params = {
  size: "small" | "middle" | "large"
};

export const Logo = ({size}: Params) => {
    switch(size){
      case "large":
        return (<div className={styles.logo} >
        <span><span className={styles.text}>CHARGE</span><img src="public/logo.svg" className={styles.logoImg} /><span className={styles.text}>SKILLS</span></span>
      </div>)
      case "small":
        return (<div className={[styles.logo, styles.small].join(" ")} >
          <span><span className={styles.text}>CHARGE</span><img src="public/logo.svg" className={styles.logoImg} /><span className={styles.text}>SKILLS</span></span>
      </div>)
      default:
        return (<div className={[styles.logo, styles.middle].join(" ")} >
          <span><span className={styles.text}>CHARGE</span>
          <img src="public/logo.svg" className={styles.logoImg} /><span className={styles.text}>SKILLS</span></span>
        </div>)
    }
}
  
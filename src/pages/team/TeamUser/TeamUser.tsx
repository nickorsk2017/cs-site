import React from 'react';
import styles from './TeamUser.module.css';

type Params = {
  firstName: string;
  lastName: string;
  avatar: string;
  style?: React.CSSProperties;
}

export const TeamUser = ({firstName, lastName, avatar, style}: Params) => {
  
  return <div style={style} className={styles.container}>
    <div className={styles.left}>
      <div className={styles.avatar}>
        <img src={avatar}/>
      </div>
    </div>
    <div className={styles.right}>
      <div className={styles.name}>
        {`${firstName} ${lastName}`}
      </div>
      <div>CTO</div>
      <div>Founder</div>
      <div>13 years in IT development</div>
    </div>
  </div>
};

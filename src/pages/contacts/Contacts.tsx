import React from 'react';
import {Header} from "../../common";
import styles from './Contacts.module.css';

type Params = {}

export const Contacts = ({}: Params) => {
  
  return <div className={styles.container}>
    <Header/>
    <h1>Contacts</h1>
    <div className={styles.contacts}>
      <div className='row'>
        <b>email:</b> chargeskills.contacts@gmail.com
      </div>
      <div className='row'>
        <b>telegram:</b> @chargeskills
      </div>
    </div>
   
  </div>
};

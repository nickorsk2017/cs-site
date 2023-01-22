import React from 'react';
import {Header} from "../../common";
import styles from './Prices.module.css';

type Params = {}

export const Prices = ({}: Params) => {
  
  return <div className={styles.container}>
    <Header/>

  <table className={styles.GeneratedTable}>
    <thead>
      <tr>
        <th>Modules</th>
        <th>Single mentor</th>
        <th>Small team (1-4 teachers / mentors)</th>
        <th>Middle bussines (5-10 teachers / mentors)</th>
        <th>Large bussines (11-20 teachers / mentors)</th>
        <th>Corporate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Courses and online board</td>
        <td>10 USD</td>
        <td>20USD</td>
        <td>30 USD</td>
      </tr>
      <tr>
        <td>Task boards</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
      <tr>
        <td>Chat messenger</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
      <tr>
        <td>Wiki docs</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
      <tr>
        <td>Quizzes</td>
        <td>Cell</td>
        <td>Cell</td>
        <td>Cell</td>
      </tr>
    </tbody>
  </table>
   
  </div>
};

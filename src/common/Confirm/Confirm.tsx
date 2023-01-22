import React from 'react';
import {Button} from "@ui";
import styles from './Confirm.module.css';

export type Params = {
    message: string;
    onConfirm: () => void;
    onClose: () => void;
};

export const Confirm = ({message, onConfirm, onClose}: Params) => {
   
    return <div className={styles.container}>
        <div className={styles.message}>{message}</div>
        <div className={styles.buttons}>
            <Button onClick={onConfirm} title="Confirm"/>
            <Button theme='GRAY' onClick={onClose} title="Cancel"/>
        </div>
    </div>
};
  
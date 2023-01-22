import React, { useRef, useEffect } from 'react';
import {Icon} from '@ui';
import {Close} from "../../icons";
import styles from './Modal.module.css';

type Params = {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export const Modal: React.FC<Params> = ({ children, title = "Warning", isOpen, onClose, onConfirm}) => {
    const refPortal = useRef(null);
    const rootRef = useRef(null);
    const timerClose = useRef(null);

    if (!isOpen){
      return null;
    };

    useEffect(() => {
      return () => {
        clearTimeout(timerClose.current);
      }
    }, []);

    const closeHandlder = () => {
      rootRef.current.className += ` ${styles.animateClose}`;
      timerClose.current = setTimeout(() => {
        onClose();
      }, 200);
    }

    const onConfirmHandler = () => {
      rootRef.current.className += ` ${styles.animateClose}`;
      timerClose.current = setTimeout(() => {
        onConfirm();
      }, 200);
    }

    const childrenWithProps = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        let props:any = { onClose: closeHandlder };
        if(onConfirm){
          props.onConfirm = onConfirmHandler;
        }
        return React.cloneElement(child, props);
      }
      return child;
    });

    return <div ref={refPortal} className={[styles.container].join(" ")}>
    <div ref={rootRef} className={[styles.wrapper, styles.animate].join(" ")}>
      <Icon className={styles.close} onClick={closeHandlder} src={Close}/>
      <div className={styles.header}>{title}</div>
      <div className={styles.body}>
        {childrenWithProps}
      </div>
      </div>
    </div>
}

Modal.defaultProps = {
  
}

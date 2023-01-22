import React, {useEffect, forwardRef, useRef} from 'react'
import {useDebounce} from "formmod";
import styles from './Textarea.module.css';

export const Textarea = forwardRef<HTMLTextAreaElement, any>((props, ref) => {
    const {
      error,
      onChange,
      onFocus,
      onBlur,
      value,
      label,
      visible,
      viewMode,
      autoFocus,
      onEnter,
      onEscape,
      placeholder,
      rows
    } = props;
    const inputRef = ref as React.RefObject<HTMLTextAreaElement> || useRef<HTMLTextAreaElement>(null);
    const {onChangeOptimized, onBlurOptimized} = useDebounce({onChange, value, inputRef});

    const setFocus = () => {
      inputRef.current && inputRef.current.focus();
    };
    useEffect(() => {
      autoFocus && setFocus();
    },[]);

    if(typeof visible === "boolean" && !visible){
      return null;
    }

    const onKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if(event.key === 'Enter'){
        onEnter && onEnter();
      }
      if(event.key === 'Escape'){
        onEnter && onEscape();
      }
    };

    if(viewMode){
      return (
      <div className={styles.textInput}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.viewInput}>{value}</div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
      )
    }
    
    return (
      <div className={styles.textInput}>
        {label && <label className={styles.label}>{label}</label>}
        <textarea
          rows={rows || 6}
          onKeyDown={onKeydown}
          className={styles.input}
          onFocus={onFocus}
          onBlur={(e) => {
            onBlurOptimized(e);
            (onBlur && onBlur())
          }}
          onChange={onChangeOptimized}
          defaultValue={value}
          ref={inputRef}
          placeholder={placeholder}
        ></textarea>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
})
  
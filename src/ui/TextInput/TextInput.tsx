import React, {useEffect, forwardRef, useRef} from 'react'
import {useDebounce} from "formmod";
import styles from './TextInput.module.css';

export const TextInput = forwardRef<HTMLInputElement, any>((props, ref) => {
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
      iconJSX,
      onEnter,
      onEscape,
      placeholder,
      className,
      type,
      ...other
    } = props;
    const inputRef = ref as React.RefObject<HTMLInputElement> || useRef<HTMLInputElement>(null);
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

    const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      <div className={[styles.textInput, className].join(" ")}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          type={type || "text"}
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
          {...other}
        />
        {iconJSX && <span className={styles.iconContainer}>{iconJSX}</span>}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
})
  
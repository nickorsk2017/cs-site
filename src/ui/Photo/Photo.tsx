import React, {useRef, useCallback} from 'react';
import {IconFont} from "@ui";
import styles from './Photo.module.css';
 
export type PhotoValue = {
  file?: {
    name: string,
    type: string,
    size: number,
  }, 
  result: string,
}
 
export type Params = {
  onChange: (fileInputValue: PhotoValue) => void;
  error?: string;
  value: PhotoValue;
};
 
export const Photo = (props: Params) => {
    const fileRef: React.LegacyRef<HTMLInputElement> = useRef(null);
    const {onChange, value, error} = props;
 
    const clickHadler = useCallback(() => {
      fileRef.current && fileRef.current.click();
    }, [fileRef.current]);
 
    const uploadHandler = (files: FileList) => {
      const file: File = files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        onChange({file: {
          name: file.name,
          type: file.type,
          size: file.size,
        }, result: reader.result as string});
      };
    };
 
    const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      files && uploadHandler(files);
    }
 
    const renderPhoto = () => {
      if(value?.result){
        return <div className={styles.imageContainer}>
          <img src={value.result}/>
        </div>
      }
      return <IconFont classes={['fa-regular fa-user', styles.user]} size='25px'/>
    }
 
    return (
      <div onClick={clickHadler} className={styles.container}>
        <input onChange={handleFiles} ref={fileRef} type="file" className={styles.fileInput}></input>
        {renderPhoto()}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
}
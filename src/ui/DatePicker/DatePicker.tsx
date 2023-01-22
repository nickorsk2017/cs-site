import React, {useState, useMemo, useEffect} from 'react'
import DayPicker from 'react-day-picker';
import {cloneDeep} from "@utils";
import moment from 'moment';
import styles from './DatePicker.module.css';

export type DatePickerParams = {
  onClick?: (event: React.SyntheticEvent) => void,
  title: string,
  titleDesc?: string;
  titleTime: string,
  dateValue: Date | null;
  onSelectDate: (date: Date | null) => any;
  error?: string | null;
  disabled?: boolean;
  viewMode?: boolean;
};

type TDateState = {
  selectedDay: Date | null,
  selectedHours: number | string,
  selectedMinutes: number | string,
  openedPicker: string | undefined
}

export const DatePicker = ({
  title,
  titleDesc,
  titleTime,
  dateValue,
  onSelectDate,
  error,
  viewMode,
  disabled,
}: DatePickerParams) => {
    const [dateState, setDateState] = useState<TDateState>({
      selectedDay: dateValue,
      selectedHours: "",
      selectedMinutes: "",
      openedPicker: undefined
    });
    useEffect(() => {
      setDateState((state) => {
        let cloneState: TDateState = cloneDeep(state);
        if(dateValue){
          cloneState.selectedDay = dateValue;
          cloneState.selectedHours = dateValue?.getHours();
          cloneState.selectedMinutes = dateValue?.getMinutes();
        } else {
          cloneState.selectedDay = null;
          cloneState.selectedHours = "";
          cloneState.selectedMinutes = "";
        }
        return cloneState;
      });
    }, [dateValue]);

    const date = useMemo(() => {
      return dateState.selectedDay ? moment(dateState.selectedDay).format("DD MMMM YYYY") : "not selected";
    }, [dateState]);

    const time = useMemo(() => {
      if((!dateState.selectedHours || !dateState.selectedMinutes || dateState.openedPicker === "time")){
        return ""
      }
      return dateState.selectedDay ? `at ${moment(dateState.selectedDay).format("HH:mm")}` : "";
    }, [dateState]);

    const hidePopup = () => {
      setDateState((state) => {
        let cloneState: TDateState = cloneDeep(state);
        cloneState.openedPicker = undefined;
        return cloneState;
      });
    }

    useEffect(() => {
      window.addEventListener("click", hidePopup);
      return () => {
        window.removeEventListener("click", hidePopup);
      }
    },[]);

    const handleDayClick = (date: Date) => {
      setDateState((state) => {
        let cloneState: TDateState = cloneDeep(state);
        const hh = new Date().getHours();
        const mm = new Date().getMinutes();
        cloneState.selectedDay = moment(date).set('hour', hh).set("minutes", mm).toDate();
        cloneState.openedPicker = "time";
        return cloneState;
      });
    }

    const openDayPicker = () => {
      setDateState((state) => {
        let cloneState: TDateState = cloneDeep(state);
        cloneState.openedPicker = "day";
        return cloneState;
      });
    };
    const openTimePicker = () => {
      setDateState((state) => {
        let cloneState: TDateState = cloneDeep(state);
        cloneState.openedPicker = "time";
        return cloneState;
      });
    };
    const setHours = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value: string = event.currentTarget.value;
      let valueInt: number = parseInt(value);
      if(value !== "" && valueInt < 0){
        valueInt = 0;
      }
      if(valueInt > 23){
        valueInt = 23;
      }
      if(value === ""){
        setDateState((state) => {
          let cloneState: TDateState = cloneDeep(state);
          cloneState.selectedHours = "";
          return cloneState;
        });
      } else {
        setDateState((state) => {
          let cloneState: TDateState = cloneDeep(state);
          cloneState.selectedHours = valueInt;
          return cloneState;
        });
      }
    };
    const setMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value: string = event.currentTarget.value;
      let valueInt: number = parseInt(value);
      if(value !== "" && valueInt < 0){
        valueInt = 0;
      }
      if(valueInt > 59){
        valueInt = 59;
      }
      if(value === ""){
        setDateState((state) => {
          let cloneState: TDateState = cloneDeep(state);
          cloneState.selectedMinutes = "";
          return cloneState;
        });
      } else {
        setDateState((state) => {
          let cloneState: TDateState = cloneDeep(state);
          cloneState.selectedMinutes = valueInt;
          return cloneState;
        });
      }
    }

    const setTime = () => {
      setDateState((state) => {
        let cloneState: TDateState = cloneDeep(state);
        cloneState.selectedDay = moment(cloneState.selectedDay).set('hours', dateState.selectedHours as number).set("minutes", dateState.selectedMinutes as number).toDate();
        cloneState.openedPicker = undefined;
        onSelectDate(cloneState.selectedDay);
        return cloneState;
      });
    };
    const onKeydownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if(event.key == "Enter"){
        event.preventDefault();
        if(dateState.selectedHours !== "" && dateState.selectedMinutes !== ""){
          setTime();
        }
      }
    }

    if(viewMode){
      return (<div className={styles.container}>
        <div className={styles.header}>{title}</div>
        <div className={styles.valueContainerView}>
          <span className={styles.day}>
            {date}
          </span>
          <span className={styles.time}>
            {time}
          </span>
        </div>
      </div>)
    }

    return (
      <div onClick={(e) => {e.stopPropagation()}} className={[styles.container, disabled ? styles.disabled : null].join(" ")}>
        <div className={styles.header}>{title}</div>
        <div className={styles.valueContainer}>
          <span onClick={openDayPicker} className={styles.day}>
            {date}
          </span>
          <span onClick={openTimePicker} className={styles.time}>
          {time}
          </span>
        </div>
        {titleDesc && <div className={styles.titleDesc}>{titleDesc}</div>}
        {error && <span className={styles.error}>{error}</span>}
        {dateState.openedPicker === "day" && <div className={styles.popupDays}>
          <DayPicker
            selectedDays={dateState.selectedDay || undefined}
            onDayClick={handleDayClick}
          />
        </div>}
        {dateState.openedPicker === "time" && <div className={styles.popupDays}>
          <div className={styles.timeContainer}>
            <span>{titleTime}</span>
            <div className={styles.inputNumContainer}>
              <input onKeyDown={onKeydownInput} autoFocus placeholder='hour' onChange={setHours} type="number" className={styles.inputNum} value={dateState.selectedHours}></input>:
              <input onKeyDown={onKeydownInput} placeholder='min' onChange={setMinutes} type="number" className={styles.inputNum} value={dateState.selectedMinutes}></input>
            </div>
            {(dateState.selectedHours !== "" && dateState.selectedMinutes !== "") && <button type='button' onClick={setTime} className={styles.submitTime}>ok</button>}
          </div>
        </div>}
      </div>
    )
}
  
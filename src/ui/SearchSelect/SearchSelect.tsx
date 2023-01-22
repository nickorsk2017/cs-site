import React, { useEffect, useMemo, useRef } from 'react';
import {TextInput, Icon} from '../';
import {Search, Close} from "../../icons";
import {useFormMod} from "formmod";
import styles from './SearchSelect.module.css';

export type ItemID = {
  id: string,
};

export type Item = ItemID & Record<string, any>;

export type SearchSelectParams = {
  label: string;
  selectedItems: Item[];
  items: Item[];
  onChangeItem: (item: Item) => void;
  onDeleteItem?: (item: Item) => void;
  onReset: () => void;
  error: string | null;
  multiselect?: boolean;
  autoFocus?: boolean;
  getterItemStringValue: (item: any) => string;
};

export const SearchSelect = (props: SearchSelectParams) => {
  const {
    label,
    selectedItems,
    items,
    onChangeItem,
    onDeleteItem,
    onReset,
    error,
    multiselect,
    autoFocus,
    getterItemStringValue,
  } = props;

  const SCHEME = {
      valid: null,
      formValue: {
        searchText: "",
        openList: false,
      },
      rules: {
        searchText: [
            {
              name: "empty",
              message: "first name is required"
            }
        ]
      }
  };
  const {
      useRefMod,
      getValue,
      getError,
      setValue,
  } = useFormMod(
    SCHEME,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const setFocus = () => {
    inputRef.current && inputRef.current.focus();
  };

  useEffect(() => {
    autoFocus && setFocus();
  },[]);

  useEffect(() => {
    closeList();
  }, [items]);

  const searchTextRef = useRefMod("searchText");
  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      event.preventDefault();

    }
  };

  const resetInput = (close?: boolean) => {
    setValue("searchText", "", {
      skipValidation: true,
    });
    onReset();
    close && closeList();
  };

  const onChangeInput = (value: string) => {
     setValue("searchText", value);
  }

  const changeItem = (item: Item, close?: boolean) => {
    onChangeItem(item);
    setValue("searchText", "", {
      skipValidation: true,
    });
    setFocus();
    close && closeList();
  };

  const renderList = () => {
    const itemsJSX = items.filter((item: Item) => {
      const foundItem = selectedItems.find((_item: Item) => {
        return _item.id === item.id
      });
      return !foundItem && getSelectedItemString(item).toLocaleLowerCase().indexOf(searchTextRef.getValue().toLocaleLowerCase()) > -1
    }).map((item) => {
      return <div onClick={() => changeItem(item, !multiselect)} key={item.id} className={styles.item}>{getSelectedItemString(item)}</div>
    });
    if(!itemsJSX.length){
      return <span className={styles.notFound}>not found</span>
    }
    return itemsJSX;
  }

  // getter a string value of item of component
  const getSelectedItemString = (item: Item): string => {
    return getterItemStringValue(item);
  };

  const openList = () => {
    setValue("openList", true);
  };
  const closeList = (clearInput?: boolean) => {
    getValue("openList") && setValue("openList", false);
    if(getValue("searchText") && clearInput){
      setValue("searchText", "");
    }
  };
  const onEnter = () => {
    if(!getValue("searchText").length){
      openList();
    }
  };
  
  const inputJSX = useMemo(() => {
    if(!multiselect && selectedItems.length === 1){
      return (<div className={styles.selectedContainer}>
        <div className={styles.selectedLabel}>{label}</div>
        <div className={styles.selected}>{getterItemStringValue(selectedItems[0])}</div>
        <button onClick={() => resetInput(true)} type='button' className={styles.reset}>x</button>
      </div>)
    }
    if(!multiselect && selectedItems.length === 0){
      return <TextInput
        ref={inputRef}
        label={label}
        value={getValue("searchText")}
        error={error || getError("searchText")}
        onChange={onChangeInput}
        onFocus={() => !multiselect && openList()}
      />
    };
    const renderMultiItems = () => {
      if(!selectedItems.length){
        return "not selected"
      }
      return selectedItems.map((item: Item) => {
        return <div key={`multi-${item.id}`} className={styles.multiContainer}>
          {getSelectedItemString(item)} <button onClick={onDeleteItem ? () => onDeleteItem(item): undefined} type='button' className={styles.deleteItem}>x</button>
        </div>
      });
    };
    return (<div className={styles.selectedContainer}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.multiselect}>
        {renderMultiItems()}
      </div>
      <div className={styles.inputContainer}>
        {
        getValue("openList") && 
          <button
            onClick={(e) => {e.stopPropagation(); closeList();}}
            type='button'
            className={styles.closeBtn}
          >x</button>
        }
        <TextInput
          ref={inputRef}
          placeholder="Search student"
          value={getValue("searchText")}
          error={error || getError("searchText")}
          onChange={onChangeInput}
          onEnter={onEnter}
          onEscape={closeList}
          iconJSX={(!getValue("openList") && getValue("searchText") === "") ? <span className={styles.icon}><Icon onClick={openList} src={Search}/></span> : <span className={styles.icon}><Icon onClick={() => closeList(true)} src={Close}/></span>}
        />
      </div>
    </div>)
  }, [multiselect, selectedItems, getValue("openList"), getValue("searchText")]);

  const onEsc = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Escape'){
      closeList();
      containerRef.current?.blur();
    }
    if(event.key === 'Enter'){
      event.preventDefault();
    }
  };
  return (
    <div
      onKeyDown={onEsc}
      ref={containerRef}
      tabIndex={0}
      onSubmit={handleSubmit}
      className={[styles.container, multiselect && styles.containerMultiselect].join(" ")}
    >
      {inputJSX}
      {(!selectedItems.length || multiselect) && (getValue("searchText") || getValue("openList")) && <div className={styles.list}>
        {renderList()}
      </div>}
    </div>
  )
}
  
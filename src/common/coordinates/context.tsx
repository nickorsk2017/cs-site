import React, {useEffect} from "react";
import {Ghost} from "./Ghost/Ghost";
import {useSmartBoxState} from "./smartBoxState";
 
/**
 * Enum typeHandler values.
 * @enum {string}
 */
export const typeHandlerEnum = {
  'mousemove': 'mousemove',
  'click': 'click',
  'mousedown': 'mousedown',
  'mouseup': 'mouseup',
};
/**
 * Enum cursorName for CSS.
 * @enum {string}
*/
export const cursorNameEnum = {
  'row-resize': 'row-resize',
  'col-resize': 'col-resize',
  'nwse-resize': 'nwse-resize',
  'nesw-resize': 'nesw-resize',
}

export const CoordinatesContext = React.createContext(
  {
    _API: null,
  }
);
export const CoordinatesSystem = CoordinatesContext.Consumer;

export const BoxProvider = ({children}) => {
  const API = useSmartBoxState();

  const subscribeEvents = () => {
    API.getContainer().addEventListener('click', API.onClick);
    API.getContainer().addEventListener('mousedown', API.onMousedown);
    API.getContainer().addEventListener('mouseup', API.onMouseup);
    API.getContainer().addEventListener('mousemove', API.onMousemove);
    window.addEventListener('ON_SCROLL_VIEWPORT', API.onScollView);
  }
  const unsubscribeEvents = () => {
    API.getContainer().removeEventListener('click', API.onClick);
    API.getContainer().removeEventListener('mousedown', API.onMousedown);
    API.getContainer().removeEventListener('mouseup', API.onMouseup);
    API.getContainer().removeEventListener('mousemove', API.onMousemove);
    removeEventListener('ON_SCROLL_VIEWPORT', API.onScollView);
  }

  useEffect(() => {
    subscribeEvents();
    return () => {
      unsubscribeEvents();
    }
  }, []);

  const renderGhost = () => {
    const ghostData = API.getState().ghostData;
    if(ghostData){
      return <Ghost ghostData={ghostData}/>;
    }
    return null;
  }
  const renderPopup = () => {
    if(API.getState().popupData){
     // return <PopupModal popupData={popupData}/>;
    }
    return null;
  }

  return (
    <CoordinatesContext.Provider
      value={{
        _API: API,
      }}
    >
      {children}
      {renderGhost()}
      {renderPopup()}
    </CoordinatesContext.Provider>
  )
};
import { useRef } from "react";
import {SmartBoxState} from "./types";
import { useForceUpdate } from "@utils";

export const useSmartBoxState = () => {
  const result = useRef(
    (() => {
      const { forceUpdate } = useForceUpdate();
      let container = null;
      let containerElement = null;
      let canvas = null;
      let canvasElement = null;
      let state: SmartBoxState = {
        ghostData: null,
        popupData: null,
      };
      const getState = () => {
        return state;
      }
      const handlers = useRef([]);
      const onMousemove = (event) => {
        fire({typeHandler: 'mousemove', event});
      }
      const onScollView = (event) => {
        fire({typeHandler: 'onScollViewport', event, data: event.detail});
      }
      const onMouseup = (event) => {
        fire({
          typeHandler: 'mouseup',
          event
        });
        if(state.ghostData?.data?.create){
          fire({
            typeHandler: 'createBox',
            event,
            data: state.ghostData?.data || null
          });
        }
        state.ghostData && unsetGhost();
      }
      const onMousedown = (event) => {
        fire({typeHandler: 'mousedown', event});
      }
      const onClick = (event) => {
        fire({typeHandler: 'click', event});
      }
      const on = (typeHandler, handler, id = null) => {
        handlers.current.push({handler, typeHandler, id});
      }
      const off = (typeHandler, handler, id) => {
        handlers.current = handlers.current.filter(
            (handlerItem) => {
              if(typeHandler !== handlerItem.typeHandler){
                return true;
              }
              if(id){
                return handlerItem.id !== id;
              }
              return handlerItem.handler !== handler;
            }
        );
      }
      const fire = (parameters) => {
          handlers.current.forEach((handlerItem) => {
            if (parameters.typeHandler === handlerItem.typeHandler) {
              let response = {
                event: parameters.event,
                data: parameters.data,
              };
              handlerItem.handler.call(handlerItem.handler, response);
            }
          });
      }
      const getPositionElement = (element, parentElement) => {
        return {
            top: element.getBoundingClientRect().top - parentElement.getBoundingClientRect().top,
            left: element.getBoundingClientRect().left - parentElement.getBoundingClientRect().left
        };
      }
      const getPositionOfMouse = (event) => {
        return {
          top: event.pageY,
          left: event.pageX
        };
      }
      const setPopup = (popupData) => {
        popupData = popupData;
        forceUpdate();
      }
      const unsetPopup = () => {
        state.popupData = null;
        forceUpdate();
      }
      const setContainerId = (_container) => {
        container = _container;
      }
      const getContainer = () => {
        return containerElement;
      }
      const setCanvasId = (_canvas) => {
        canvas = _canvas;
      }
      const getCanvas = () => {
        return canvasElement;
      }
      const updateContainer = () => {
        containerElement = document.getElementById(container);
        canvasElement = document.getElementById(canvas);
      }
      const enableSelection = () => {
        document.body.style.userSelect = 'auto';
      }
      const disableSelection = () => {
        document.body.style.userSelect = 'none';
      }
      const setCursor = (cursorName) => {
        document.body.style.cursor = cursorName;
      }
      const resetCursor = () => {
        document.body.style.cursor = 'initial';
      }
      const setIconMouse = (ghostData) => {
        document.body.style.cursor = 'none';
        setGhost(ghostData);
      }
      const setGhost = (ghostData, onlyGhost = false) => {
        !onlyGhost && disableSelection();
        state.ghostData = ghostData;
        !onlyGhost && forceUpdate();
        fire({typeHandler: 'setGhost'});
      }
      const unsetGhost = () => {
        enableSelection();
        resetCursor();
        state.ghostData = null;
        forceUpdate();
        fire({typeHandler: 'unsetGhost'});
      }
      const getDataForReceiver = () => {
        return state.ghostData || null;
      }
      const getPositionGhost = () => {
        const ghostElement = document.querySelector<HTMLElement>(".ghost-component");
        if(ghostElement){
          const x = ghostElement.style.left.replace("px", "");
          const y = ghostElement.style.top.replace("px", "");
          return {
            x: Number(x),
            y: Number(y),
          }
        }
        return null;
      }

      return {
        getState,
        onMousedown,
        onMousemove,
        onMouseup,
        onScollView,
        onClick,
        on,
        off,
        getPositionElement,
        getPositionOfMouse,
        setCursor,
        resetCursor,
        setGhost,
        unsetGhost,
        setIconMouse,
        setPopup,
        unsetPopup,
        getDataForReceiver,
        getPositionGhost,
        enableSelection,
        disableSelection,
        setContainerId,
        getContainer,
        setCanvasId,
        getCanvas,
        updateContainer
      };
    })()
  ).current;

  return result;
};

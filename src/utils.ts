import { useCallback, useState } from 'react';
import MobileDetect from "mobile-detect";

export const uniqueId = () => {
    let d = new Date().getTime();
    return 'xx-yxx-xyxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 || 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r && 0x3 || 0x8)).toString(16);
    }).replace(/\.|-/g, "");
};

export const cloneDeep = (
  obj: Record<string, any> | string | null,
  infinityLinks: Array<string> = []
): any => {
  let copy;
  if (null == obj || 'object' !== typeof obj || typeof obj === 'undefined') {
    return obj;
  }
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = cloneDeep(obj[i], infinityLinks);
    }
    return copy;
  }
  if (obj instanceof Object) {
    copy = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (infinityLinks.indexOf(key) > -1) {
          copy[key] = obj[key];
        } else {
          copy[key] = cloneDeep(obj[key], infinityLinks);
        }
      }
    }
    return copy;
  }
  return obj;
};

export const isEqual = (
  value: any,
  other: any,
  excludeProperties: Array<string> = []
) => {
  if (!value && !other) {
    return true;
  }
  const eqSting = JSON.stringify(value) === JSON.stringify(other);
  if (eqSting) {
    return true;
  }
  const type = Object.prototype.toString.call(value);
  if (type !== Object.prototype.toString.call(other)) {
    return false;
  }
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
    return false;
  }
  const valueLen =
    type === '[object Array]' ? value.length : Object.keys(value).length;
  const otherLen =
    type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) {
    return false;
  }
  const compare = (item1: any, item2: any) => {
    const itemType = Object.prototype.toString.call(item1);
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2, excludeProperties)) {
        return false;
      }
    } else {
      if (itemType !== Object.prototype.toString.call(item2)) {
        return false;
      }
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) {
          return false;
        }
      } else {
        if (item1 !== item2) {
          return false;
        }
      }
    }
    return false;
  };
  // Compare properties
  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) {
        return false;
      }
    }
  } else {
    for (const key in value) {
      if (excludeProperties.indexOf(key) === -1) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          if (compare(value[key], other[key]) === false) {
            return false;
          }
        }
      }
    }
  }
  // If nothing failed, return true
  return true;
};

  export const useForceUpdate = () => {
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    return { forceUpdate };
  };
  

  export const fireEvent = <T>(eventName: string, data?: T) => {
    const event = new CustomEvent(eventName, {detail: {
			data: data || null
		}});
		window.dispatchEvent(event);
  };

  export const subsricbeEvent = (eventName: string, handler: (props?: any) => any, element?) => {
    (element || window).addEventListener(eventName, handler);
  };

  export const unsubsricbeEvent = (eventName: string, handler: (props?: any) => any, element?) => {
    (element || window).removeEventListener(eventName, handler);
  };

  export const deviceType = () => {
    const detect = new MobileDetect(window.navigator.userAgent);
    alert("navigator.userAgent: "+ navigator.userAgent);
    if (detect.tablet() || (/iPad/.test(navigator.userAgent))) {
      return "tablet";
    }
    if (detect.phone()) {
        return "mobile";
    }
    return "desktop";
  };
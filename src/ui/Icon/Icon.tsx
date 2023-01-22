import React from 'react';

export type IconParams = {
  src: string
};

export const Icon = (props: any & IconParams) => {
    return <img {...props}/>
}
  
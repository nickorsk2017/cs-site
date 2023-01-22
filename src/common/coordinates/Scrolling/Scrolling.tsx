import React, {useRef, useEffect} from "react";
import {CoordinatesContext} from "../context";

export type Params = {
    viewportId: string;
    onGhost?: boolean;
};

export const Scrolling: React.FC<Params> = ({
	viewportId,
	onGhost
}) => {
	let API = null;
	const scrollingType = useRef(null);
	const intervalUpdateScroll = useRef(null);
	const timeoutScrollBottom = useRef(null);
	const PADDING_SCROLL = 100;

	useEffect(() => {
		API.on('mousemove', onMouseMove, "board");
        () => {
			API.off('mousemove', onMouseMove, "board");
            clearTimeout(timeoutScrollBottom.current);
            clearInterval(intervalUpdateScroll.current);
        }
    }, []);

	useEffect(() => {
		return () => {
			stopScrolling();
		}
	}, []);

	const getViewPort = () => {
		return document.getElementById(viewportId);
	}

	const scrollTo = (direction: "top" | "bottom" | "left" | "right") => {
		if(!scrollingType.current) {
			stopScrolling();
			intervalUpdateScroll.current = setInterval(() => {
				const ghostData = API.getState()?.ghostData;
				if(onGhost && !ghostData){
					stopScrolling();
					return;
				}
				scrollingType.current = direction;
				const element = getViewPort();
				let top = undefined;
				let left = undefined;
				switch(direction){
					case "top":
						top = -35;
						break;
					case "bottom":
						top = 35;
						break;
					case "left":
						left = -35;
						break;
					case "right":
						left = 35;
						break;
				}
				if(!element.scrollTop && direction === "top"){
					top = undefined;
				}
				if(!element.scrollLeft && direction === "left"){
					left = undefined;
				}
				top && (element.scrollTop += top);
				left && (element.scrollLeft += left);
				const newEvent = new CustomEvent('ON_SCROLL_VIEWPORT', {detail: {
					top,
					left
				}});
        		window.dispatchEvent(newEvent);
			}, 100);
		}
	}

	const stopScrolling = () => {
		if(scrollingType.current || intervalUpdateScroll.current){
			clearInterval(intervalUpdateScroll.current);
			scrollingType.current = null;
		}
	}

	const onMouseMove = ({event}) => {
		const element = getViewPort();
		const rect = element.getBoundingClientRect();
		const ghostData = API.getState()?.ghostData;
		const position = {
			left: event.pageX - rect.left,
			top: event.pageY - rect.top,
		};

		stopScrolling();

		if((onGhost && ghostData) || !onGhost){
			let direction = null;

			if(position.top >= (element.offsetHeight - PADDING_SCROLL)){
				direction = "bottom";
			} else if(position.top <= PADDING_SCROLL){
				direction = "top";
			}
			
			if(position.left >= (element.offsetWidth - PADDING_SCROLL)){
				direction = "right";
			}  else if(position.left <= PADDING_SCROLL){
				direction = "left";
			} 

			if(!direction){
				stopScrolling();
			} else {
				scrollTo(direction);
			}
		}
	}


	return (
		<CoordinatesContext.Consumer>
			{({_API}) => {
				API = _API;
				return null
			}}
		</CoordinatesContext.Consumer>
	);
}
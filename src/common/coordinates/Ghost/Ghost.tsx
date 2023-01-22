import React, {useRef, useEffect} from "react";
import {CoordinatesContext} from "../context";
import "./Ghost.inline.css";

const GhostComponent = ({ghostData}) => {
	const rootElement = useRef(null);
	const fixGhostData = useRef(null);
	fixGhostData.current = ghostData;
	let API = null;
	const subscribeEvents = () => {
		API.on("mousemove", onMouseMove, "ghost");
		API.on("onScollViewport", onScrollViewport, "onScollViewport_ghost");
	}
	const unsubscribeEvents = () => {
		API.off("mousemove", onMouseMove, "ghost");
		API.off("onScollViewport", onScrollViewport, "onScollViewport_ghost");
	}
	useEffect(() => {
		subscribeEvents();
		return () => {
			unsubscribeEvents();
		}
	}, []);
	const updatePosition = (position) => {
		const ghostElement = getGhostElement();
		if(ghostElement && getGhostData()) {
			// set horizontal position of ghost
			const canvas = API.getCanvas();
			if(typeof position.y !== "undefined"){
				if (position.y <= (canvas.offsetHeight - ghostElement.offsetHeight) && position.y >= 0) {
					ghostElement.style.top = `${position.y}px`;
				} else {
					if (position.y < 0) {
						ghostElement.style.top = '0px';
					} else {
						ghostElement.style.top = `${canvas.offsetHeight - ghostElement.offsetHeight}px`;
					}
				}
			}
			// set vertical position of ghost
			if(typeof position.x !== "undefined"){
				if (position.x <= (canvas.offsetWidth - ghostElement.offsetWidth) && position.x >= 0) {
					ghostElement.style.left = `${position.x}px`;
				} else {
					if (position.x < 0) {
						ghostElement.style.left = '0px';
					} else {
						ghostElement.style.left = `${canvas.offsetWidth - ghostElement.offsetWidth}px`;
					}
				}
			}
		}
	}
	const getGhostElement = () => {
		return rootElement.current;
	}
	const getGhostData = () => {
		return fixGhostData.current;
	}
	const onMouseMove = ({event}) => {
		if(getGhostData()){
			const container = API.getContainer();
			updatePosition({
				y: event.pageY - (getGhostData().shiftTop || 0) + container.scrollTop,
				x: event.pageX - (getGhostData().shiftLeft || 0) + container.scrollLeft
			});
		}
	}
	const onScrollViewport = ({data}) => {
		if(getGhostData()){
			const ghostElement = getGhostElement();

			if(data.top){
				updatePosition({
					y:  ghostElement.offsetTop + data.top,
				});
			}
			if(data.left){
				updatePosition({
					x:  ghostElement.offsetLeft + data.left,
				});
			}
		}
	}
	const renderGhostComponent = () => {
		if(getGhostData() && getGhostData().component){
			return (
				<>
					{getGhostData().component}
				</>
			)
		}
		return null;
	}

	const getInitStyle = () => {
		const container = API.getContainer();
		return {
			left: `${getGhostData().startPosition.x + container.scrollLeft}px`,
			top: `${getGhostData().startPosition.y + container.scrollTop}px`
		}
	}
	return (
		<CoordinatesContext.Consumer>
		{({_API}) => {
			API = _API;
			return ( 
				<div ref={rootElement} style={getInitStyle()} className="ghost-component">
					{renderGhostComponent()}
				</div>
			)}
		}
		 </CoordinatesContext.Consumer>
	);
}
export const Ghost = GhostComponent
import React, {useRef, useEffect, useCallback} from "react";
import {CoordinatesContext} from "@coordinates";
import {cloneDeep} from "@utils";
import classnames from "classnames";
import "./SmartBox.inline.css";

type TypeBox = "files" | "drop" | "drag" |"drag-drop";

type ResizeDirection = "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | null;
 
type SmartBoxProps = {
	disableDrag?: boolean;
	disableDrop?: boolean;
	refGetter?: (ref: HTMLDivElement) => void,
	ghostComponent: JSX.Element;
	data?: any;
	type?: TypeBox;
	onDrop?: (prop?: any) => void;
	typesSenders?: Array<string>;
	shiftLeft?:  number;
	shiftTop?: number;
	setShiftTop?: (prop?: any) => void;
	onClick?: (prop?: any) => void;
	onDoubleClick?: (prop?: any) => void;
	onStartDrag?: (prop?: any) => void;
	onEndDrag?: (prop?: any) => void;
	onResize?: (prop?: any) => void;
	style?: any;
	useTransparentPlaceWhenDragged?: boolean;
	draggedPlaceComponent?: any;
	id?: string;
	className?: string;
	typeRecipient?: string;
	resize?: boolean,
	width?: number,
	height?: number,
	maxWidth?: number,
	minWidth?: number,
	maxHeight?: number,
	minHeight?: number
	position?: {
		x: number,
		y: number,
	}
}

export const SmartBox: React.FC<SmartBoxProps> = ({
		id,
		ghostComponent,
		shiftLeft,
		type,
		data,
		useTransparentPlaceWhenDragged,
		typesSenders,
		disableDrop,
		disableDrag,
		typeRecipient,
		children,
		draggedPlaceComponent,
		resize,
		maxWidth,
		minWidth,
		maxHeight,
		minHeight,
		className,
		style,
		position,
		onDrop,
		onClick,
		onEndDrag,
		onStartDrag,
		onResize,
		onDoubleClick,
		refGetter,
		setShiftTop,
		width,
		height,
	}) => {
	let API = null;	
	const rootElement: React.LegacyRef<HTMLDivElement> = useRef(null);
	const resizeDirection = useRef<ResizeDirection>(null);
	const refPoints = useRef({
		left: null,
		right: null,
		top: null,
		bottom: null,
		"top-left": null,
		"top-right": null,
		"bottom-left": null,
		"bottom-right": null,
	});
	const sizeBeforeResized = useRef({
		width: undefined,
		height: undefined,
	});
	const positionBeforeResized = useRef({
		left: undefined,
		top: undefined,
	});
	const deltaPositionOfMouse = useRef({
		topStart: undefined,
		leftStart: undefined,
		topEnd: undefined,
		leftEnd: undefined,
	});
	const settings = useRef({
		itDragged: false,
		isEnter: false,
		delayStartDrag: null,
		shiftTop: null,
		shiftLeft: null,
		ghostComponent: null,
	});

	const subscribeEvents = () => {
		//API.on("mouseup", onMouseUp);
		refPoints.current.top && refPoints.current.top.addEventListener("mousedown", resizeHandler);
		refPoints.current.bottom && refPoints.current.bottom.addEventListener("mousedown", resizeHandler);
		refPoints.current.left && refPoints.current.left.addEventListener("mousedown", resizeHandler);
		refPoints.current.right && refPoints.current.right.addEventListener("mousedown", resizeHandler);

		refPoints.current["top-left"] && refPoints.current["top-left"].addEventListener("mousedown", resizeHandler);
		refPoints.current["top-right"] && refPoints.current["top-right"].addEventListener("mousedown", resizeHandler);
		refPoints.current["bottom-left"] && refPoints.current["bottom-left"].addEventListener("mousedown", resizeHandler);
		refPoints.current["bottom-right"] && refPoints.current["bottom-right"].addEventListener("mousedown", resizeHandler);
	}
	const unsubscribeEvents = () => {
		API.off("mouseup", onMouseUp, id);
		API.off("mousemove", onMouseMove, id);
		API.off("mousedown", onMouseDown, id);

		refPoints.current.top && refPoints.current.top.removeEventListener("mousedown", resizeHandler);
		refPoints.current.bottom && refPoints.current.bottom.removeEventListener("mousedown", resizeHandler);
		refPoints.current.left && refPoints.current.left.removeEventListener("mousedown", resizeHandler);
		refPoints.current.right && refPoints.current.right.removeEventListener("mousedown", resizeHandler);

		refPoints.current["top-left"] && refPoints.current["top-left"].removeEventListener("mousedown", resizeHandler);
		refPoints.current["top-right"] && refPoints.current["top-right"].removeEventListener("mousedown", resizeHandler);
		refPoints.current["bottom-left"] && refPoints.current["bottom-left"].removeEventListener("mousedown", resizeHandler);
		refPoints.current["bottom-right"] && refPoints.current["bottom-right"].removeEventListener("mousedown", resizeHandler);
	}
	
	useEffect(() => {
		initDnD();
		subscribeEvents();
		initSize();
		return () => {
			unsubscribeEvents();
		}
	}, []);

	useEffect(() => {
		updateSize({w: width, h: height});
	}, [width, height]);

	useEffect(() => {
		setGhostComponent(ghostComponent);
	}, [ghostComponent]);

	const initSize = () => {
		sizeBeforeResized.current.width = rootElement.current.offsetWidth;
		sizeBeforeResized.current.height = rootElement.current.offsetHeight;
	}
	const updateSize = ({w, h}: {w: number, h: number}) => {
		rootElement.current.style.width = `${w}px`;
		rootElement.current.style.height = `${h}px`;
	}
	const initDeltaPosition = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		deltaPositionOfMouse.current.topStart = event.pageY;
		deltaPositionOfMouse.current.leftStart = event.pageX;
		deltaPositionOfMouse.current.topEnd = deltaPositionOfMouse.current.topStart;
		deltaPositionOfMouse.current.leftEnd = deltaPositionOfMouse.current.leftStart;
	}
	const initPosition = () => {
		positionBeforeResized.current.left = rootElement.current.offsetLeft;
		positionBeforeResized.current.top = rootElement.current.offsetTop;
	}
	const resizeHandler = (event, direction?: ResizeDirection) => {
		event.stopPropagation();
		const _direction = event.target.getAttribute("data-direction") || direction;
		API.on('mousemove', onMouseMove, id);
		API.on("mouseup", onMouseUp);
		setResizeDirection(_direction);
		initPosition();
		initDeltaPosition(event);
		initSize();
		//setCursor();
		API.disableSelection();
	}

	const initDnD = () => {
		refGetter && refGetter(rootElement.current);
		setShiftTop && _setShiftTop(setShiftTop);
		shiftLeft && setShiftLeft(shiftLeft);
		_setRef();
	}

	const _setRef = () => {
		//setRef && _setRef(this);
	}
	const setGhostComponent = (ghostComponent) => {
		settings.current.ghostComponent = ghostComponent;
	}
	const _setShiftTop = (shiftTop) => {
		settings.current.shiftTop = shiftTop;
	}
	const setShiftLeft = (shiftLeft) => {
		settings.current.shiftLeft = shiftLeft;
	}
	const canUploadFiles = () => {
    	return type === "files";
	}
	const canReceiveData = () => {
		const dataForReceiver = API.getDataForReceiver();
		return (
				(type === "drop" || type === "drag-drop") &&
				dataForReceiver &&
		Array.isArray(typesSenders) &&
		dataForReceiver.typeRecipient &&
				dataForReceiver.data &&
				!settings.current.itDragged &&
		typesSenders.includes(dataForReceiver.typeRecipient) && !disableDrop
		);
  	}
	const addDashedBorder = () => {
		rootElement.current.className += " smarbox--dragged-file"
	}
	const removeDashedBorder = () => {
		rootElement.current.className = rootElement.current.className.replace(" smarbox--dragged-file", "");
	}
	const onMouseMove = useCallback(({event}) => {
		if(resizeDirection.current){
			let newHeight: Number = 0;
			let newWidth: Number = 0;
			let resultXDelta = 0;
			let resultYDelta = 0;
			switch(resizeDirection.current) {
				case 'top':
				case 'top-left':
				case 'top-right':
					resultXDelta = deltaPositionOfMouse.current.topEnd - deltaPositionOfMouse.current.topStart;
				  	newHeight = sizeBeforeResized.current.height - resultXDelta;
					break;
				case 'bottom':
				case 'bottom-left':
				case 'bottom-right':
					resultXDelta = deltaPositionOfMouse.current.topEnd - deltaPositionOfMouse.current.topStart;
					newHeight = sizeBeforeResized.current.height + resultXDelta;
				break;
			  }
			  switch (resizeDirection.current) {
				case 'left':
				case 'bottom-left':
				case 'top-left':
					resultYDelta = deltaPositionOfMouse.current.leftEnd - deltaPositionOfMouse.current.leftStart;
					newWidth = sizeBeforeResized.current.width - resultYDelta;
				break;
				case 'right':
				case 'bottom-right':
				case 'top-right':
					resultYDelta = deltaPositionOfMouse.current.leftEnd - deltaPositionOfMouse.current.leftStart;
					newWidth = sizeBeforeResized.current.width + resultYDelta;
				break;
			  }
			  if (newHeight) {
				if (newHeight > maxHeight) {
				  newHeight = maxHeight;
				} else if (newHeight < minHeight) {
				  newHeight = minHeight;
				} else if(resizeDirection.current === "top" || resizeDirection.current === 'top-left' || resizeDirection.current === 'top-right'){
					rootElement.current.style.top = `${positionBeforeResized.current.top + resultXDelta}px`;
				}
				rootElement.current.style.height = `${newHeight}px`;
			  }
			  if (newWidth) {
				if (newWidth > maxWidth) {
				  newWidth = maxWidth;
				} else if (newWidth < minWidth) {
				  newWidth = minWidth;
				} else if(resizeDirection.current === "left" || resizeDirection.current === 'bottom-left' || resizeDirection.current === 'top-left'){
					rootElement.current.style.left = `${positionBeforeResized.current.left + resultYDelta}px`;
				}
				rootElement.current.style.width = `${newWidth}px`;
			  }
			  // update delta position
			  deltaPositionOfMouse.current.topEnd = event.pageY;
			  deltaPositionOfMouse.current.leftEnd = event.pageX;
			  onResize && onResize({
				  w: rootElement.current.offsetWidth,
				  h: rootElement.current.offsetHeight,
			  });
		}
	}, []);
	
	const onMouseUp = useCallback(() => {
		if(resizeDirection.current){
			API.off("mousemove", onMouseMove, id);
			API.enableSelection();
			resizeDirection.current = null;
		} else {
			settings.current.delayStartDrag && clearTimeout(settings.current.delayStartDrag);
			if(settings.current.itDragged){
				const dataForReceiver = API.getDataForReceiver();
				if (settings.current.isEnter && canReceiveData()) {
					if(dataForReceiver){
						onDrop({
							dataForReceiver: dataForReceiver.data,
							data,
							ghostPosition: API.getPositionGhost(),
							typeRecipient: dataForReceiver.typeRecipient 
						});
					}
				} else if (type === "files") {
					
				} else if(type == "drag"){
					if(dataForReceiver && !disableDrop){
						onDrop({
							dataForReceiver: dataForReceiver.data,
							data,
							ghostPosition: API.getPositionGhost(),
							typeRecipient: dataForReceiver.typeRecipient 
						});
					}
				}
				removeStyle();
				settings.current.itDragged = false;
				if( typeof onEndDrag == "function") {
					onEndDrag();
				}
			}
		}
		API.off("mouseup", onMouseUp, id);
	},[data, resize]);

	const onDragEnter = (event) => {
		if (canUploadFiles()) {
			event.preventDefault();
			addDashedBorder();
		}
	}
	const onDragOver = (event) => {
		event.stopPropagation();
		if (canUploadFiles()) {
				event.preventDefault();
		}
	}
	const onDragLeave = (event) => {
		event.stopPropagation();
		if (canUploadFiles()) {
				event.preventDefault();
				removeDashedBorder();
		}
	}
	const onDropFiles = (event) => {
		if (canUploadFiles()) {
			event.preventDefault();
			const dt = event.dataTransfer;
			const files = dt.files;
			onDrop(files);
			removeDashedBorder();
		}
	}

	const onMouseDown = useCallback((params) => {
		if(!disableDrag){
			if (settings.current.ghostComponent && data && (type === "drag" || type === "drag-drop")) {
				clearTimeout(settings.current.delayStartDrag);
				const startPosition = {
					x: params.event.pageX,
					y: params.event.pageY,
				}
				settings.current.itDragged = true;
				if( typeof onStartDrag == "function") {
					onStartDrag();
				}
				API.setGhost({
					component: settings.current.ghostComponent,
					data: data,
					typeRecipient,
					startPosition,
					shiftLeft: shiftLeft || 0,
					shiftTop: settings.current.shiftTop || 0,
				});
				API.on("mouseup", onMouseUp, id);
	   		}
		}
	},[data, type, typeRecipient, settings.current.ghostComponent]);

	const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		API.on("mousedown", onMouseDown, id);
		if (canReceiveData()) {
			settings.current.isEnter = true;
			styleWhenHover();
		}
	}
	const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		settings.current.isEnter = false;
		removeStyle();
		API.off("mousedown", onMouseDown, id);
	}
	const styleWhenHover = () => {
		rootElement.current.style.opacity = "0.6";
		//rootElement.current.style.border = "1px dashed #333";
		rootElement.current.className += " smarbox__hovered"
	}
	const _onDoubleClick = (e) => {
		e.stopPropagation();
		onDoubleClick && onDoubleClick(e);
	}
	const _onClick = (e) => {
		e.stopPropagation();
		onClick && onClick(e);
	}
	const removeStyle = () => {
		if(rootElement && rootElement.current){
			rootElement.current.style.opacity = "1";
			//rootElement.current.style.border = "1px dashed transparent";
			rootElement.current.className  = rootElement.current.className.replace(" smarbox__hovered", "");
		}
	}
	const getRootClass = () => {
		let classes = {
			"smarbox": true,
		}
		if(className){
			classes[className] = true;
		}
		if(resize){
			classes["smarbox__resize"] = true;
		}
		if(settings.current.itDragged && useTransparentPlaceWhenDragged){
			classes["smarbox__dragged-container__hidden"] = true;
		}
		return classnames(classes);
	}
	const getBodyClass = () => {
		let classes = {
			"smarbox__dragged-container": true,
		}
		if(useTransparentPlaceWhenDragged){
			classes["smarbox__dragged-container__hidden"] = true;
		}
		return classnames(classes);
	}
	const getStyle = () => {
		let _style = cloneDeep(style) || {};
		if(useTransparentPlaceWhenDragged && settings.current.itDragged){
			_style.opacity = 0;
		}
		if(position.x){
			_style.left = `${position.x}px`;
		}
		if(position.y){
			_style.top = `${position.y}px`;
		}
		return _style;
	}

	const setResizeDirection = (direction: ResizeDirection) => {
		resizeDirection.current = direction;
	}

	const renderBody = () => {
		if(settings.current.itDragged) {
			if(draggedPlaceComponent){
				return draggedPlaceComponent;
			}
			return (
				<div className={getBodyClass()}>
					<div className="smarbox__dragged">
						{children}
					</div>
				</div>
			)
		} else {
			return children;
		}
	}

	return (
		<CoordinatesContext.Consumer>
			{({_API}) => {
			 API = _API;
			 return (
				<div
					id={id}
					onDoubleClick={_onDoubleClick}
					onClick={_onClick}
					onDragEnter={onDragEnter}
					onDragOver={onDragOver}
					onDragLeave={onDragLeave}
					onDrop={onDropFiles}
					//onMouseDown={onMouseDown}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					ref={rootElement}
					style={getStyle()}
					className={getRootClass()}>
						<div className="smarbox__drop-left-border"></div>
						<div className="smarbox__drop-right-border"></div>
						<div className="smarbox__drop-top-border"></div>
						<div className="smarbox__drop-bottom-border"></div>

						{resize && <>
							<div ref={(el) => refPoints.current.left = el} data-direction="left" className="smarbox__border-resize-left"></div>
							<div ref={(el) => refPoints.current.right = el} data-direction="right"  className="smarbox__border-resize-right"></div>
							<div ref={(el) => refPoints.current.top = el} data-direction="top" className="smarbox__border-resize-top"></div>
							<div ref={(el) => refPoints.current.bottom = el} data-direction="bottom" className="smarbox__border-resize-bottom"></div>

							<div ref={(el) => refPoints.current["top-left"] = el} data-direction="top-left" className="smarbox__border-resize-top-left"></div>
							<div ref={(el) => refPoints.current["top-right"] = el} data-direction="top-right" className="smarbox__border-resize-top-right"></div>
							<div ref={(el) => refPoints.current["bottom-left"] = el} data-direction="bottom-left" className="smarbox__border-resize-bottom-left"></div>
							<div ref={(el) => refPoints.current["bottom-right"] = el} data-direction="bottom-right" className="smarbox__border-resize-bottom-right"></div>
						</>}

						{renderBody()}
				</div>
				)}
			}
		 </CoordinatesContext.Consumer>
	);
}

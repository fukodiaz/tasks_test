import React, {useState, useEffect} from 'react';
import {default as SelectItems} from 'react-select';

const Select = (props) => {
	const {value={}, options=[], onChange=()=>{}, styles, placeholder, name='', id=''} = props;

	const dot = ({padding, margin='0', fontSize, lineHeight, color}) => ({
		boxSizing: 'border-box',
		margin: margin,
		padding,
		fontSize,
		lineHeight,
		color,
	});
	

	const selectStyles = ({dot: propDot, container={}, control, menu, menuList, option}=propStyles) => ({
		input: styles => ({...styles, ...dot(propDot)}),
		placeholder: styles => ({...styles, ...dot(propDot)}),
		singleValue: provided => ({ ...provided, ...dot(propDot)}),
		valueContainer: styles => ({...styles, boxSizing: 'border-box', maxHeight: '42px', padding: '0'}),
		container:  (styles) => ({...styles, boxSizing: 'border-box', maxHeight: '42px', padding: '0', width: '100%', height: 'inherit'}),
		indicatorSeparator: (styles) => ({display:'none'}),
		control: (base, state, 
			{padding='0', maxHeight, border, borderRadius='10px', outline='none', height,
				before: {top, width: widthBefore, height: heightBefore, right: rightBefore, color: colorBefore}, 
				after: {right: rightAfter}} = control) => ({
			...base,
			position: 'relative',
			boxSizing: 'border-box', 
			maxHeight, 
			minHeight: 'unset',
			height:	height || 'inherit',
			padding,
			borderRadius,
			border: state.isFocused  ? border : border,
			outline,
			boxShadow: 'none',
			'&:hover': {
				border: state.isFocused ? border : border
			},
			// '&:hover': {
			// 	borderColor: state.isFocused ? 'rgba(23, 135, 247, 0.4)' 
			// 						: 'rgba(138, 136, 136, 0.4) !important',
			// 	outline: state.isFocused ? '2px solid rgba(23, 135, 247, 0.4) !important' 
			// 										:'1px solid rgba(138, 136, 136, 0.4) !important',
			// 	':after, :before': {
			// 		backgroundColor: state.isFocused  ? 'rgb(97,97,97)' : 'rgb(163,163,163) !important'
			// 	}
			// },
			':after, :before': {
				content:'""',
				position: 'absolute',
				top: top || 0,
				right: rightAfter || 0,//5
				width:  widthBefore || 12,
				height: heightBefore || 2,
				transform: 'rotate(-45deg)',
				backgroundColor: state.isFocused  ? 'rgb(97,97,97)' : colorBefore
			},
			':before': {
				right: rightBefore || 7,//12
				transform: 'rotate(45deg)',
			},
		}),
		dropdownIndicator: base => ({
			...base,
			display:'none'
		}),
		menu: (provided, state, {margin, fontSize} = menu) => ({
			...provided,
			zIndex: 15000,
			margin,
			padding: 0,
			fontSize: fontSize || '16px',
			width: '100%'
		}),
		menuList: (base, state, {margin='0', maxHeight='250px', minHeight='unset', height='auto'}=menuList) => ({
			//{maxHeight, minHeight, height, margin='0'}
			...base,
			margin,
			maxHeight,
			minHeight,
			height
		}),
		option: (provided, state, {margin='0', padding, lineHeight, color} = option) => ({
			...provided,
			margin,
			padding: padding || '11px 15px 10px 15px',
			borderBottom: '1px solid rgba(160, 158, 158, 0.4)',
			borderTop: '1px solid rgba(160, 158, 158, 0.1)',
			lineHeight: lineHeight || '19px',
			color: color || '#062A3F',
			backgroundColor: state.isSelected ? 'rgba(160, 158, 158, 0.2)' : '#fff',
			':first-of-type': {
				borderTop: 'none'
			},
			':last-of-type': {
				borderBottom: 'none'
			},
			'&:hover': {
				backgroundColor: 'rgba(160, 158, 158, 0.2)'
			}
		})
	});

	const stylesItems = selectStyles(styles);

	return (
		<SelectItems   value={value} 
							name={name}
							options={options}
							onChange={onChange}
							styles={stylesItems}
							isSearchable={false}
							placeholder={placeholder}
							inputId={id} >
		</SelectItems>
	);
};

export default Select;
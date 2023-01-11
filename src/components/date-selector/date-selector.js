import React, { useEffect, useState } from 'react';

import Select from '../select';
import './date-selector.scss';

const addZerosToNum = (num) => {
	if (num < 10) {return  `0${num}`};
	return num;
};

const DateSelector = ({ date = new Date().getTime() / 1000, setDate=()=>{}, flagEnding=false }) => {
   	const [currDate, setCurrDate] = useState(new Date(date * 1000));
		const [years, setYears] = useState([]);
		const [months, setMonths] = useState([]);
		const [days, setDays] = useState([]);
		const [chosenDate, setChosenDate] = useState({
			year: currDate.getFullYear(),
			month: {
            id: currDate.getMonth(),
            name: currDate.toLocaleString('ru', { month: 'long' }),
			},
			day: currDate.getDate(),
		});
		const now = new Date();

		const yearArr = [];
		const monthArr = [];
		const daysArr = [];

		useEffect(() => {
			for (let year = !flagEnding ? now.getFullYear() : currDate.getFullYear(); year > now.getFullYear() - 80; year--) {
					yearArr.push(year);
			}
			setYears([...yearArr]);

			if (chosenDate.year == now.getFullYear() && +chosenDate.month.id === now.getMonth()) {
            for (let month = 0; month <= now.getMonth(); month++) {
               monthArr.push(new Date(currDate.getFullYear(), month).toLocaleString('ru', { month: 'long' }));
            }
      	} else {
            for (let month = 0; month <= 11; month++) {
               monthArr.push(new Date(currDate.getFullYear(), month).toLocaleString('ru', { month: 'long' }));
            }
			}
			setMonths([...monthArr]);

      	if (chosenDate.year == now.getFullYear() && +chosenDate.month.id === now.getMonth()) {
            for (let daysCount = now.getDate(); daysCount >= 1; daysCount--) {
               daysArr.push(daysCount.toString().padStart(2, '0'));
            }
      	} else {
            for (
					let daysCount = new Date(chosenDate.year, +chosenDate.month.id + 1, 0).getDate();
					daysCount >= 1;
					daysCount--
            ) {
               daysArr.push(daysCount.toString().padStart(2, '0'));
            }
      	}
      	setDays([...daysArr]);
      	setDate(new Date(chosenDate.year, chosenDate.month.id, chosenDate.day, 12).getTime() / 1000);
   }, [chosenDate]);

   	return (
      	<div className='dateSelector'>
				<div className='boxDaySelected'>
					<Select 	
						name='day' id=''
						value={{value: chosenDate.day, label: addZerosToNum(+chosenDate.day)}}
						onChange={(e) => setChosenDate({ ...chosenDate, day: +e.value })}
						options={
							days.map((el) => ({value: el, label: el}))
						}
						styles={{
							dot: {color: '#062A3F', fontSize: '16px', lineHeight: '21px', padding: '9px 31px 8px 15px'},
							control: {border: 'none', maxHeight: '40px', height: '38px',
											before: {top: '18px', right: '16px', width: '6px', height: '1px', color: '#062A3F'},
											after: {right: '12px'}},
							menu: {fontSize: '16px', margin: '5px 0 0 0'},
							menuList: {maxHeight: '183px'},
							option: {padding: '8px 7px 7px 13px', lineHeight: '19px', color: '#062A3F'}
						}}
					/>
				</div>
				<div className='boxMonthSelected'>
					<Select 	
						name='month' id=''
						value={{value: chosenDate.month.id, label: chosenDate.month.name}}
						onChange={(e) =>  setChosenDate({
													...chosenDate,
													month: {
														id: +e.value,
														name: e.label,
													}})
						}
						options={
							months.map((el, index) => ({value: index, label: el}))
						}
						styles={{
							dot: {color: '#062A3F', fontSize: '16px', lineHeight: '21px', padding: '8px 27px 7px 10px'},
							control: {border: 'none', maxHeight: '40px', height: '38px',
											before: {top: '18px', right: '14px', width: '6px', height: '1px', color: '#062A3F'},
											after: {right: '10px'}},
							menu: {fontSize: '16px', margin: '5px 0 0 0'},
							menuList: {maxHeight: '183px'},
							option: {padding: '8px 7px 7px 13px', lineHeight: '19px', color: '#062A3F'}
						}}
					/>
				</div>
			<div className='boxYearSelected'>
				<Select 	
					name='year' id=''
					value={{value: chosenDate.year, label: chosenDate.year}}
					onChange={(e) => setChosenDate({ ...chosenDate, year: +e.value })}
					options={
						years.map((el) => ({value: el, label: el}))
					}
					styles={{
						dot: {color: '#062A3F', fontSize: '16px', lineHeight: '21px', padding: '8px 35px 7px 11px'},
						control: {border: 'none', maxHeight: '40px', height: '38px',
										before: {top: '18px', right: '17px', width: '6px', height: '1px', color: '#062A3F'},
										after: {right: '13px'}},
						menu: {fontSize: '16px', margin: '5px 0 0 0'},
						menuList: {maxHeight: '183px'},
						option: {padding: '8px 7px 7px 13px', lineHeight: '19px', color: '#062A3F'}
					}}
				/>
			</div>
      </div>
   );
};

export default DateSelector;
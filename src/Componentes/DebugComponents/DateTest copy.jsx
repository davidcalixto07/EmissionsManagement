 import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';

const DateTest = () => {
    const [state, setState] = useState([
        {
            startDate: addDays(new Date(), -7),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    return (
        <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            isCalendarOpen = {false}
        />
    );
}

export default DateTest;
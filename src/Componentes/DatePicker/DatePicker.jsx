import { useEffect, useState } from "react";
import addDays from "date-fns/addDays";
import { DateRangePicker } from "react-date-range";
import { Popover } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./DatePickerStyles.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { differenceInDays } from 'date-fns';


const defaultDt = {
  startDate: addDays(new Date(), -7),
  endDate: new Date(),
  key: "default",
};

const DatePicker = ({ setDate, placement = "bottom", disabled, defaultDate = defaultDt }) => {
  const [show, setShow] = useState(false);

  const [state, setState] = useState([
    defaultDate
  ]);

  useEffect(() => {
    setDate(defaultDate)
  }, []);

  function HandleArrowLeft() {
    const dayDifference = differenceInDays(state[0].endDate, state[0].startDate);
    const newState = {
      startDate: addDays(state[0].startDate, -dayDifference),
      endDate: addDays(state[0].endDate, -dayDifference),
      key: "selection",
    }
    setState([newState]);
    if (setDate) {
      setDate(newState);
      console.log("Setting date to ", state[0]);
    }
  }

  function HandleArrowRight() {
    const dayDifference = differenceInDays(state[0].endDate, state[0].startDate);
    const newState = {
      startDate: addDays(state[0].startDate, dayDifference),
      endDate: addDays(state[0].endDate, dayDifference),
      key: "selection",
    }
    setState([newState]);
    if (setDate) {
      setDate(newState);
      console.log("Setting date to ", state[0]);
    }
  }

  function HandleAccept() {
    setShow(false);
    if (show && setDate) {
      setDate(state[0]);
      console.log("Setting date to ", state[0]);
    }
  }

  return (
    <>
      <OverlayTrigger
        placement={placement}
        show={show}
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Body className="DateTimeContainer">
              <DateRangePicker
                showDateDisplay={false}
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
                isCalendarOpen={true}
              />
              <Button
                onClick={() => HandleAccept()}
                className="DateTimeContainer-Btn"
              >
                Ok
              </Button>
            </Popover.Body>
          </Popover>
        }
      >
        <div className="DateTimeOverview" style={{ display: disabled ? 'none' : 'flex' }}>
          <Button variant="light" className='DateTimeArrowbutton' onClick={() => HandleArrowLeft()}>◄</Button>
          <Button
            onClick={() => setShow(!show)}
            variant="light"
            className="DateTimeMainButton"
            style={{ display: 'flex', gap: 7 }}
          >
            <img src="/Icons/calendarIcon.png" alt="icon" style={{ height: '100%' }}></img>
            <span>{state[0].startDate.toLocaleDateString()} {" - "}</span>
            <span>{state[0].endDate.toLocaleDateString()}</span>
          </Button>
          <Button variant="light" className='DateTimeArrowbutton' onClick={() => HandleArrowRight()}>►</Button>
        </div>
      </OverlayTrigger>
    </>
  );
};

export default DatePicker;

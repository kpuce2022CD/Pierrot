import Calendar from "react-calendar";
import moment from "moment";
import "./Calendar.css";
import { useState } from "react";
import CalendarItem from "./CalendarItem";

const MyCalendar = ({ setDate, date }) => {
  // const [date, setDate] = useState(new Date());
  const windate = ["2022-08-20", "2022-07-29"];
  const lose = ["2022-06-31"];
  console.log(date);
  return (
    <div className="calendar-layout">
      <Calendar
        onChange={setDate}
        value={date}
        navigationAriaLabel={null}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileClassName={({ date, view }) => {
          // console.log(moment(date).format("YYYY-MM-DD"));
          if (windate.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "highlight";
          }
          if (lose.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "highlight";
          }
        }}
        tileContent={({ date, view }) => {
          // console.log(moment(date).format("YYYY-MM-DD"));
          const html = [];
          if (windate.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            console.log("!!!");
            html.push(<div className="win"></div>);
          }
          if (lose.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div className="lose"></div>);
          }
          return <div className="calendar-tag">{html}</div>;
        }}
      />
      <div className="calendar-item">
        <div> {moment(date).format("YYYY년 MM월 DD일")}</div>
        <CalendarItem date={date} />
      </div>
    </div>
  );
};

export default MyCalendar;

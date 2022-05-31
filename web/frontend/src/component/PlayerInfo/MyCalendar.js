import Calendar from "react-calendar";
import moment from "moment";
import "./Calendar.css";

const MyCalendar = () => {
  const windate = ["2022-05-31", "2022-05-29"];
  const lose = ["2022-05-31"];
  return (
    <>
      <Calendar
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
    </>
  );
};

export default MyCalendar;

import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const CalendarItem = (date) => {
  const navigate = useNavigate();
  console.log(date);
  const clickDate = moment(date).format("YYYY년 MM월 DD일");
  const item = [
    { date: { clickDate }, win: true, title: "정왕동", id: 0 },
    { date: { clickDate }, win: false, title: "정왕동3", id: 1 },
  ];

  return (
    <div>
      {item.map((v, i) => {
        return (
          <Link
            to={`/graph/${v.id}`}
            className={v.win ? "wintag" : "losetag"}
            key={i}
          >
            {v.title}
          </Link>
        );
      })}
    </div>
  );
};

export default CalendarItem;

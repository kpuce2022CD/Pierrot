import moment from "moment";

const CalendarItem = (date) => {
  console.log(date);
  const clickDate = moment(date).format("YYYY년 MM월 DD일");
  const item = [
    { date: { clickDate }, win: true, title: "정왕동" },
    { date: { clickDate }, win: false, title: "정왕동3" },
  ];
  return (
    <div>
      {item.map((v, i) => {
        return (
          <p className={v.win ? "wintag" : "losetag"} key={i}>
            {v.title}
          </p>
        );
      })}
    </div>
  );
};

export default CalendarItem;

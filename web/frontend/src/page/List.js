import Layout from "Layout/Layout";
import { useEffect, useState } from "react";
import "Styles/GameListPage.css";

const List = () => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    setListData([
      { date: "2022.01.01", opponent: "aaa", name: "asdf", win: true },
      { date: "2022.01.02", opponent: "aaa", name: "asdf", win: false },
      { date: "2022.01.03", opponent: "aaa", name: "asdf", win: true },
      { date: "2022.01.04", opponent: "aaa", name: "asdf", win: true },
    ]);
  }, []);
  return (
    <Layout>
      <div className="gamelist-card">
        <div className="gamelist-title">
          <h1>game list</h1>
          <p>click your game!</p>
        </div>
        <div className="gamelist-table">
          <table>
            <thead>
              <tr>
                <td>date</td>
                <td>opponent</td>
                <td>name</td>
                <td>win</td>
              </tr>
            </thead>
            <tbody>
              {listData.map((v, i) => (
                <tr
                  key={`gamelist-item-${i}`}
                  className={`gamelist-item ${v.win ? `win` : ``}`}
                >
                  <td>{v.date}</td>
                  <td>{v.opponent}</td>
                  <td>{v.name}</td>
                  {v.win ? (
                    <td>
                      <div>me</div>
                    </td>
                  ) : (
                    <td>
                      <div>{v.opponent}</div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default List;

import "./GameInfo.css"
import Layout from "../../Layout/Layout";

function GameInfo() {

  const Game = ({game}) =>{
    return(
      <div className="gamelist">
        {game.title}
        {game.day}
      </div>
    )
  }

  // db 연동 전 테스트
  const games = [
    {
      id: 0,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-10',
    },
    {
      id: 1,
      title: '정왕동',
      player: 'lee',
      day: '2022-02-11',
    },
    {
      id: 2,
      title: '정왕동',
      player: 'park',
      day: '2022-02-12',
    },
    {
      id: 3,
      title: '정왕동',
      player: 'han',
      day: '2022-02-13',
    },
    {
      id: 4,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-14',
    },
    {
      id: 0,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-10',
    },
    {
      id: 1,
      title: '정왕동',
      player: 'lee',
      day: '2022-02-11',
    },
    {
      id: 2,
      title: '정왕동',
      player: 'park',
      day: '2022-02-12',
    },
    {
      id: 3,
      title: '정왕동',
      player: 'han',
      day: '2022-02-13',
    },
    {
      id: 4,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-14',
    },
    {
      id: 0,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-10',
    },
    {
      id: 1,
      title: '정왕동',
      player: 'lee',
      day: '2022-02-11',
    },
    {
      id: 2,
      title: '정왕동',
      player: 'park',
      day: '2022-02-12',
    },
    {
      id: 3,
      title: '정왕동',
      player: 'han',
      day: '2022-02-13',
    },
    {
      id: 4,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-14',
    },
    {
      id: 0,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-10',
    },
    {
      id: 1,
      title: '정왕동',
      player: 'lee',
      day: '2022-02-11',
    },
    {
      id: 2,
      title: '정왕동',
      player: 'park',
      day: '2022-02-12',
    },
    {
      id: 3,
      title: '정왕동',
      player: 'han',
      day: '2022-02-13',
    },
    {
      id: 4,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-14',
    },
    {
      id: 0,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-10',
    },
    {
      id: 1,
      title: '정왕동',
      player: 'lee',
      day: '2022-02-11',
    },
    {
      id: 2,
      title: '정왕동',
      player: 'park',
      day: '2022-02-12',
    },
    {
      id: 3,
      title: '정왕동',
      player: 'han',
      day: '2022-02-13',
    },
    {
      id: 4,
      title: '정왕동',
      player: 'kim',
      day: '2022-02-14',
    },
  ]

  return <div>
    <Layout>
    {games.map(game => (
      <Game game={game}/>))}
    </Layout>
   
  </div>;
}

export default GameInfo;

function GameInfo({ t, survivalTime, successCount, ojisanCount }) {
  return (
    <div className="game-info">
      <div className="survival-time">
        {t.game.survivalTime}: {survivalTime}
        {t.game.seconds}
      </div>
      <div className="success-count">
        {t.game.success}: {successCount}
        {t.game.times}
      </div>
      <div className="count">
        {t.game.encounters}: {ojisanCount}
        {t.game.people}
      </div>
    </div>
  );
}

export default GameInfo;

function GameField({
  mobCharacters,
  ojisanPosition,
  currentOjisan,
  playerAction,
  feedback
}) {
  return (
    <div className="game-field">
      {/* モブキャラ */}
      {mobCharacters.map((mob) => (
        <div
          key={mob.id}
          className="mob-character"
          style={{
            left: `${mob.position}%`,
            top: `${mob.verticalPosition}%`,
          }}
        >
          {mob.emoji}
        </div>
      ))}

      {/* おじさん */}
      <div
        className={`ojisan ${playerAction ? 'action-' + playerAction : ''}`}
        style={{ top: `${ojisanPosition}%` }}
      >
        {currentOjisan.emoji}
      </div>

      {/* プレイヤー */}
      <div className="player">
        <div className="player-head">👤</div>
        <div className="player-body"></div>
      </div>

      {feedback && (
        <div className="feedback">
          <div className="feedback-title">{feedback.title}</div>
          <div className="feedback-description">
            {feedback.description}
          </div>
        </div>
      )}
    </div>
  );
}

export default GameField;

function ActionButtons({ t, playerAction, onAction }) {
  return (
    <div className="action-buttons">
      <button
        onClick={() => onAction('dodge')}
        disabled={playerAction}
        className="action-btn dodge-btn"
      >
        {t.actions.dodge}
      </button>
      <button
        onClick={() => onAction('stop')}
        disabled={playerAction}
        className="action-btn stop-btn"
      >
        {t.actions.stop}
      </button>
      <button
        onClick={() => onAction('stare')}
        disabled={playerAction}
        className="action-btn stare-btn"
      >
        {t.actions.stare}
      </button>
      <button
        onClick={() => onAction('counter')}
        disabled={playerAction}
        className="action-btn counter-btn"
      >
        {t.actions.counter}
      </button>
    </div>
  );
}

export default ActionButtons;

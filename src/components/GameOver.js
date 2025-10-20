function GameOver({
  t,
  survivalTime,
  successCount,
  ojisanCount,
  language,
  onRestart,
  onShare,
  getRank
}) {
  const rank = getRank(survivalTime);

  return (
    <div className="game-over">
      <h2>{t.gameOver.title}</h2>
      <p className="final-score">
        {t.gameOver.survivalTime}: {survivalTime}
        {t.game.seconds}
      </p>
      <div className="rank-display">
        <div className={`rank ${rank}-rank`}>
          {t.gameOver.ranks[rank]}
        </div>
        <p className="rank-message">{t.gameOver.messages[rank]}</p>
      </div>
      <p>
        {t.gameOver.successCount}: {successCount}
        {t.game.times}
      </p>
      <p>
        {t.gameOver.encounterCount}: {ojisanCount}
        {t.game.people}
      </p>
      <button onClick={onRestart} className="start-button">
        {t.gameOver.playAgain}
      </button>
      <button
        type="button"
        onClick={onShare}
        aria-label={language === 'ja' ? 'Xに投稿する' : 'Post on X'}
        className="x-share-btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '10px',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          border: '1px solid var(--x-border, rgba(0,0,0,.12))',
          color: 'var(--x-fg, #111)',
          background: 'var(--x-bg, #fff)',
          boxShadow: 'var(--x-shadow, 0 1px 2px rgba(0,0,0,.08))',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          transition:
            'transform .06s ease, background-color .2s ease, color .2s ease',
        }}
        onMouseDown={(e) =>
          (e.currentTarget.style.transform = 'scale(0.98)')
        }
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = 'scale(1)')
        }
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          style={{ display: 'block' }}
        >
          <path
            fill="currentColor"
            d="M18.244 2H21.5l-7.61 8.7L23 22h-6.33l-4.95-5.77L5.9 22H2.64l8.14-9.3L1 2h6.45l4.48 5.23L18.24 2Zm-1.11 18h1.74L7.02 4H5.2l11.934 16Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default GameOver;

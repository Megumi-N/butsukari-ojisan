import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import { translations } from './translations';

function App() {
  // 言語設定
  const [language, setLanguage] = useState('ja');
  const t = translations[language];

  // スマホ判定
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileCheck =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase()
        );
      const widthCheck = window.innerWidth <= 768;
      setIsMobile(mobileCheck || widthCheck);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // おじさんの種類（5パターン）- それぞれに有効な対応方法がある
  const ojisanTypes = useMemo(
    () => [
      {
        emoji: '🚶‍♂️',
        nameKey: 'normal',
        weakness: 'dodge',
      },
      {
        emoji: '🏃‍♂️',
        nameKey: 'rushing',
        weakness: 'stare',
      },
      {
        emoji: '🧑‍💼',
        nameKey: 'business',
        weakness: 'counter',
      },
      {
        emoji: '👨‍🦳',
        nameKey: 'veteran',
        weakness: 'stop',
      },
      {
        emoji: '👴',
        nameKey: 'elderly',
        weakness: 'dodge',
      },
    ],
    []
  );

  const [gameState, setGameState] = useState('ready'); // ready, playing, gameOver
  const [survivalTime, setSurvivalTime] = useState(0); // 生存時間（秒）
  const [ojisanPosition, setOjisanPosition] = useState(-10); // percentage from top
  const [ojisanSpeed, setOjisanSpeed] = useState(0.5);
  const [currentOjisan, setCurrentOjisan] = useState(ojisanTypes[0]);
  const [playerAction, setPlayerAction] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [ojisanCount, setOjisanCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [mobCharacters, setMobCharacters] = useState([]);

  // モブキャラの種類
  const mobTypes = useMemo(
    () => [
      { emoji: '👩', speed: 1.5 },
      { emoji: '👦', speed: 2.5 },
      { emoji: '🧑', speed: 2.0 },
      { emoji: '👵', speed: 1.2 },
    ],
    []
  );

  // ランクを取得
  const getRank = useCallback((time) => {
    if (time >= 60) return 's';
    if (time >= 50) return 'a';
    if (time >= 40) return 'b';
    if (time >= 30) return 'c';
    if (time >= 20) return 'd';
    if (time >= 10) return 'e';
    return 'f';
  }, []);

  // ゲーム開始
  const startGame = () => {
    setGameState('playing');
    setSurvivalTime(0);
    setOjisanCount(0);
    setSuccessCount(0);
    setOjisanPosition(-10);
    setOjisanSpeed(0.5);
    setCurrentOjisan(
      ojisanTypes[Math.floor(Math.random() * ojisanTypes.length)]
    );
    setPlayerAction(null);
    setFeedback('');
    setMobCharacters([]);
  };

  // おじさんを次に進める
  const nextOjisan = useCallback(() => {
    setOjisanPosition(-10);
    setOjisanSpeed((prev) => Math.min(prev + 0.1, 2.5)); // 徐々に速くなる
    setCurrentOjisan(
      ojisanTypes[Math.floor(Math.random() * ojisanTypes.length)]
    ); // ランダムに選択
    setPlayerAction(null);
    setFeedback('');
    setOjisanCount((prev) => prev + 1);
  }, [ojisanTypes]);

  // アクション処理
  const handleAction = useCallback(
    (action) => {
      if (playerAction) return; // 既にアクション済み

      setPlayerAction(action);

      // おじさんのタイプに応じて最適な対応があるかチェック
      const isCorrect = currentOjisan.weakness === action;

      const ojisanName = t.ojisan[currentOjisan.nameKey];
      const actionName = t.actions[action];

      if (isCorrect) {
        // 成功
        const feedbackMsg = {
          title: t.feedback.success.title,
          description: t.feedback.success.description.replace(
            '{ojisan}',
            ojisanName
          ),
        };
        setFeedback(feedbackMsg);
        setSuccessCount((prev) => prev + 1);
        // 1秒後に次のおじさん
        setTimeout(nextOjisan, 1000);
      } else {
        // 失敗 - ゲームオーバー
        const feedbackMsg = {
          title: t.feedback.failed.title,
          description: t.feedback.failed.description
            .replace('{ojisan}', ojisanName)
            .replace('{action}', actionName),
        };
        setFeedback(feedbackMsg);
        setTimeout(() => {
          setGameState('gameOver');
        }, 1500);
      }
    },
    [
      playerAction,
      nextOjisan,
      currentOjisan,
      t.ojisan,
      t.actions,
      t.feedback.success,
      t.feedback.failed,
    ]
  );

  // おじさんの移動
  useEffect(() => {
    if (gameState !== 'playing' || playerAction) return;

    const interval = setInterval(() => {
      setOjisanPosition((prev) => {
        const newPos = prev + ojisanSpeed;

        // 画面外に出たら（アクションしなかった場合）- ゲームオーバー
        if (newPos >= 100) {
          setFeedback({
            title: t.feedback.noAction.title,
            description: t.feedback.noAction.description,
          });
          setTimeout(() => {
            setGameState('gameOver');
          }, 1500);
          return prev;
        }

        return newPos;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [
    gameState,
    ojisanSpeed,
    playerAction,
    nextOjisan,
    t.feedback.noAction.title,
    t.feedback.noAction.description,
  ]);

  // 生存時間カウント
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setSurvivalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // モブキャラの生成
  useEffect(() => {
    if (gameState !== 'playing') return;

    // 初期生成：3人のモブキャラを生成
    const initialMobs = [];
    for (let i = 0; i < 3; i++) {
      const mobType = mobTypes[Math.floor(Math.random() * mobTypes.length)];
      const direction = Math.random() > 0.5 ? 'left' : 'right';
      initialMobs.push({
        id: Date.now() + Math.random() + i,
        emoji: mobType.emoji,
        speed: mobType.speed,
        direction,
        position:
          direction === 'left' ? Math.random() * 30 : 70 + Math.random() * 30,
        verticalPosition: Math.random() * 60 + 20,
      });
    }
    setMobCharacters(initialMobs);

    // 継続的な生成：最低3人を維持
    const spawnInterval = setInterval(() => {
      setMobCharacters((prev) => {
        // 3人未満の場合は必ず生成
        if (prev.length < 3) {
          const mobType = mobTypes[Math.floor(Math.random() * mobTypes.length)];
          const direction = Math.random() > 0.5 ? 'left' : 'right';
          const newMob = {
            id: Date.now() + Math.random(),
            emoji: mobType.emoji,
            speed: mobType.speed,
            direction,
            position: direction === 'left' ? -10 : 110,
            verticalPosition: Math.random() * 60 + 20,
          };
          return [...prev, newMob];
        }
        // 3人以上いる場合は50%の確率で生成
        if (Math.random() > 0.5) {
          const mobType = mobTypes[Math.floor(Math.random() * mobTypes.length)];
          const direction = Math.random() > 0.5 ? 'left' : 'right';
          const newMob = {
            id: Date.now() + Math.random(),
            emoji: mobType.emoji,
            speed: mobType.speed,
            direction,
            position: direction === 'left' ? -10 : 110,
            verticalPosition: Math.random() * 60 + 20,
          };
          return [...prev, newMob];
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(spawnInterval);
  }, [gameState, mobTypes]);

  // モブキャラの移動と削除
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setMobCharacters((prev) =>
        prev
          .map((mob) => ({
            ...mob,
            position:
              mob.direction === 'left'
                ? mob.position + mob.speed
                : mob.position - mob.speed,
          }))
          .filter((mob) =>
            mob.direction === 'left' ? mob.position < 110 : mob.position > -10
          )
      );
    }, 20);

    return () => clearInterval(interval);
  }, [gameState]);

  // スマホ以外の場合の画面
  if (!isMobile) {
    return (
      <div className="App">
        <button
          className="language-toggle-floating"
          onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
        >
          {language === 'ja' ? 'EN' : '日本語'}
        </button>
        <div className="game-container">
          <div className="game-title">
            <h1 className="title-main">ぶつかりおじさん</h1>
            <p className="title-sub">Butsukari Otoko Game</p>
          </div>
          <div className="mobile-only-message">
            <h2>📱 {t.mobileOnly.title}</h2>
            <p>{t.mobileOnly.description1}</p>
            <p>{t.mobileOnly.description2}</p>
            <div className="qr-placeholder">
              <p>{t.mobileOnly.accessPrompt}</p>
              <p className="url-display">{window.location.href}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <button
        className="language-toggle-floating"
        onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
      >
        {language === 'ja' ? 'EN' : '日本語'}
      </button>
      <div className="game-container">
        <div className="game-title">
          <h1 className="title-main">ぶつかりおじさん</h1>
          <p className="title-sub">Butsukari Otoko Game</p>
        </div>
        {gameState === 'ready' && (
          <div className="start-screen">
            <h2>{t.start.title}</h2>
            <p>{t.start.description}</p>
            <ul>
              {t.start.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
            <button onClick={startGame} className="start-button">
              {t.start.button}
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
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
                className={`ojisan ${
                  playerAction ? 'action-' + playerAction : ''
                }`}
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

            <div className="action-buttons">
              <button
                onClick={() => handleAction('dodge')}
                disabled={playerAction}
                className="action-btn dodge-btn"
              >
                {t.actions.dodge}
              </button>
              <button
                onClick={() => handleAction('stop')}
                disabled={playerAction}
                className="action-btn stop-btn"
              >
                {t.actions.stop}
              </button>
              <button
                onClick={() => handleAction('stare')}
                disabled={playerAction}
                className="action-btn stare-btn"
              >
                {t.actions.stare}
              </button>
              <button
                onClick={() => handleAction('counter')}
                disabled={playerAction}
                className="action-btn counter-btn"
              >
                {t.actions.counter}
              </button>
            </div>
          </>
        )}

        {gameState === 'gameOver' && (
          <div className="game-over">
            <h2>{t.gameOver.title}</h2>
            <p className="final-score">
              {t.gameOver.survivalTime}: {survivalTime}
              {t.game.seconds}
            </p>
            <div className="rank-display">
              {(() => {
                const rank = getRank(survivalTime);
                return (
                  <>
                    <div className={`rank ${rank}-rank`}>
                      {t.gameOver.ranks[rank]}
                    </div>
                    <p className="rank-message">{t.gameOver.messages[rank]}</p>
                  </>
                );
              })()}
            </div>
            <p>
              {t.gameOver.successCount}: {successCount}
              {t.game.times}
            </p>
            <p>
              {t.gameOver.encounterCount}: {ojisanCount}
              {t.game.people}
            </p>
            <button onClick={startGame} className="start-button">
              {t.gameOver.playAgain}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

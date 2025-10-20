export const translations = {
  ja: {
    title: 'ぶつかりおじさんゲーム',
    mobileOnly: {
      title: 'スマホ専用ゲームです',
      description1: 'このゲームはスマートフォンまたはタブレット専用です。',
      description2: 'モバイル端末でアクセスしてください。',
      accessPrompt: 'スマホでこのURLにアクセス：',
    },
    start: {
      title: 'ゲームの遊び方',
      description: '近づいてくるおじさんに対して正しいアクションを選択しよう！',
      rules: [
        'おじさんのタイプによって有効な対応方法が1つだけあります',
        '間違った対応を選ぶか、対応しないとゲームオーバー',
        'できるだけ長く生き延びよう！',
      ],
      button: 'ゲームスタート',
    },
    game: {
      survivalTime: '生存時間',
      success: '成功',
      encounters: '遭遇',
      seconds: '秒',
      times: '回',
      people: '人',
    },
    ojisan: {
      normal: '普通おじさん',
      rushing: '急ぎおじさん',
      business: 'ビジネスおじさん',
      veteran: 'ベテランおじさん',
      elderly: '年配おじさん',
    },
    actions: {
      dodge: '避ける',
      stop: '立ち止まる',
      stare: '見つめる',
      counter: 'ぶつかり返す',
    },
    feedback: {
      success: {
        title: '成功！',
        description: '{ojisan}への対処は完璧です！',
      },
      failed: {
        title: '失敗...',
        description: '{ojisan}に{action}は効果がありませんでした',
      },
      noAction: {
        title: 'ぶつかられた！',
        description: '対応が間に合いませんでした...',
      },
    },
    gameOver: {
      title: 'ゲーム終了！',
      survivalTime: '生存時間',
      successCount: '成功回数',
      encounterCount: '遭遇したおじさん',
      playAgain: 'もう一度プレイ',
      ranks: {
        s: '伝説級',
        a: '達人',
        b: '上級者',
        c: '中級者',
        d: '初級者',
        e: '見習い',
        f: '初心者',
      },
      messages: {
        s: 'あなたに触れられるものはもはや世界に存在しないのかもしれません',
        a: 'おじさんの見極め力たるや！',
        b: 'かなり良い！冷静に対処できています！',
        c: '見極める力がついてきていますね！',
        d: 'おじさんを見極めてきてますね！',
        e: 'まだまだ！練習あるのみです',
        f: 'おじさんを見極めよう！',
      },
    },
    base: ({ survivalTime, successCount, rankLabel, rankMessage }) =>
      `ぶつかりおじさんゲームやってみた。\n生存${survivalTime}秒 / 成功${successCount}回 / ランク${rankLabel}\n${rankMessage}\n`,
  },
  en: {
    title: 'Butsukari Otoko Game',
    mobileOnly: {
      title: 'Mobile Only Game',
      description1: 'This game is designed for smartphones or tablets only.',
      description2: 'Please access from a mobile device.',
      accessPrompt: 'Access this URL on your phone:',
    },
    start: {
      title: 'How to Play',
      description:
        'Choose the right action against the approaching Butsukari Otoko!',
      rules: [
        'Each type of Butsukari Otoko has only one effective response',
        'Wrong response or no response leads to game over',
        'Survive as long as you can!',
      ],
      button: 'Start Game',
    },
    game: {
      survivalTime: 'Survival',
      success: 'Success',
      encounters: 'Met',
      seconds: 's',
      times: 'x',
      people: '',
    },
    ojisan: {
      normal: 'Normal Otoko',
      rushing: 'Rushing Otoko',
      business: 'Business Otoko',
      veteran: 'Veteran Otoko',
      elderly: 'Elderly Otoko',
    },
    actions: {
      dodge: 'Dodge',
      stop: 'Stop',
      stare: 'Stare',
      counter: 'Counter',
    },
    feedback: {
      success: {
        title: 'Success!',
        description: 'Perfect response to the {ojisan}!',
      },
      failed: {
        title: 'Failed...',
        description: '{action} was ineffective against the {ojisan}',
      },
      noAction: {
        title: 'Bumped!',
        description: 'Could not respond in time...',
      },
    },
    gameOver: {
      title: 'Game Over!',
      survivalTime: 'Survival Time',
      successCount: 'Success Count',
      encounterCount: 'Butsukari Otoko Met',
      playAgain: 'Play Again',
      ranks: {
        s: 'Legendary',
        a: 'Master',
        b: 'Expert',
        c: 'Intermediate',
        d: 'Beginner',
        e: 'Novice',
        f: 'Rookie',
      },
      messages: {
        s: 'Incredible! You are a Butsukari Otoko Master!',
        a: 'Excellent! Perfect judgment!',
        b: 'Pretty good! You handled it calmly!',
        c: 'Good job! You are getting the pattern!',
        d: 'Not bad! Keep trying!',
        e: 'Keep practicing!',
        f: "Don't give up! Keep challenging!",
      },
    },
    base: ({ survivalTime, successCount, rankLabel, rankMessage }) =>
      `Played the Butsukari Ojisan game\nSurvived ${survivalTime}s / ${successCount} successes / Rank ${rankLabel}\n${rankMessage}\n`,
  },
};

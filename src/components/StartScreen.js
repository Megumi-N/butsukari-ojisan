function StartScreen({ t, onStart }) {
  return (
    <div className="start-screen">
      <h2>{t.start.title}</h2>
      <p>{t.start.description}</p>
      <ul>
        {t.start.rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
      <button onClick={onStart} className="start-button">
        {t.start.button}
      </button>
    </div>
  );
}

export default StartScreen;

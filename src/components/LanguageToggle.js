function LanguageToggle({ language, onToggle }) {
  return (
    <button
      className="language-toggle-floating"
      onClick={onToggle}
    >
      {language === 'ja' ? 'EN' : '日本語'}
    </button>
  );
}

export default LanguageToggle;

function MobileOnlyMessage({ t }) {
  return (
    <div className="mobile-only-message">
      <h2>📱 {t.mobileOnly.title}</h2>
      <p>{t.mobileOnly.description1}</p>
      <p>{t.mobileOnly.description2}</p>
      <div className="qr-placeholder">
        <p>{t.mobileOnly.accessPrompt}</p>
        <p className="url-display">{window.location.href}</p>
      </div>
    </div>
  );
}

export default MobileOnlyMessage;

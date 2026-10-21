import { useRef, useEffect } from 'react';

function MinecraftModal({ selectedTrack, onClose, onConfirm }) {
  const modalContainerRef = useRef(null);

  useEffect(() => {
    if (modalContainerRef.current) {
      modalContainerRef.current.focus();
    }
  }, []);

  if (!selectedTrack) {
    return null;
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedTrack);
    }
  };

  return (
    <div
      ref={modalContainerRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      className="modal-backdrop modal-active"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-window">
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-track-badge">
              [ TRACK: {selectedTrack.trackName} ]
            </span>
            <h2 className="modal-title">{selectedTrack.title}</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          <section className="modal-section">
            <h4 className="section-title">MISSION OVERVIEW</h4>
            <div className="modal-text">
              {Array.isArray(selectedTrack.fullContext) ? (
                selectedTrack.fullContext.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{selectedTrack.fullContext}</p>
              )}
            </div>
          </section>

          <section className="modal-section">
            <h4 className="section-title">KEY DELIVERABLES &amp; REQUIREMENTS</h4>
            <ul className="requirements-list">
              {selectedTrack.requirements &&
                selectedTrack.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
            </ul>
          </section>

          <section className="modal-section">
            <h4 className="section-title">RECOMMENDED TECH STACK</h4>
            <div className="tech-stack-container">
              {selectedTrack.techStack &&
                selectedTrack.techStack.map((tech, index) => (
                  <span key={index} className="tech-pill">
                    {tech}
                  </span>
                ))}
            </div>
          </section>

          <section className="modal-section">
            <h4 className="section-title">EVALUATION CRITERIA</h4>
            <div className="criteria-table-wrapper">
              <table className="criteria-table">
                <thead>
                  <tr>
                    <th>CRITERIA</th>
                    <th className="weight-col">WEIGHT</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTrack.evaluationRubric &&
                    selectedTrack.evaluationRubric.map((item, index) => (
                      <tr key={index}>
                        <td>{item.label}</td>
                        <td className="weight-col">{item.percentage}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="pixel-btn modal-cancel-btn"
            onClick={onClose}
          >
            CLOSE
          </button>
          <button
            type="button"
            className="pixel-btn modal-confirm-btn"
            onClick={handleConfirm}
          >
            CONFIRM SELECTION
          </button>
        </div>
      </div>
    </div>
  );
}

export default MinecraftModal;

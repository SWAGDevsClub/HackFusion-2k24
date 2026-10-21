function ProblemCard({ title, track, image, description, onSelect }) {
  return (
    <article className="parchment-card" data-track={track}>
      <div className="wooden-frame">
        {image}
      </div>
      <div className="card-content">
        <span className="track-tag">[ TRACK: <span className="track-title">{track}</span> ]</span>
        <h3 className="problem-title">{title}</h3>
        <p className="problem-description">{description}</p>
        <div className="card-action">
          <button type="button" className="pixel-btn" onClick={onSelect}>
            SELECT
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProblemCard;

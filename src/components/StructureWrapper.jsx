function StructureWrapper({ children }) {
  return (
    <div className="structure-wrapper">
      <div className="beam-container mt-30">
        <div className="hanging-lantern lantern-left">
          <div className="lantern-chain"></div>
          <div className="lantern-body">
            <div className="lantern-cap"></div>
            <div className="lantern-glass">
              <div className="lantern-flame"></div>
            </div>
            <div className="lantern-base"></div>
          </div>
        </div>

        <div className="wooden-beam">
          <div className="metal-band band-left">
            <span className="bolt"></span>
            <span className="bolt"></span>
          </div>
          <h1 className="page-title">HACKFUSION PROBLEM STATEMENTS</h1>
          <div className="metal-band band-right">
            <span className="bolt"></span>
            <span className="bolt"></span>
          </div>
        </div>

        <div className="hanging-lantern lantern-right">
          <div className="lantern-chain"></div>
          <div className="lantern-body">
            <div className="lantern-cap"></div>
            <div className="lantern-glass">
              <div className="lantern-flame"></div>
            </div>
            <div className="lantern-base"></div>
          </div>
        </div>
      </div>

      <div className="castle-structure">
        <div className="stone-pillar pillar-left"></div>
        <main className="cobblestone-interior">
          {children}
        </main>
        <div className="stone-pillar pillar-right"></div>
      </div>
    </div>
  );
}

export default StructureWrapper;

import { useState } from 'react';
import Navbar from '../components/Navbar';
import StructureWrapper from '../components/StructureWrapper';
import ProblemCard from '../components/ProblemCard';
import MinecraftModal from '../components/MinecraftModal';
import ToastNotification from '../components/ToastNotification';
import { problemStatementsData } from '../data/problemStatementsData';

export default function ProblemStatement() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastData, setToastData] = useState(null);

  const handleSelectCard = (track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSelection = (track) => {
    setIsModalOpen(false);
    setToastData(track.trackName);
  };

  const handleCloseToast = () => {
    setToastData(null);
  };

  return (
    <div className="problem-statements-page">
      <Navbar />

      <StructureWrapper>
        {problemStatementsData.map((problem) => (
          <ProblemCard
            key={problem.id}
            title={problem.title}
            track={problem.trackName}
            image={problem.image}
            description={problem.shortDescription}
            onSelect={() => handleSelectCard(problem)}
          />
        ))}
      </StructureWrapper>

      <footer className="cobblestone-road">
        <div className="footer-signboard">
          <span className="signboard-text">&copy; 2026 Hackfusion. All rights reserved</span>
        </div>
      </footer>

      {isModalOpen && selectedTrack && (
        <MinecraftModal
          selectedTrack={selectedTrack}
          onClose={handleCloseModal}
          onConfirm={handleConfirmSelection}
        />
      )}

      {toastData && (
        <ToastNotification
          message={`Track Selected: ${toastData}`}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
}

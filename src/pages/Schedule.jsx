import React from "react";

function Schedule() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center text-white"
    style={{ backgroundImage: "url('./bgcs.jpg')" }}
  >
      <div className="bg-black/50 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center py-6" style={{ fontFamily: 'GameOfSquids, sans-serif' }}>Event Schedule</h2>
        <h1 className="text-3xl font-bold text-center py-4" style={{ fontFamily: 'GameOfSquids, sans-serif' }}>Coming Soon......</h1>
        {/* <div className="flex flex-col md:flex-row justify-center text-center space-y-6 md:space-y-0 md:space-x-12">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-yellow-400">Day 1</h3>
            <ul className="space-y-2">
              <li>🕘 10:00 AM - Inauguration</li>
              <li>🕛 12:00 PM - Team Registration</li>
              <li>🕒 3:00 PM - Workshop 1</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-yellow-400">Day 2</h3>
            <ul className="space-y-2">
              <li>🕘 9:00 AM - Hackathon Begins</li>
              <li>🕐 1:00 PM - Lunch Break</li>
              <li>🕔 5:00 PM - Mentoring Sessions</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-yellow-400">Day 3</h3>
            <ul className="space-y-2">
              <li>🕘 10:00 AM - Final Submissions</li>
              <li>🕛 12:00 PM - Judging Round</li>
              <li>🕔 5:00 PM - Closing Ceremony</li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Schedule;

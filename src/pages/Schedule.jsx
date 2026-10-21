import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ComingSoonToast from "../components/ComingSoonToast";
import contactBackground from "../assets/pageassets-clean/contact-background.webp";

export default function Schedule() {
  const teaserEvents = [
    { day: "DAY 1", title: "CHECK-IN & OPENING CEREMONY", status: "LOCKED" },
    { day: "DAY 1", title: "HACKING COMMENCES & KEYNOTES", status: "LOCKED" },
    { day: "DAY 2", title: "MIDWAY CHECKPOINT & MENTORING", status: "LOCKED" },
    { day: "DAY 2", title: "GAMING & MINI-EVENTS", status: "LOCKED" },
    { day: "DAY 3", title: "PROJECT SUBMISSION & DEMO", status: "LOCKED" },
    { day: "DAY 3", title: "AWARDS & CLOSING CEREMONY", status: "LOCKED" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0f0d] text-[#fff4db]">
      <ComingSoonToast
        pageName="SCHEDULE"
        title="COMING SOON"
        subtitle="The full 36-hour hackathon timeline and event schedule will be unlocked soon!"
      />
      {/* Background with overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-45"
        style={{ backgroundImage: `url(${contactBackground})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(10,15,13,0.7)_0%,rgba(10,15,13,0.92)_100%)]"
        aria-hidden="true"
      />

      {/* Navigation */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto flex w-full max-w-[960px] flex-col items-center px-4 pt-28 pb-20 sm:pt-36">
        {/* Page Title Beam */}
        <div className="mb-6 w-full max-w-[760px] border-4 border-[#281508] bg-[#7A4926] px-6 py-4 text-center shadow-[inset_4px_4px_0_#A86D3F,inset_-4px_-4px_0_#4B2B12,0_8px_16px_rgba(0,0,0,0.6)]">
          <h1 className="font-['Press_Start_2P',monospace] text-[clamp(14px,3vw,26px)] text-[#FFFF55] [text-shadow:3px_3px_0_#2A170A] tracking-wider uppercase m-0">
            EVENT SCHEDULE
          </h1>
        </div>

        {/* Timeline Teaser / Placeholder Cards */}
        <div className="w-full max-w-[760px] border-4 border-[#1A1A1A] bg-[#2A1D15]/95 p-4 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.8),inset_2px_2px_0_#4A3325]">
          <div className="mb-4 text-center">
            <span className="font-['Press_Start_2P',monospace] text-[9px] sm:text-[11px] text-[#ffcb66] [text-shadow:1px_1px_0_#000] uppercase tracking-widest">
              SCHEDULE OVERVIEW
            </span>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {teaserEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 border-2 border-[#4A2D18] bg-[#1d120a] p-3 sm:p-4 shadow-[inset_1px_1px_0_#6E4423]"
              >
                <div className="flex items-center gap-3">
                  <span className="border-2 border-[#5C381E] bg-[#3B2211] px-2 py-1 font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-[#FFFF55]">
                    {event.day}
                  </span>
                  <span className="font-['Press_Start_2P',monospace] text-[9px] sm:text-[11px] text-[#F4E2B1] tracking-wide text-center sm:text-left">
                    {event.title}
                  </span>
                </div>
                <span className="border border-[#782828] bg-[#421515] px-2.5 py-1 font-['Press_Start_2P',monospace] text-[7px] sm:text-[8px] text-[#FFAAAA] tracking-wider">
                  [{event.status}]
                </span>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-block border-4 border-black bg-[#7d7d7d] px-6 py-3 font-['Press_Start_2P',monospace] text-[10px] sm:text-[12px] uppercase text-white shadow-[inset_4px_4px_0_rgba(255,255,255,0.38),inset_-4px_-4px_0_rgba(0,0,0,0.38),0_4px_0_rgba(0,0,0,0.4)] transition-[filter] hover:brightness-[1.2] active:brightness-[1.2]"
            >
              RETURN TO OVERWORLD
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="cobblestone-road relative z-10">
        <div className="footer-signboard">
          <span className="signboard-text">&copy; 2026 Hackfusion. All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}


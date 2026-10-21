import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import faqChargedCreeper from "../assets/digvijay's_assets/faq-charged-creeper.webp";
import faqDirtBackground from "../assets/digvijay's_assets/faq-dirt-background.jpg";
import faqTabSandTexture from "../assets/digvijay's_assets/faq-tab-sand-texture.webp";

const questions = [
  {
    question: "What is HackFusion 3?",
    answer: "HackFusion 3 is a national 36-hour hackathon running from 27 February to 1 March.",
  },
  {
    question: "What is the registration fee and refund policy?",
    answer: "The fee is ₹749 per team and includes food. Teams not selected for Stage 2 get a refund; participant-initiated cancellations are not refundable.",
  },
  {
    question: "How do we pay the registration fee?",
    answer: "Pay using the QR code on the Account Details page. Keep your payment screenshot and UTR number, and upload the screenshot when requested.",
  },
  {
    question: "What are the stages of the hackathon?",
    answer: "Stage 1 is abstract submission and PPT-based selection (PPT optional). Stage 2 is the grand finale at SGGSIE&T, Nanded, Maharashtra.",
  },
  {
    question: "What should we bring to the hackathon?",
    answer: "Bring a laptop and charger, phone, headphones, notebook and pen, USB drive, ID, water bottle, medicines, backup drive or USB hub, snacks, comfortable clothes, nap essentials, toiletries, and required software installed.",
  },
  {
    question: "Which academic years and branches can participate?",
    answer: "Students from any academic year and branch can participate.",
  },
  {
    question: "Is a girl team member required?",
    answer: "No.",
  },
  {
    question: "Are a PPT or abstract required?",
    answer: "An abstract is required; a PPT is optional. Explain your approach to solving the problem statement.",
  },
  {
    question: "What is the last date to register?",
    answer: "The stated deadline is 15 February 2026.",
  },
  {
    question: "Can we leave the venue during the hackathon?",
    answer: "Only in an emergency.",
  },
  {
    question: "Can we use ChatGPT during the competition?",
    answer: "Yes. You may use open-source tools, but make sure you understand your solution and approach.",
  },
  {
    question: "What do winning teams get besides prize money?",
    answer: "Benefits include skill development, networking, portfolio and career growth, personal growth, and internship opportunities.",
  },
  {
    question: "Will there be sleeping or rest areas?",
    answer: "Yes.",
  },
  {
    question: "Will reliable internet be available?",
    answer: "Yes, internet will be available.",
  },
  {
    question: "Can teammates be from different colleges?",
    answer: "Yes, participants from different colleges can form a team.",
  },
  {
    question: "I didn't receive an OTP email. What should I do?",
    answer: "Check your spam folder or contact the organizers.",
  },
  {
    question: "What will the problem statement be like?",
    answer: "Check the official problem statement for details.",
  },
  {
    question: "Will refreshments and breakfast be provided?",
    answer: "Yes, refreshments and breakfast will be provided at regular intervals.",
  },
  {
    question: "Is lunch and dinner included in the registration fee?",
    answer: "Yes, meals are included in the registration fee.",
  },
  {
    question: "Can I get a refund?",
    answer: "You can get a refund if your team is not selected for Stage 2.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate h-svh overflow-hidden bg-[#294523] px-[clamp(1.25rem,4vw,4.5rem)] text-2xl [font-family:'Minecraft','VT323','Courier_New',monospace] text-[#fff4db] max-[540px]:px-4" aria-labelledby="faq-title">
      <img className="pointer-events-none absolute inset-0 z-[-1] h-full w-full object-cover object-center" src={faqDirtBackground} alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(9,18,9,.46),rgba(18,12,9,.54)),rgba(8,11,8,.28)]" aria-hidden="true" />
      <picture className="pointer-events-none absolute inset-0 z-0 max-[768px]:hidden" aria-hidden="true">
        <source media="(min-width: 769px)" srcSet={faqChargedCreeper} />
        <img
          className="absolute bottom-0 left-[clamp(8rem,16vw,15rem)] block w-[clamp(145px,16vw,250px)] scale-x-[-1] select-none [filter:drop-shadow(0_14px_18px_rgba(0,0,0,.72))_drop-shadow(0_0_24px_rgba(31,255,143,.28))]"
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      </picture>
      <div className="relative z-[1] mx-auto flex h-full w-full min-w-0 max-w-[1400px] flex-col py-[clamp(2rem,6vh,5rem)]">
        <p className="mb-2 text-[clamp(1rem,1.5vw,1.25rem)] font-bold tracking-[.2em] text-[#ffcb66] [text-shadow:2px_2px_#2b160c] max-[540px]:mb-1 max-[540px]:text-[.95rem] max-[540px]:tracking-[.14em]">HACKFUSION 3 · FIELD GUIDE</p>
        <h2 id="faq-title" className="faq-page-title mb-[clamp(1rem,2.5vh,2rem)] text-[clamp(2.65rem,6.2vw,5.5rem)] font-black leading-[1.04] tracking-[-.035em] text-[#fff4dc] [text-shadow:4px_5px_0_#35190d,0_8px_22px_rgba(0,0,0,.45)] [-webkit-text-stroke:.5px_rgba(69,32,14,.7)] max-[540px]:mb-3 max-[540px]:max-w-[16ch] max-[540px]:text-[clamp(1.9rem,8.5vw,2.6rem)] max-[540px]:leading-[1.06]">Frequently Asked Questions</h2>
        <div className="faq-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-y-contain pr-2" data-lenis-prevent>
          <div className="grid gap-[clamp(.75rem,1.2vw,1.1rem)] pb-2 max-[540px]:gap-2.5">
            {questions.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index + 1}`;
              return (
                <article
                  className={`overflow-hidden border-[3px] bg-[#58331f] bg-[length:auto,1400px_1400px] bg-center shadow-[inset_0_0_0_2px_rgba(226,162,99,.33),0_8px_0_#27140c,0_16px_25px_rgba(0,0,0,.44)] transition-[border-color,filter,transform] duration-[180ms] [transition-timing-function:steps(3)] hover:border-[#87471e] hover:brightness-[1.12] motion-reduce:transition-none max-[540px]:border-2 max-[540px]:shadow-[inset_0_0_0_2px_rgba(226,162,99,.33),0_4px_0_#27140c,0_8px_14px_rgba(0,0,0,.44)] ${isOpen ? "-translate-y-px border-[#87471e] brightness-[1.12]" : "border-[#321b10]"}`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(76,50,20,.4), rgba(43,28,12,.48)), url("${faqTabSandTexture}")`,
                  }}
                  key={question}
                >
                  <h3 className="m-0">
                    <button
                      className="faq-question-button flex min-h-[clamp(80px,6.8vw,104px)] w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-[clamp(1.1rem,2.8vw,2.3rem)] py-[clamp(.9rem,1.6vw,1.3rem)] text-left text-[clamp(1.6rem,2.9vw,2.25rem)] font-extrabold leading-[1.15] text-[#fff3dc] [font-family:'Minecraft','VT323','Courier_New',monospace] [text-shadow:2px_3px_#30180d,0_2px_8px_rgba(0,0,0,.4)] hover:[&_.faq-toggle]:border-[#fff1c9] hover:[&_.faq-toggle]:bg-[rgba(91,54,21,.88)] hover:[&_.faq-toggle]:shadow-[0_0_12px_rgba(255,216,137,.28)] focus-visible:outline-[3px] focus-visible:outline-[#ffe48a] focus-visible:outline-offset-[-7px] motion-reduce:transition-none max-[540px]:min-h-[52px] max-[540px]:gap-3 max-[540px]:px-3 max-[540px]:py-2.5 max-[540px]:text-[clamp(1.05rem,4.6vw,1.3rem)]"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="min-w-0">{question}</span>
                      <span className={`faq-toggle relative grid h-[clamp(38px,4.5vw,56px)] w-[clamp(38px,4.5vw,56px)] shrink-0 place-items-center rounded-full border-2 border-[rgba(255,232,183,.92)] bg-[rgba(57,35,17,.72)] shadow-[inset_0_0_0_2px_rgba(88,56,22,.85),0_2px_7px_rgba(23,13,5,.42)] transition-[background-color,border-color,box-shadow] duration-[180ms] ease-in motion-reduce:transition-none hover:border-[#fff1c9] hover:bg-[rgba(91,54,21,.88)] hover:shadow-[0_0_12px_rgba(255,216,137,.28)] before:absolute before:block before:h-0.5 before:w-[48%] before:rounded-sm before:bg-[#fff3d6] before:shadow-[0_1px_2px_rgba(29,17,8,.7)] before:content-[''] max-[540px]:h-[28px] max-[540px]:w-[28px] ${isOpen ? "border-[#fff1c9] bg-[rgba(91,54,21,.88)] shadow-[0_0_12px_rgba(255,216,137,.28)]" : ""}`} aria-hidden="true"><i className={`absolute block h-[48%] w-0.5 rounded-sm bg-[#fff3d6] shadow-[0_1px_2px_rgba(29,17,8,.7)] transition-transform duration-[180ms] motion-reduce:transition-none ${isOpen ? "rotate-90" : ""}`} /></span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="overflow-hidden"
                        id={answerId}
                        key="answer"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
                      >
                        <p className="faq-answer-text m-0 px-[clamp(1.25rem,3.5vw,3rem)] pb-[clamp(1.5rem,3vw,2.5rem)] text-[clamp(1.4rem,2.3vw,1.9rem)] font-semibold leading-[1.55] text-[#ffefcf] [font-family:'Minecraft','VT323','Courier_New',monospace] [text-shadow:1px_2px_#32190e,0_2px_7px_rgba(0,0,0,.7)] max-[540px]:px-3 max-[540px]:pb-4 max-[540px]:text-[1.15rem] max-[540px]:leading-[1.4]">{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

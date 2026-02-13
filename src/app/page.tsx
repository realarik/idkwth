"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ── Slide data ──────────────────────────────── */
const slides = [
  {
    src: "/images/6296333738983492403.jpg",
    caption: "Hi baby! I want to say something to you💌",
  },
  {
    src: "/images/6084779111864799173.jpg",
    caption: "You look so cute in this photo asdfghjkl",
  },
  {
    src: "/images/6084779111864799174.jpg",
    caption: "I can't stop thinking about you, for real 24/7 thinking about you",
  },
  {
    src: "/images/6084779111864799175.jpg",
    caption: "I love you so much, and you know it, right?",
  },
  {
    src: "/images/6084779111864799176.jpg",
    caption: "Will you be my Valentine?",
  },
  {
    src: "/images/7908f38f38699e445.jpg",
    caption: "Happy Valentine's Day, baby!!💖",
  },
];

/* Index of the 'Will you be my Valentine?' slide */
const QUESTION_SLIDE = 4;
const FINAL_SLIDE = 5;

/* ── Falling petals ──────────────────────────── */
const petals = ["🌸", "🩷", "✿", "❀", "🪷", "💮", "🌺"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [noClicked, setNoClicked] = useState(false);
  const total = slides.length;

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goBack = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  /* keyboard */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goBack();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goBack]);

  return (
    <main className="relative h-dvh flex items-center justify-center px-3 py-3 sm:px-6 sm:py-6 overflow-hidden">
      {/* ── Falling petals ────────────────────── */}
      {petals.map((petal, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${8 + i * 13}%`,
            animationDuration: `${8 + i * 2.5}s`,
            animationDelay: `${i * 2.2}s`,
            fontSize: `${0.9 + (i % 3) * 0.45}rem`,
            opacity: 0.5,
          }}
        >
          {petal}
        </span>
      ))}

      {/* ── Main container ────────────────────── */}
      <div className="relative z-10 w-full max-w-[460px] h-full flex flex-col items-center">
        {/* Wax seal icon */}
        <div className="seal-glow w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8b2942] to-[#6b2c3e] flex items-center justify-center shadow-lg mb-2 shrink-0">
          <span className="text-white text-sm sm:text-base">💌</span>
        </div>

        {/* Title */}
        <h1 className="title-elegant text-center text-2xl sm:text-3xl font-bold shrink-0">
          For you
        </h1>
        <p className="text-center text-xs sm:text-sm text-[#9a6b7a] mb-3 sm:mb-4 shrink-0 font-medium tracking-wide">
          — my pretty baby —
        </p>

        {/* ── Letter card ─────────────────────── */}
        <div
          className="w-full flex-1 min-h-0 flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(255,252,248,0.95) 0%, rgba(255,248,240,0.9) 100%)",
            boxShadow: "0 4px 20px rgba(60,30,40,0.08), 0 1px 3px rgba(60,30,40,0.06)",
            border: "1px solid rgba(200,170,150,0.25)",
          }}
        >
          {/* Decorative top line */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#b76e79] to-transparent opacity-40" />

          <div className="flex-1 flex flex-col p-3 sm:p-5 min-h-0">
            {/* Polaroid photo */}
            <div
              key={index}
              className="animate-slide-in flex justify-center flex-1 min-h-0"
            >
              <div className="polaroid-frame rounded-sm h-full w-full max-w-[380px] flex flex-col">
                <div className="relative flex-1 min-h-0 bg-[#f5f0e8] rounded-sm overflow-hidden">
                  <Image
                    src={slides[index].src}
                    alt={slides[index].caption}
                    fill
                    sizes="(max-width: 480px) 100vw, 380px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Caption */}
            <p
              key={`cap-${index}`}
              className="animate-slide-in text-center text-sm sm:text-base font-semibold text-[#5a2d3d] mt-3 shrink-0 leading-relaxed"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {slides[index].caption}
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 mt-2 shrink-0">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#c9a88a]/40" />
              <span className="text-[#c9a88a] text-xs">♥</span>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-[#c9a88a]/40" />
            </div>

            {/* Slide dots */}
            <div className="flex items-center justify-center gap-2 mt-2 shrink-0">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    width: i === index ? "20px" : "7px",
                    height: "7px",
                    borderRadius: "999px",
                    background: i === index
                      ? "linear-gradient(135deg, #8b2942, #b76e79)"
                      : "rgba(180, 150, 140, 0.35)",
                    border: "none",
                    padding: 0,
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3 mt-3 shrink-0">
              {/* ── Valentine question slide: Yes / No ── */}
              {index === QUESTION_SLIDE ? (
                <>
                  {!noClicked && (
                    <button
                      onClick={() => setNoClicked(true)}
                      className="btn-warm px-5 py-2 text-xs sm:text-sm font-semibold rounded-full
                        bg-white text-[#6b2c3e] cursor-pointer
                        shadow-sm transition-all duration-300"
                      style={{ border: "1.5px solid rgba(139, 41, 66, 0.2)" }}
                    >
                      No 😢
                    </button>
                  )}
                  <button
                    onClick={() => { setIndex(FINAL_SLIDE); setNoClicked(false); }}
                    className="btn-warm px-6 py-2 text-xs sm:text-sm font-semibold rounded-full
                      text-white shadow-md cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #8b2942 0%, #a3374d 50%, #b76e79 100%)",
                      border: "none",
                    }}
                  >
                    Yes 💖
                  </button>
                </>
              ) : index === FINAL_SLIDE ? (
                /* Final slide — no nav buttons, just a little heart */
                <span className="text-lg animate-slide-in">💕</span>
              ) : (
                /* Normal navigation */
                <>
                  {index > 0 && (
                    <button
                      onClick={goBack}
                      className="btn-warm px-5 py-2 text-xs sm:text-sm font-semibold rounded-full
                        bg-white text-[#6b2c3e] cursor-pointer
                        shadow-sm"
                      style={{ border: "1.5px solid rgba(139, 41, 66, 0.2)" }}
                    >
                      ← Back
                    </button>
                  )}
                  {index < QUESTION_SLIDE && (
                    <button
                      onClick={goNext}
                      className="btn-warm px-5 py-2 text-xs sm:text-sm font-semibold rounded-full
                        text-white shadow-md cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #8b2942 0%, #a3374d 50%, #b76e79 100%)",
                        border: "none",
                      }}
                    >
                      Next →
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Decorative bottom line */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#c9a88a] to-transparent opacity-30" />
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] sm:text-xs text-[#b8a090]/60 mt-2 shrink-0 tracking-wide">
          Made with ♥ by Alex
        </p>
      </div>
    </main>
  );
}

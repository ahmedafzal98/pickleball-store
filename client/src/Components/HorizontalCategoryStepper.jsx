import React, { useMemo, useState } from "react";

/**
 * HorizontalCategoryStepper
 * Props:
 *  - categories: Array<string | { name: string }>
 *  - initialIndex?: number (default 0)
 *  - onChange?: (index: number) => void
 */
export default function HorizontalCategoryStepper({
  categories = [],
  initialIndex = 0,
  onChange,
}) {
  // Normalize categories to objects with a "name" field
  const items = useMemo(
    () =>
      (Array.isArray(categories) ? categories : []).map((c) =>
        typeof c === "string" ? { name: c } : { name: c?.name ?? "" }
      ),
    [categories]
  );

  const total = items.length;
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
  const [currentIndex, setCurrentIndex] = useState(
    clamp(initialIndex, 0, Math.max(0, total - 1))
  );

  const goTo = (idx) => {
    const next = clamp(idx, 0, Math.max(0, total - 1));
    setCurrentIndex(next);
    onChange?.(next);
  };

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);

  // Progress percentage for the fill line (0%..100%)
  const progressPct =
    total <= 1 ? 0 : Math.round((currentIndex / (total - 1)) * 100);

  if (total === 0) {
    return (
      <div style={{ fontFamily: "Inter, system-ui, Arial, sans-serif" }}>
        <div className="hcs-wrapper">
          <p className="hcs-empty">No categories provided.</p>
        </div>
        <HCSStyles />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Inter, system-ui, Arial, sans-serif" }}>
      <div className="hcs-wrapper">
        {/* Track line behind steps */}
        <div className="hcs-track" aria-hidden />
        {/* Animated progress fill */}
        <div
          className="hcs-track-fill"
          style={{ width: `${progressPct}%` }}
          aria-hidden
        />

        {/* Steps */}
        <div
          className="hcs-steps"
          style={{
            gridTemplateColumns: `repeat(${total}, minmax(88px, 1fr))`,
          }}
        >
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex;
            return (
              <button
                key={`${item.name}-${idx}`}
                className={[
                  "hcs-step",
                  isActive ? "hcs-step--active" : "",
                  isCompleted ? "hcs-step--completed" : "",
                ].join(" ")}
                onClick={() => goTo(idx)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${idx + 1} of ${total}: ${item.name}`}
              >
                <div className="hcs-bullet">
                  {/* Key forces re-mount to retrigger fade animation on active number */}
                  <span
                    key={
                      isActive ? `active-${idx}-${currentIndex}` : `num-${idx}`
                    }
                    className="hcs-bullet-number"
                  >
                    {idx + 1}
                  </span>
                </div>
                <div
                  key={
                    isActive ? `label-${idx}-${currentIndex}` : `label-${idx}`
                  }
                  className="hcs-label"
                  title={item.name}
                >
                  {item.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="hcs-controls">
          <button
            className="hcs-btn"
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Previous category"
          >
            Previous
          </button>

          <div className="hcs-counter" aria-live="polite">
            {currentIndex + 1} / {total}
          </div>

          <button
            className="hcs-btn"
            onClick={next}
            disabled={currentIndex === total - 1}
            aria-label="Next category"
          >
            Next
          </button>
        </div>
      </div>

      <HCSStyles />
    </div>
  );
}

/** Inline CSS (scoped by class names) */
function HCSStyles() {
  return (
    <style>{`
/* Wrapper */
.hcs-wrapper {
  width: 100%;
  max-width: 960px;
  margin: 24px auto;
  padding: 16px 12px 20px;
  background: #0b0b0c;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

/* Empty state */
.hcs-empty {
  color: #ddd;
  margin: 0;
  text-align: center;
}

/* Base track line (behind steps) */
.hcs-track {
  position: absolute;
  left: 32px;
  right: 32px;
  top: 54px; /* aligns with bullets vertically */
  height: 3px;
  background: rgba(255,255,255,0.18);
  z-index: 0;
  border-radius: 2px;
}

/* Animated fill line */
.hcs-track-fill {
  position: absolute;
  left: 32px;
  top: 54px;
  height: 3px;
  background: #b9e018;
  z-index: 1;
  border-radius: 2px;
  transition: width 300ms ease-in-out;
}

/* Steps container */
.hcs-steps {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 8px;
  align-items: start;
  margin: 12px 24px 8px 24px;
  overflow-x: auto;
  padding: 8px 8px 0 8px;
}

/* Hide ugly scrollbar on webkit (still scrollable) */
.hcs-steps::-webkit-scrollbar {
  height: 8px;
}
.hcs-steps::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.12);
  border-radius: 6px;
}
.hcs-steps::-webkit-scrollbar-track {
  background: transparent;
}

/* Individual step */
.hcs-step {
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: center;
  color: #e6e6e6;
  outline: none;
}
.hcs-step:disabled {
  cursor: default;
}

/* Bullet (circle) */
.hcs-bullet {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin: 0 auto 6px auto;
  background: rgba(255,255,255,0.18);
  display: grid;
  place-items: center;
  transform-origin: center;
  transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;
  box-shadow: 0 0 0 rgba(185,224,24,0);
}

/* Bullet number */
.hcs-bullet-number {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  color: #111;
  opacity: 0.92;
}

/* Label text */
.hcs-label {
  font-size: 12px;
  line-height: 1.2;
  max-width: 120px;
  margin: 0 auto;
  color: #cfcfcf;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
  transform-origin: top center;
  transition: opacity 200ms ease;
}

/* Completed (left of current) */
.hcs-step--completed .hcs-bullet {
  background: #b9e018;
}
.hcs-step--completed .hcs-label {
  opacity: 0.9;
}

/* Active (current) */
.hcs-step--active .hcs-bullet {
  background: #b9e018;
  transform: scale(1.08);
  box-shadow: 0 0 12px rgba(185,224,24,0.6);
}
.hcs-step--active .hcs-label {
  opacity: 1;
  animation: hcsFadeIn 220ms ease;
}

/* Fade-in animation for number and label on active step */
.hcs-step--active .hcs-bullet-number {
  animation: hcsFadeIn 220ms ease, hcsPop 180ms ease;
}
@keyframes hcsFadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes hcsPop {
  0%   { transform: scale(0.92); }
  100% { transform: scale(1); }
}

/* Controls */
.hcs-controls {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
}
.hcs-btn {
  justify-self: start;
  background: #1a1a1d;
  color: #e9e9e9;
  border: 1px solid rgba(255,255,255,0.14);
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 600;
  transition: transform 120ms ease, background 200ms ease, border 200ms ease;
}
.hcs-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  background: #232327;
}
.hcs-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.hcs-controls .hcs-counter {
  justify-self: center;
  color: #f2f2f2;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.4px;
}
.hcs-controls .hcs-btn:last-child {
  justify-self: end;
}

/* Small screens */
@media (max-width: 520px) {
  .hcs-label {
    max-width: 80px;
    font-size: 11px;
  }
  .hcs-bullet {
    width: 30px;
    height: 30px;
  }
}
    `}</style>
  );
}

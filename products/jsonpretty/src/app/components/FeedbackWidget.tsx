"use client";

import { useState, useCallback } from "react";

type Sentiment = "positive" | "negative" | null;

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sentiment, setSentiment] = useState<Sentiment>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!sentiment) return;

    const feedback = {
      sentiment,
      message: message.trim() || null,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    // Store in localStorage for now (no backend yet)
    const existing = JSON.parse(localStorage.getItem("feedback") || "[]");
    existing.push(feedback);
    localStorage.setItem("feedback", JSON.stringify(existing));

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setSentiment(null);
      setMessage("");
    }, 2000);
  }, [sentiment, message]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 text-xs rounded-full bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] transition-all"
      >
        Feedback?
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg shadow-xl p-4">
      {submitted ? (
        <div className="text-center py-4">
          <div className="text-lg mb-1">Thanks!</div>
          <div className="text-xs text-[var(--text-secondary)]">Your feedback helps us improve.</div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">How is this tool?</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs"
            >
              &times;
            </button>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setSentiment("positive")}
              className={`flex-1 py-2 rounded-md text-sm border transition-all ${
                sentiment === "positive"
                  ? "bg-[var(--success)]/20 border-[var(--success)] text-[var(--success)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--success)]"
              }`}
            >
              👍 Good
            </button>
            <button
              onClick={() => setSentiment("negative")}
              className={`flex-1 py-2 rounded-md text-sm border transition-all ${
                sentiment === "negative"
                  ? "bg-[var(--error)]/20 border-[var(--error)] text-[var(--error)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--error)]"
              }`}
            >
              👎 Needs work
            </button>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us more (optional)..."
            className="w-full p-2 text-xs rounded-md bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] resize-none h-16 outline-none focus:border-[var(--accent)]"
          />

          <button
            onClick={handleSubmit}
            disabled={!sentiment}
            className="w-full mt-2 py-2 text-xs rounded-md bg-[var(--accent)] text-white font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--accent-hover)] transition-all"
          >
            Send Feedback
          </button>
        </>
      )}
    </div>
  );
}

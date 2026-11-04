"use client";

import { useState } from "react";

export default function CopyCode({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const label = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy command";

  return (
    <div className="copy-code">
      <code>{text}</code>
      <button className="copy-button" type="button" onClick={copyCommand} aria-label={label} title={label}>
        {status === "copied" ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></svg>
        )}
      </button>
      <span className="copy-status" role="status" aria-live="polite">{status === "copied" ? "Command copied." : status === "failed" ? "Could not copy. Select and copy the command." : ""}</span>
    </div>
  );
}

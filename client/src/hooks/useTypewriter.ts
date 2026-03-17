import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTypewriterOptions {
  segments: string[];
  typingSpeed?: number;
  segmentDelay?: number;
  startDelay?: number;
}

export const useTypewriter = ({
  segments,
  typingSpeed = 65,
  segmentDelay = 350,
  startDelay = 900,
}: UseTypewriterOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const segIdx = useRef(0);
  const charIdx = useRef(0);
  const paused = useRef(false);
  const fullText = useRef('');

  const startTyping = useCallback(() => {
    setHasStarted(true);
  }, []);

  useEffect(() => {
    const t = setTimeout(startTyping, startDelay);
    return () => clearTimeout(t);
  }, [startDelay, startTyping]);

  useEffect(() => {
    if (!hasStarted || isComplete) return;

    if (paused.current) {
      const t = setTimeout(() => {
        paused.current = false;
        segIdx.current += 1;
        charIdx.current = 0;
        // trigger re-render
        setDisplayedText(fullText.current);
      }, segmentDelay);
      return () => clearTimeout(t);
    }

    const seg = segments[segIdx.current];
    if (!seg) {
      setIsComplete(true);
      return;
    }

    if (charIdx.current < seg.length) {
      // Variable speed: slight random jitter for natural feel
      const jitter = Math.random() * 40 - 15; // -15 to +25ms
      const char = seg[charIdx.current];
      // Spaces type faster
      const speed = char === ' ' ? typingSpeed * 0.4 : typingSpeed + jitter;

      const t = setTimeout(() => {
        fullText.current += char;
        charIdx.current += 1;
        setDisplayedText(fullText.current);
      }, Math.max(speed, 25));
      return () => clearTimeout(t);
    } else {
      if (segIdx.current < segments.length - 1) {
        paused.current = true;
        // trigger re-render to enter pause branch
        setDisplayedText(fullText.current + '\u200B');
      } else {
        setIsComplete(true);
      }
    }
  }, [hasStarted, isComplete, displayedText, segments, typingSpeed, segmentDelay]);

  // Strip zero-width space used for re-render trigger
  const cleanText = displayedText.replace(/\u200B/g, '');

  return { displayedText: cleanText, isComplete, hasStarted };
};

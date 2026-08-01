import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CountdownTimer({ targetDate, eventTitle }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    // Parse targetDate string (e.g. "2026-08-13" or "2026-08-13T18:00:00")
    const target = new Date(targetDate.includes('T') ? targetDate : `${targetDate}T18:00:00`).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
        <Clock className="w-3.5 h-3.5" /> Event Completed
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-bold text-vardhaman-orange uppercase tracking-wider">
        <Clock className="w-4 h-4 animate-pulse text-vardhaman-orange" />
        <span>Event Starts In:</span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-slate-950/80 dark:bg-slate-900/90 border border-ieee-blue/40 rounded-xl p-2 shadow-inner">
          <div className="text-lg sm:text-xl font-black text-sky-400 leading-tight">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Days</div>
        </div>
        <div className="bg-slate-950/80 dark:bg-slate-900/90 border border-embs-purple/40 rounded-xl p-2 shadow-inner">
          <div className="text-lg sm:text-xl font-black text-purple-300 leading-tight">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Hours</div>
        </div>
        <div className="bg-slate-950/80 dark:bg-slate-900/90 border border-vardhaman-orange/40 rounded-xl p-2 shadow-inner">
          <div className="text-lg sm:text-xl font-black text-amber-300 leading-tight">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Mins</div>
        </div>
        <div className="bg-slate-950/80 dark:bg-slate-900/90 border border-emerald-500/40 rounded-xl p-2 shadow-inner">
          <div className="text-lg sm:text-xl font-black text-emerald-400 leading-tight">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Secs</div>
        </div>
      </div>
    </div>
  );
}

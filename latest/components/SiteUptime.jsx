"use client";

import { useState, useEffect, useRef } from "react";
// UPDATED: Removed Clock icon, as "Session Time" is gone
import {
  Globe,
  Zap,
  User,
  Monitor,
  Languages,
  History,
  Eye,
} from "lucide-react";

// --- Safe localStorage Helper Functions (no changes) ---
const safeGetStorage = (key) => {
  if (typeof window === "undefined") return null;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn(`Error reading from localStorage (${key}):`, error.message);
    return null;
  }
};

const safeSetStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage (${key}):`, error.message);
  }
};

// --- Helper function to format time (no changes) ---
// --- Helper function to format time (UPDATED) ---
const formatUptime = (totalSeconds) => {
  // Define time constants
  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(totalSeconds / SECONDS_IN_DAY);
  let remainingSeconds = totalSeconds % SECONDS_IN_DAY;

  const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
  remainingSeconds %= SECONDS_IN_HOUR;

  const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
  const seconds = remainingSeconds % SECONDS_IN_MINUTE;

  // --- Build the output string ---

  // 1. Always create the base time string `HH:MM:SS`
  const timeString = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  // 2. If there are days, prefix the time string with them
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ${timeString}`;
  }

  // 3. If no days, but total time is over an hour, show `HH:MM:SS`
  if (totalSeconds >= SECONDS_IN_HOUR) {
    return timeString;
  }

  // 4. If under an hour, show just `MM:SS`
  return [
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

// --- Helper function to format page load (no changes) ---
const formatLoadTime = (ms) => {
  if (ms === null) return "...";
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
};

export default function SiteUptime({ compact = false }) {
  // --- States for data that updates every second ---
  // REMOVED: sessionUptime state is gone.
  const [bdTime, setBdTime] = useState("--:--:--");
  const [visitorTime, setVisitorTime] = useState("--:--:--");
  const [totalUptime, setTotalUptime] = useState(0); // This is now the ONLY uptime state

  // --- States for data that is set only once ---
  const [pageLoadTime, setPageLoadTime] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [language, setLanguage] = useState(null);
  const [pageVisits, setPageVisits] = useState(0);

  // --- States for popover logic (no changes) ---
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    // --- 1. Set static data & page visit count ONCE ---
    setPageLoadTime(Math.round(performance.now()));
    setPlatform(navigator.platform || "Unknown");
    setLanguage(navigator.language || "Unknown");

    // Handle Page Visits
    const visits = safeGetStorage("habibullah:pageVisits") || 0;
    const newVisits = visits + 1;
    safeSetStorage("habibullah:pageVisits", newVisits);
    setPageVisits(newVisits);

    // UPDATED: Load initial total uptime and set it as the starting point
    const initialTotal = safeGetStorage("habibullah:totalUptime") || 0;
    setTotalUptime(initialTotal);

    // --- 2. This function runs every second ---
    const updateTimes = () => {
      // UPDATED: Only increments totalUptime
      setTotalUptime((prevTotal) => {
        const newTotal = prevTotal + 1;
        // Save to localStorage every 5 seconds
        if (newTotal % 5 === 0) {
          safeSetStorage("habibullah:totalUptime", newTotal);
        }
        return newTotal;
      });

      // Update BD and Visitor time
      const bdNow = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setBdTime(bdNow);
      const visitorNow = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setVisitorTime(visitorNow);
    };

    updateTimes(); // Run once immediately
    const interval = setInterval(updateTimes, 1000);

    // --- 3. Click-outside listener (no changes) ---
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // --- 4. Cleanup function (no changes) ---
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []); // The empty array [] means this effect runs only once on mount

  // popover positioning differs for compact (mobile) vs full (desktop)
  const popoverPositionClass = compact
    ? "absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
    : "absolute top-full right-0 mt-2"

  return (
    <div className="relative group" title="Session Info" ref={popoverRef}>
      {/* --- 1. The Visible Timer (now clickable) --- */}
      <div
        className={compact ? "flex items-center gap-2 text-sm font-mono text-muted-foreground cursor-pointer" : "flex items-center gap-3 text-xl font-mono text-muted-foreground cursor-pointer"}
        onClick={() => setIsPopoverOpen((prev) => !prev)}
      >
        <div className={`relative flex items-center justify-center ${compact ? 'w-4 h-4' : 'w-6 h-6'}`}>
          {/* inline style used to slightly reduce the dot when compact */}
          <div className="broadcast-dot" style={{ width: compact ? 6 : 8, height: compact ? 6 : 8 }} />
        </div>
        {/* UPDATED: Shows the single totalUptime state */}
        <span>{formatUptime(totalUptime)}</span>
      </div>

      {/* --- 2. The Hover Popover (Updated) --- */}
      <div
        className={`
          ${popoverPositionClass}
          z-60 max-w-[90vw] sm:w-56 ${compact ? 'p-2' : 'p-3'}
          bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl 
          text-xs text-muted-foreground
          transition-all duration-150 ease-in-out
          origin-top-right
          ${
            isPopoverOpen
              ? "scale-100 opacity-100 pointer-events-auto"
              : "scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto"
          }
        `}
      >
        <div className="space-y-2">
          {/* --- Host Info --- */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Globe className="w-3 h-3" />
              BD Local (GMT+6)
            </span>
            <span className="font-mono text-white">{bdTime}</span>
          </div>

          {/* REMOVED: "Session Time" row is gone */}

          {/* --- Divider --- */}
          <hr className="border-neutral-700/50 my-2" />

          {/* --- Visitor Info --- */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <User className="w-3 h-3" />
              Your Local
            </span>
            <span className="font-mono text-white">{visitorTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Monitor className="w-3 h-3" />
              Platform
            </span>
            <span className="font-mono text-white truncate">
              {platform || "..."}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Languages className="w-3 h-3" />
              Language
            </span>
            <span className="font-mono text-white truncate">
              {language || "..."}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Zap className="w-3 h-3" />
              Page Load
            </span>
            <span className="font-mono text-white">
              {formatLoadTime(pageLoadTime)}
            </span>
          </div>

          {/* --- LocalStorage Stats Divider --- */}
          <hr className="border-neutral-700/50 my-2" />

          {/* --- Total Uptime Row --- */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <History className="w-3 h-3" />
              Total Time
            </span>
            {/* UPDATED: Shows the single totalUptime state */}
            <span className="font-mono text-white">
              {formatUptime(totalUptime)}
            </span>
          </div>

          {/* --- Page Visits Row --- */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Eye className="w-3 h-3" />
              Page Visits
            </span>
            <span className="font-mono text-white">{pageVisits}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

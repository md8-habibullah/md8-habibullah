"use client"

import { useState, useEffect } from "react";
// Import new icons: Server, Zap, User
import { Clock, Globe, Server, Zap, User } from "lucide-react"; 

// Helper function to format the total seconds into HH:MM:SS
const formatUptime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];

  // Only show hours if it's more than 0
  if (hours > 0) {
    parts.push(hours.toString().padStart(2, '0'));
  }
  parts.push(minutes.toString().padStart(2, '0'));
  parts.push(seconds.toString().padStart(2, '0'));

  return parts.join(':');
};

export default function SiteUptime() {
  // --- States for data that updates every second ---
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [bdTime, setBdTime] = useState('--:--:--');
  const [visitorTime, setVisitorTime] = useState('--:--:--');

  // --- States for data that is set only once ---
  const [pageLoadTime, setPageLoadTime] = useState(null);
  const [visitorHostname, setVisitorHostname] = useState(null);


  useEffect(() => {
    // --- 1. Set static data once on component mount ---
    // `performance.now()` gives the time in ms since the page started loading
    setPageLoadTime(Math.round(performance.now())); 
    // `window.location.hostname` gets the current domain
    setVisitorHostname(window.location.hostname);

    // --- 2. This function will run every second ---
    const updateTimes = () => {
      // Update session uptime
      setUptimeSeconds(prev => prev + 1);

      // Get and update BD local time (GMT+6)
      const bdNow = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setBdTime(bdNow);

      // Get and update Visitor's local time
      const visitorNow = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setVisitorTime(visitorNow);
    };

    // Run once immediately on mount to fill data
    updateTimes(); 
    
    // Set up the 1-second interval
    const interval = setInterval(updateTimes, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []); // The empty array [] means this effect runs only once on mount

  return (
    <div className="relative group" title="Session Info">
      {/* --- 1. The Visible Timer --- */}
      <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground cursor-default">
        <span className="text-green-400">•</span> {/* Live indicator */ }
        <span>{formatUptime(uptimeSeconds)}</span>
      </div>

      {/* --- 2. The Hover Popover (Updated) --- */}
      <div className="
        absolute top-full right-0 mt-2 
        w-56 p-3 /* Made slightly wider */
        bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl 
        text-xs text-muted-foreground
        scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100
        transition-all duration-150 ease-in-out
        origin-top-right
        pointer-events-none
      ">
        <div className="space-y-2"> {/* Added more space */}
          
          {/* --- Host Info --- */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Globe className="w-3 h-3" />
              BD Local (GMT+6)
            </span>
            <span className="font-mono text-white">{bdTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Clock className="w-3 h-3" />
              Session Time
            </span>
            <span className="font-mono text-white">{formatUptime(uptimeSeconds)}</span>
          </div>

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
              <Server className="w-3 h-3" />
              Hostname
            </span>
            <span className="font-mono text-white truncate">{visitorHostname || '...'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Zap className="w-3 h-3" />
              Page Load
            </span>
            <span className="font-mono text-white">
              {pageLoadTime ? `${pageLoadTime} ms` : '...'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
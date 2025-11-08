"use client";

import { useState, useEffect } from "react";
// ... (keep all your imports)
import { Clock, Globe, Server, Zap, User, MapPin } from "lucide-react";

// ... (keep your formatUptime helper function)
const formatUptime = (totalSeconds) => {
  // ... (no changes here)
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [];
  if (hours > 0) parts.push(hours.toString().padStart(2, "0"));
  parts.push(minutes.toString().padStart(2, "0"));
  parts.push(seconds.toString().padStart(2, "0"));
  return parts.join(":");
};

export default function SiteUptime() {
  // ... (keep all your existing states)
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [bdTime, setBdTime] = useState("--:--:--");
  const [visitorTime, setVisitorTime] = useState("--:--:--");
  const [pageLoadTime, setPageLoadTime] = useState(null);
  const [visitorIp, setVisitorIp] = useState(null);
  const [visitorCountry, setVisitorCountry] = useState(null);
  const [ipInfoLoading, setIpInfoLoading] = useState(true);
  const [ipInfoError, setIpInfoError] = useState(false);

  useEffect(() => {
    // ... (keep the static data setup and the interval)
    setPageLoadTime(Math.round(performance.now()));

    const updateTimes = () => {
      setUptimeSeconds((prev) => prev + 1);

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
    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    // --- 3. UPDATED: Fetch Visitor IP Info ---
    const fetchIpInfo = async () => {
      setIpInfoLoading(true);
      setIpInfoError(false);
      try {
        // CHANGED: Fetch from your own API route!
        const response = await fetch("/api/ipinfo");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Check if our server sent back an error
        if (data.error) {
          throw new Error(data.error);
        }

        setVisitorIp(data.ip || "Unknown");
        setVisitorCountry(data.country_name || "Unknown");
      } catch (error) {
        console.error("Failed to fetch IP info:", error.message);
        setIpInfoError(true); // Set error state
      } finally {
        setIpInfoLoading(false); // Stop loading state
      }
    };
    fetchIpInfo(); // Call the async function

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  // ... (keep your IpInfoField helper component)
  const IpInfoField = ({ value }) => {
    if (ipInfoLoading) return <span className="font-mono text-white">...</span>;
    if (ipInfoError)
      return <span className="font-mono text-red-400">Unavailable</span>;
    return <span className="font-mono text-white truncate">{value}</span>;
  };

  // ... (keep your return JSX)
  // No changes needed in the JSX, it will all work.
  return (
    <div className="relative group" title="Session Info">
      {/* --- 1. The Visible Timer --- */}
      <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground cursor-default">
        <span className="text-green-400">•</span>
        <span>{formatUptime(uptimeSeconds)}</span>
      </div>

      {/* --- 2. The Hover Popover --- */}
      <div
        className="
        absolute top-full right-0 mt-2 
        w-56 p-3
        bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl 
        text-xs text-muted-foreground
        scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100
        transition-all duration-150 ease-in-out
        origin-top-right
        pointer-events-none
      "
      >
        <div className="space-y-2">
          {/* Host Info */}
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
            <span className="font-mono text-white">
              {formatUptime(uptimeSeconds)}
            </span>
          </div>

          <hr className="border-neutral-700/50 my-2" />

          {/* Visitor Info */}
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
              IP Address
            </span>
            <IpInfoField value={visitorIp} />
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <MapPin className="w-3 h-3" />
              Country
            </span>
            <IpInfoField value={visitorCountry} />
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 opacity-80">
              <Zap className="w-3 h-3" />
              Page Load
            </span>
            <span className="font-mono text-white">
              {pageLoadTime ? `${pageLoadTime} ms` : "..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

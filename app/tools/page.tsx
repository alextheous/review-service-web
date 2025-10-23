'use client';

import { useState } from 'react';

export default function ToolsPage() {
  const [usage, setUsage] = useState({
    streamingHours: 2,
    gamingHours: 1,
    workHours: 4,
    devices: 3
  });

  const estimateSpeed = () => {
    const base = 50;
    const streaming = usage.streamingHours * 25;
    const gaming = usage.gamingHours * 10;
    const work = usage.workHours * 5;
    const devices = usage.devices * 5;
    const total = base + streaming + gaming + work + devices;
    return Math.min(900, Math.max(50, Math.round(total / 10) * 10));
  };

  const estimatedSpeed = estimateSpeed();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Broadband Tools</h1>
        <p className="text-gray-600">Estimate your ideal internet speed based on your usage</p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Streaming (hrs/day)</label>
              <input
                type="range"
                min={0}
                max={8}
                value={usage.streamingHours}
                onChange={(e) => setUsage({ ...usage, streamingHours: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{usage.streamingHours} hours</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gaming (hrs/day)</label>
              <input
                type="range"
                min={0}
                max={6}
                value={usage.gamingHours}
                onChange={(e) => setUsage({ ...usage, gamingHours: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{usage.gamingHours} hours</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work/Study (hrs/day)</label>
              <input
                type="range"
                min={0}
                max={10}
                value={usage.workHours}
                onChange={(e) => setUsage({ ...usage, workHours: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{usage.workHours} hours</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Connected Devices</label>
              <input
                type="range"
                min={1}
                max={20}
                value={usage.devices}
                onChange={(e) => setUsage({ ...usage, devices: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600">{usage.devices} devices</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Plan</h3>
          <div className="text-6xl mb-4">⚙️</div>
          <p className="text-gray-700 mb-2">
            Based on your usage, we recommend a minimum download speed of:
          </p>
          <div className="text-3xl font-bold text-blue-600 mb-6">{estimatedSpeed} Mbps</div>
          <p className="text-gray-600">
            For 4K streaming and heavy gaming on multiple devices, consider 500 Mbps or faster.
          </p>
        </div>
      </div>
    </div>
  );
}

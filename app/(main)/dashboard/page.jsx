'use client';
import React from 'react';
import dynamic from 'next/dynamic';


const FeatureAssistants = dynamic(
  () => import('./_components/FeatureAssistants'),
  { ssr: false }
);

const History = dynamic(
  () => import('./_components/History'),
  { ssr: false }
);

const Feedback = dynamic(
  () => import('./_components/Feedback'),
  { ssr: false }
);

function Dashboard() {
  return (
    <div>
      <FeatureAssistants />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
        <History />
        <Feedback />
      </div>
    </div>
  );
}

export default Dashboard;

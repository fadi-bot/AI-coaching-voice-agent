import WorkspaceLayout from '../_components/WorkspaceLayout';
import { Button } from '../../../components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

const meditationCategories = [
  {
    name: 'Guided Meditation',
    description: 'Follow along with guided instructions',
    icon: '🧘',
    duration: '5-30 min'
  },
  {
    name: 'Breathing Exercises',
    description: 'Focus on your breath',
    icon: '🌬️',
    duration: '3-10 min'
  },
  {
    name: 'Body Scan',
    description: 'Progressive relaxation',
    icon: '👁️',
    duration: '10-20 min'
  },
  {
    name: 'Sleep Stories',
    description: 'Drift off to sleep',
    icon: '😴',
    duration: '15-45 min'
  },
  {
    name: 'Mindfulness',
    description: 'Stay present',
    icon: '🌿',
    duration: '5-20 min'
  },
  {
    name: 'Anxiety Relief',
    description: 'Calm your mind',
    icon: '🌊',
    duration: '5-15 min'
  },
];

const durations = [
  { label: '5 min', value: 5 },
  { label: '10 min', value: 10 },
  { label: '15 min', value: 15 },
  { label: '20 min', value: 20 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
];

export default function MeditationPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [backgroundSound, setBackgroundSound] = useState('none');

  return (
    <WorkspaceLayout 
      title="Meditation & Mindfulness"
      description="Find your calm and improve focus with guided sessions"
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose a Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {meditationCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedCategory?.name === category.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.description}</div>
                    <div className="text-xs text-gray-400 mt-1">{category.duration}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Duration</h3>
              <div className="flex flex-wrap gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => setSelectedDuration(duration.value)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedDuration === duration.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Background Sound</h3>
              <select
                value={backgroundSound}
                onChange={(e) => setBackgroundSound(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="none">No background sound</option>
                <option value="rain">Gentle Rain</option>
                <option value="ocean">Ocean Waves</option>
                <option value="forest">Forest Ambience</option>
                <option value="white-noise">White Noise</option>
                <option value="singing-bowl">Singing Bowl</option>
              </select>
            </div>

            <div className="pt-4">
              <Link 
                href={`/app/meditation/session?category=${encodeURIComponent(selectedCategory.name)}&duration=${selectedDuration || 10}&sound=${backgroundSound}`}
                className="block"
              >
                <Button className="w-full py-6 text-lg" size="lg">
                  Start {selectedCategory.name} Session
                </Button>
              </Link>
              
              <p className="text-sm text-gray-500 mt-2 text-center">
                Find a comfortable position and prepare to begin your {selectedDuration || 10}-minute session.
              </p>
            </div>
          </div>
        )}

        {!selectedCategory && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-2">New to Meditation?</h3>
            <p className="text-blue-700 mb-4">
              Start with a 5-minute guided session to learn the basics of meditation and mindfulness.
            </p>
            <Link href="/app/meditation/session?category=guided&duration=5">
              <Button variant="outline" className="text-blue-600 border-blue-300">
                Try Quick Start Guide
              </Button>
            </Link>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}

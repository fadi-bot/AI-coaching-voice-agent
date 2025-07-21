import WorkspaceLayout from '../_components/WorkspaceLayout';
import { Button } from '../../../components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

const languages = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

const proficiencyLevels = [
  { level: 'Beginner', description: 'Just starting out' },
  { level: 'Elementary', description: 'Basic phrases and vocabulary' },
  { level: 'Intermediate', description: 'Can hold simple conversations' },
  { level: 'Upper Intermediate', description: 'Comfortable in most situations' },
  { level: 'Advanced', description: 'Fluent with complex topics' },
];

export default function LearnLanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <WorkspaceLayout 
      title="Learn a New Language"
      description="Practice speaking and improve your language skills with AI tutors"
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose a Language</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang)}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedLanguage?.code === lang.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-4xl mb-2">{lang.flag}</div>
                <div className="font-medium">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedLanguage && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Your Level</h2>
            <div className="space-y-3">
              {proficiencyLevels.map((level, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLevel(level)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedLevel?.level === level.level
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium">{level.level}</div>
                  <div className="text-sm text-gray-500">{level.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedLanguage && selectedLevel && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Ready to Start Learning {selectedLanguage.name}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href={`/app/chat?type=language&lang=${selectedLanguage.code}&level=${encodeURIComponent(selectedLevel.level)}&mode=conversation`}
                className="block"
              >
                <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow h-full">
                  <h3 className="text-lg font-semibold mb-2">Practice Conversation</h3>
                  <p className="text-gray-600 mb-4">Have a natural conversation in {selectedLanguage.name} with our AI tutor</p>
                  <Button className="w-full">Start Conversation</Button>
                </div>
              </Link>
              <Link 
                href={`/app/chat?type=language&lang=${selectedLanguage.code}&level=${encodeURIComponent(selectedLevel.level)}&mode=lessons`}
                className="block"
              >
                <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow h-full">
                  <h3 className="text-lg font-semibold mb-2">Take a Lesson</h3>
                  <p className="text-gray-600 mb-4">Structured lessons to improve your {selectedLanguage.name} skills</p>
                  <Button className="w-full" variant="outline">View Lessons</Button>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}

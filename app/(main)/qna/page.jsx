import WorkspaceLayout from '../_components/WorkspaceLayout';
import { Button } from '../../../components/ui/button';
import { CoachingOptions } from '../../../services/Options';
import Image from 'next/image';
import Link from 'next/link';

export default function QnAPage() {
  const categories = [
    { name: 'Technical', icon: '💻' },
    { name: 'Behavioral', icon: '🧠' },
    { name: 'System Design', icon: '🏗️' },
    { name: 'Data Structures', icon: '📊' },
    { name: 'Algorithms', icon: '⚙️' },
    { name: 'Leadership', icon: '👥' },
  ];

  return (
    <WorkspaceLayout 
      title="Q&A Preparation"
      description="Practice common interview questions and get instant feedback"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Select a Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              href={`/app/chat?type=qna&category=${encodeURIComponent(category.name)}`}
              className="block"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center h-full flex flex-col items-center">
                <span className="text-4xl mb-2">{category.icon}</span>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Popular Questions</h2>
        <div className="space-y-4">
          {[
            "What is your greatest strength?",
            "Tell me about a challenge you faced and how you overcame it.",
            "Where do you see yourself in 5 years?",
            "Why do you want to work here?",
            "What is your greatest achievement?",
          ].map((question, index) => (
            <Link 
              key={index} 
              href={`/app/chat?type=qna&question=${encodeURIComponent(question)}`}
              className="block"
            >
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-800">{question}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Click to practice</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}

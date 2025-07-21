import WorkspaceLayout from '../_components/WorkspaceLayout';
import { Button } from '../../../components/ui/button';
import { CoachingOptions } from '../../../services/Options';
import Image from 'next/image';
import Link from 'next/link';

export default function MockInterviewPage() {
  return (
    <WorkspaceLayout 
      title="Mock Interview"
      description="Practice your interview skills with our AI interviewers"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {CoachingOptions.map((option, index) => (
          <Link 
            key={index} 
            href={`/app/chat?type=interview&role=${encodeURIComponent(option.role || option.name)}&expert=${encodeURIComponent(option.name)}`}
            className="block"
          >
            <div className='p-6 bg-secondary rounded-3xl flex flex-col items-center hover:scale-105 transition-all duration-300 h-full'>
              <div className='relative'>
                <Image 
                  src={option.icon} 
                  alt={option.name} 
                  height={120}
                  width={120}
                  className='h-[100px] w-[100px] hover:rotate-12 transition-all mb-4'
                />
                <div className='absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold'>
                  {index + 1}
                </div>
              </div>
              <h2 className='text-xl font-semibold text-center'>{option.role || option.name} Interview</h2>
              <p className='text-gray-500 text-sm mt-2 text-center'>Mock Interview</p>
              <Button className="mt-4 w-full">Start Interview</Button>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Interview Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-medium text-gray-800">Common Questions</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>• Tell me about yourself</li>
              <li>• Why should we hire you?</li>
              <li>• What are your strengths and weaknesses?</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-medium text-gray-800">Tips</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>• Research the company and role</li>
              <li>• Practice your answers</li>
              <li>• Prepare questions to ask</li>
              <li>• Dress appropriately</li>
            </ul>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

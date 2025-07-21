import WorkspaceLayout from '../_components/WorkspaceLayout';
import { Button } from '../../../components/ui/button';
import { CoachingOptions } from '../../../services/Options';
import Image from 'next/image';
import Link from 'next/link';

export default function TopicBaseLecturePage() {
  return (
    <WorkspaceLayout 
      title="Topic Base Lecture"
      description="Select an expert to start your learning session"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {CoachingOptions.map((option, index) => (
          <Link 
            key={index} 
            href={`/app/chat?type=topic&expert=${encodeURIComponent(option.name)}`}
            className="block"
          >
            <div className='p-6 bg-secondary rounded-3xl flex flex-col items-center hover:scale-105 transition-all duration-300 h-full'>
              <Image 
                src={option.icon} 
                alt={option.name} 
                height={120}
                width={120}
                className='h-[100px] w-[100px] hover:rotate-12 transition-all mb-4'
              />
              <h2 className='text-xl font-semibold text-center'>{option.name}</h2>
              <p className='text-gray-500 text-sm mt-2 text-center'>Topic Base Lecture</p>
              <Button className="mt-4 w-full">Start Session</Button>
            </div>
          </Link>
        ))}
      </div>
    </WorkspaceLayout>
  );
}

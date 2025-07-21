"use client"
import { CoachingOptions } from '../../../../services/Options'
import React from 'react'
import { useUser } from '@stackframe/stack'
import { Button } from '../../../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const featureLinks = {
  'Topic Base Lecture': '/app/topic-base-lecture',
  'Mock Interview': '/app/mock-interview',
  'Ques Ans Prep': '/app/qna',
  'Learn Language': '/app/learn-language',
  'Meditation': '/app/meditation'
};

function FeatureAssistants(){
    const user = useUser();

    return(
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className='font-medium text-gray-500'>My Workspace</h2>
                    <h2 className='text-3xl font-bold'>Welcome Back, {user?.displayName}</h2>
                </div>
                <Button className='text-white'>Profile</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
                {CoachingOptions.map((option, index) => {
                    const link = featureLinks[option.name] || '#';
                    return (
                        <Link href={link} key={index} className="block">
                            <div className='p-3 bg-secondary rounded-3xl flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 h-full min-h-[180px]'>
                                <Image 
                                    src={option.icon} 
                                    alt={option.name}
                                    height={150}
                                    width={150}
                                    className='h-[70px] w-[70px] hover:rotate-12 cursor-pointer transition-all'
                                />
                                <h2 className='mt-5 text-center'>{option.name}</h2>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default FeatureAssistants

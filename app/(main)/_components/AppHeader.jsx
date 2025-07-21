import { UserButton } from '@stackframe/stack'
import React from 'react'
import Image from 'next/image'

function AppHeader(){
    return(
        
    
<div className='p-3 shadow-sm flex justify-between items-center'>
    <Image src={"/logo.svg"} alt="logo"
    height={200}
    width={160}
    />
<UserButton/>

    </div>
)
}

export default AppHeader   
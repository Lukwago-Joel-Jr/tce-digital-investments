import React from 'react'
import Image from 'next/image'

function Books() {
  return (
    <div>
        <div className='bg-gray-100  h-auto md:h-screen my-5 md:my-0 flex flex-col justify-center items-center'>
         <div className='flex flex-col md:flex-row gap-5 md:gap-30'>
            <div className=' w-60'>

                <div className='rounded-2xl p-0'> 
                    <Image
                          src="/images/sandra-reading-bible.jpg"
                          alt="Digital Skills"
                          width={400}
                          height={600}
                          className="object-cover"
                        />
                </div>
                <div className='py-2'>
                
                <div className='flex flex-col gap-1'>
                
                <h1 className='text-2xl font-bold'>wealth build academy sandras bei seller</h1>
                
                <p className='text-sm'>wealth build academy sandras best seller</p>
                
                <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
                    I Need This
                </button>
                
                </div>
                
                </div>
            </div>

             <div className=' w-60'>

                <div className='rounded-2xl p-0'> 
                    <Image
                          src="/images/sandra-smile3.jpg"
                          alt="Digital Skills"
                          width={400}
                          height={600}
                          className="object-cover"
                        />
                </div>
                <div className='py-2'>
                
                <div className='flex flex-col gap-1'>
                
                <h1 className='text-2xl font-bold'>wealth build academy sandras bei seller</h1>
                
                <p className='text-sm'>wealth build academy sandras best seller</p>
                
                <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
                    I Need This
                </button>
                
                </div>
                
                </div>
            </div>
            
         </div>
        </div>
    </div>
  )
}

export default Books
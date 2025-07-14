import React from "react";
import Image from "next/image";

const About =()=>{
    return(
        <div>
            <div>
               <Image
                          src="/logo.png"
                          alt="Logo"
                          width={150}
                          height={150}
                          className="w-[90px] h-[90px] md:w-[150px] md:h-[150px]"
                        />
            </div>
        </div>
    )
}
export default About
import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import AOS from "aos"
import "aos/dist/aos.css"
export default function Contact() {
    useEffect(()=>{
        AOS.init()
    },[])
    return (
        <>
            <div className="absolute flex flex-col items-center justify-center  z-30 inset-0 overflow-y-scroll hide py-32" data-aos="fade-up-right">
                <h1 className="text-4xl mt-6 font-bold title-font mb-10 text-center text-white font-squid transition-all ease-in-out drop-shadow-[0_0_10px_#ff69b4]">Contact Us</h1>
                <img className='rounded-md lg:w-[600px] lg:h-[700px] md:w-[550px] md:h-[600px] sm:w-[450px] sm:h-[550px] max-sm:px-6 max-sm:rounded-lg max-sm:h-[550px]' src='/cardboard.jpeg' />
                <div className='absolute flex flex-col gap-6 items-center justify-center text-start lg:w-[550px] lg:h-[600px] md:w-[450px] sm:w-[400px] max-sm:w-[375px] max-sm:mt-10  lg:px-4'>
                    <span className='flex flex-col lg:mr-20 lg:pr-20 gap-6 md:mr-48 md:pr-28 max-sm:text-xs max-sm:mr-20  max-sm:pr-8'>
                        <h2 className='font-squid tracking-wide  text-black'> Email &ensp;
                            <i className="fa-solid fa-envelope"></i>
                        </h2>
                        <span className='font-outfit tracking-wide text-white ml-6 max-sm:ml-6  '>
                            <p className='mb-4'>gdg@sggs.ac.in</p>
                            <p className='mb-4'>swag@sggs.ac.in</p>
                        </span>
                    </span>
                    <span className='flex flex-col gap-6 max-sm:text-xs'>
                        <h2 className='font-squid tracking-wide  text-black '>Contacts &ensp;
                            <i className="fa-solid fa-tty"></i>
                        </h2>
                        <span className='font-outfit tracking-wide text-white ml-6 max-sm:ml-4'>
                            <p className='mb-4'>GDG on Campus SGGSIE&T Organiser :</p>
                            <p className='text-black mb-4'> Gajanan Palepwad (7757085531)</p>
                            <p className='mb-4'>SWAG President: </p>
                            <p className='text-black mb-4'>JayKumar Gupta (9322002291)</p>
                            <p className='mb-4'>GDG on Campus SGGSIE&T Web Lead : </p>
                            <p className='text-black mb-4'>Pranav Dhumale (8767293600)  </p>
                        </span>
                    </span>
                </div>

            </div>
            <Footer />
        </>
    )
}

import { useEffect } from 'react'
import Footer from '../components/Footer'
import AOS from "aos"
import "aos/dist/aos.css"
export default function Contact() {
    useEffect(()=>{
        AOS.init()
    },[])
    return (
        <>
            <div className="flex flex-col items-center justify-center z-3000 inset-0 overflow-y-scroll hide pt-28" data-aos="fade-up-right">
                <h1 className="text-4xl font-bold title-font mb-2 text-center text-white font-squid transition-all ease-in-out drop-shadow-[0_0_10px_#ff69b4]">Contact Us</h1>
                <div className="relative mt-4">
                    <img className='rounded-md object-contain lg:w-[800px] lg:h-[450px] md:w-[750px] md:h-[410px] sm:w-[600px] sm:h-[400px] max-sm:w-[550px] max-sm:h-[400px] max-sm:px-4 max-sm:rounded-lg' src='/pokedex.png' />
                    <div className='absolute top-[8%] left-[19%] flex flex-col gap-4 text-start lg:w-[500px] md:w-[400px] sm:w-[350px] max-sm:w-[250px] lg:left-[19%] md:left-[24%]'>
                        <span className='flex flex-col gap-2'>
                            <h2 className='font-squid tracking-wide text-center text-black lg:text-xl md:text-lg sm:text-base max-sm:text-sm'> Email &ensp;
                                <i className="fa-solid fa-envelope"></i>
                            </h2>
                            <span className=' w-56 self-center font-outfit tracking-wide text-yellow-500 lg:text-base md:text-sm sm:text-sm max-sm:text-xs p-3 border-2 border-yellow-500 rounded-lg bg-black/20 backdrop-blur-sm'>
                                <p className='mb-1 text-center'>gdg@sggs.ac.in</p>
                                <p className='mb-1 text-center'>swag@sggs.ac.in</p>
                            </span>
                        </span>
                        <span className='flex flex-col gap-2 mt-1'>
                            <h2 className='font-squid tracking-wide text-center text-black lg:text-xl md:text-lg sm:text-base max-sm:text-sm'>Contacts &ensp;
                                <i className="fa-solid fa-tty"></i>
                            </h2>
                            <span className='self-center w-[350px] font-outfit tracking-wide text-yellow-500 lg:text-base md:text-sm sm:text-sm max-sm:text-xs p-3 border-2 border-yellow-500 rounded-lg bg-black/20 backdrop-blur-sm'>
                                <p className='mb-1 text-center'>GDG on Campus SGGSIE&T Organiser:</p>
                                <p className='text-black mb-1 text-center'> Prachi Dafre (7057744394)</p>
                                <p className='mb-1 text-center'>SWAG President: </p>
                                <p className='text-black mb-1 text-center'>Yash Waghmare (9172858260)</p>
                                <p className='mb-1 text-center'>SWAG Vice President: </p>
                                <p className='text-black mb-1 text-center'>Khushwant Singh Mahajan (7020942799)  </p>
                            </span>
                        </span>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

import React from 'react'
import askmeidentity from "/askmeidentity.png"
import github from "/github.png"
import gdgpune from "/gdgpunewhite.png"
import nexus from "/NEXUS.png"
import scce from "/scce.png"
import swoc from "/SWOC.png"
export default function Sponsor() {
    return (
        <div className='absolute z-30 inset-0 overflow-y-scroll hide py-32'>
            <section className="text-gray-600 body-font" id="sponsor" >

                <h1 className="text-4xl font-bold title-font mb-10 text-center text-white font-squid transition-all ease-in-out hover:drop-shadow-[0_0_10px_#ff69b4]">Sponsers</h1>
                <div className="container px-4 py-24 mx-auto mb-0 max-sm:p-7">

                    <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid">Title Sponser</h1>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className=" object-fill object-center w-auto h-full block" src={askmeidentity} />
                            </a>

                        </div>

                    </div>
                </div>
            </section>

            <section className="text-gray-600 body-font">

                {/* Second Section without vertical gap */}
                <div className="container px-4 mx-auto mb-20 max-sm:p-7">
                    <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid">Diamond Sponsor</h1>
                    <div className="flex flex-wrap -m-4">


                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={github} />
                            </a>

                        </div>
                    </div>
                </div>
            </section>
            {/* 
<section className="text-gray-600 body-font">

<div className="container px-4 mx-auto mb-20 max-sm:p-7">
  <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid">Web Hosting Partner</h1>
  <div className="flex flex-wrap -m-4">


    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-50 rounded overflow-hidden">
        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
      </a>

    </div>
  </div>
</div>
</section> */}


            {/* <section className="text-gray-600 body-font">


<div className="container px-4 mx-auto mb-20 max-sm:p-7">
  <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid">Platform Partner</h1>
  <div className="flex flex-wrap -m-4">


    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-50 rounded overflow-hidden">
        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
      </a>

    </div>
  </div>
</div>
</section> */}

            <section className="text-gray-600 body-font">

                {/* Second Section without vertical gap */}
                <div className="container px-4 mx-auto mb-20 max-sm:p-7">
                    <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid ">Community Partners</h1>
                    <div className="flex flex-wrap -m-4">


                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src={gdgpune} />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={nexus} />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={scce} />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={swoc} />
                            </a>

                        </div>

                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden ">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/Black.png" />
                            </a>

                        </div>

                    </div>
                </div>
            </section>
            <section className="text-gray-600 body-font">
                <div className="container px-4 mx-auto mb-20 max-sm:p-7">
                    <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid  ">GDG on Campus Community Partners</h1>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/KBJ.png" />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/Xavier.png" />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/SIES.png" />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/Atharva.png" />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/SVECW.png" />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/MIT.png" />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/MGMCO.png" />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/nbnscoe.png" />
                            </a>

                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-50 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center mt-16 w-full h-full block" src="/icfai.png" />
                            </a>

                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

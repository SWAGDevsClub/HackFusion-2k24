import React from 'react'
import { useEffect ,useState} from 'react';
export default function SplashScreen({onEnd}) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    useEffect(() => {
        let timer;
        if (isVideoLoaded) {
            timer = setTimeout(onEnd, 7000);
        }
        return () => clearTimeout(timer);
    }, [isVideoLoaded, onEnd]);
    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };
    return (
        <div className='bg-black  h-screen flex items-center justify-center hide'>
            <div className=' h-screen flex items-center justify-center hide'>
                <video src="/webintro.mp4" className='w-screen scroll-auto hide' onLoadedData={handleVideoLoad} autoPlay muted>
                    Your browser does not support the video .
                </video>
                {!isVideoLoaded?
                 <iframe src='/loading.gif'/>:""}
            </div>
        </div>
    )
}

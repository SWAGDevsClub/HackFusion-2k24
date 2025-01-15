import React from 'react'
import { useEffect ,useState} from 'react';
export default function SplashScreen({onEnd}) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    useEffect(() => {
        let timer;
        if (isVideoLoaded) {
            timer = setTimeout(onEnd, 5000);
        }
        return () => clearTimeout(timer);
    }, [isVideoLoaded, onEnd]);
    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };
    return (
        <div className='bg-black  h-screen flex items-center justify-center'>
            <div className=' h-screen flex items-center justify-center'>
                <video src="/webintro.mp4" className='w-auto h-screen' onLoadedData={handleVideoLoad} autoPlay muted>
                    Your browser does not support the video .
                </video>
                {!isVideoLoaded?
                 <iframe src='/loading.gif'/>:""}
            </div>
        </div>
    )
}

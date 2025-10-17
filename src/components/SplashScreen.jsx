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
        <div className='fixed inset-0 bg-black w-screen h-screen overflow-hidden'>
            <div className='relative w-full h-full'>
                <video 
                    src="/webintro.mp4" 
                    className='absolute top-0 left-0 w-full h-full object-cover'
                    onLoadedData={handleVideoLoad} 
                    autoPlay 
                    muted
                >
                    Your browser does not support the video.
                </video>
                {!isVideoLoaded && 
                    <div className="absolute inset-0 flex items-center justify-center">
                        <iframe src='/loading.gif' className="w-24 h-24"/>
                    </div>
                }
            </div>
        </div>
    )
}

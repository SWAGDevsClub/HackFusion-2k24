import React from 'react'
import { useEffect ,useState} from 'react';
export default function SplashScreen({onEnd}) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    
    // Preload critical assets while splash screen is showing
    useEffect(() => {
        // Preload images
        const imagesToPreload = [
            '/hero.png',
            '/hero-img2.png',
            '/hero-img3.png',
            '/first.png',
            '/second.png',
            '/third.png',
            '/logon.png',
            '/hero-element1.webp',
            '/hero-element2.png',
            '/hero-element3.png',
            '/swag_white.png',
            '/GDG_White_logo.png',
            '/footer-img.png',
            '/pokedex.png',
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        // Preload videos
        const videosToPreload = ['/intro2025.mp4'];
        videosToPreload.forEach(src => {
            const video = document.createElement('video');
            video.src = src;
            video.preload = 'auto';
        });
    }, []);
    
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
        <div className='bg-black h-screen flex items-center justify-center hide overflow-hidden'>
            <div className='h-screen w-screen flex items-center justify-center hide overflow-hidden'>
                <video src="/webintro.mp4" className='w-full h-full lg:object-cover sm:object-contain hide' onLoadedData={handleVideoLoad} autoPlay muted>
                    Your browser does not support the video .
                </video>
                {!isVideoLoaded?
                 <iframe src='/loading.gif'/>:""}
            </div>
        </div>
    )
}

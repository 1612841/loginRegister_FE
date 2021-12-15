import React from 'react';
import './Home.scss';

function Home() {
    return (
        <div className='home w-100vw h-100vh d-flex align-items-center justify-content-center'>
            <iframe className='video-bg' src="https://www.youtube.com/embed/YlGsuRAUdG8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
}

export default Home;

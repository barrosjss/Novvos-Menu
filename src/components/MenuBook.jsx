import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            {props.children}
        </div>
    );
});

export default function MenuBook() {
    // In a real scenario, we might fetch these or list them.
    // For now, we'll assume 4 pages exist in public/menu/
    // We can add a fallback if images fail to load.
    const [pages, setPages] = useState([
        '/menu/page1.webp',
        '/menu/page2.webp',
        '/menu/page3.webp',
        '/menu/page4.webp',
        '/menu/page5.webp',
        '/menu/page6.webp',
        '/menu/page7.webp',
        '/menu/page8.webp'
    ]);

    // Responsive dimensions
    // Mobile-first: maximize height, keep width reasonable
    const width = window.innerWidth > 600 ? 450 : window.innerWidth;
    const height = window.innerHeight > 800 ? 700 : window.innerHeight;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <HTMLFlipBook
                width={width}
                height={height}
                showCover={true}
                mobileScrollSupport={true}
                className="flip-book"
            >
                {pages.map((src, index) => (
                    <Page key={index} number={index + 1}>
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <img
                                src={src}
                                alt={`Page ${index + 1}`}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;height:100%;color:white;text-align:center;padding:20px;">
                     <h2>Page ${index + 1}</h2>
                     <p>Image not found.<br/>Place ${src} in public folder.</p>
                   </div>`;
                                }}
                            />
                        </div>
                    </Page>
                ))}
            </HTMLFlipBook>
        </div>
    );
}

// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-f164b40cd7c6863996c9ec4da638c7c6');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/f164b40cd7c6863996c9ec4da638c7c6/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/a8/17/e6/a817e64528fc30fbb2d6cc720d28d0b8.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="c73a0e19990f3f1ff44e5390d71d2008"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/c7/3a/0e/c73a0e19990f3f1ff44e5390d71d2008.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}
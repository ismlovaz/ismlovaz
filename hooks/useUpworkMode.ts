"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useUpworkMode = () => {
    const searchParams = useSearchParams();
    const [isUpworkMode, setIsUpworkMode] = useState(false);

    useEffect(() => {
        // Check if the 'source' query parameter is 'upwork'
        const source = searchParams.get('source');
        if (source === 'upwork') {
            setIsUpworkMode(true);
            // Persist in session storage so it persists across navigation
            sessionStorage.setItem('upworkMode', 'true');
        } else {
            // Check session storage in case we navigated away and back
            const storedMode = sessionStorage.getItem('upworkMode');
            if (storedMode === 'true') {
                setIsUpworkMode(true);
            }
        }
    }, [searchParams]);

    return isUpworkMode;
};

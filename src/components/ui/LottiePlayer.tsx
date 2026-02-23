import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

export interface LottiePlayerHandle {
    goToFrame: (frame: number) => void;
    totalFrames: number;
    isReady: boolean;
}

interface LottiePlayerProps {
    animationData: unknown;
    className?: string;
    autoplay?: boolean;
    loop?: boolean;
}

export const LottiePlayer = forwardRef<LottiePlayerHandle, LottiePlayerProps>(
    ({ animationData, className, autoplay = true, loop = true }, ref) => {
        const lottieRef = useRef<LottieRefCurrentProps>(null);
        const [totalFrames, setTotalFrames] = useState(0);
        const [ready, setReady] = useState(false);

        const handleDOMLoaded = useCallback(() => {
            if (lottieRef.current) {
                const frames = lottieRef.current.getDuration(true) as number;
                setTotalFrames(frames || 0);
                setReady(true);
            }
        }, []);

        useImperativeHandle(ref, () => ({
            goToFrame: (frame: number) => {
                if (lottieRef.current && ready) {
                    lottieRef.current.goToAndStop(frame, true);
                }
            },
            totalFrames,
            isReady: ready,
        }), [totalFrames, ready]);

        if (!animationData) return <div className={className} />;

        return (
            <div className={className}>
                <Lottie
                    lottieRef={lottieRef}
                    animationData={animationData}
                    autoplay={autoplay}
                    loop={loop}
                    onDOMLoaded={handleDOMLoaded}
                />
            </div>
        );
    }
);

LottiePlayer.displayName = "LottiePlayer";

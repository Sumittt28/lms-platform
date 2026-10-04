import { useEffect, useRef } from 'react';
import Player from '@vimeo/player';
import { Lock } from 'lucide-react';

// How often we're willing to send a progress update to the backend while
// the video is playing. Vimeo's 'timeupdate' event fires multiple times a
// second, and hammering the API that often would be wasteful and noisy.
const PROGRESS_REPORT_INTERVAL_SECONDS = 5;

// A video counts as "completed" once the viewer has watched this fraction
// of it. Using a threshold instead of requiring exactly 100% accounts for
// people who stop a second or two before the very end.
const COMPLETION_THRESHOLD = 0.9;

const VideoPlayer = ({ videoId, vimeoVideoId, isLocked, onProgress }) => {
  const iframeContainerRef = useRef(null);
  const playerRef = useRef(null);
  const lastReportedSecondRef = useRef(0);

  useEffect(() => {
    if (isLocked || !iframeContainerRef.current) {
      return undefined;
    }

    const player = new Player(iframeContainerRef.current, {
      id: vimeoVideoId,
      responsive: true,
    });
    playerRef.current = player;
    lastReportedSecondRef.current = 0;

    const handleTimeUpdate = ({ seconds, duration }) => {
      if (!onProgress || !duration) return;

      const secondsSinceLastReport = seconds - lastReportedSecondRef.current;
      const isNearEnd = duration - seconds <= 1;

      if (secondsSinceLastReport >= PROGRESS_REPORT_INTERVAL_SECONDS || isNearEnd) {
        lastReportedSecondRef.current = seconds;
        const isCompleted = seconds / duration >= COMPLETION_THRESHOLD;
        onProgress(videoId, Math.floor(seconds), isCompleted);
      }
    };

    const handleEnded = () => {
      if (!onProgress) return;
      player.getDuration().then((duration) => {
        onProgress(videoId, Math.floor(duration), true);
      });
    };

    player.on('timeupdate', handleTimeUpdate);
    player.on('ended', handleEnded);

    return () => {
      player.off('timeupdate', handleTimeUpdate);
      player.off('ended', handleEnded);
      player.destroy().catch(() => {
        // Player may already be torn down (e.g. fast video switching); safe to ignore.
      });
      playerRef.current = null;
    };
    // Re-create the player whenever the video or lock state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vimeoVideoId, isLocked, videoId]);

  if (isLocked) {
    return (
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-white">
          <Lock className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm opacity-75">Enroll to watch this video</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden" ref={iframeContainerRef} />
  );
};

export default VideoPlayer;

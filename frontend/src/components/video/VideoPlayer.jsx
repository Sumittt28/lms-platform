import { useState, useEffect, useRef } from 'react';
import { Play, Lock } from 'lucide-react';

const VideoPlayer = ({ vimeoVideoId, isLocked, onProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=0`}
        className="w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Course Video"
      />
    </div>
  );
};

export default VideoPlayer;

import { Play, Lock, CheckCircle } from 'lucide-react';

const VideoList = ({ videos, currentVideoId, onSelectVideo, isEnrolled }) => {
  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      {videos.map((video, index) => {
        const isLocked = video.isLocked && !video.isPreview;
        const isActive = video.id === currentVideoId;

        return (
          <button
            key={video.id}
            onClick={() => !isLocked && onSelectVideo(video)}
            disabled={isLocked}
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg text-left
              transition-colors
              ${isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}
              ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
            `}>
              {isLocked ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                {index + 1}. {video.title}
              </p>
              <p className="text-xs text-gray-500">
                {video.isPreview && <span className="text-green-600 mr-2">Preview</span>}
                {formatDuration(video.durationSeconds)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default VideoList;

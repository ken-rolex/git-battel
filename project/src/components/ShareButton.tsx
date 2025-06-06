import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareButtonProps {
  usernames: string[];
}

const ShareButton: React.FC<ShareButtonProps> = ({ usernames }) => {
  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('users', usernames.join(','));
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'GitHub Profile Battle',
          text: 'Check out this GitHub profile comparison!',
          url: url.toString(),
        });
      } else {
        await navigator.clipboard.writeText(url.toString());
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      disabled={usernames.length === 0}
    >
      <Share2 className="h-5 w-5" />
      Share
    </button>
  );
};

export default ShareButton;
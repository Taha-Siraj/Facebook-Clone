import React, { useState } from "react";
import { FaRegThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";

const storiesData = [
  { id: 1, name: "Ali Khan", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { id: 2, name: "Ayesha Siddiqui", img: "https://randomuser.me/api/portraits/women/25.jpg" },
  { id: 3, name: "Bilal Ahmed", img: "https://randomuser.me/api/portraits/men/35.jpg" },
  { id: 4, name: "Hira Fatima", img: "https://randomuser.me/api/portraits/women/45.jpg" },
];

const initialPostsData = [
  {
    id: 1,
    user: "Ali Khan",
    userImg: "https://randomuser.me/api/portraits/men/15.jpg",
    time: "1 hr ago",
    text: "Lahore ki shaam aur Badshahi Masjid ka nazara! ❤️🇵🇰",
    postImg: "https://rb.gy/ylgiyl",
    likes: 250,
    comments: 40,
  },
  {
    id: 2,
    user: "Ayesha Siddiqui",
    userImg: "https://randomuser.me/api/portraits/women/25.jpg",
    time: "3 hrs ago",
    text: "Karachi ki biryani... koi muqabla nahi! 😍🍛",
    postImg: "https://rb.gy/mujo59",
    likes: 320,
    comments: 75,
  },
  {
    id: 3,
    user: "Bilal Ahmed",
    userImg: "https://randomuser.me/api/portraits/men/35.jpg",
    time: "5 hrs ago",
    text: "Islamabad ke Margalla Hills ki hawa hi alag hai! 🌿⛰️",
    postImg: "https://rb.gy/d3zjyv",
    likes: 180,
    comments: 30,
  },
  {
    id: 4,
    user: "Hira Fatima",
    userImg: "https://randomuser.me/api/portraits/women/45.jpg",
    time: "1 day ago",
    text: "Cricket ka josh, PSL ka mahol! 🏏🔥",
    postImg: "https://rb.gy/oaaqzv",
    likes: 450,
    comments: 90,
  },
];

const StoryCard = ({ story }) => (
  <div className="relative w-24 h-40 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105">
    <img 
      src={story.img} 
      alt={`${story.name}'s story`}
      className="w-full h-full object-cover"
      onError={(e) => e.target.src = "https://via.placeholder.com/150"}
    />
    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
      <span className="text-white text-sm font-medium truncate block">{story.name}</span>
    </div>
  </div>
);

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 transition-all hover:shadow-lg">
      <div className="flex items-center gap-x-3">
        <img 
          src={post.userImg} 
          alt={`${post.user}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{post.user}</h3>
          <span className="text-sm text-gray-500">{post.time}</span>
        </div>
      </div>

      <p className="mt-3 text-gray-800 leading-relaxed">{post.text}</p>
      {post.postImg && (
        <img 
          src={post.postImg} 
          alt={`${post.user}'s post`}
          className="w-full mt-3 rounded-lg object-cover max-h-96"
          loading="lazy"
        />
      )}

      <div className="flex justify-between items-center text-gray-600 mt-3 pt-3 border-t">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-x-2 hover:text-blue-500 transition-colors ${isLiked ? 'text-blue-500' : ''}`}
        >
          <FaRegThumbsUp /> {likes}
        </button>
        <button className="flex items-center gap-x-2 hover:text-blue-500 transition-colors">
          <FaRegComment /> {post.comments}
        </button>
        <button className="flex items-center gap-x-2 hover:text-blue-500 transition-colors">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [postText, setPostText] = useState("");

  return (
    <div className="flex-1 max-w-2xl mx-auto py-4 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
      {/* Stories Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mx-4">
        <div className="flex gap-x-3 overflow-x-auto pb-2">
          {storiesData.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>

      {/* Create Post Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4 mx-4">
        <div className="flex items-center gap-x-3">
          <img 
            src="https://i.pravatar.cc/40" 
            alt="Current user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t">
          <button className="flex items-center gap-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-colors">
            <RiVideoAddFill className="text-red-500 text-xl" /> 
            <span>Live Video</span>
          </button>
          <button className="flex items-center gap-x-2 text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-colors">
            <MdPhotoLibrary className="text-green-500 text-xl" /> 
            <span>Photo/Video</span>
          </button>
        </div>
      </div>

      <div className="mt-4 mx-4">
        {initialPostsData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
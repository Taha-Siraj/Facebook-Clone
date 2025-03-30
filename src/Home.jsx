import React from "react";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";

// Stories Data (Pakistani Users)
const storiesData = [
  { id: 1, name: "Ali Khan", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { id: 2, name: "Ayesha Siddiqui", img: "https://randomuser.me/api/portraits/women/25.jpg" },
  { id: 3, name: "Bilal Ahmed", img: "https://randomuser.me/api/portraits/men/35.jpg" },
  { id: 4, name: "Hira Fatima", img: "https://randomuser.me/api/portraits/women/45.jpg" },
];

const postsData = [
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

const Home = () => {
  return (
    <div className="flex-1 max-w-[600px] mx-auto h-screen overflow-y-auto scrollbar-hide">
      {/* Stories Section */}
      <div className="flex gap-x-3 p-4 overflow-x-auto">
        {storiesData.map((story) => (
          <div
            key={story.id}
            className="w-24 h-36 rounded-xl overflow-hidden bg-gray-200 border-2 border-blue-500 cursor-pointer"
          >
            <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Create Post Box */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-x-3">
          <img src="https://i.pravatar.cc/40" alt="User" className="w-10 h-10 rounded-full" />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none"
          />
        </div>
        <div className="flex justify-between mt-3">
          <button className="flex items-center gap-x-2 text-gray-600">
            <RiVideoAddFill className="text-red-500" /> Live Video
          </button>
          <button className="flex items-center gap-x-2 text-gray-600">
            <MdPhotoLibrary className="text-green-500" /> Photo/Video
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-4">
        {postsData.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            {/* Post Header */}
            <div className="flex items-center gap-x-3">
              <img src={post.userImg} alt={post.user} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold">{post.user}</h3>
                <span className="text-sm text-gray-500">{post.time}</span>
              </div>
            </div>

            {/* Post Content */}
            <p className="mt-2 text-gray-800">{post.text}</p>
            <img src={post.postImg} alt="Post" className="w-full mt-2 rounded-lg" />

            {/* Post Actions */}
            <div className="flex justify-between items-center text-gray-600 mt-2">
              <button className="flex items-center gap-x-1">
                <FaRegThumbsUp /> {post.likes}
              </button>
              <button className="flex items-center gap-x-1">
                <FaRegComment /> {post.comments}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

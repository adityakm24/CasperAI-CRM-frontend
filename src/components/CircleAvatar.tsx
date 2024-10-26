import React from "react";

interface CircleAvatarProps {
  letter: string;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({ letter }) => {
  return (
    <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full bg-gray-500 text-white flex items-center justify-center overflow-hidden">
      <span>{letter}</span>
    </div>
  );
};

export default CircleAvatar;

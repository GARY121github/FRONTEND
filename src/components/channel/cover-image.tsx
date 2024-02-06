import React from "react";

interface props {
  coverImage: string | undefined;
  edit: boolean;
}

const CoverImage: React.FC<props> = ({ coverImage, edit }) => {
  return (
    <div>
      {" "}
      <img src={coverImage} alt="cover" className="w-full h-60 object-cover" />
      {edit ? <h1>Edit</h1> : null}
    </div>
  );
};

export default CoverImage;

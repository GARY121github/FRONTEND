import React from "react";
import Layout from "@/components/Layout/pages-layout";
import VideoList from "@/components/video/video-list";

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  channel: {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
  };
  category: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };
}

const History = () => {
  const data: Array<Video> = [
    {
      id: 1,
      title: "JavaScript Fundamentals: Variables and Data Types",
      description:
        "Learn the basics of JavaScript, including variables, data types, and how to use them in your programs.",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: 1,
      title: "Video Title",
      description: "Video Description",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: 1,
      title: "Video Title",
      description: "Video Description",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: 1,
      title: "Video Title",
      description: "Video Description",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: 1,
      title: "Video Title",
      description: "Video Description",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: 1,
      title: "Video Title",
      description: "Video Description",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: 1,
      title: "Video Title",
      description: "Video Description",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: 1,
      title: "Video Title",
      description: "Video Description",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
    {
      id: 1,
      title: "Video Title",
      description: "Video Description",
      url: "https://www.youtube.com/watch?v=V9XeyBd_IuA",
      thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
      duration: "00:00:00",
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
      channel: {
        id: 1,
        name: "Channel Name",
        description: "Channel Description",
        thumbnail: "https://i.ytimg.com/vi/V9XeyBd_IuA/maxresdefault.jpg",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      category: {
        id: 1,
        name: "Category Name",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
      user: {
        id: 1,
        name: "Gary Stark",
        email: "harshprakash@gmail.com",
        avatar: "https://github.com/shadcn.png",
      },
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4 p-4">
        {data.map((video: Video) => (
          <VideoList video={video} key={video.id} />
        ))}
      </div>
    </Layout>
  );
};

export default History;

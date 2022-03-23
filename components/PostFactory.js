import React, { Component, useEffect, useState } from "react";
import {
  firebase,
  retrieveAndBundlePosts,
  retrieveUserData,
} from "../modules/firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
// Initialize Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Post from "../components/post";

export default class PostFactory extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: false, loaded: false, posts: [], uploading: [] };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.loaded && !this.state.ready) {
        this.setState({ ready: true });
      } else if (!this.state.loaded) {
        this.props.user != null
          ? retrieve(this.props.user).then((docs) => {
              PostLoader(docs.docs).then((posts) => {
                this.setState({ posts: posts, loaded: true });
              });
            })
          : retrieve(null, this.props.location).then((docs) => {
              PostLoader(docs.docs).then((posts) => {
                this.setState({ posts: posts, loaded: true });
              });
            });
      }
    }, 2000);
  }

  render() {
    function addUploading(post) {
      const existingUploads = this.state.uploading;
      const updatedUploads = existingUploads.push(post);
      this.setState({ uploading: updatedUploads });
    }
    if (!this.state.ready) {
      return (
        <div className={this.props.className} style={this.props.style}>
          <div className="h-1/6 grid grid-cols-2 animate-pulse">
            <div className="col-span-1 pl-3 pt-3 flex flex-row items-center">
              <div className="mr-3">
                <svg height="50" width="50">
                  <circle cx="25" cy="25" r="20" fill="gray" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Loading content...</div>
              </div>
            </div>
          </div>
          <div className="h-4/6 p-3">
            <p className="text-gray-400 text-sm">
              TIP: Sometimes, careful decisions are just as effective as fast
              response. When possible, calm yourself down and analyze every
              possible approach to the situation.
              <br />
            </p>
          </div>
        </div>
      );
    } else {
      if (this.state.posts.length == 0) {
        return (
          <div className="text-gray-400 text-md p-3">
            Seems like there are no reports in your location yet. If you've set
            the wrong location, you can change it{" "}
            <a href="/settings" className="text-gray-600 hover:text-black">
              here
            </a>
            . Otherwise, you can try to reload the page to check if any new
            posts have been made.
          </div>
        );
      }
      return (
        <PostRenderer
          posts={this.state.posts}
          user={this.props.user}
          mini={this.props.mini}
        />
      );
    }
  }
}

/*if (this.state.ready) {
      return <>Loaded</>;
    } else {
      retrieve(this.props.user).then((snap) => {
        snap.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
        this.setState({ ready: true });
      });
      return <>Loading...</>;
    } */
async function retrieve(user, location) {
  if (user != null) {
    const db = getFirestore();
    const querySnapshot = await getDocs(
      collection(db, "posts", `location/${user.city_id}`)
    );
    return querySnapshot;
  } else {
    const db = getFirestore();
    const querySnapshot = await getDocs(
      collection(db, "posts", `location/${location}`)
    );
    return querySnapshot;
  }
}

async function PostLoader(posts) {
  let data_list = [];
  posts.forEach((doc) => {
    if (doc.id == 0) {
    } else {
      const post = doc.data();
      post.id = doc.id;
      data_list.push(post);
    }
  });
  if (data_list.length > 0)
    await retrieveAndBundlePosts(data_list).then((data) => {
      data_list = data;
    });
  return data_list;
}

const PostRenderer = (props) => {
  const posts = props.posts;
  const post_components = [];
  posts.forEach((post) => {
    post_components.unshift(
      <Post post={post} user={props.user} mini={props.mini} />
    );
  });
  return (
    <div className="flex flex-col mt-5">
      <div
        className="space-y-5 pb-5 overflow-y-auto no-scrollbar"
        style={{ maxHeight: "720px" }}
      >
        {post_components}
      </div>
    </div>
  );
};

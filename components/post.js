import React, { Component, forwardRef, useEffect, useState } from "react";
import { pushComment, retrieveUserData } from "../modules/firebase";
import { getFile } from "../pages/api/UploadFile";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsModal: false,
      comments: this.props.post.comments,
      points: this.props.post.upvotes - this.props.post.downvotes,
      previous_point: this.props.post.upvotes - this.props.post.downvotes,
      settingsModal: false,
    };
    this.commentRefresh = React.createRef;
  }

  addComment(comment) {
    let newComments = this.state.comments;
    newComments.push(comment);
    this.setState({ comments: newComments });
    pushComment(this.props.post, comment);
    this.commentRefresh.current(comment);
  }
  render() {
    console.log("Post data: ", this.props.post);
    const user_picture =
      this.props.post.owner_data.picture == ""
        ? "/Profile.svg"
        : this.props.post.owner_data.pictureURL;
    return (
      <div className="flex bg-white flex-col mb-3 rounded-lg shadow relative">
        <div className="h-1/6 flex flex-row relative group">
          {this.state.settingsModal && !this.props.mini ? (
            <div className="absolute z-50 right-0 mr-3 mt-3">
              <div className="flex justify-end mb-2">
                <button
                  className="p-1 rounded-full bg-white shadow hover:scale-125 transition-all duration-400 justify-end"
                  onClick={() =>
                    this.setState({ settingsModal: !this.state.settingsModal })
                  }
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                      stroke="#111827"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-3 bg-white shadow-lg rounded-lg flex flex-col font-bold">
                <a className="py-2">Report this post</a>
                {this.props.post.owner_data.id == this.props.user.id ? (
                  <a className="py-2">Delete post</a>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : !this.props.mini ? (
            <button
              className="hidden group-hover:block absolute p-1 rounded-full bg-white z-50 right-0 mr-3 mt-3 shadow hover:scale-125 transition-all duration-400"
              onClick={() =>
                this.setState({ settingsModal: !this.state.settingsModal })
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          ) : (
            <></>
          )}
          <div className="p-3 flex flex-row items-center space-x-2">
            <Image
              className="grid flex-none bg-gray-400 rounded-full"
              src={user_picture}
              width={30}
              height={30}
            />
            <div>
              <h3 className="text-sm">
                {`${this.props.post.owner_data.fName} 
                  ${this.props.post.owner_data.lName}`}
              </h3>
              <p className="text-xs">
                {determineType(
                  this.props.post.owner_data.points.post_points +
                    this.props.post.owner_data.points.comment_points
                )}{" "}
                <b>| {convertCityIDtoCity(this.props.post.city_id)}</b>{" "}
              </p>
            </div>
          </div>
          {postPoints(this.state.points)}
        </div>
        <div className="h-4/6">
          <Content data={this.props.post} />
        </div>
        <div className="h-1/6 grid grid-cols-3 bg-gray-300 rounded-b-lg">
          {this.state.upvote ? (
            <button
              className="col-span-1 py-4 font-bold bg-green-600 text-white transition-all duration-500 rounded-bl-lg flex justify-center"
              onClick={() =>
                this.setState({
                  upvote: false,
                  points: this.state.previous_point,
                })
              }
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:hidden"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.1151 0C15.6439 0 20.1311 4.49 20.1311 10L20.1272 10.2798C19.9787 15.6706 15.5502 20 10.1151 20C4.59629 20 0.0991211 15.52 0.0991211 10C0.0991211 4.49 4.59629 0 10.1151 0ZM6.10865 11.98C6.40913 12.27 6.87988 12.27 7.17035 11.97L10.115 9.02002L13.0597 11.97C13.3502 12.27 13.831 12.27 14.1214 11.98C14.4219 11.68 14.4219 11.21 14.1214 10.92L10.6459 7.43002C10.5057 7.29002 10.3154 7.21002 10.115 7.21002C9.91472 7.21002 9.72442 7.29002 9.5842 7.43002L6.10865 10.92C5.95841 11.06 5.8883 11.25 5.8883 11.44C5.8883 11.64 5.95841 11.83 6.10865 11.98Z"
                  fill="white"
                />
              </svg>
              <p className="hidden lg:block">Upvote</p>
            </button>
          ) : (
            <button
              className="col-span-1 py-4 font-bold lg:hover:text-white transition-all lg:hover:bg-green-600 duration-500 lg:hover:rounded-bl-lg flex justify-center"
              onClick={() =>
                this.setState({
                  upvote: true,
                  downvote: false,
                  previous_point: this.state.points,
                  points: this.state.points + 1,
                })
              }
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:hidden"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.1151 0C15.6439 0 20.1311 4.49 20.1311 10L20.1272 10.2798C19.9787 15.6706 15.5502 20 10.1151 20C4.59629 20 0.0991211 15.52 0.0991211 10C0.0991211 4.49 4.59629 0 10.1151 0ZM6.10865 11.98C6.40913 12.27 6.87988 12.27 7.17035 11.97L10.115 9.02002L13.0597 11.97C13.3502 12.27 13.831 12.27 14.1214 11.98C14.4219 11.68 14.4219 11.21 14.1214 10.92L10.6459 7.43002C10.5057 7.29002 10.3154 7.21002 10.115 7.21002C9.91472 7.21002 9.72442 7.29002 9.5842 7.43002L6.10865 10.92C5.95841 11.06 5.8883 11.25 5.8883 11.44C5.8883 11.64 5.95841 11.83 6.10865 11.98Z"
                  fill="black"
                />
              </svg>
              <p className="hidden lg:block">Upvote</p>
            </button>
          )}
          {this.state.downvote ? (
            <button
              className="col-span-1 py-4 font-bold bg-red-600 text-white transition-all duration-500"
              onClick={() =>
                this.setState({
                  downvote: false,
                  points: this.state.previous_point,
                })
              }
            >
              Downvote
            </button>
          ) : (
            <button
              className="col-span-1 py-4 font-bold lg:hover:text-white transition-all lg:hover:bg-red-600 duration-500"
              onClick={() =>
                this.setState({
                  downvote: true,
                  upvote: false,
                  previous_point: this.state.points,
                  points: this.state.points - 1,
                })
              }
            >
              Downvote
            </button>
          )}
          {this.state.commentsModal ? (
            <button
              className="col-span-1 py-4 font-bold bg-gray-700 text-white transition-all duration-500"
              onClick={() => this.setState({ commentsModal: false })}
            >
              Comment
            </button>
          ) : (
            <button
              className="col-span-1 py-4 font-bold lg:hover:text-white transition-all lg:hover:bg-gray-700 duration-500 lg:hover:rounded-r-lg lg:hover:rounded-b-lg lg:hover:rounded-t-none lg:hover:rounded-l-none"
              onClick={() => this.setState({ commentsModal: true })}
            >
              <div className="flex flex-row justify-center">
                Comment{" "}
                {this.state.comments.length > 0 ? (
                  <p className="ml-2 px-2 py-1 rounded-full text-xs bg-white text-black hover:bg-gray-900 hover:text-white lg:block hidden">
                    {this.state.comments.length}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </button>
          )}
        </div>
        {this.state.commentsModal ? (
          <div className="flex flex-col">
            <Comments
              commentData={this.state.comments}
              ref={this.commentRefresh}
            />{" "}
            <CommentBuilder
              data={this.props.post}
              addComment={this.addComment.bind(this)}
              user={this.props.user}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const CommentBuilder = (props) => {
  const [comment, setComment] = useState("");
  function postComment() {
    if (comment.trim().length == 0) alert("Comment has nothing.");
    else {
      let commentToAdd = {
        uid: props.user.id,
        message: comment,
        upvotes: 0,
        downvotes: 0,
      };

      props.addComment(commentToAdd);
      setComment("");
    }
  }
  return (
    <div className="p-3 relative bg-gray-100">
      <TextareaAutosize
        className="p-2 rounded-lg w-full resize-none text-sm shadow-inner"
        placeholder="Write a comment..."
        maxRows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        id={`${props.data.id}`}
      />
      {comment != "" ? (
        <button
          className="rounded-full pt-1 pb-1 pl-2 pr-2 text-xs absolute bg-blue-400 right-0 mr-5 mt-1"
          onClick={() => postComment()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Iconly/Light/Send">
              <g id="Send">
                <path
                  id="Send_2"
                  d="M15.8325 8.17463L10.109 13.9592L3.59944 9.88767C2.66675 9.30414 2.86077 7.88744 3.91572 7.57893L19.3712 3.05277C20.3373 2.76963 21.2326 3.67283 20.9456 4.642L16.3731 20.0868C16.0598 21.1432 14.6512 21.332 14.0732 20.3953L10.106 13.9602"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </g>
          </svg>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

const Comments = forwardRef((props, ref) => {
  const [components, setComponents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const commentData = props.commentData; //Sample format
  const addComment = (comment) => {
    const newComponents = components;
    newComponents.push(<Comment data={comment} />);
    setComponents(newComponents);
  };
  ref.current = addComment;
  if (!loaded) {
    if (commentData.length > 0) {
      const commentComponents = [];
      commentData.forEach((comment) => {
        commentComponents.push(<Comment data={comment} />);
      });
      setComponents(commentComponents);
      setLoaded(true);
      return <></>;
    } else return <></>;
  } else return <div className="bg-gray-100">{components}</div>;
});

const Comment = (props) => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  console.log(props.data);
  useEffect(() => {
    setTimeout(() => {
      retrieveUserData(props.data.uid).then((userdata) => {
        setUser(userdata);
      });
    }, 500);
  }, []);

  if (user != null) {
    return (
      <>
        <div className="flex flex-row p-3 hover:bg-gray-300 transition-all duration-500">
          <div className="flex-none">
            {user.picture == "" ? (
              <Image
                src={"/Profile.svg"}
                width={30}
                height={30}
                className="rounded-full bg-gray-300"
              />
            ) : (
              <img
                src={user.pictureURL}
                style={{
                  maxWidth: "25px",
                  maxHeight: "25px",
                  objectFit: "contain",
                }}
                className="rounded-full bg-gray-300"
              />
            )}
          </div>
          <div>
            <div className="p-2 ml-2 text-sm bg-white rounded-lg shadow-lg">
              <div className="mr-2 font-bold text-xs">{`${user.fName} ${user.lName}`}</div>{" "}
              <p>{props.data.message}</p>
            </div>
            <div className="flex flex-row space-x-3 pt-1 pl-3">
              {points >= 0 ? (
                <p className="text-green-600 font-bold font-number">{points}</p>
              ) : (
                <p className="text-red-400 font-bold font-number">{points}</p>
              )}
              <button className="text-xs hover:font-bold">Upvote</button>
              <button className="text-xs hover:font-bold">Downvote</button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

function postPoints(points) {
  if (points >= 0)
    return (
      <div className="items-center justify-end float-right p-3 absolute right-0 mt-3 mr-5 flex font-bold font-number text-green-600">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-3"
        >
          <path
            d="M13.131 7.36922C13.189 7.42572 13.437 7.63906 13.641 7.8378C14.924 9.00292 17.024 12.0424 17.665 13.6332C17.768 13.8748 17.986 14.4856 18 14.812C18 15.1247 17.928 15.4228 17.782 15.7073C17.578 16.0619 17.257 16.3463 16.878 16.5022C16.615 16.6025 15.828 16.7584 15.814 16.7584C14.953 16.9143 13.554 17 12.008 17C10.535 17 9.193 16.9143 8.319 16.7867C8.305 16.772 7.327 16.6162 6.992 16.4457C6.38 16.133 6 15.5222 6 14.8685V14.812C6.015 14.3863 6.395 13.491 6.409 13.491C7.051 11.9859 9.048 9.01656 10.375 7.82319C10.375 7.82319 10.716 7.48709 10.929 7.34096C11.235 7.11301 11.614 7 11.993 7C12.416 7 12.81 7.12762 13.131 7.36922Z"
            fill="#73B15D"
          />
        </svg>
        <p>{points}</p>
      </div>
    );
  else
    return (
      <div className="items-center justify-end float-right p-3 absolute right-0 mt-3 mr-5 flex font-bold font-number text-red-400">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.869 16.6308C10.811 16.5743 10.563 16.3609 10.359 16.1622C9.076 14.9971 6.976 11.9576 6.335 10.3668C6.232 10.1252 6.014 9.51437 6 9.18802C6 8.8753 6.072 8.5772 6.218 8.29274C6.422 7.93814 6.743 7.65368 7.122 7.49781C7.385 7.39747 8.172 7.2416 8.186 7.2416C9.047 7.08573 10.446 7 11.992 7C13.465 7 14.807 7.08573 15.681 7.21335C15.695 7.22796 16.673 7.38383 17.008 7.55431C17.62 7.86702 18 8.47784 18 9.13151V9.18802C17.985 9.61374 17.605 10.509 17.591 10.509C16.949 12.0141 14.952 14.9834 13.625 16.1768C13.625 16.1768 13.284 16.5129 13.071 16.659C12.765 16.887 12.386 17 12.007 17C11.584 17 11.19 16.8724 10.869 16.6308Z"
            fill="#E33C3C"
          />
        </svg>
        <p>{points}</p>
      </div>
    );
}

function determineType(points) {
  if (points == 0 && points > -1 && points < 100) {
    return <small className="text-xs font-bold">USER</small>;
  } else if (points >= 100) {
    return <small className="text-xs font-bold text-green-600">TRUSTED</small>;
  } else if (points < -1) {
    return <small className="text-xs font-bold">UNRELIABLE</small>;
  }
}

function displayContent(content) {
  if (content.type == "video") {
    return <div>Video div</div>;
  } else if (content.type == "text") {
    return (
      <div className="p-3">
        <p>{content.caption}</p>
        <small className="text-xs">{content.date}</small>
      </div>
    );
  }
}

const Content = (props) => {
  const post = props.data;
  return (
    <div className="p-5 flex flex-col space-y-2">
      <p>{post.caption}</p>

      <Auxiliary post={post} />
    </div>
  );
};

const Auxiliary = (props) => {
  const data = props.post.auxiliary;
  if (props.post.category == "crime") {
    return (
      <div className="p-3 rounded shadow flex flex-col space-y-none bg-red-600 text-white">
        {data.media != null ? <DisplayMedia data={props.post} /> : <></>}
        <p>
          Name of suspect(s): <b>{data.name}</b>
        </p>
        <p>
          Last seen in: <b>{data.location}</b>
        </p>
      </div>
    );
  } else if (props.post.category == "accident") {
    return (
      <div className="p-3 rounded shadow flex flex-col space-y-none bg-yellow-600 text-white">
        {data.media != null ? <DisplayMedia data={props.post} /> : <></>}
        <p>
          Location of accident: <b>{data.location}</b>
        </p>
      </div>
    );
  } else if (props.post.category == "missing") {
    return (
      <div className="p-3 rounded shadow flex flex-col space-y-none bg-yellow-400 text-white">
        {data.media != null ? <DisplayMedia data={props.post} /> : <></>}
        <p>
          Name of missing person(s): <b>{data.name}</b>
        </p>
        <p>
          Last seen in: <b>{data.location}</b>
        </p>
      </div>
    );
  } else if (props.post.category == "hazard") {
    return (
      <div className="p-3 rounded shadow flex flex-col space-y-none bg-orange-600 text-white">
        {data.media != null ? <DisplayMedia data={props.post} /> : <></>}
        <p>
          Location of hazard: <b>{data.location}</b>
        </p>
      </div>
    );
  }
  return <>{data.location}</>;
};

const DisplayMedia = (props) => {
  const result = <></>;
  result = (
    <div
      className="mb-3 bg-gray-600 rounded flex"
      style={{
        minHeight: "250px",
        minHeight: "250px",
      }}
    >
      {determineTypeofMedia(props)}
    </div>
  );

  return result;
};

function determineTypeofMedia(props) {
  let file = props.data.auxiliary.media;
  var re = /(?:\.([^.]+))?$/;
  let ext = re.exec(file)[1];
  const extensions = ["jpg", "png", "bmp", "jpeg"];
  const [media, setMedia] = useState(<></>);
  if (extensions.indexOf(ext.toLowerCase()) > -1) {
    getFile(props.data, "picture", setMedia);
  } else {
    getFile(props.data, "video", setMedia);
  }
  return <>{media}</>;
}

function convertCityIDtoCity(id) {
  const options = [
    { label: "Caloocan", id: "caloocan" },
    { label: "Malabon", id: "malabon" },
    { label: "Navotas", id: "navotas" },
    { label: "Valenzuela", id: "valenzuela" },
    { label: "Quezon City", id: "qc" },
    { label: "Marikina", id: "marikina" },
    { label: "Pasig", id: "pasig" },
    { label: "Taguig", id: "taguig" },
    { label: "Makati", id: "makati" },
    { label: "Manila", id: "manila" },
    { label: "Mandaluyong", id: "mandaluyong" },
    { label: "San Juan", id: "sanjuan" },
    { label: "Pasay", id: "pasay" },
    { label: "Paranaque", id: "paranaque" },
    { label: "Las Pinas", id: "laspinas" },
    { label: "Muntinlupa", id: "muntinlupa" },
  ];
  for (let i = 0; i < options.length; i++) {
    if (options[i].id == id) return options[i].label;
    else continue;
  }
}

import React, { Component } from "react";

export default class Reputation extends Component {
  render() {
    return (
      <>
        <div className="p-5 bg-white h-auto rounded-lg shadow-lg invisible lg:visible select-none">
          <div className="grid grid-cols-2 mb-3">
            <div className="col-span-1">
              <p className="text-sm 2xl:text-md">Post Rep</p>
              <p className="font-bold font-number text-2xl">
                {this.props.user.points.post_points}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm 2xl:text-md">Comment Rep</p>
              <p className="font-bold font-number text-2xl align-middle">
                {this.props.user.points.comment_points}
              </p>
            </div>
          </div>
          {reputationStatus(this.props.user.points)}
        </div>
      </>
    );
  }
}

function reputationStatus(user_points) {
  const reputation = user_points.comment_points + user_points.post_points;
  const partner = false;
  let result = <></>;

  if (partner) {
    result = (
      <div className="p-3 bg-cyan-600 rounded-md">
        <p className="font-bold text-md text-white">PARTNER</p>
        <p className="font-light text-sm text-white hidden 2xl:block">
          Together, we make a safe community.
        </p>
      </div>
    );
  } else if (reputation > 100 && !partner) {
    result = (
      <div className="p-3 bg-emerald-600 rounded-md">
        <p className="font-bold text-md text-white">TRUSTED</p>
        <p className="font-light text-sm text-white hidden 2xl:block">
          Thank you for helping keep your community safe.
        </p>
      </div>
    );
  } else if (reputation < 100 && !partner && reputation > 0) {
    result = (
      <div className="p-3 bg-gray-500 rounded-md">
        <p className="font-bold text-md text-white ">USER</p>
        <p className="font-light text-sm text-white hidden 2xl:block">
          Get 100 total reputation to earn a Trusted badge.
        </p>
      </div>
    );
  } else if (reputation < 0 && !partner) {
    result = (
      <div className="p-3 bg-red-700 rounded-md">
        <p className="font-bold text-md text-white ">UNRELIABLE</p>
        <p className="font-light text-sm text-white hidden 2xl:block">
          Get 20 total reputation to remove this badge.
        </p>
      </div>
    );
  }

  return result;
}

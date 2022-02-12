"use strict";
// import { initMap } from "./location.js";

let getGitUserName = document.getElementById("enter_git_user");
const submitGitUserName = document.querySelector(".submit_git_user_name");
const apiEndPoint = "https://api.github.com/users/";

submitGitUserName.addEventListener("click", fetchUserDetails);

async function fetchUserDetails() {
  let finalEndPoint = apiEndPoint + getGitUserName.value;
  try {
    const response = await fetch(finalEndPoint);
    const jsonData = await response.json();
    if (jsonData.hasOwnProperty("message")) {
      console.log(jsonData.message);
      throw Error(jsonData.message);
    }
    userBio(jsonData);
    countProfileStatus(jsonData);
    getCreatedDate(jsonData);
    getUserLocation(jsonData);

    // console.log(jsonData);
  } catch (err) {
    alert("Invalid username" + err);
  }
}

// arrow functions
const userBio = (userData) => {
  const userBioElement = document.querySelector(".user_git_bio");
  if (userData.bio === null) {
    userBioElement.textContent = "This user has no bio";
  } else {
    userBioElement.textContent = userData.bio;
  }
};

const countProfileStatus = (userData) => {
  const reposCount = document.querySelector(".repos_count");
  const followersCount = document.querySelector(".followers_count");
  const followingCount = document.querySelector(".following_count");

  reposCount.textContent = userData.public_repos;
  followersCount.textContent = userData.followers;
  followingCount.textContent = userData.following;
};

const getUserLocation = (userData) => {
  const userLocation = document.querySelector(".loc_name");

  // console.log(userData.location);
  if (userData.location == null) {
    userLocation.textContent = "User doesn't updated location";
  } else {
    userLocation.textContent = userData.location;
  }
};

const getCreatedDate = (userData) => {
  const getCreatedDate = document.querySelector(".git_joined_date");

  let fetchJoinedDate = userData.created_at;
  let dateJoined = new Date(fetchJoinedDate);

  let splittedDate = dateJoined.toString().split(" ");

  let formattedDate =
    "" + splittedDate[2] + " " + splittedDate[1] + " " + splittedDate[3];
  console.log(formattedDate);

  getCreatedDate.textContent = `Joined ${formattedDate}`;
};

// export { userBio, countProfileStatus, getUserLocation, getCreatedDate };

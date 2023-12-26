const userBtnContainer = document.getElementsByClassName("users")[0];
const usersDataContainer = document.getElementsByClassName("users-data")[0];

function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) =>
      users.forEach((user) => {
        const userBtn = document.createElement("button");
        userBtn.textContent = user.name;
        userBtn.style.backgroundColor = "rgb(52, 150, 150)";
        userBtn.addEventListener("click", () => {
          getUserPosts(user.id);
        });
        userBtnContainer.appendChild(userBtn);
      })
    )
    .catch((error) => console.error("Error fetching users:", error));
}

async function getUserPosts(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPosts(posts) {
  usersDataContainer.innerHTML = "";
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.textContent = post.title;
    usersDataContainer.appendChild(postElement);
  });
}

getUsers();

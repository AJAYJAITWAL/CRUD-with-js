const postsList  = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const btnSubmit = document.querySelector('.btn');
let output = '';

const url = "https://jsonplaceholder.typicode.com/posts"

const renderPost = (posts) => {
  posts.forEach(post => {
    output += `
    <div class="card mt-4 mx-2 col-md-5 bg-light">
      <div class="card-body data-id=${post.id}">
        <h6 class="card-title">${post.title}</h6>
        <p class="card-text">${post.body}</p>
        <a href="#" class="card-link" id="edit-post">Edit</a>
        <a href="#" class="card-link" id="delete-post">Delete</a>
      </div>
    </div>
    `;
  });
  postsList.innerHTML = output;
};

//Read the post
// Method GET

fetch(url)
  .then(res => res.json())
  .then(data => renderPost(data))

postsList.addEventListener('click', (e) => {
  e.preventDefault();
  let delButtonIsPressed = e.target.id == "delete-post";
  let editButtonIsPressed = e.target.id == "edit-post";

  let id = e.target.parentElement.dataset.id;

  //DELETE post
  // Method DELETE

  if(delButtonIsPressed) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    }) 
      .then(res => res.json())
      .then(() => location.reload())
  }

  if(editButtonIsPressed) {
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector('.card-title').textContent;
    let bodyContent =  parent.querySelector(".card-text").textContent;

    titleValue.value = titleContent;
    bodyValue.value = bodyContent;
  }

  // U[date post
  // Method PATCH
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json"
      },
      boday: JSON.stringify({
        title: titleValue.value,
        body: bodyValue.value
      })
    })
      .then(res => res.json())
      .then(() => location.reload())
  })
})

// Create post
// Method POST

addPostForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      title: titleValue.value,
      body : bodyValue.value
    })
  })
  .then(res => res.json())
  .then(data => {
    const dataAttr = [];
    dataAttr.push(data);
    renderPost(dataAttr);
  })
  
  // reset input field to empty
  titleValue.value = '';
  bodyValue.value = '';
})
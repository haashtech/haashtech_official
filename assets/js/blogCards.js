let blogs = null;
fetch("/blog.json")
  .then((res) => res.json())
  .then((data) => {
    blogs = data;
    showDetails();
    setupShareButton();
  });


//   show details ======================
function showDetails() {
  let detail = document.querySelector(".detail");
  let subTopicDiv = document.querySelector(".subTopic");

  let blogId = new URLSearchParams(window.location.search).get("id");
  let thisBlog = blogs.filter((value) => {
    return value.id == blogId;
  })[0];
  console.log(thisBlog, "thisBlog");
  // if there is no blog has id = blogId
  // => reurn to home page
  if (!thisBlog) {
    window.location.href = "/blog.html";
  }
  document.title = "Haash ||" + thisBlog.title;
  detail.querySelector(".title").innerHTML = thisBlog?.title;
  detail.querySelector(".image img").src = thisBlog?.image;
  detail.querySelector(".name").innerHTML = thisBlog?.name;
  detail.querySelector(".date").innerHTML = thisBlog?.date;
  detail.querySelector(".content").innerHTML = thisBlog?.content;
  detail.querySelector(".conclusion-head").innerHTML = thisBlog?.conclusion;
  detail.querySelector(".conclusion-text").innerHTML = thisBlog?.conclusiontext;
  // topic starting from here
  thisBlog.topics.forEach((topic) => {
    let newSubTopic = document.createElement("li");
    let subTopicsHTML = topic.subTopics
      .map(
        (sub) => `
  <li>
      ${sub.h3 ? `<h3 class="subheading">${sub?.h3}</h3>` : ""}
      ${sub.paragraph ? `<p>${sub?.paragraph}</p>` : ""}
      ${sub.src ? `<img src="${sub.src}" class="w-100" alt="" />` : ""}
  </li>
`
      )
      .join(""); // Join the array of subtopics HTML strings

    newSubTopic.innerHTML = `
  <h2 class="subtitle">${topic?.subtitle}</h2>
  <p class="discription">${topic?.discription}</p>
  <ul>
      ${subTopicsHTML}
  </ul>
`;
    subTopicDiv.appendChild(newSubTopic);
  });
  // ====================
  let otherTopics = document.querySelector(".otherTopics");
  blogs
    .filter((value) => value.id != blogId)
    .forEach((other) => {
      let nextTopic = document.createElement("a");
      nextTopic.href = "/details.html?id=" + other?.id; // Change blog to other here
      // nextTopic.classList.add('')
      nextTopic.innerHTML = `
      <h2 class="text-truncate">${other?.title}</h2>
      `;
      otherTopics.appendChild(nextTopic);
    });
}

// ============== share
function setupShareButton() {
    const viewBtn = document.querySelector(".view-modal")
    let blogId = new URLSearchParams(window.location.search).get("id");
    let thisBlog = blogs.filter((value) => {
      return value.id == blogId;
    })[0];
  
    viewBtn.addEventListener("click", () => {
      if (navigator.share && thisBlog) {
        const shareText = `${thisBlog.title}\n${window.location.origin}/details.html?id=${thisBlog.id}`;
  
        navigator
          .share({
            title: thisBlog.title,
            text: shareText
          })
          .then(() => {
            console.log("Sharing successful");
          })
          .catch((error) => {
            console.error("Error sharing:", error);
          });
      }
    });
  
  
  }
  

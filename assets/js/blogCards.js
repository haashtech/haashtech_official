let blogs = null;
fetch("/blog.json")
  .then((res) => res.json())
  .then((data) => {
    blogs = data;
    showDetails();
    setupShareButton();
  });

  // Function to wrap "website design" with an <a> tag
// function wrapWithLink(content) {
//   const link = '<a href="https://haash.tech/topmost-software-companies-in-india.html" >website design</a>';
//   const regex = new RegExp('website design', 'gi');
//   return content.replace(regex, link);
// }
function wrapWithLink(content) {
  const links = [
    { text: 'website design', url: 'https://haash.tech/topmost-software-companies-in-india.html' },
    { text: 'Content Management System (CMS):', url: 'https://kinsta.com/knowledgebase/content-management-system/' } // Add the appropriate URL
  ];

  links.forEach(link => {
    // Escape special characters in the link text
    const escapedText = link.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedText, 'gi');
    content = content.replace(regex, `<a href="${link.url}" class="underline">${link.text}</a>`);
  });

  return content;
}


//   show details ======================
function showDetails() {
  let detail = document.querySelector(".detail");
  let subTopicDiv = document.querySelector(".subTopic");

  let blogId = new URLSearchParams(window.location.search).get("id");
  let thisBlog = blogs.filter((value) => {
    return value.id == blogId;
  })[0];
  // console.log(thisBlog, "thisBlog");
  // if there is no blog has id = blogId
  // => reurn to home page
  if (!thisBlog) {
    window.location.href = "/blog.html";
  }
  let truncatedContent = thisBlog?.title.length > 15 ? thisBlog?.title.substring(0, 15) + "..." : thisBlog?.title;
  document.title = "Haash.tech ||" + thisBlog.title;
  detail.querySelector(".active").innerHTML = truncatedContent;
  detail.querySelector(".title").innerHTML = thisBlog?.title;
  detail.querySelector(".image img").src = thisBlog?.image;
  detail.querySelector(".name").innerHTML = thisBlog?.name;
  detail.querySelector(".date").innerHTML = thisBlog?.date;
  // detail.querySelector(".content").innerHTML = thisBlog?.content;
  let contentWithLink = wrapWithLink(thisBlog?.content);
  detail.querySelector(".content").innerHTML = contentWithLink;
  detail.querySelector(".secContent").innerHTML = `${thisBlog.secContent ? thisBlog.secContent : ""}`;
  detail.querySelector(".conclusion-head").innerHTML = thisBlog?.conclusion;
  detail.querySelector(".conclusion-text").innerHTML = thisBlog?.conclusiontext;
  // topic starting from here
  // topic starting from here
thisBlog.topics.forEach((topic) => {
    let newSubTopic = document.createElement("li");
  
    // Check if the subTopics array exists and has length greater than 0
    if (topic.subTopics && topic.subTopics.length > 0) {
      let subTopicsHTML = topic.subTopics
        .map(
          (sub) => `
          <li>
            ${sub.h3 ? `<h3 class="subheading">${wrapWithLink(sub?.h3)}</h3>` : ""}
            ${sub.paragraph ? `<p>${sub?.paragraph}</p>` : ""}
            ${sub.src ? `<img src="${sub.src}" class="w-100" alt="${sub.h3}" />` : ""}
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
    } else {
      // If subTopics array is empty or undefined, just display subtitle and discription
      newSubTopic.innerHTML = `
        <h2 class="subtitle">${topic?.subtitle}</h2>
        <p class="discription">${topic?.discription}</p>
      `;
    }
  
    subTopicDiv.appendChild(newSubTopic);
  });
  // ====================
  
  // ====================
  let otherTopics = document.querySelector(".otherTopics");
  blogs
    .filter((value) => value.id != blogId)
    .forEach((other) => {
      let nextTopic = document.createElement("a");
      nextTopic.href = "/details.html?id=" + other?.id; // Change blog to other here
      // nextTopic.classList.add('')
      nextTopic.innerHTML = `
      
      <h2 class="text-truncate"><i class="bi bi-chevron-right"></i> ${other?.title}</h2>
      `;
      otherTopics.appendChild(nextTopic);
    });
}

// ============== share
function setupShareButton() {
  const viewBtn = document.querySelector(".view-modal");
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
          text: shareText,
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



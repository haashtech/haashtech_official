let blogs = null;
fetch('../js/blog.json')
.then(res => res.json())
.then(data => {
    blogs = data;
    console.log(blogs,"hsjnjdfsfsnfsn");
})
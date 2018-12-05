//News Json--Pulling Source and News from Database File.

const apiKey = '1627a96079bd478ab06b35fac2b6bd49';
const defaultSource = "Time";
const sourceSelector = document.querySelector('#sources');
const newsArticles = document.querySelector('main');

window.addEventListener('load', e => {
  sourceSelector.addEventListener('change', evt => refreshNews(evt.target.value));
  grabNewsSources().then(() => {
    sourceSelector.value = defaultSource;
    refreshNews();
  });
});
//Grab Json news Data
window.addEventListener('online', () => refreshNews(sourceSelector.value));

//news sources...nyt abc pbs etc... the side bar.
async function grabNewsSources() {
  const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
  const json = await response.json();
  sourceSelector.innerHTML =
    json.sources
      .map(source => `<option value="${source.id}">${source.name}</option>`)
      .join('\n');
}

//refresh news artciles
async function refreshNews(source = defaultSource) {
  newsArticles.innerHTML = '';
  const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
  const json = await response.json();
  newsArticles.innerHTML =
    json.articles.map(createArticle).join('\n');
}

//prints Json Data to webpage
function createArticle(article) {
  return `
    <div class="article">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
        </a>
      <span class="opinion">
      <i onclick="myFunction(comments)" class="fa fa-comment"></i>
      <i onclick="myFunction(likes)" class="fa fa-thumbs-down"></i>
      <i onclick="myFunction(dislikes)" class="fa fa-thumbs-up"></i>
      </span>
    </div>`;
}

//Checklist - 10/8/18

//create error code. [x] Only for login - 10/10/18
//create serach bar. []
//create catagories. []
//create post, likes, comments. [x] images of "thumbs-up and down" & "comment".[]
//separate userdatabase linked to post, likes, and comments. [x] firebase
//Everything has to stay static. Nothing can change in size[]
//cycle through different pages and go through older post[]
//find new api[]
//implement different areas of jquery.[x]
//user accounts-saved into a database[x]
//blog layout[x]
//wrap the blog within a button to be opened up a different page within the "Blog page"
//learn simple mysql & php[x]
//find shitty placeholder logo[x]


//Checklist- 10/10/18

//Ajax description of articles []
//blog posted to a different page. uploaded to database -- firebase []
//login brings you back to homepage.[]
//link opinions to firebase and display user inputs to screen in real time[]
//login at top toggles to "user"[]
//logout and login can be done anywhere[]
//cycle through different outlets[x] :D
//catagories and favorites[]
//opinions sections needs to be in a static postion[]
//a better home-page detailing...Top News, and other type of information that can be helpful[]
//fix null images(videos) find a way to pull either the video or cycle through images and pull one[]

 


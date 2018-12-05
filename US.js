//News Json--Pulling Source and News from Database File.

const apiKey = '1627a96079bd478ab06b35fac2b6bd49';
const defaultSource = '';
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
window.addEventListener('online', () => usNews(sourceSelector.value));

window.addEventListener('load', e => {
  sourceSelector.addEventListener('change', evt => usNews(evt.target.value));
  grabNewsSources().then(() => {
    sourceSelector.value = defaultSource;
    usNews();
  });
});
//Grab Json news Data
window.addEventListener('online', () => usNews(sourceSelector.value));


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
async function usNews(source = defaultSource) {
  newsArticles.innerHTML = '';
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  const json = await response.json();
  newsArticles.innerHTML =
    json.articles.map(createArticle).join('\n');
}

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

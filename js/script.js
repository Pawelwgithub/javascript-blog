'use strict';

/* MODULE 5.3 */

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links, MODULE 5.3 */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link, MODULE 5.3 */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles, MODULE 5.3 */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  
  /* get 'href' attribute from the clicked link, MODULE 5.3 */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute), MODULE 5.3 */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article, MODULE 5.3 */

  targetArticle.classList.add('active');

}

/* MODULE 5.4 */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList, MODULE 5.4 */

  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  /* for each article, MODULE 5.4 */
  /* find all the articles and save them to variable: articles, MODULE 5.4 */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  
  let html = '';

  for(let article of articles){

    /* get the article id, MODULE 5.4 */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element, MODULE 5.4 */
    /* get the title from the title element, MODULE 5.4 */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link, MODULE 5.4 */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList, MODULE 5.4 */
    /* insert link into html variable, MODULE 5.4 */
    /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/
    
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links)

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
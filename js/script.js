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

/* GENERATING TITLE LINKS MODULE 5.4 */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList, MODULE 5.4 */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article, MODULE 5.4 */
  /* find all the articles and save them to variable: articles, MODULE 5.4 */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

  let html = '';

  for (let article of articles) {

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
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

/* GENERATING TAGS, MODULE 6.2 */

function generateTags(){

  /* find all articles, MODULE 6.2 */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article, MODULE 6.2 */

  for(let article of articles){

    /* find tags wrapper, MODULE 6.2 */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string, MODULE 6.2 */

    let html = '';

    /* get tags from data-tags attribute, MODULE 6.2 */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array, MODULE 6.2 */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag, MODULE 6.2 */

    for(let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link, MODULE 6.2 */

      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);

      /* add generated code to html variable, MODULE 6.2 */

      html = html + linkHTML;
      console.log(html);

      /* END LOOP: for each tag, MODULE 6.2 */

    }

    /* insert HTML of all the links into the tags wrapper, MODULE 6.2 */

    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);

    /* END LOOP: for every article, MODULE 6.2 */

  }
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event, MODULE 6.2 */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this", MODULE 6.2 */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element, MODULE 6.2 */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant, MODULE 6.2 */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active, MODULE 6.2 */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each active tag link, MODULE 6.2 */

  for(let tagLink of tagLinks){

    /* remove class active, MODULE 6.2 */

    tagLink.classList.remove('active');

    /* END LOOP: for each active tag link, MODULE 6.2 */

  }

  /* find all tag links with "href" attribute equal to the "href" constant, MODULE 6.2 */

  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(hrefTagLinks);

  /* START LOOP: for each found tag link, MODULE 6.2 */

  for(let hrefTagLink of hrefTagLinks){

    /* add class active, MODULE 6.2 */

    hrefTagLink.classList.add('active');

    /* END LOOP: for each found tag link, MODULE 6.2 */

  }

  /* execute function "generateTitleLinks" with article selector as argument, MODULE 6.2 */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){

  /* find all links to tags, MODULE 6.2 */

  const tagLinks = document.querySelectorAll('.tags .list a');
  console.log(tagLinks);

  /* START LOOP: for each link, MODULE 6.2 */

  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link, MODULE 6.2 */

    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link, MODULE 6.2 */

  }
}

addClickListenersToTags();

/* GENERATING AUTHORS, MODULE 6.2 */

function generateAuthors(){

  /* find all articles, MODULE 6.2 */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article, MODULE 6.2 */

  for(let article of articles){

    /* find authors wrapper, MODULE 6.2 */

    const authorsWrapper = article.querySelector(optArticleAuthorsSelector);
    console.log(authorsWrapper);

    /* make html variable with empty string, MODULE 6.2 */

    let html = '';

    /* get authors from data-author attribute, MODULE 6.2 */

    const author = article.getAttribute('data-author');
    console.log(author);
    
    /* generate HTML of the link, MODULE 6.2 */

    const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    console.log(linkHTML);

    /* add generated code to html variable, MODULE 6.2 */

    html = html + linkHTML;
    console.log(html);

    /* insert HTML of all the links into the authors wrapper, MODULE 6.2 */

    authorsWrapper.innerHTML = html;
    console.log(authorsWrapper);

    /* END LOOP: for every article, MODULE 6.2 */

  }
}

generateAuthors();

function authorClickHandler(event){

  /* prevent default action for this event, MODULE 6.2 */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this", MODULE 6.2 */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element, MODULE 6.2 */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract author from the "href" constant, MODULE 6.2 */

  const author = href.replace('#author-', '');

  /* find all author links with class active, MODULE 6.2 */

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each active author link, MODULE 6.2 */

  for(let authorLink of authorLinks){

    /* remove class active, MODULE 6.2 */

    authorLink.classList.remove('active');

    /* END LOOP: for each active author link, MODULE 6.2 */

  }

  /* find all author links with "href" attribute equal to the "href" constant, MODULE 6.2 */

  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(hrefAuthorLinks);

  /* START LOOP: for each found author link, MODULE 6.2 */

  for(let hrefAuthorLink of hrefAuthorLinks){

    /* add class active, MODULE 6.2 */

    hrefAuthorLink.classList.add('active');

    /* END LOOP: for each found author link, MODULE 6.2 */

  }

  /* execute function "generateTitleLinks" with article selector as argument, MODULE 6.2 */

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  /* find all links to authors, MODULE 6.2 */

  const authorLinks = document.querySelectorAll('.author');
  console.log(authorLinks);

  /* START LOOP: for each link, MODULE 6.2 */

  for(let authorLink of authorLinks){

    /* add authorClickHandler as event listener for that link, MODULE 6.2 */

    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link, MODULE 6.2 */

  }
}

addClickListenersToAuthors();
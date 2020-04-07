
'use strict';

/* MODULE 6.4 Handlebars */

//const templates = {
//   articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
//   tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML)
//   authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
// }

/* MODULE 6.3 */

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorsSelector: '.post-author',
  tagsListSelector: '.tags.list',
  authorsListSelector: '.authors.list',
  cloudClassCount: '5',
  cloudClassPrefix: 'tag-size-',
};

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

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList, MODULE 5.4 */

  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  /* for each article, MODULE 5.4 */
  /* find all the articles and save them to variable: articles, MODULE 5.4 */

  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  console.log(articles);

  let html = '';

  for(let article of articles){

    /* get the article id, MODULE 5.4 */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element, MODULE 5.4 */
    /* get the title from the title element, MODULE 5.4 */

    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

    /* create HTML of the link, MODULE 5.4 */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    // const linkHTMLData = {id: articleId, title: articleTitle};
    // const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList, MODULE 5.4 */
    /* insert link into html variable, MODULE 5.4 */
    /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/

    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

function addEventListenersToTitles(){

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

addEventListenersToTitles();


/* CALCULATE TAGS PARAMS, MODULE 6.3 */

function calculateTagsParams(tags){

  const params = {
    max: '0',
    min: '999999'
  };

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  
  return params;

}

/* CALCULATE AUTHORS PARAMS, MODULE 6.3 */

function calculateAuthorsParams(authors){

  const params = {
    max: '0',
    min: '999999'
  };

  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times');

    if(authors[author] > params.max){
      params.max = authors[author];
    }
    if(authors[author] < params.min){
      params.min = authors[author];
    }
  }
  
  return params;

}

/* CALCULATE TAG CLASS, MODULE 6.3 */

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
  const classValue = opt.cloudClassPrefix + classNumber;
  console.log(classValue);
  return classValue;
}

/* GENERATING TAGS, MODULE 6.2, 6.3 */

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object, MODULE 6.3 */
  
  let allTags = {};

  /* find all articles, MODULE 6.2 */

  const articles = document.querySelectorAll(opt.articleSelector);
  console.log(articles);

  /* START LOOP: for every article, MODULE 6.2 */

  for(let article of articles){

    /* find tags wrapper, MODULE 6.2 */

    const tagsWrapper = article.querySelector(opt.articleTagsSelector);
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

      /* [NEW] check if this link is NOT already in allTags, MODULE 6.3 */
      
      //if(!allTags.hasOwnProperty(tag)){

      if(!Object.prototype.hasOwnProperty.call(allTags, tag)){
      
        /* [NEW] add tag to allTags object, MODULE 6.3 */
      
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag, MODULE 6.2 */

    }

    /* insert HTML of all the links into the tags wrapper, MODULE 6.2 */

    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);

    /* END LOOP: for every article, MODULE 6.2 */

  }

  /* [NEW] find list of tags in right column, MODULE 6.3 */

  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code, MODULE 6.3 */

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags:, MODULE 6.3 */

  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML, MODULE 6.3 */

    // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

    // allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';

    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
          
    console.log('tagLinkHTML:', tagLinkHTML);

    allTagsHTML += tagLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags:, MODULE 6.3 */

  }
  
  /* [NEW] add html from allTagsHTML to tagList, MODULE 6.3 */
  
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);

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

  addEventListenersToTitles();

}

function addClickListenersToTags(){

  /* find all links to tags, MODULE 6.2 */

  const tagLinks = document.querySelectorAll('.post-tags .list a, .list.tags a');
  console.log(tagLinks);

  /* START LOOP: for each link, MODULE 6.2 */

  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link, MODULE 6.2 */

    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link, MODULE 6.2 */

  }
}

addClickListenersToTags();

/* GENERATING AUTHORS, MODULE 6.2, 6.3 */

function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty object, MODULE 6.3 */
  
  let allAuthors = {};

  /* find all authors, MODULE 6.2 */

  const authors = document.querySelectorAll(opt.articleSelector);
  console.log(authors);

  /* START LOOP: for every author, MODULE 6.2 */

  for(let author of authors){

    /* find authors wrapper, MODULE 6.2 */

    const authorsWrapper = author.querySelector(opt.articleAuthorsSelector);
    console.log(authorsWrapper);

    /* make html variable with empty string, MODULE 6.2 */

    let html = '';

    /* get authors from data-author attribute, MODULE 6.2 */

    const articleAuthor = author.getAttribute('data-author');
    console.log(articleAuthor);
    
    /* generate HTML of the link, MODULE 6.2 */

    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
    console.log(linkHTML);

    /* add generated code to html variable, MODULE 6.2 */

    html = html + linkHTML;
    console.log(html);

    /* [NEW] check if this link is NOT already in allAuthors, MODULE 6.3 */
      
    //if(!allAuthors.hasOwnProperty(articleAuthor)){

    if(!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthor)){
      
      /* [NEW] add author to allAuthors object, MODULE 6.3 */
    
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of all the links into the authors wrapper, MODULE 6.2 */

    authorsWrapper.innerHTML = html;
    console.log(authorsWrapper);

    /* END LOOP: for every article, MODULE 6.2 */

  }

  /* [NEW] find list of authors in right column, MODULE 6.3 */

  const authorList = document.querySelector('.authors');
  console.log(authorList);

  /* [NEW] create variable for all links HTML code, MODULE 6.3 */

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);

  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors:, MODULE 6.3 */

  for(let articleAuthor in allAuthors){

    /* [NEW] generate code of a link and add it to allAuthorsHTML, MODULE 6.3 */

    // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

    // allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';

    const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '(' + allAuthors[articleAuthor] + ')' + '</a></li>';
          
    console.log('authorLinkHTML:', authorLinkHTML);

    allAuthorsHTML += authorLinkHTML;

    /* [NEW] END LOOP: for each author in allAuthors:, MODULE 6.3 */

  }
  
  /* [NEW] add html from allAuthorsHTML to authorList, MODULE 6.3 */
  
  authorList.innerHTML = allAuthorsHTML;
  console.log(authorList);

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

  addEventListenersToTitles();

}

function addClickListenersToAuthors(){

  /* find all links to authors, MODULE 6.2 */

  const authorLinks = document.querySelectorAll('.post-author a, .list.authors a');
  console.log(authorLinks);

  /* START LOOP: for each link, MODULE 6.2 */

  for(let authorLink of authorLinks){

    /* add authorClickHandler as event listener for that link, MODULE 6.2 */

    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link, MODULE 6.2 */

  }
}

addClickListenersToAuthors();

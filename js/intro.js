
// Function to fetch and display content
function loadContent(url, sectionId,contentClass) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data, 'text/html');
      const section = htmlDoc.getElementById(sectionId);
      console.log(sectionId)
      if (section) {
        const contentElement = document.querySelector(contentClass);
        contentElement.innerHTML = section.outerHTML;
        contentElement.style.opacity = 0;
        setTimeout(() => {
          contentElement.style.opacity = 1;
          contentElement.style.transition = 'opacity 0.5s ease';
        }, 0);
      } else {
        console.log(`Section with ID '${sectionId}' not found.`);
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}


document.querySelector('.js-load-lesson').addEventListener('click', () => {
  // loadContent('content/lessons.html', 'content','.content');
  loadContent('content/lessons.html', 'lesson7','.lessons');
  
})



document.querySelector('.cpu').addEventListener('click', () => {
  // loadContent('content/lessons.html', 'content','.content');
  loadContent('content/lessons.html', 'lesson2','.lessons');
  
})
document.querySelector('.ram').addEventListener('click', () => {
  // loadContent('content/lessons.html', 'content','.content');
  loadContent('content/lessons.html', 'lesson3','.lessons');
  
})

document.querySelector('.storage').addEventListener('click', () => {
  // loadContent('content/lessons.html', 'content','.content');
  loadContent('content/lessons.html', 'lesson4','.lessons');
  
})


document.querySelector('.io').addEventListener('click', () => {
  // loadContent('content/lessons.html', 'content','.content');
  loadContent('content/lessons.html', 'lesson5','.lessons');
  
})

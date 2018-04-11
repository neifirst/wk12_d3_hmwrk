const makeRequest = function (url, callbackFunc) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callbackFunc);
  request.send();
}


const requestComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers, 'beer-list');
}


const createListElement = function (parent, item, info) {
  const ul = document.getElementById(parent);
  const li = document.createElement("li");
  switch (info) {
    case 'name':
      li.innerText = item.name;
      break;
    case 'ingredients':
        li.innerText = item.ingredients['yeast'];
      debugger;
    break;
  }
  ul.appendChild(li);
}


const createImageElement = function (parent, item) {
  const ul = document.getElementById(parent);
  const li = document.createElement("li");
  const img = document.createElement("IMG");
  img.src = item.image_url;
  img.height = '100';
  img.width = '30';
  li.appendChild(img);
  ul.appendChild(li);

}


const populateList = function (list, parent) {
  for (let item of list) {
    createListElement(parent, item, 'name');
    createImageElement(parent, item);
    createListElement(parent, item, 'ingredients');
  }
}


var app = function(){
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);

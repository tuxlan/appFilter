showPhotos();

function showPhotos() {
  var content = document.querySelector('.photos');
  content.innerHTML = '';

  getPhotos().then(function(response) {
    var photos = response;

    for(var photo in photos) {
      var div = document.createElement('div');
      div.setAttribute('class', 'photo');
      var img = document.createElement('img');
      img.setAttribute('class', photos[photo].filter)
      img.setAttribute('id', photos[photo].id);
      img.src = photos[photo].url;
      var datetime = document.createElement('date');
      var date = new Date(photos[photo].date);
      date = date.toLocaleString('es-Mx', {year: "numeric", month: "long", day: "numeric"});
      date = document.createTextNode(date);
      datetime.appendChild(date);
      div.appendChild(img);
      div.appendChild(datetime);

      document.querySelector('.photos').appendChild(div);
    }
  })
  .catch(function(error) {
    alert(error);
  })
}

function getPhotos() {
  return new Promise(function(resolve, reject) {
    var elements = [];

    if(localStorage.length > 0) {
      var keys = Object.keys(localStorage);

      for(var i = 0; i < keys.length; i++) {
        var element = {};
        element = JSON.parse(localStorage.getItem(keys[i]));
        element.id = keys[i];
        elements.push(element);
      }
      resolve(elements);
    } else {
      reject('No hay fotos.');
    }
  });
}

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var dropZone = document.querySelector('.drop');
var datetime;


dragAndDropImage();

document.querySelector('#takePhoto').addEventListener('click', function() {
  context.clearRect(0,0,canvas.width,canvas.height);
  showUploadPage();
});

document.querySelector('#showPhotos').addEventListener('click', function() {
  showPhotosPage();
});

document.querySelector('#savePhoto').addEventListener('click', function(evt) {
  evt.preventDefault();
  convertCanvasToImage(canvas).then(function(res) {
    var imageURL = res;
    var filter = document.querySelector('canvas').getAttribute('class');

    if(!filter)
      filter = 'normal';

    saveToLocalStorage(imageURL,filter,datetime).then(function(response) {
      alert(response);
      showPhotosPage(); //Switch page
      showPhotos();
    })
    .catch(function(error) {
      alert(error);
    })
  })
  .catch(function(error) {
    console.log('Error: ', error);
  })
})

document.querySelector('ul').addEventListener('click', function(evt) {
  var filter = evt.target.className;

  switch (filter) {
    case 'normal':
      document.querySelector('canvas').className = '';
      break;
    case 'gray':
      document.querySelector('canvas').className = 'gray';
      break;
    case 'sepia':
      document.querySelector('canvas').className = 'sepia';
      break;
    case 'blur':
      document.querySelector('canvas').className = 'blur';
      break;
    case 'invert':
      document.querySelector('canvas').className = 'invert';
      break;
    default:
      document.querySelector('canvas').className = '';
      break;
  }

});

function dragAndDropImage() {

  dropZone.addEventListener('dragover', function(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  });

  dropZone.addEventListener('drop', dropedFile);

  function dropedFile(evt) {
    evt.preventDefault();
    var files = evt.dataTransfer.files;

    if(files.length <= 1) {
      var file = files[0];

      if(file.type.match(/image.*/)) {
        var reader = new FileReader();

        reader.onload = function(e) {
          var img = new Image();
          img.src = e.target.result;
          document.querySelector('canvas').className = ""; /* Cuando no se elige ninguna opción */

          img.onload = function() {
            datetime = Date.now();
            context.drawImage(img,0,0);
          }
        }

        reader.readAsDataURL(file);

      } else {
        alert('Archivo no válido.');
      }
    } else {
      alert('Un archivo a la vez.');
    }
  }
}

function convertCanvasToImage(canvasImage) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.src = canvasImage.toDataURL('image/jpeg', 1.0);

    if(image.src)
      resolve(image.src);
    else
      reject('Error al convertir la imagen.');
  });
}

function saveToLocalStorage(image, filter, datetime) {
  return new Promise(function(resolve, reject) {
    var photo = {};
    photo.url = image;
    photo.filter = filter;
    photo.date = datetime;

    if(photo.filter && photo.date) {
      if(localStorage) {
        localStorage.setItem('photo'+datetime, JSON.stringify(photo));
        resolve('Se ha guardado tu foto.');
      } else {
        reject('No se pudo guardar tu foto.');
      }
    } else {
      reject('No hay datos a guardar.');
    }
  });
}

/*document.querySelector('.saveJS').addEventListener('click', function() {
  var info = context.getImageData(0,0,640,480);
  var pixels = info.data;

  for(var i=0; i < pixels.length; i+=4) {
    var r = info.data[1]
    var g = info.data[i+1];
    var b = info.data[i+2];
    //CIE 1931 luminance
    var avg = 0.2126*r + 0.7152*g + 0.0722*b;

    info.data[i] = info.data[i+1] = info.data[i+2] = avg;
  }
  context.putImageData(info,0,0);
});*/

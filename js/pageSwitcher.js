function showUploadPage() {
  document.querySelector('.upload_container').style.display = 'inline';
  document.querySelector('.photos_container').style.display = 'none';
  document.querySelector('#takePhoto').style.display = 'none';
  document.querySelector('#showPhotos').style.display = 'block';
}

function showPhotosPage() {
  document.querySelector('.photos_container').style.display = 'inline';
  document.querySelector('.upload_container').style.display = 'none';
  document.querySelector('#showPhotos').style.display = 'none';
  document.querySelector('#takePhoto').style.display = 'block';
}

function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
      showSpinner();

      const response = await fetch('/openai/generateimage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              prompt,
              size,
          }),
      });

      if (!response.ok) {
          removeSpinner();
          throw new Error('That image could not be generated');
      }

      const data = await response.json();
      // console.log(data);

      const imageUrl = data.data;

      // const smallImageUrl = imageUrl + '?size=256x256' // this will return the image with size 256x256

      document.querySelector('#image').src = imageUrl;
      document.querySelector('#image-overlay').src = imageUrl;


      removeSpinner();
  } catch (error) {
      document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);


function enableDownload() {
  document.getElementById("download").disabled = false;
}

function downloadimage() {
  const image1 = new Image();
  image1.src = "t-shirt.jpg";
  const image2 = new Image();
  image2.src = "image-overlay.jpg";
  
  Promise.all([image1, image2]).then(() => {
      html2canvas(document.getElementById("tshirt-container")).then(function(canvas) {
          var link = document.createElement("a");
          link.download = "image.png";
          link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          link.click();
      });
  });
}
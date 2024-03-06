const navbarContainer = document.getElementById('nav');

// Fetch the navigation bar HTML content
fetch('navbar.html')
  .then(response => response.text())
  .then(html => {
    // Insert the navigation bar HTML into the container
    navbarContainer.innerHTML = html;
  })
  .catch(error => {
    console.log('Error fetching navigation bar:', error);
  });

  
// JavaScript
// Coloring the background.
window.addEventListener('load', function() {
  processImage('image1', 'target-div1');
  processImage('image2', 'target-div2');
  processImage('image3', 'target-div3');
  processImage('image4', 'target-div4');
});

function processImage(imageId, targetDivId) {
  var image = document.getElementById(imageId);
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var targetDiv = document.getElementById(targetDivId);

  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  var colorFrequencies = {};

  for (var i = 0; i < imageData.length; i += 4) {
    var r = imageData[i];
    var g = imageData[i + 1];
    var b = imageData[i + 2];
    var rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    if (colorFrequencies[rgb]) {
      colorFrequencies[rgb]++;
    } else {
      colorFrequencies[rgb] = 1;
    }
  }

  var majorityColor = getMajorityColor(colorFrequencies);
  // targetDiv.style.backgroundColor = majorityColor;
  var lighterColor = tinycolor(majorityColor).lighten(5).toString();
  targetDiv.style.backgroundColor = lighterColor;
}

function getMajorityColor(colorFrequencies) {
  var maxFrequency = 0;
  var majorityColor = '';

  for (var color in colorFrequencies) {
    if (colorFrequencies[color] > maxFrequency) {
      maxFrequency = colorFrequencies[color];
      majorityColor = color;
    }
  }

  return majorityColor;
}


// Directing to specific book detials page on clicking get book
// Get the reference to the "Get Book" button
const getBookButton = document.querySelectorAll('.buy-book');

// Add event listener to the button
getBookButton.forEach((button) => {
  button.addEventListener('click', navigateToBookDetails);
});

// Function to handle navigation to the "Book Details" page
function navigateToBookDetails(event) {
  // get the parent id of the button
  const parent = event.target.parentElement;
  const image = parent.querySelector('img');
  // get image Id
  const imageId = image.id;
  const imageURL = image.src;
  
  // Capture the necessary data
  const bookImageURL = imageURL; // Replace with the actual image URL
  const startDate = new Date().toLocaleDateString(); // Get today's date
  const endDate = calculateReturnDate(10); // Calculate return date, 10 days from now
  const bookCost = 10; // Replace with the actual cost per 10 days

  // Build the URL with query parameters
  const url = `book-details.html?image=${bookImageURL}&startDate=${startDate}&endDate=${endDate}&cost=${bookCost}`;
  // Navigate to the "Book Details" page
  // processImage(imageId, 'target-div');
  window.location.href = url;
}

// Function to calculate the return date, given the number of days
function calculateReturnDate(days) {
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + days);
  return returnDate.toLocaleDateString();
}


// Get the current page URL
var currentPage = window.location.href;
console.log(currentPage)
// Get all the navbar items
var navbarItems = document.querySelectorAll('.items li a');
console.log(navbarItems)

// Loop through the navbar items
navbarItems.forEach(function(item) {
  // Check if the item's href matches the current page URL
  console.log(item.href)
  if (item.href === currentPage) {
    // Add a class to the matching navbar item
    item.classList.add('active');
  }
});

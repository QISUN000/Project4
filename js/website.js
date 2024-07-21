/********f************
    
	Project 4 
	Name: QI SUN
    Date: JULY 20, 2024
	Description:

*********************/
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-images img');
    const indicators = document.querySelectorAll('.carousel-indicators span');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.dataset.index);
            showImage(currentIndex);
        });
    });

   
    setInterval(nextImage, 3000); 


    showImage(currentIndex);
});

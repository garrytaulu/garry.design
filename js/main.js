window.onload = function() {
  pageLoad();
}

var pageLoad = function() {
	var b = document.body;
	b.className += "page-load";
}



// var body = document.querySelector('body');

// function callback(e, className) {

//     e.classList.remove(className); // or modify div.className
// }

// body.addEventListener("webkitAnimationEnd", callback(body, 'page-load'), false);
var date = new Date();
// var date = new Date('April 27, 2019 06:00:00');
var hourNow = date.getHours();

var themeSettings = document.getElementById('theme-settings');
var settingsMenu = document.getElementById('menu')
var lightThemeRadio = document.getElementById('lt');
var darkThemeRadio = document.getElementById('dt');
var autoThemeRadio = document.getElementById('at');

var currentTheme = localStorage.getItem('theme');
var currentThemeSetting = localStorage.getItem('themeSetting');

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);
	if (currentThemeSetting === 'auto') {
		autoThemeRadio.checked = true;
	} else if (currentThemeSetting === 'dark') {
		darkThemeRadio.checked = true;
	} else {
		lightThemeRadio.checked = true;
	}
} 

function switchTheme(e) {
	console.log(autoThemeRadio.checked);
	if (autoThemeRadio.checked == true) {
		if ((hourNow >= 20 && hourNow <= 24) || (hourNow <= 6 && hourNow >= 0)) {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
		localStorage.setItem('themeSetting', 'auto');
	}
    if (lightThemeRadio.checked === true) {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
		localStorage.setItem('themeSetting', 'light')
    }
    else if (darkThemeRadio.checked == true) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
		localStorage.setItem('themeSetting', 'dark')
	}    
	console.log(currentTheme);
	switchThemeTransition();
}

themeSettings.addEventListener('change', switchTheme, false);

function setColorScheme() {
	const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
	const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
	const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches
	const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
  
	window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode())
	window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode())
  
	if(isDarkMode) activateDarkMode()
	if(isLightMode) activateLightMode()
	if(isNotSpecified || hasNoSupport) {
	  console.log('You specified no preference for a color scheme or your browser does not support it. I Schedule dark mode during night time.')
	  now = new Date();
	  hour = now.getHours();
	  if (hour < 4 || hour >= 16) {
		activateDarkMode();
	  }
	}


}

window.matchMedia("(prefers-color-scheme: dark)").addListener(test);

function test(e) {
	if (e.matches) {
		console.log("dark mode on");
	}
}


function handleMenu() {
	if (settingsMenu.classList.contains('menu-appear')) {
		console.log("closing menu");
		settingsMenu.classList.remove('menu-appear');
		settingsMenu.classList.add('menu-disappear');

	} else {
		console.log("opening menu");
		settingsMenu.classList.remove('menu-disappear');
		settingsMenu.classList.add('menu-appear');
	};
	settingsMenu.addEventListener("animationend", function() {
	settingsMenu.classList.remove("menu-disappear");
    });
}


document.addEventListener("click", function(e) {
	console.log(e.target);
	if (e.target.matches('.settings-button')) {
		handleMenu();
		return;
	}
	if (settingsMenu.classList.contains('menu-appear')) {
		if (e.target.closest('input') || e.target.closest('label') || e.target.closest('.settings-menu')) {
			return;
		} else {
			handleMenu();
			return;
		}
	}
});


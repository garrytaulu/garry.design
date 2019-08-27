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
} else {
	document.documentElement.setAttribute('data-theme', 'dark');
	darkThemeRadio.checked = true;
}

function switchTheme() {
	const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
	const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
	const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches
	const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

	console.log(autoThemeRadio.checked);
	if (autoThemeRadio.checked == true) {
		if (hasNoSupport) {
			if ((hourNow >= 20 && hourNow <= 24) || (hourNow <= 6 && hourNow >= 0)) {
				document.documentElement.setAttribute('data-theme', 'dark');
				localStorage.setItem('theme', 'dark');
			} else {
				document.documentElement.setAttribute('data-theme', 'light');
				localStorage.setItem('theme', 'light');
			}
		}
		if (isDarkMode) {
			activateDarkMode();
		} 
		if (isLightMode) {
			activateLightMode();
		}
		localStorage.setItem('themeSetting', 'auto');
	}
    if (lightThemeRadio.checked === true) {
		activateLightMode();
    }
    else if (darkThemeRadio.checked == true) {
		activateDarkMode();
	}    
	console.log(currentTheme);
}

function activateLightMode() {
	document.documentElement.setAttribute('data-theme', 'light');
	localStorage.setItem('theme', 'light');
	localStorage.setItem('themeSetting', 'light');
}

function activateDarkMode() {
	document.documentElement.setAttribute('data-theme', 'dark');
	localStorage.setItem('theme', 'dark');
	localStorage.setItem('themeSetting', 'dark');
}

themeSettings.addEventListener('change', switchTheme, false);

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


// Prevent menu closing when changing theme
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

window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && switchTheme())
window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && switchTheme())
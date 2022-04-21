const themeSettings = document.getElementById('theme-settings');
const settingsMenu = document.getElementById('menu')
const lightThemeRadio = document.getElementById('lt');
const darkThemeRadio = document.getElementById('dt');
const autoThemeRadio = document.getElementById('at');

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


window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && switchTheme())
window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && switchTheme())
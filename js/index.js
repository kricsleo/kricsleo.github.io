/* eslint-disable */
let customSearch;
(function () {

	"use strict";

	const doc = document;
	const win = window;
	const dHeader = doc.getElementsByClassName('l_header')[0];
	const deviation = dHeader.getBoundingClientRect().bottom + 20;
	const visualThreshold = 0;
	const dImgList = [...doc.getElementsByTagName('img')];

	function scrollToElement(elem) {
		const distance = elem.getBoundingClientRect().top - deviation;
		win.scrollBy({
			behavior: 'smooth',
			top: distance
		});
	}

	function setHeader() {
		if (!win.subData) return;
		const dWrapper = dHeader.querySelector('.wrapper');
		dWrapper.querySelector('.nav-sub .logo').innerHTML = win.subData.subtitle || win.subData.title;

		// listening to scroll event
		// toggle content of the header
		let prePos = doc.documentElement.scrollTop;
		function toggleHeader() {
			const curPos = doc.documentElement.scrollTop;
			const deviation = curPos - prePos;
			if (deviation > 20) {
				prePos = curPos;
				dWrapper.classList.add('sub');
			} else if (deviation < -20) {
				prePos = curPos;
				dWrapper.classList.remove('sub');
			}
		}
		win.addEventListener('scroll', throttle(toggleHeader, 100, 150));

		// bind events to btn
		// to top
		doc.getElementsByClassName('s-top')[0].onclick = () => {
			scrollToElement(document.body);
		}
		// comment
		const dCommentBtn = dHeader.getElementsByClassName('s-comment')[0];
		const dCommentTarget = doc.getElementById('comments');
		if (dCommentTarget) {
			dCommentBtn.onclick = () => {
				scrollToElement(dCommentTarget);
			}
		} else if (dCommentBtn) {
			dCommentBtn.parentNode.removeChild(dCommentBtn);
		}
	}

	function setHeaderMenu() {
		const dMenu = dHeader.getElementsByClassName('menu')[0];
		const dUnderline = dMenu.getElementsByClassName('underline')[0];
		function setUnderline(dItem = dMenu.querySelector('li a.active'), transition = true) {
			if (!transition) {
				dUnderline.classList.add('disable-trans');
			}
			if (dItem) {
				doc.querySelectorAll('.menu li').forEach(item => {
					item.classList.remove('active');
				});
				dItem.classList.add('active');
				dUnderline.style.cssText = `left: ${dItem.offsetLeft}px; width: ${dItem.clientWidth}px;`;
			} else {
				dUnderline.style.cssText = `left: 0px; width: 0px;`;
			}
			if (!transition) {
				setTimeout(() => {
					dUnderline.classList.remove('disable-trans');
				}, 0);
			}
		}

		[...dMenu.getElementsByTagName('li')].forEach(dItem => {
			dItem.onmouseenter = (e) => {
				setUnderline(e.currentTarget);
			}
			dItem.onmouseout = (e) => {
				setUnderline();
			}
		});
		// set current menu active
		const pathname = location.pathname;
		let dItemActive = null;
		if (pathname === '/' || pathname.startsWith('/page/')) {
			dItemActive = dHeader.querySelector('.nav-home');
		} else {
			var name = pathname.match(/\/(.*?)\//);
			if (name.length > 1) {
				dItemActive = dHeader.querySelector(`.nav-${name[1]}`);
			}
		}
		setUnderline(dItemActive, false);
	}

	function setHeaderSearch() {
		const dSearch = dHeader.getElementsByClassName('m_search')[0];
		const dSwitcher = dHeader.getElementsByClassName('s-search')[0];

		// load search dynamically
		dSearch.onclick = () => {
			if (!customSearch) {
				var s = doc.createElement('script');
				s.type = 'text/javascript';
				// s.src = 'https://store.kricsleo.com/blog/static/js/search.js';
				s.src = '/js/search.js';
				s.onload = function () {
					customSearch = new HexoSearch({
						imagePath: "/images/",
						endpoint: '/query?q='
					});
				}
				doc.body.appendChild(s);
			}
			dHeader.classList.toggle('z_search-open');
		};
		doc.addEventListener('click', () => {
			dHeader.classList.remove('z_search-open');
		});
	}

	function setToc() {
		const dToc = doc.getElementsByClassName('toc-wrapper')[0];
		const dTocBtn = dHeader.getElementsByClassName('s-toc')[0];
		if (!dToc || !dToc.childNodes.length || !dTocBtn) {
			dTocBtn.parentNode.removeChild(dTocBtn);
			return;
		}
		dTocBtn.onclick = () => {
			dToc.classList.toggle('active');
		}
		const dTocItems = [...dToc.getElementsByTagName('a')];
		dTocItems.forEach(dItem => {
			dItem.onclick = (e) => {
				e.preventDefault();
				e.stopPropagation();
				const dTarget = doc.getElementById(dItem.getAttribute('href').substring(1));
				scrollToElement(dTarget);
			}
		});

		const getAnchor = () => dTocItems.map(dTocItem => {
			const id = dTocItem.getAttribute('href').substring(1);
			return doc.getElementById(id).offsetTop - deviation;
		});

		let anchor = getAnchor();
		const scrollListener = () => {
			const scrollTop = doc.documentElement.scrollTop;
			if (!anchor) return;
			//binary search.
			let l = 0, r = anchor.length - 1, mid;
			while (l < r) {
				mid = (l + r + 1) >> 1;
				if (anchor[mid] === scrollTop) l = r = mid;
				else if (anchor[mid] < scrollTop) l = mid;
				else r = mid - 1;
			}
			dTocItems.forEach(dTocItem => {
				dTocItem.classList.remove('active');
			});
			dTocItems[l].classList.add('active');
		}
		win.addEventListener('resize', () => {
			anchor = getAnchor();
			scrollListener();
		});
		win.addEventListener('scroll', () => scrollListener());
		scrollListener();
	}

	function removeLoading() {
		const loader = doc.getElementsByClassName('loader')[0];
		loader.style.opacity = 0;
		setTimeout(() => {
			loader.parentNode.removeChild(loader);
			lazyLoadImg();
		}, 300);
	}

	function throttle(fn, delay, maxDelay) {
		let timer;
		let startTime = new Date();
		return function () {
			const context = this;
			const args = arguments;
			let curTime = new Date();
			clearTimeout(timer);
			if (curTime - startTime >= maxDelay) {
				fn.apply(context, args);
				startTime = curTime;
			} else {
				timer = setTimeout(() => {
					fn.apply(context, args);
				}, delay);
			}
		}
	}

	function isVisible(elem) {
		var rect = elem.getBoundingClientRect();
		return !(
			rect.top - visualThreshold >= (window.innerHeight || document.documentElement.clientHeight) ||
			rect.left - visualThreshold >= (window.innerWidth || document.documentElement.clientWidth) ||
			rect.bottom + visualThreshold <= 0 ||
			rect.right + visualThreshold <= 0
		);
	}

	function lazyLoadImg() {
		dImgList.forEach(dImg => {
			if (isVisible(dImg) && dImg.getAttribute('src') === '') {
				dImg.setAttribute('src', dImg.getAttribute('data-src'));
			}
		});
	}

	function registerSW() {
		if (navigator.serviceWorker) {
			navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(reg => {
				// console.log('SW registered!');
			}).catch(e => {
				console.warn('SW register failed...');
			});
		}
	}

	// initial events
	setHeader();
	setHeaderMenu();
	setHeaderSearch();
	setToc();
	const throttleLazyLoading = throttle(lazyLoadImg, 100, 150);
	win.addEventListener('scroll', () => throttleLazyLoading());
	win.addEventListener('load', () => {
		lazyLoadImg();
		registerSW();
	});

})();

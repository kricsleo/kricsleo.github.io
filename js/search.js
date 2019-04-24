/* eslint-disable */
var SearchService = "";
(function() {
  /**
   * A super class of common logics for all search services
   * @param options : (object)
   */
  SearchService = function(options) {
    var self = this;
    
    self.config = Object.assign({}, {
      per_page: 10,
      selectors: {
        body: "body",
        form: ".u-search-form",
        input: ".u-search-input",
        container: "#u-search",
        modal: "#u-search .modal",
        modal_body: "#u-search .modal-body",
        modal_footer: "#u-search .modal-footer",
        modal_overlay: "#u-search .modal-overlay",
        modal_results: "#u-search .modal-results",
        modal_metadata: "#u-search .modal-metadata",
        modal_error: "#u-search .modal-error",
        modal_loading_bar: "#u-search .modal-loading-bar",
        modal_ajax_content: "#u-search .modal-ajax-content",
        modal_logo: '#u-search .modal-footer .logo',
        btn_close: "#u-search .btn-close",
        btn_next: "#u-search .btn-next",
        btn_prev: "#u-search .btn-prev"
      },
      brands: {
        'hexo': { logo: '', url: '' },
      },
      imagePath: "/img/"
    }, options);

    self.dom = {};
    self.percentLoaded = 0;
    self.open = false;
    self.queryText = "";
    self.nav = {
      next: -1,
      prev: -1,
      total: 0,
      current: 1
    };

    self.parseSelectors = function() {
      for (var key in self.config.selectors) {
        self.dom[key] = document.querySelector(self.config.selectors[key]);
      }
      self.dom['form'] = document.querySelectorAll(self.config.selectors['form']);
      self.dom['input'] = document.querySelectorAll(self.config.selectors['input']);
    };

    self.beforeQuery = function() {
      if (!self.open) {
        fadeIn(self.dom.container);
        self.dom.body.classList.add('modal-active');
        self.open = true;
      }
      [...self.dom.input].forEach(item => item.value = self.queryText);
      document.activeElement.blur();
      self.dom.modal_error.style.display = 'none';
      self.dom.modal_ajax_content.classList.remove('loaded');
      self.startLoading();
    };
    
    self.afterQuery = function() {
      self.dom.modal_body.scrollTop = 0;
      self.dom.modal_ajax_content.classList.add('loaded');
      self.stopLoading();
    };

    /**
     * Perform a complete search operation including UI updates and query
     * @param startIndex {int} start index or page number
     */
    self.search = function(startIndex, callback) {
      self.beforeQuery();
      if (self.search instanceof Function) {
        self.query(self.queryText, startIndex, function() {
          self.afterQuery();
        });
      }
      else {
        console.log("query() does not exist.");
        self.onQueryError(self.queryText, '');
        self.afterQuery();
      }
    };

    /**
     * Query error handler
     * @param queryText: (string)
     * @param status: (string)
     */
    self.onQueryError = function(queryText, status) {
      var errMsg = "";
      if (status === "success") errMsg = "No result found for \"" +queryText+ "\".";
      else if (status === "timeout") errMsg = "Unfortunate timeout.";
      else if (status === "error") errMsg = 'Something goes wrong.';
      else if (status === "empty") errMsg = 'Empty result.';
      else errMsg = "Mysterious failure.";
      self.dom.modal_results.innerHTML = '';
      self.dom.modal_error.innerHTML = errMsg;
      self.dom.modal_error.style.display = 'block';
    };
    
    self.nextPage = function() {
      if (self.nav.next !== -1) {
        self.search(self.nav.next);
      }
    };
    
    self.prevPage = function() {
      if (self.nav.prev !== -1) {
        self.search(self.nav.prev);
      }
    };
    
    /**
     * Generate html for one result
     * @param url : (string) url
     * @param title : (string) title
     * @param digest : (string) digest
     */
    self.buildResult = function(url, title, digest) {
      var html = "";
      html = "<li>";
      html +=   "<a class='result' href='" +url+ "'>";
      html +=     "<span class='title'>" +title+ "</span>";
      html +=     "<span class='digest'>" +digest+ "</span>";
      html +=     "<span class='result-icon iconfont icon-arrow-circle-right'></span>";
      html +=   "</a>";
      html += "</li>";
      return html;
    };
    
    /**
     * Close the modal, resume body scrolling
     * no param
     */
    self.close = function() {
      self.open = false;
      fadeOut(self.dom.container);
      self.dom.body.classList.remove('modal-active');
    };
    
    /**
     * Searchform submit event handler
     * @param queryText : (string) the query text
     */
    self.onSubmit = function(event) {
      event.preventDefault();
      self.queryText = event.currentTarget.getElementsByClassName('u-search-input')[0].value;
      if (self.queryText) {
        self.search(1);
      }
    };
    
    /**
     * Start loading bar animation
     * no param
     */
    self.startLoading = function() {
      fadeOut(self.dom.modal_loading_bar);
      self.loadingTimer = setInterval(function() { 
        self.percentLoaded = Math.min(self.percentLoaded+5,95);
        self.dom.modal_loading_bar.style.width = `${self.percentLoaded}%`;
      }, 100);
    };
    
    /**
     * Stop loading bar animation
     * no param
     */
    self.stopLoading = function() {
      clearInterval(self.loadingTimer);
      self.dom.modal_loading_bar.style.width = '100%';
      self.dom.modal_loading_bar.style.opacity = 0;
      setTimeout(function() {
        self.percentLoaded = 0;
        self.dom.modal_loading_bar.style.width = '0';
      }, 300);
    };

    /**
     * Add service branding
     * @param service {String} service name
     */
    self.addLogo = function(service) {
      var html = "";
      if (self.config.brands[service] && self.config.brands[service].logo) {
        html += "<a href='" +self.config.brands[service].url+ "' class='" +service+ "'>";
        html +=    '<img src="' +self.config.imagePath+self.config.brands[service].logo+ '" />';
        html += "</a>";
        self.dom.modal_logo.innerHTML = html;
      }
    };

    self.destroy = function() {
      [...self.dom.form].forEach(item => item.removeEventListener('click'));
      self.dom.modal_overlay.removeEventListener('click');
      self.dom.btn_close.removeEventListener('click');
      self.dom.btn_next.removeEventListener('click');
      self.dom.btn_prev.removeEventListener('click');
      self.dom.container.parentNode.removeChild(self.dom.container);
    };
    
    /**
     * Load template and register event handlers
     * no param
     */
    self.init = function () {
      const dDiv = document.createElement('div');
      dDiv.innerHTML = template;
      document.body.appendChild(dDiv);
      self.parseSelectors();
      self.dom.modal_footer.style.display = 'none';
      [...self.dom.form].forEach(item => item.onsubmit = self.onSubmit);
      self.dom.modal_overlay.addEventListener('click', self.close);
      self.dom.btn_close.addEventListener('click', self.close);
      self.dom.btn_next.addEventListener('click', self.nextPage);
      self.dom.btn_prev.addEventListener('click', self.prevPage);
    };

    self.init();
  };

  var template = '<div id="u-search"><div class="modal"> <header class="modal-header" class="clearfix"><form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm"> <input type="text" id="u-search-modal-input" class="u-search-input" /> <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit"> <span class="iconfont icon-search"></span> </button></form> <a class="btn-close"> <span class="iconfont icon-close"></span> </a><div class="modal-loading"><div class="modal-loading-bar"></div></div> </header> <main class="modal-body"><ul class="modal-results modal-ajax-content"></ul> </main> <footer class="modal-footer clearfix"><div class="modal-metadata modal-ajax-content"> <strong class="range"></strong> of <strong class="total"></strong></div><div class="modal-error"></div> <div class="logo"></div> <a class="nav btn-next modal-ajax-content"> <span class="text">NEXT</span> <span class="iconfont icon-chevron-right"></span> </a> <a class="nav btn-prev modal-ajax-content"> <span class="iconfont icon-chevron-left"></span> <span class="text">PREV</span> </a> </footer></div><div class="modal-overlay"></div></div>';
})();

var HexoSearch;
(function() {
  'use strict';
  
  /**
  * Search by Hexo generator json content
  * @param options : (object)
  */
  HexoSearch = function(options) {
    SearchService.apply(this, arguments);
    var self = this;
    self.config.endpoint = '/' + ((options||{}).endpoint || "content.json");
    self.config.endpoint = self.config.endpoint.replace("//","/"); //make sure the url is correct
    self.cache = "";
    
    /**
     * Search queryText in title and content of a post
     * Credit to: http://hahack.com/codes/local-search-engine-for-hexo/
     * @param post : the post object
     * @param queryText : the search query
     */
    self.contentSearch = function(post, queryText) {
      var post_title = post.title.trim().toLowerCase(),
          post_content = post.text.trim().toLowerCase(),
          keywords = queryText.trim().toLowerCase().split(" "),
          foundMatch = false,
          index_title = -1,
          index_content = -1,
          first_occur = -1;
      if (post_title !== '' && post_content !== '') {
        keywords.forEach((word, index) => {
          index_title = post_title.indexOf(word);
          index_content = post_content.indexOf(word);
          if (index_title < 0 && index_content < 0) {
            foundMatch = false;
          }
          else {
            foundMatch = true;
            if (index_content < 0) {
              index_content = 0;
            }
            if (index === 0) {
              first_occur = index_content;
            }
          }
          if (foundMatch) {
            post_content = post.text.trim();
            var start = 0, end = 0;
            if (first_occur >= 0) {
              start = Math.max(first_occur - 30, 0);
              end = (start === 0) ? Math.min(200, post_content.length) : Math.min(first_occur + 170, post_content.length);
              var match_content = post_content.substring(start, end);
              keywords.forEach(function (keyword) {
                var regS = new RegExp(keyword, "gi");
                match_content = match_content.replace(regS, "<b>" + keyword + "</b>");
              });
              post.digest = match_content;
            }
            else {
              end = Math.min(200, post_content.length);
              post.digest = post_content.trim().substring(0, end);
            }
          }
        });
      }
      return foundMatch;
    };
    
    /**
     * Generate result list html
     * @param data : (array) result items
     */
    self.buildResultList = function(data, queryText) {
      var results = [],
        html = "";
      data.forEach(post => html += self.buildResult(post.link, post.title, post.content[0]));
      return html;
    };
    
    /**
     * Generate metadata after a successful query
     * @param data : (object) the raw google custom search response data
     */
    self.buildMetadata = function(data) {
      self.dom.modal_footer.style.display = 'none';
    };
    
    /**
     * Send a GET request
     * @param queryText : (string) the query text
     * @param startIndex : (int) the index of first item (start from 1)
     * @param callback : (function)
     */
    self.query = function(queryText, startIndex, callback) {
      get(self.config.endpoint, {
        data: {
          q: queryText,
          start: startIndex,
          size: self.config.per_page
        }
      }).then(data => {
        let results = "";
        results += self.buildResultList(data, queryText);
        results = results || 'Empty results.';
        self.dom.modal_results.innerHTML = results;
        self.buildMetadata(data);
        if (callback) {
          callback(data);
        }
      }).catch(err => {
        self.onQueryError(queryText, 'error');
      });
    };
    return self;
  };

})();

function get(url, options) {
  let { data = {}} = options;
  if (!url.includes('?')) {
    url += '?'
  }
  Object.keys(data).forEach(key => {
    url += `&${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
  });
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`fetching ${url} error: ${e.toString()}`);
    } else {
      return res.json();
    }
  }).catch(err => {
    throw new Error(`fetching ${url} error: ${e.toString()}`);
  });
}

function fadeOut(elem, timing = 400) {
  const style = elem.style;
  const curStyle = getComputedStyle(elem);
  const cssText = style.cssText;
  const oriTransition = curStyle.transition;
  style.display = curStyle.display !== 'none' ? curStyle.display : 'block';;
  style.transition = `opacity ${timing}ms`;
  style.opacity = 0;
  setTimeout(() => {
    style.cssText = cssText;
    style.display = 'none';
    style.transition = oriTransition;
  }, timing);
}

// visibility can be added here
function fadeIn(elem, timing = 400) {
  const style = elem.style;
  const curStyle = getComputedStyle(elem);
  const cssText = style.cssText;
  const finDisplay = curStyle.display !== 'none' ? curStyle.display : 'block';
  const finOpacity = curStyle.opacity !== '0' ? curStyle.opacity : 1;
  const oriTransition = curStyle.transition;
  style.display = finDisplay;
  style.opacity = 0;
  requestAnimationFrame(() => { 
    style.cssText = cssText;
    style.transition = `opacity ${timing}ms`;
    style.opacity = finOpacity;
    style.display = finDisplay;
    setTimeout(() => style.transition = oriTransition, timing);
  });
}
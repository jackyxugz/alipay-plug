console.log('injector loading...');

(injector = function() {

    console.log('script loading...');

    // url = chrome.extension.getURL('js/jquery-1.11.3.min.js');    
    // js = document.createElement('script');
    // js.setAttribute('type', 'text/javascript');
    // js.setAttribute('src', url);    
    // document.body.appendChild(js);

    url = chrome.extension.getURL('js/gather.js');    
    js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);    
    document.body.appendChild(js);
    
    console.log('script loaded!')
    console.log(document.readyState);

   

})()

console.log('injector loaded!');


document.addEventListener('DOMContentLoaded', async (event) => {
    document.querySelectorAll("#readme_cont .anchor").forEach(function(aele) {
        const name = aele.getAttribute("href").replace('#', '');
        const pNode = aele.parentNode;
        // console.log( name, pNode);
        pNode.id=name;
    });
    
    document.querySelectorAll("#readme_cont details").forEach(function(ele) {
        ele.open = true;
    });
    
    
    tocbot.init({
        // Where to render the table of contents.
        tocSelector: '#div_toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '#readme_cont',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h1, h2, h3, h4, h5',
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
        
        
        // Main class to add to links.
        linkClass: 'toc-link',
        // Extra classes to add to links.
        extraLinkClasses: '',
        // Class to add to active links,
        // the link corresponding to the top most heading on the page.
        activeLinkClass: 'is-active-link',
        // Main class to add to lists.
        listClass: 'toc-list',
        // Extra classes to add to lists.
        extraListClasses: '',
        // Class that gets added when a list should be collapsed.
        isCollapsedClass: 'is-collapsed',
        // Class that gets added when a list should be able
        // to be collapsed but isn't necessarily collapsed.
        collapsibleClass: 'is-collapsible',
        // Class to add to list items.
        listItemClass: 'toc-list-item',
        // Class to add to active list items.
        activeListItemClass: 'is-active-li',
        // How many heading levels should not be collapsed.
        // For example, number 6 will show everything since
        // there are only 6 heading levels and number 0 will collapse them all.
        // The sections that are hidden will open
        // and close as you scroll to headings within them.
        collapseDepth: 6,
        // Smooth scrolling enabled.
        scrollSmooth: true,
        // Smooth scroll duration.
        scrollSmoothDuration: 70,
        // Smooth scroll offset.
        scrollSmoothOffset: 0,
        // Callback for scroll end.
        scrollEndCallback: function (e) {},
                // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
                headingsOffset: 1,
                // Timeout between events firing to make sure it's
                // not too rapid (for performance reasons).
                throttleTimeout: 50,
                // Element to add the positionFixedClass to.
                positionFixedSelector: null,
                // Fixed position class to add to make sidebar fixed after scrolling
                // down past the fixedSidebarOffset.
                positionFixedClass: 'is-position-fixed',
                // fixedSidebarOffset can be any number but by default is set
                // to auto which sets the fixedSidebarOffset to the sidebar
                // element's offsetTop from the top of the document on init.
                fixedSidebarOffset: 'auto',
                // includeHtml can be set to true to include the HTML markup from the
                // heading node instead of just including the textContent.
                includeHtml: false,
                // onclick function to apply to all links in toc. will be called with
                // the event as the first parameter, and this can be used to stop,
                // propagation, prevent default or perform action
                onClick: function (e) {},
                // orderedList can be set to false to generate unordered lists (ul)
                // instead of ordered lists (ol)
                orderedList: true,
                // If there is a fixed article scroll container, set to calculate titles' offset
                scrollContainer: null,
                // prevent ToC DOM rendering if it's already rendered by an external system
                skipRendering: false,
                // Optional callback to change heading labels.
                // For example it can be used to cut down and put ellipses on multiline headings you deem too long.
                // Called each time a heading is parsed. Expects a string in return, the modified label to display.
                // function (string) => string
                headingLabelCallback: false,
                // ignore headings that are hidden in DOM
                ignoreHiddenElements: false,
                // Optional callback to modify properties of parsed headings.
                // The heading element is passed in node parameter and information parsed by default parser is provided in obj parameter.
                // Function has to return the same or modified obj.
                // The heading will be excluded from TOC if nothing is returned.
                // function (object, HTMLElement) => object | void
                headingObjectCallback: null,
                // Set the base path, useful if you use a `base` tag in `head`.
                basePath: '',
                // Only takes affect when `tocSelector` is scrolling,
                // keep the toc scroll position in sync with the content.
                disableTocScrollSync: true
    });
            
    setTimeout(function(){

        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(["setCookieDomain", "*.garywill.github.io"]);
        _paq.push(["setDomains", ["*.garywill.github.io"]]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            var u="https://hellomtm.versioncheck.workers.dev/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '8']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();



    },1000);
}); 



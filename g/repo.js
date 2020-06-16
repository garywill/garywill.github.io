var onrd = new Array(); //on document ready
$(function(){
    for (var i=0; i<onrd.length; ++i)
    {
        //console.log(onrd[i]);
        //setTimeout( onrd[i] ,10+2*i);
        try{
            onrd[i]();
        }catch(err){
            console.error(err);
        }
    }
});

////// on document ready /////////////////	

onrd.push(function(){
    const repoboxes = $(".repo-box");
    for(var i=0; i<repoboxes.length; i++)
    {
        setTimeout( function (obj) {
            ProcessRepobox( obj );
        }, 1, repoboxes[i] );
    }
}); 

async function ProcessRepobox(obj)
{
    const owner = $(obj).attr("owner");
    const reponame = $(obj).attr("reponame");
    
    const repoboxhtml = `
    <div class="pinned-item-list-item-content">
        <div class="repo-title-box">
            <a target="_blank" href="http://github.com/${owner}/${reponame}" class="repo-title-link" title="${owner}/${reponame}" onclick="repo_link_onclick" owner="${owner}" reponame="${reponame}">${reponame}</a>
        </div>
        <p class="description">Loading ... </p>
        <p class="lang-star-fork">
            <span class="programmingLanguage"></span>
            
            <svg aria-label="stars" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
            
            <span class="stargazers_count"></span>
            
            <svg aria-label="forks" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
            
            <span class="forks"></span>
        </p>
    </div>
    `;
    
    $(obj).html(repoboxhtml);
    
    var repoinfo = await getGithubRepoInfo(owner, reponame);
    
    if (repoinfo.error !== undefined){
        console.error(`Error on loading ${owner}/${reponame} info`);
        console.error(repoinfo.error);
    }else{
        $(obj).find(".repo-title-link").attr("href",repoinfo.html_url);
        $(obj).find(".description").html(repoinfo.description);
        $(obj).find(".description").attr("title",repoinfo.description);
        $(obj).find(".stargazers_count").html(repoinfo.stargazers_count);
        $(obj).find(".forks").html(repoinfo.forks);
        $(obj).find(".programmingLanguage").html(repoinfo.main_lang);
        
    }
}
async function getGithubRepoInfo(owner, reponame)
{
    var info = {owner: owner, reponame: reponame};
    await $.ajax({
        url: `https://api.github.com/repos/${owner}/${reponame}`,
        processData: false,
        success: function (result) {
            Object.assign(info, {
                html_url: result['html_url'],
                description: result['description'],
                homepage: result['homepage'],
                main_lang: result['language'],
                updated_at: result['updated_at'],
                pushed_at: result['pushed_at'],
                stargazers_count: result['stargazers_count'],
                forks: result['forks'],
            });
            
        },
        error: function(err){
            info.error = err;
        },
    });
    return info;
}


onrd.push(function(){
    setTimeout(function(){
        $("#stati_script").attr("src","https://v1.cnzz.com/z_stat.php?id=1279016180&web_id=1279016180");
        $("#stati_51").attr("src","https://ia.51.la/go1?id=20914137&pvFlag=1");
        
        


        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(["setCookieDomain", "*.garywill.github.io"]);
        _paq.push(["setDomains", ["*.garywill.github.io"]]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            var u="//acsearch.cf/mpx/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '3']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();



    },1000);
}); 

function repo_link_onclick()
{
    try{ _czc.push(["_trackPageview", "clickrepo/" + this.owner + "/" + this.reponame]); } catch(err){}
}

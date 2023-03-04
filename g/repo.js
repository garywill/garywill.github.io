var onrd = new Array(); //on document ready
document.addEventListener('DOMContentLoaded', async (event) => {

    for (var i=0; i<onrd.length; ++i)
    {
        try{
            await Promise.resolve( onrd[i]() );
        }catch(err){
            console.error(err);
        }
    }
});

////// on document ready /////////////////	

onrd.push(async function(){
    const repoboxes = $(".repo-box");
    
    for(var i=0; i<repoboxes.length; i++)
    {
        ProcessRepoboxBasic( repoboxes[i] );
    }
    
    for(var i=0; i<repoboxes.length; i++)
    {
        await ProcessRepoboxFetch(repoboxes[i]);

    }
    
    for(var i=0; i<repoboxes.length; i++)
    {
        if ( repoboxes[i].className == "repo-box" )
            repoboxes[i].classList.add("normal-repo");
        
        /*
        if ( repoboxes[i].classList.contains("silver-repo") )
            
            repoboxes[i].innerHTML += `
                
                <image src="green_corner.png" class="green-corner"></image>
                <image src="green_corner.png" class="green-corner green-corner-2"></image>
            `;
        */
        
        if ( repoboxes[i].classList.contains("gold-repo") )
            repoboxes[i].innerHTML += `
                <image src="red_corner.png" class="red-corner"></image>
                <image src="red_corner.png" class="red-corner red-corner-2"></image>
                <image src="red_badge_2.png" class="red-badge"></image>
            `;

    }
}); 


var have_read_results = {};

function ProcessRepoboxBasic (obj) 
{
    const owner = $(obj).attr("owner");
    const reponame = $(obj).attr("reponame");
    
    const repoboxhtml = `
    <div class="pinned-item-list-item-content">
        <div class="repo-title-box">
            <a target="_blank" href="http://github.com/${owner}/${reponame}" class="repo-title-link" title="${owner}/${reponame}" onclick="repo_link_onclick" owner="${owner}" reponame="${reponame}">${reponame}</a>
        </div>
        <p class="description">Loading ... <br><br>
        <span style="font-size:80%; color:gray;">(note that Github API limits requesting rate, don't frequently refresh this page)</span>
        </p>
        <p class="lang-star-fork">
            <span class="programmingLanguage"></span>
            
            <svg aria-label="stars" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
            
            <span class="stargazers_count"></span>
            
            <svg aria-label="forks" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
            
            <span class="forks"></span>
            &nbsp;
            <span style="font-size: 80%;" >
                <span class="license"></span>
                &nbsp;
                <span class="pushed_at"></span>
            </span>
        </p>
    </div>
    `;
    
    $(obj).html(repoboxhtml);
}

async function ProcessRepoboxFetch(obj)
{
    const owner = $(obj).attr("owner");
    const reponame = $(obj).attr("reponame");
    
    try{
        var repoinfo = await getGithubRepoInfo(owner, reponame);
    }catch(err) {
        console.error(err);
        return;
    }
    
    if (repoinfo.error !== undefined){
        console.error(`Error on loading ${owner}/${reponame} info`);
        console.error(repoinfo.error);
    }else{
        $(obj).find(".repo-title-link").attr("href",repoinfo.html_url);
        $(obj).find(".description").text(repoinfo.description);
        $(obj).find(".description").attr("title",repoinfo.description);
        $(obj).find(".stargazers_count").text(repoinfo.stargazers_count);
        $(obj).find(".forks").text(repoinfo.forks);
        $(obj).find(".programmingLanguage").text(repoinfo.main_lang);
        $(obj).find(".license").text(repoinfo.license);
        $(obj).find(".pushed_at").text(repoinfo.pushed_at.split('-')[0] + "-" + repoinfo.pushed_at.split('-')[1]);
        
    }
}
async function getGithubRepoInfo(owner, reponame)
{
    var info = {owner: owner, reponame: reponame};
    var result;
    
    if ( have_read_results[owner] === undefined )
    {
        await $.ajax({
            //url: `https://api.github.com/repos/${owner}/${reponame}`,
            url: `https://api.github.com/users/${owner}/repos?per_page=100`,
            processData: false,
            success: function (user_repos) {
                have_read_results[owner] = user_repos;
                result = find_repo_json(user_repos, reponame);
            },
            error: function(err){
                info.error = err;
                return info;
            },
        });
    }else{
        result = find_repo_json(have_read_results[owner], reponame);
    }
    
    var license = "";
    if (result['license'] && result['license']['spdx_id'] && result['license']['spdx_id'] !="NOASSERTION")
        license = result['license']['spdx_id'];
    
    Object.assign(info, {
        html_url: result['html_url'],
        description: result['description'],
        homepage: result['homepage'],
        main_lang: result['language'],
        updated_at: result['updated_at'],
        pushed_at: result['pushed_at'],
        stargazers_count: result['stargazers_count'],
        forks: result['forks'],
        license: license
    });
    
    return info;
    
    
    function find_repo_json(user_repos, reponame)
    {
        for (var i = 0; i < user_repos.length; i++)
        {
            if (user_repos[i]['name'] == reponame)
            {
                return user_repos[i];
                break;
            }
        }
    }
}


onrd.push(function(){
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

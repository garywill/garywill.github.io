// cd into proj-doc then run this with node

var fs = require('fs');

const projSdata = {
    'linux-router' : {
        projname: 'Linux-router', 
        link: 'https://github.com/garywill/linux-router', 
        locales: ['en', 'zh', 'es', 'ru'],  
    }
};

const lang_full_names = {en: 'English', zh: '中文', ru: 'Русский язык', es: 'Español' };

const HTMLTPL = fs.readFileSync('./template.html').toString()




for ( var proj_folder_name of Object.keys(projSdata) )
{
    console.log('Project : ', proj_folder_name);
    
    const pdata = projSdata [proj_folder_name];
    
    const projname = pdata.projname;
    const projlink = pdata.link;
    
    var locale_navi_html = ''
    
    var link_tags_html = [];
    for (var lang of pdata.locales )
    {
        console.log(lang);
        
        const lang_full = lang_full_names [lang];
        
        link_tags_html.push ( `<a href="../${lang}/">${lang_full}</a>` );
        
        locale_navi_html = link_tags_html.join(' | ');
    }
    
    var html = HTMLTPL
                    .replaceAll('__PROJ_NAME__', projname)
                    .replaceAll('__LINK_TO_PROJ__', projlink)
                    
                    .replaceAll('__LOCALE_NAVI__', locale_navi_html)
                ;
                
    for (var lang of pdata.locales )  
    {
        const write_file_folder = `${proj_folder_name}/${lang}`;
        const write_file_path = `${write_file_folder}/index.html`;
        
        
        const locale_readme_content = fs.readFileSync(`${proj_folder_name}/${lang}.html`).toString()
                                        .replaceAll('immersive-translate', 'imtr')
                                    ;
        
        var html_with_locale = html;
        html_with_locale = html.replaceAll('__LOCALE_CODE__', lang )
                               .replaceAll('__README_CONTENT__', locale_readme_content )
                            ;
        
        fs.mkdirSync(write_file_folder, {recursive: true});
        
        console.log('writing file:', write_file_path);
        fs.writeFileSync(write_file_path, html_with_locale )
        
    }
    
    console.log('--');
}

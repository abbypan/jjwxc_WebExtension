var query_type = [
    [ 'jjwxc', '百度 jjwxc' ], 
    [ 'baidu', '百度' ], 
    [ 'set' ,  '限定' ],
    [ 'blur' ,  '模糊' ]
];

for(var i in query_type){
    browser.contextMenus.create({
        id: query_type[i][0],
        title: query_type[i][1], 
        contexts: ["selection"],
        onclick: search
    });
}

function search(info, tab){
    var t = info.menuItemId;
    var kw = info.selectionText;

    var url;
    if(t=="blur"){
        url = 'https://www.google.com/cse/home?cx=002715881505881904928:lxsfdlsvzng&q=' + kw + '&oq=' + kw;
    }else if(t=="set"){
        url = 'https://cse.google.com/cse?cx=009772050743998195273:tk5ofqzqsvo&q=' + kw + '&oq=' + kw;
    }else{
        if(t=="jjwxc") {
            kw = kw + ' site:jjwxc.net';
        }

        var bd = encodeURIComponent(kw);
        url = 'https://www.baidu.com/s?wd=' + bd;
    }

    if(url){
        browser.tabs.query({"active":true, "currentWindow":true}, function(tabArray) {
            var tab = tabArray[0];
            browser.tabs.create({"url":url, "index":tab.index+0});
        });
    }
}

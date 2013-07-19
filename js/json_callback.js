function successCallback(data) {  
    console.log(data);
    // $.each(data, function (i, item) {  
    //     $("#tweets ul").append("<li>" + item.text + "</li>");  
    // });  
}; 

function first_load(json)
{
    //console.log(json);
    //window.location.reload();
    //clear all localStorage
    //localStorage.clear();

   localStorage["date_updated"] = json.date_updated;

    if (typeof localStorage["first_load"] == 'undefined')
    {
        localStorage["first_load"] = 1;
    }else{
        localStorage["first_load"] = parseInt(localStorage["first_load"]) + 1;
    }

     $.each(json, function(i, json_object){
        $.each(json_object, function(i, data){
            //alert(data.pagename);
            if(data.pagename == "morningview")
            {
                var left_menu = "";
                $.each(data.categories, function(i, categories){
                    //alert('Categories ==  '+categories.title);
                    left_menu += '<li><a href="javascript:void(0)" rel="morning_view|'+categories.title+'" id="'+categories.id+'">'+categories.title+'</a></li>';
                }); 
                localStorage["morning_view_categories"] = left_menu;

                ctr = 0;
                $.each(data.articles, function(i, articles){
                    if(ctr == 0)
                    {
                        localStorage["morning_view_initial_title"] = articles.title;
                        localStorage["morning_view_initial_body"] = articles.body;
                    }

                    if (typeof localStorage["mvac_"+articles.category_id] == 'undefined')
                    {
                        localStorage["mvac_"+articles.category_id] = "";
                    }

                    localStorage["mvac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
                    localStorage["mvac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';

                    ctr++;
                });

            }else if(data.pagename == "dailyrecap")
            {
                var left_menu = "";
                $.each(data.categories, function(i, categories){
                    //alert('Categories ==  '+categories.title);
                    left_menu += '<li><a href="javascript:void(0)" rel="daily_recap|'+categories.title+'" id="'+categories.id+'">'+categories.title+'</a></li>';
                }); 
                localStorage["daily_recap_categories"] = left_menu;

                ctr = 0;
                $.each(data.articles, function(i, articles){
                    //alert('Articles ==  '+articles.title);
                    if(ctr == 0)
                    {
                        localStorage["daily_recap_initial_title"] = articles.title;
                        localStorage["daily_recap_initial_body"] = articles.body;
                    }

                    if (typeof localStorage["drac_"+articles.category_id] == 'undefined')
                    {
                        localStorage["drac_"+articles.category_id] = "";
                    }

                    localStorage["drac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
                    localStorage["drac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';

                    ctr++;
                });
            }else if(data.pagename == "research")
            {
                localStorage["research_title"] = data.title;
                localStorage["research_body"] = data.body;
            }
        }); 
    });
}

function get_updates(json)
{
    //window.location.reload();
    //alert('ok');
    //clear all localStorage
    localStorage.clear();
    
    localStorage["date_updated"] = json.date_updated;

     $.each(json, function(i, json_object){
        $.each(json_object, function(i, data){
            if(data.pagename == "morningview")
            {
                var left_menu = "";
                $.each(data.categories, function(i, categories){
                    //alert('Categories ==  '+categories.title);
                    left_menu += '<li><a href="javascript:void(0)" rel="morning_view|'+categories.title+'" id="'+categories.id+'">'+categories.title+'</a></li>';
                }); 
                localStorage["morning_view_categories"] = left_menu;

                ctr = 0;
                $.each(data.articles, function(i, articles){
                    if(ctr == 0)
                    {
                        localStorage["morning_view_initial_title"] = articles.title;
                        localStorage["morning_view_initial_body"] = articles.body;
                    }

                    if (typeof localStorage["mvac_"+articles.category_id] == 'undefined')
                    {
                        localStorage["mvac_"+articles.category_id] = "";
                    }

                    localStorage["mvac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
                    localStorage["mvac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';

                    ctr++;
                });

            }else if(data.pagename == "dailyrecap")
            {
                var left_menu = "";
                $.each(data.categories, function(i, categories){
                    //alert('Categories ==  '+categories.title);
                    left_menu += '<li><a href="javascript:void(0)" rel="daily_recap|'+categories.title+'" id="'+categories.id+'">'+categories.title+'</a></li>';
                }); 
                localStorage["daily_recap_categories"] = left_menu;

                ctr = 0;
                $.each(data.articles, function(i, articles){
                    //alert('Articles ==  '+articles.title);
                    if(ctr == 0)
                    {
                        localStorage["daily_recap_initial_title"] = articles.title;
                        localStorage["daily_recap_initial_body"] = articles.body;
                    }

                    if (typeof localStorage["drac_"+articles.category_id] == 'undefined')
                    {
                        localStorage["drac_"+articles.category_id] = "";
                    }

                    localStorage["drac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
                    localStorage["drac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';

                    ctr++;
                });
            }else if(data.pagename == "research")
            {
               //localStorage["date_updated"] = data.date_updated;
               //localStorage["research_title"] = data.title;
               //localStorage["research_body"] = data.body;
            }
        }); 
    });

    //window.location.reload();
}

function get_categories(data)
{
    console.log(data);
    var menu_id = data.category_id;
    //alert(menu_id);
    if(menu_id == 1) //Morning View
    {
        $('ul#left-menu').empty();
        $.each(data.categories,function(i, category){
            $("ul#left-menu").append('<li><a href="javascript:void(0)" id="'+category.id+'">'+category.title+'</a></li>');
        });

        $('ul#left-menu').listview('refresh');
        var ul_left_menu = $("ul#left-menu").html();
        localStorage["left_menu_morning_view"] = ul_left_menu;
    }

    if(menu_id == 2) //Morning View
    {
        $('ul#left-menu').empty();
        $.each(data.categories,function(i, category){
            $("ul#left-menu").append('<li><a href="javascript:void(0)" id="'+category.id+'">'+category.title+'</a></li>');
        });

        $('ul#left-menu').listview('refresh');
        var ul_left_menu = $("ul#left-menu").html();
        localStorage["left_menu_daily_recap"] = ul_left_menu;
    }

    
    // $('ul#left-menu').empty();
    // $.each(data.categories,function(i, category){
    //     $("ul#left-menu").append('<li><a href="javascript:void(0)" id="'+category.id+'">'+category.title+'</a></li>');
    // }); 
    // $('ul#left-menu').listview('refresh');
    //var ul_left_menu = $("ul#left-menu").html();
    //localStorage["ul_left_menu"] = ul_left_menu;
}

function get_article(data)
{
    console.log(data);
    var menu_id = data.category_id;
    alert(menu_id);
	$("div.main-content").html("");
	$("div.main-content").append('<h1 id="article-category">'+data.category_name+'</h1>');
	$("div.main-content").append('<hr>');
    $.each(data.contents,function(i, article){
     	$("div.main-content").append('<h2 id="article-title">'+article.title+'</h2>');
     	$("div.main-content").append('<p">'+article.body+'</p>');
    }); 

    $("div#left-panel").panel("close");
    //var div_main_content = $("div.main-content").html();
    //localStorage["main_content"] = div_main_content;
}
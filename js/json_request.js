$(document).bind('pageinit', function () {

	 //get the data from server on first load
	if (typeof localStorage["first_load"] == 'undefined')
    {
    	$.ajax({
			url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_forms',
	        dataType: "jsonp",
	        success: function (data) {
	        	console.log(data);
	        	//var $select_fund_brand = $('select#fund-brand');
                //$select_fund_brand.empty();
                localStorage["fund_brand"] = "<option value='0'>Choose</option>";
                localStorage["right_menu"] = "";
	            // localStorage["morning_view_right_menu"] = "";
	            // localStorage["daily_recap_right_menu"] = "";
	            // localStorage["research_right_menu"] = "";
	            // localStorage["funds_right_menu"] = "";
	            // localStorage["tools_right_menu"] = "";
	            // localStorage["result_right_menu"] = "";
	        	$.each(data.fund_brand, function(key, value){
	        		localStorage["fund_brand"] += "<option value='"+key+"'>"+value+"</option>";
	        		localStorage["right_menu"] += '<li><a href="#" data-inline="true" data-transition="none" rel="morning_view|'+key+'" id="'+key+'">'+value+'</a></li>';
	        		//localStorage["morning_view_right_menu"] += '<li><a href="javascript:void(0)" rel="morning_view|'+key+'" id="'+key+'">'+value+'</a></li>';
	        		//localStorage["morning_view_right_menu"] += '<li><a href="#" data-inline="true" data-transition="none" rel="morning_view|'+key+'" id="'+key+'">'+value+'</a></li>';
        			// localStorage["daily_recap_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="daily_recap|'+key+'" id="'+key+'">'+value+'</a></li>';
        			// localStorage["research_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="research|'+key+'" id="'+key+'">'+value+'</a></li>';
        			// localStorage["funds_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="funds|'+key+'" id="'+key+'">'+value+'</a></li>';
        			// localStorage["tools_recap_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="tools|'+key+'" id="'+key+'">'+value+'</a></li>';
        			// localStorage["result_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="result|'+key+'" id="'+key+'">'+value+'</a></li>';
        		});

	        	localStorage["risk_profile"] = "<option value='0'>Choose</option>";
	        	$.each(data.risk_profile, function(key, value){
	        		//$select_fund_brand.append($("<option></option>").attr("value", key).text(value));
	        		localStorage["risk_profile"] += "<option value='"+key+"'>"+value+"</option>";
	        	});

	        	localStorage["fund_type"] = "<option value='0'>Choose</option>";
	        	$.each(data.fund_type, function(key, value){
	        		//$select_fund_brand.append($("<option></option>").attr("value", key).text(value));
	        		localStorage["fund_type"] += "<option value='"+key+"'>"+value+"</option>";
	        	});

	        	localStorage["currency"] = "<option value='0'>Choose</option>";
	        	$.each(data.currency, function(key, value){
	        		//$select_fund_brand.append($("<option></option>").attr("value", key).text(value));
	        		localStorage["currency"] += "<option value='"+key+"'>"+value+"</option>";
	        	});
	      	}
	    });

    	$.ajax({
			url: 'http://m.bpiassetmanagement.com/app/api/get_morning_view',
	        dataType: "jsonp",
	        success: function (data) {
	            console.log(data);
	            localStorage["date_updated"] = data.date_updated;

	            //get the categories
	            var left_menu = "";
	            $.each(data.categories, function(i, categories){
	                //alert('Categories ==  '+categories.title);
	                left_menu += '<li><a href="javascript:void(0)" rel="morning_view|'+categories.title+'" id="'+categories.id+'">'+categories.title+'</a></li>';
	            });
	            localStorage["morning_view_categories"] = left_menu;

	            //get the articles
	            ctr = 0;
	            $.each(data.articles, function(i, articles){
	                if(ctr == 0)
	                {
	                    localStorage["morning_view_initial_title"] = articles.title;
	                    localStorage["morning_view_initial_body"] = articles.body;
	                    localStorage['mvac_is_id'] = 'mvac_'+articles.category_id;
	                }

	                if (typeof localStorage["mvac_"+articles.category_id] == 'undefined')
	                {
	                    localStorage["mvac_"+articles.category_id] = "";
	                }

	                localStorage["mvac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
	                localStorage["mvac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';

	                ctr++;
	            });

	            localStorage["first_load"] = 1;
	        	window.location.reload();
	        }
	    });
	}

	//set the fund search dropdowns
	$.ajax({
		url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_forms',
        dataType: "jsonp",
        success: function (data) {
        	//console.log(data);
            localStorage["fund_brand"] = "<option value='0'>Choose</option>";
            localStorage["morning_view_right_menu"] = "";
        	$.each(data.fund_brand, function(key, value){
        		localStorage["fund_brand"] += "<option value='"+key+"'>"+value+"</option>";
        		//localStorage["morning_view_right_menu"] += '<li><a href="javascript:void(0)" rel="morning_view|'+key+'" id="'+key+'">'+value+'</a></li>';
        		localStorage["morning_view_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="morning_view|'+key+'" id="'+key+'">'+value+'</a></li>';
        	});

        	localStorage["risk_profile"] = "<option value='0'>Choose</option>";
        	$.each(data.risk_profile, function(key, value){
        		localStorage["risk_profile"] += "<option value='"+key+"'>"+value+"</option>";
        	});

        	localStorage["fund_type"] = "<option value='0'>Choose</option>";
        	$.each(data.fund_type, function(key, value){
        		localStorage["fund_type"] += "<option value='"+key+"'>"+value+"</option>";
        	});

        	localStorage["currency"] = "<option value='0'>Choose</option>";
        	$.each(data.currency, function(key, value){
        		localStorage["currency"] += "<option value='"+key+"'>"+value+"</option>";
        	});
      	}
    });

	localStorage["current_page"] = "morning_view";
	
	//load the content vila localStorage
	$("h2#article-title").html(localStorage["morning_view_initial_title"]);
	$("div#article-body").html(localStorage["morning_view_initial_body"]);

	$("h3#left-menu-title").html("Morning View");
	$('ul#left-menu').empty();
    $("ul#left-menu").append(localStorage["morning_view_categories"]);
    $('ul#left-menu').listview('refresh');

	$('ul#right-menu').empty();
    $("ul#right-menu").append(localStorage["right_menu"]);
    $('ul#right-menu').listview('refresh');

    // $('ul#right-menu-morning-view').empty();
    // $("ul#right-menu-morning-view").append(localStorage["daily_recap_right_menu"]);
    // $('ul#right-menu-morning-view').listview('refresh');

    //set the variables for the search form
	$('select#fund-brand').html(localStorage["fund_brand"]);
	$('select#risk-profile').html(localStorage["risk_profile"]);
	$('select#fund-type').html(localStorage["fund_type"]);
	$('select#currency').html(localStorage["currency"]);

	// $('select#daily-fund-brand').html(localStorage["fund_brand"]);
	// $('select#daily-risk-profile').html(localStorage["risk_profile"]);
	// $('select#daily-fund-type').html(localStorage["fund_type"]);
	// $('select#daily-currency').html(localStorage["currency"]);

	// $('select#research-fund-brand').html(localStorage["fund_brand"]);
	// $('select#research-risk-profile').html(localStorage["risk_profile"]);
	// $('select#research-fund-type').html(localStorage["fund_type"]);
	// $('select#research-currency').html(localStorage["currency"]);

	// $('select#funds-fund-brand').html(localStorage["fund_brand"]);
	// $('select#funds-risk-profile').html(localStorage["risk_profile"]);
	// $('select#funds-fund-type').html(localStorage["fund_type"]);
	// $('select#funds-currency').html(localStorage["currency"]);

	// $('select#tools-fund-brand').html(localStorage["fund_brand"]);
	// $('select#tools-risk-profile').html(localStorage["risk_profile"]);
	// $('select#tools-fund-type').html(localStorage["fund_type"]);
	// $('select#tools-currency').html(localStorage["currency"]);

	// $('select#result-fund-brand').html(localStorage["fund_brand"]);
	// $('select#result-risk-profile').html(localStorage["risk_profile"]);
	// $('select#result-fund-type').html(localStorage["fund_type"]);
	// $('select#result-currency').html(localStorage["currency"]);

	$("span#date_updated").html(localStorage["date_updated"]);

	$('select').selectmenu('refresh', true);

	// $('#refresh').on('click',  function(event) {
	// 	$.ajax({
	// 		url: 'http://m.bpiassetmanagement.com/app/api/get_updates/?callback=get_updates',
	// 		dataType: "jsonp",
	// 		jsonp : "callback",
	// 		jsonpCallback: "get_updates"
	// 	});
	// });

	//get menu content on menu click
	$('ul#main-menu').on('click', 'a', function(event) {
		var main_menu_id = $(this).attr("id");
		//alert(main_menu_id);

		$.mobile.showPageLoadingMsg("a", "Loading...", true);

		if(main_menu_id == "morning")
		{
			localStorage["current_page"] = "morning_view";

			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_morning_view',
		        dataType: "jsonp",
		        success: function (data) {
		            console.log(data);
		            localStorage["date_updated"] = data.date_updated;

		            //get the categories
		            var left_menu = "";
		            $.each(data.categories, function(i, categories){
		                //alert('Categories ==  '+categories.title);
		                left_menu += '<li><a href="javascript:void(0)" rel="morning_view|'+categories.title+'" id="'+categories.id+'">'+categories.title+'</a></li>';
		            });
		            localStorage["morning_view_categories"] = left_menu;

		            //reset
		            ctr = 0;
		            $.each(data.articles, function(i, articles){
		                if(ctr == 0)
		                {
		                    localStorage["morning_view_initial_title"] = articles.title;
		                    localStorage["morning_view_initial_body"] = articles.body;
		                    localStorage['category_id'] = articles.category_id;
		                }

		                if (typeof localStorage["mvac_"+articles.category_id] == 'undefined')
		                {
		                    localStorage["mvac_"+articles.category_id] = "";
		                }

		                localStorage["mvac_"+articles.category_id] = '';
		                localStorage["mvac_"+articles.category_id] = '';

		                ctr++;
		            });

		            //get the articles
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
		        }
		    });

			//set the fund search dropdowns
			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_forms',
		        dataType: "jsonp",
		        success: function (data) {
		        	console.log(data);
		            localStorage["fund_brand"] = "";
		            localStorage["fund_brand"] = "<option value='0'>Choose</option>";
		            localStorage["morning_view_right_menu"] = "";
		        	$.each(data.fund_brand, function(key, value){
		        		localStorage["fund_brand"] += "<option value='"+key+"' selected='selected'>"+value+"</option>";
		        		localStorage["morning_view_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="morning_view|'+key+'" id="'+key+'">'+value+'</a></li>';
		        	});

		        	localStorage["risk_profile"] = "";
		        	localStorage["risk_profile"] = "<option value='0'>Choose</option>";
		        	$.each(data.risk_profile, function(key, value){
		        		localStorage["risk_profile"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["fund_type"] = "";
		        	localStorage["fund_type"] = "<option value='0'>Choose</option>";
		        	$.each(data.fund_type, function(key, value){
		        		localStorage["fund_type"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["currency"] = "";
		        	localStorage["currency"] = "<option value='0'>Choose</option>";
		        	$.each(data.currency, function(key, value){
		        		localStorage["currency"] += "<option value='"+key+"'>"+value+"</option>";
		        	});
		      	}
		    });
			
			$("span#date_updated").html(localStorage["date_updated"]);
			$("span#page-article-title").html("Morning View");

			$("h1#article-category").html("");
			$("h2#article-title").html("");
			$("div#article-body").html("");

          	$("h2#article-title").html(localStorage["morning_view_initial_title"]);
       		$("div#article-body").html(localStorage["morning_view_initial_body"]);

       		$("h3#left-menu-title").html("Morning View");
       		$('ul#left-menu').empty();
            $("ul#left-menu").append(localStorage["morning_view_categories"]);
            $('ul#left-menu').listview('refresh');
            //alert(localStorage["morning_view_categories"]);
            $("div#is-body").html("");

            setTimeout(function(){
		        $.mobile.loading('hide');
		    }, 1000);

            //$(this).off( event ); //this is to prevent the page to load multiple times

			// $(document).on('pageshow',function(event){

			// 	$( document ).on( "swipeleft swiperight", "#menu-morning-view", function( e ) {
	  //               // We check if there is no open panel on the page because otherwise
	  //               // a swipe to close the left panel would also open the right panel (and v.v.).
	  //               // We do this by checking the data that the framework stores on the page element (panel: open).
	  //               if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
	  //                   if ( e.type === "swipeleft"  ) {
	  //                       $( "div#morning-view-right-panel" ).panel( "open" );
	  //                   } else if ( e.type === "swiperight" ) {
	  //                       $( "div#morning-view-left-panel" ).panel( "open" );
	  //                   }
	  //               }
	  //           });

			// 	//load first the old data
			// 	$("span#date_updated").html(localStorage["date_updated"]);
			// 	$("h2#article-title").html(localStorage["morning_view_initial_title"]);
	  //           $("div#article-body").html(localStorage["morning_view_initial_body"]);

	  //           $('ul#left-menu-morning-view').empty();
	  //           $("ul#left-menu-morning-view").append(localStorage["morning_view_categories"]);
	  //           $('ul#left-menu-morning-view').listview('refresh');

			// 	$('ul#right-menu-morning-view').empty();
			// 	$("ul#right-menu-morning-view").append(localStorage["morning_view_right_menu"]);
			// 	$('ul#right-menu-morning-view').listview('refresh');

			// 	$('select#fund-brand').html(localStorage["fund_brand"]);
			// 	$('select#risk-profile').html(localStorage["risk_profile"]);
			// 	$('select#fund-type').html(localStorage["fund_type"]);
			// 	$('select#currency').html(localStorage["currency"]);

			// 	$('select.morning-view-dropdown').selectmenu('refresh', true);

			// 	$(this).off( event ); //this is to prevent the page to load multiple times

   //          });

		}else if(main_menu_id == "daily-recap"){
			localStorage["current_page"] = "daily_recap";

			 $.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_daily_recap',
		        dataType: "jsonp",
		        success: function (data) {
		            console.log(data);
		            localStorage["date_updated"] = data.date_updated;

		            var left_menu = "";
	                $.each(data.categories, function(i, categories){
	                    //alert('Categories ==  '+categories.title);
	                    left_menu += '<li><a href="javascript:void(0)" rel="daily_recap|'+categories.title+'" id="'+categories.id+'">'+categories.title+'</a></li>';
	                });
	                localStorage["daily_recap_categories"] = left_menu;

	                //reset
	                ctr = 0;
		            $.each(data.articles, function(i, articles){
		                if(ctr == 0)
		                {
		                    localStorage["daily_recap_initial_title"] = articles.title;
		                    localStorage["daily_recap_initial_body"] = articles.body;
		                    localStorage['category_id'] = articles.category_id;
		                }

		                if (typeof localStorage["drac_"+articles.category_id] == 'undefined')
		                {
		                    localStorage["drac_"+articles.category_id] = "";
		                }

		                localStorage["drac_"+articles.category_id] = '';
		                localStorage["drac_"+articles.category_id] = '';

		                ctr++;
		            });

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
		        }
		    });

   			//set the fund search dropdowns
			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_forms',
		        dataType: "jsonp",
		        success: function (data) {
		        	//console.log(data);
		            localStorage["fund_brand"] = "";
		            localStorage["fund_brand"] = "<option value='0'>Choose</option>";
		            localStorage["daily_recap_right_menu"] = "";
		        	$.each(data.fund_brand, function(key, value){
		        		localStorage["fund_brand"] += "<option value='"+key+"' selected='selected'>"+value+"</option>";
		        		localStorage["daily_recap_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="daily_recap|'+key+'" id="'+key+'">'+value+'</a></li>';
		        	});

		        	localStorage["risk_profile"] = "";
		        	localStorage["risk_profile"] = "<option value='0'>Choose</option>";
		        	$.each(data.risk_profile, function(key, value){
		        		localStorage["risk_profile"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["fund_type"] = "";
		        	localStorage["fund_type"] = "<option value='0'>Choose</option>";
		        	$.each(data.fund_type, function(key, value){
		        		localStorage["fund_type"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["currency"] = "";
		        	localStorage["currency"] = "<option value='0'>Choose</option>";
		        	$.each(data.currency, function(key, value){
		        		localStorage["currency"] += "<option value='"+key+"'>"+value+"</option>";
		        	});
		      	}
		    });
			
			$("span#date_updated").html(localStorage["date_updated"]);
			$("span#page-article-title").html("Daily Recap");

			$("h1#article-category").html("");
			$("h2#article-title").html("");
			$("div#article-body").html("");

          	$("h2#article-title").html(localStorage["daily_recap_initial_title"]);
       		$("div#article-body").html(localStorage["daily_recap_initial_body"]);

       		$("h3#left-menu-title").html("Daily Recap");
       		$('ul#left-menu').empty();
            $("ul#left-menu").append(localStorage["daily_recap_categories"]);
            $('ul#left-menu').listview('refresh');

            $("div#is-body").html("");

            setTimeout(function(){
		        $.mobile.loading('hide');
		    }, 1000);

   //          $('ul#right-menu-daily-recap').empty();
			// $("ul#right-menu-daily-recap").append(localStorage["daily_recap_right_menu"]);
			// $('ul#right-menu-daily-recap').listview('refresh');

			// $('select#fund-brand').html(localStorage["fund_brand"]);
			// $('select#risk-profile').html(localStorage["risk_profile"]);
			// $('select#fund-type').html(localStorage["fund_type"]);
			// $('select#currency').html(localStorage["currency"]);

			// $('select.daily-recap-dropdown').selectmenu('refresh', true);

			//$(this).off( event ); //this is to prevent the page to load multiple times


			// $(document).on('pageshow',function(event){

			// 	$( document ).on( "swipeleft swiperight", "#menu-daily-recap", function( e ) {
	  //               // We check if there is no open panel on the page because otherwise
	  //               // a swipe to close the left panel would also open the right panel (and v.v.).
	  //               // We do this by checking the data that the framework stores on the page element (panel: open).
	  //               if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
	  //                   if ( e.type === "swipeleft"  ) {
	  //                       $( "div#daily-recap-right-panel" ).panel( "open" );
	  //                   } else if ( e.type === "swiperight" ) {
	  //                       $( "div#daily-recap-left-panel" ).panel( "open" );
	  //                   }
	  //               }
	  //           });
			// 	// alert(localStorage["daily_recap_initial_title"]);
   //            	$("span#date_updated").html(localStorage["date_updated"]);
   //            	$("h2#article-title").html(localStorage["daily_recap_initial_title"]);
   //         		$("div#article-body").html(localStorage["daily_recap_initial_body"]);

   //         		$('ul#left-menu-daily-recap').empty();
	  //           $("ul#left-menu-daily-recap").append(localStorage["daily_recap_categories"]);
	  //           $('ul#left-menu-daily-recap').listview('refresh');

	  //           $('ul#right-menu-daily-recap').empty();
			// 	$("ul#right-menu-daily-recap").append(localStorage["daily_recap_right_menu"]);
			// 	$('ul#right-menu-daily-recap').listview('refresh');

			// 	$('select#fund-brand').html(localStorage["fund_brand"]);
			// 	$('select#risk-profile').html(localStorage["risk_profile"]);
			// 	$('select#fund-type').html(localStorage["fund_type"]);
			// 	$('select#currency').html(localStorage["currency"]);

			// 	$('select.daily-recap-dropdown').selectmenu('refresh', true);

			// 	$(this).off( event ); //this is to prevent the page to load multiple times
   //         });

		}else if(main_menu_id == "research"){
			localStorage["current_page"] = "research";

			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_research',
		        dataType: "jsonp",
		        success: function (data) {
		            console.log(data);
		            localStorage["date_updated"] = data.date_updated;

		            var left_menu = "";
	                $.each(data.categories, function(i, categories){
	                    //alert('Categories ==  '+categories.title);
	                    left_menu += '<li><a href="javascript:void(0)" rel="research|'+categories.title+'" id="'+categories.id+'">'+categories.title+'</a></li>';
	                });
	                localStorage["research_categories"] = left_menu;

	                //reset
	                ctr = 0;
		            $.each(data.articles, function(i, articles){
		                if(ctr == 0)
		                {
		                    localStorage["research_initial_title"] = articles.title;
		                    localStorage["research_initial_body"] = articles.body;
		                    localStorage['category_id'] = articles.category_id;
		                }

		                if (typeof localStorage["reac_"+articles.category_id] == 'undefined')
		                {
		                    localStorage["reac_"+articles.category_id] = "";
		                }

		                localStorage["reac_"+articles.category_id] = '';
		                localStorage["reac_"+articles.category_id] = '';

		                ctr++;
		            });

	                ctr = 0;
	                $.each(data.articles, function(i, articles){
	                    //alert('Articles ==  '+articles.title);
	                    if(ctr == 0)
	                    {
	                        localStorage["research_initial_title"] = articles.title;
	                        localStorage["research_initial_body"] = articles.body;
	                    }

	                    if (typeof localStorage["reac_"+articles.category_id] == 'undefined')
	                    {
	                        localStorage["reac_"+articles.category_id] = "";
	                    }

	                    localStorage["reac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
	                    localStorage["reac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';

	                    ctr++;
	                });
		        }
		    });

			//set the fund search dropdowns
			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_forms',
		        dataType: "jsonp",
		        success: function (data) {
		        	console.log(data);
		            localStorage["fund_brand"] = "";
		            localStorage["fund_brand"] = "<option value='0'>Choose</option>";
		            localStorage["research_right_menu"] = "";
		        	$.each(data.fund_brand, function(key, value){
		        		localStorage["fund_brand"] += "<option value='"+key+"' selected='selected'>"+value+"</option>";
		        		localStorage["research_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="research|'+key+'" id="'+key+'">'+value+'</a></li>';
		        	});

		        	localStorage["risk_profile"] = "";
		        	localStorage["risk_profile"] = "<option value='0'>Choose</option>";
		        	$.each(data.risk_profile, function(key, value){
		        		localStorage["risk_profile"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["fund_type"] = "";
		        	localStorage["fund_type"] = "<option value='0'>Choose</option>";
		        	$.each(data.fund_type, function(key, value){
		        		localStorage["fund_type"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["currency"] = "";
		        	localStorage["currency"] = "<option value='0'>Choose</option>";
		        	$.each(data.currency, function(key, value){
		        		localStorage["currency"] += "<option value='"+key+"'>"+value+"</option>";
		        	});
		      	}
		    });

			$("span#date_updated").html(localStorage["date_updated"]);
			$("span#page-article-title").html("Research");

			$("h1#article-category").html("");
			$("h2#article-title").html("");
			$("div#article-body").html("");

          	$("h2#article-title").html(localStorage["research_initial_title"]);
       		$("div#article-body").html(localStorage["research_initial_body"]);

       		$("h3#left-menu-title").html("Research");
       		$('ul#left-menu').empty();
            $("ul#left-menu").append(localStorage["research_categories"]);
            $('ul#left-menu').listview('refresh');

            $("div#is-body").html("");

            setTimeout(function(){
		        $.mobile.loading('hide');
		    }, 1000);

			//$(document).on('pageshow',function(event, ui){
			// $(document).on('pageshow',function(event){

			// 	$( document ).on( "swipeleft swiperight", "#menu-research", function( e ) {
	  //               // We check if there is no open panel on the page because otherwise
	  //               // a swipe to close the left panel would also open the right panel (and v.v.).
	  //               // We do this by checking the data that the framework stores on the page element (panel: open).
	  //               if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
	  //                   if ( e.type === "swipeleft"  ) {
	  //                       $( "div#research-right-panel" ).panel( "open" );
	  //                   } else if ( e.type === "swiperight" ) {
	  //                       $( "div#research-left-panel" ).panel( "open" );
	  //                   }
	  //               }
	  //           });

   //            	$("span#date_updated").html(localStorage["date_updated"]);
   //            	$("h2#article-title").html(localStorage["research_initial_title"]);
   //         		$("div#article-body").html(localStorage["research_initial_body"]);

   //         		$('ul#left-menu-research').empty();
	  //           $("ul#left-menu-research").append(localStorage["research_categories"]);
	  //           $('ul#left-menu-research').listview('refresh');

			// 	$('ul#right-menu-research').empty();
			// 	$("ul#right-menu-research").append(localStorage["research_right_menu"]);
			// 	$('ul#right-menu-research').listview('refresh');

			// 	$('select#fund-brand').html(localStorage["fund_brand"]);
			// 	$('select#risk-profile').html(localStorage["risk_profile"]);
			// 	$('select#fund-type').html(localStorage["fund_type"]);
			// 	$('select#currency').html(localStorage["currency"]);

			// 	$('select.research-dropdown').selectmenu('refresh', true);

			// 	$(this).off( event ); //this is to prevent the page to load multiple times

   //          });

		}else if(main_menu_id == "funds"){
			localStorage["current_page"] = "funds";

			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_funds',
		        dataType: "jsonp",
		        success: function (data) {
		            console.log(data);
		            localStorage["date_updated"] = data.date_updated;

		            localStorage["funds_initial_title"] = data.title;
		            localStorage["funds_initial_body"] = data.body;
		            //localStorage['category_id'] = articles.category_id;
		        }
		    });

		    //set the fund search dropdowns
			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_forms',
		        dataType: "jsonp",
		        success: function (data) {
		        	console.log(data);
		            localStorage["fund_brand"] = "";
		            localStorage["fund_brand"] = "<option value='0'>Choose</option>";
		            localStorage["funds_right_menu"] = "";
		        	$.each(data.fund_brand, function(key, value){
		        		localStorage["fund_brand"] += "<option value='"+key+"' selected='selected'>"+value+"</option>";
		        		localStorage["funds_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="funds|'+key+'" id="'+key+'">'+value+'</a></li>';
		        	});

		        	localStorage["risk_profile"] = "";
		        	localStorage["risk_profile"] = "<option value='0'>Choose</option>";
		        	$.each(data.risk_profile, function(key, value){
		        		localStorage["risk_profile"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["fund_type"] = "";
		        	localStorage["fund_type"] = "<option value='0'>Choose</option>";
		        	$.each(data.fund_type, function(key, value){
		        		localStorage["fund_type"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["currency"] = "";
		        	localStorage["currency"] = "<option value='0'>Choose</option>";
		        	$.each(data.currency, function(key, value){
		        		localStorage["currency"] += "<option value='"+key+"'>"+value+"</option>";
		        	});
		      	}
		    });

			$("span#date_updated").html(localStorage["date_updated"]);
			$("span#page-article-title").html("Funds");

			$("h1#article-category").html("");
			$("h2#article-title").html("");
			$("div#article-body").html("");

          	$("h2#article-title").html(localStorage["funds_initial_title"]);
       		$("div#article-body").html(localStorage["funds_initial_body"]);

       		$("h3#left-menu-title").html("Funds");
       		$('ul#left-menu').empty();
            //$("ul#left-menu").append(localStorage["funds_categories"]);
            $('ul#left-menu').listview('refresh');

            $("div#is-body").html("");

            setTimeout(function(){
		        $.mobile.loading('hide');
		    }, 1000);

			// $(document).on('pageshow',function(event, ui){

			// 	$( document ).on( "swipeleft swiperight", "#menu-funds", function( e ) {
	  //               // We check if there is no open panel on the page because otherwise
	  //               // a swipe to close the left panel would also open the right panel (and v.v.).
	  //               // We do this by checking the data that the framework stores on the page element (panel: open).
	  //               if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
	  //                   if ( e.type === "swipeleft"  ) {
	  //                       $( "div#funds-right-panel" ).panel( "open" );
	  //                   }
	  //                   // } else if ( e.type === "swiperight" ) {
	  //                   //     $( "div#research-left-panel" ).panel( "open" );
	  //                   // }
	  //               }
	  //           });


   //            	$("span#date_updated").html(localStorage["date_updated"]);
   //            	$("h2#article-title").html(localStorage["funds_initial_title"]);
   //            	$("div#article-body").html(localStorage["funds_initial_body"]);

			// 	$('ul#right-menu').empty();
			// 	$("ul#right-menu").append(localStorage["funds_right_menu"]);
			// 	$('ul#right-menu').listview('refresh');

			// 	$('select#fund-brand').html(localStorage["fund_brand"]);
			// 	$('select#risk-profile').html(localStorage["risk_profile"]);
			// 	$('select#fund-type').html(localStorage["fund_type"]);
			// 	$('select#currency').html(localStorage["currency"]);

			// 	$('select').selectmenu('refresh', true);

			// 	$(this).off( event ); //this is to prevent the page to load multiple times

   //          });

		}else if(main_menu_id == "tools"){
			localStorage["current_page"] = "tools";

			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_tools',
		        dataType: "jsonp",
		        success: function (data) {
		            console.log(data);
		            localStorage["date_updated"] = data.date_updated;

		            localStorage["tools_initial_title"] = data.title;
		            localStorage["tools_initial_body"] = data.body;
		            //localStorage["tools_initial_article"] = articles.category_id;
		        }
		    });

		    //set the fund search dropdowns
			$.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_forms',
		        dataType: "jsonp",
		        success: function (data) {
		        	console.log(data);
		            localStorage["fund_brand"] = "";
		            localStorage["fund_brand"] = "<option value='0'>Choose</option>";
		            localStorage["tools_right_menu"] = "";
		        	$.each(data.fund_brand, function(key, value){
		        		localStorage["fund_brand"] += "<option value='"+key+"' selected='selected'>"+value+"</option>";
		        		localStorage["tools_right_menu"] += '<li><a href="result.html" data-inline="true" data-transition="none" rel="tools|'+key+'" id="'+key+'">'+value+'</a></li>';
		        	});

		        	localStorage["risk_profile"] = "";
		        	localStorage["risk_profile"] = "<option value='0'>Choose</option>";
		        	$.each(data.risk_profile, function(key, value){
		        		localStorage["risk_profile"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["fund_type"] = "";
		        	localStorage["fund_type"] = "<option value='0'>Choose</option>";
		        	$.each(data.fund_type, function(key, value){
		        		localStorage["fund_type"] += "<option value='"+key+"'>"+value+"</option>";
		        	});

		        	localStorage["currency"] = "";
		        	localStorage["currency"] = "<option value='0'>Choose</option>";
		        	$.each(data.currency, function(key, value){
		        		localStorage["currency"] += "<option value='"+key+"'>"+value+"</option>";
		        	});
		      	}
		    });

			$("span#date_updated").html(localStorage["date_updated"]);
			$("span#page-article-title").html("Tools");

			$("h1#article-category").html("");
			$("h2#article-title").html("");
			$("div#article-body").html("");

          	$("h2#article-title").html(localStorage["tools_initial_title"]);
       		$("div#article-body").html(localStorage["tools_initial_body"]);

       		$("h3#left-menu-title").html("Tools");
       		$('ul#left-menu').empty();
            //$("ul#left-menu").append(localStorage["funds_categories"]);
            $('ul#left-menu').listview('refresh');

            $("div#is-body").html("");

            setTimeout(function(){
		        $.mobile.loading('hide');
		    }, 1000);

			// $(document).on('pageshow',function(event, ui){

			// 	$( document ).on( "swipeleft swiperight", "#menu-tools", function( e ) {
	  //               // We check if there is no open panel on the page because otherwise
	  //               // a swipe to close the left panel would also open the right panel (and v.v.).
	  //               // We do this by checking the data that the framework stores on the page element (panel: open).
	  //               if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
	  //                   if ( e.type === "swipeleft"  ) {
	  //                       $( "div#tools-right-panel" ).panel( "open" );
	  //                   }
	  //                   // } else if ( e.type === "swiperight" ) {
	  //                   //     $( "div#research-left-panel" ).panel( "open" );
	  //                   // }
	  //               }
	  //           });

   //             	$("span#date_updated").html(localStorage["date_updated"]);
   //            	$("h2#article-title").html(localStorage["tools_initial_title"]);
   //            	$("div#article-body").html(localStorage["tools_initial_body"]);

			// 	$('ul#right-menu').empty();
			// 	$("ul#right-menu").append(localStorage["tools_right_menu"]);
			// 	$('ul#right-menu').listview('refresh');

			// 	$('select#fund-brand').html(localStorage["fund_brand"]);
			// 	$('select#risk-profile').html(localStorage["risk_profile"]);
			// 	$('select#fund-type').html(localStorage["fund_type"]);
			// 	$('select#currency').html(localStorage["currency"]);

			// 	$('select').selectmenu('refresh', true);

			// 	$(this).off( event ); //this is to prevent the page to load multiple times

   //          });

		}
	});

	//get the article.
	$('ul#left-menu').on('click', 'a', function(event) {
		var id = $(this).attr("id");
		var rel_array = $(this).attr("rel").split('|');
		var rel_id = rel_array[0];
		var rel_name = rel_array[1];

		localStorage['category_id'] = id;

		//$.mobile.showPageLoadingMsg("a", "Loading...", true);

		//alert(rel_id);
		if(rel_id == "morning_view")
		{
			//remove the prev data
			$("h2#article-title").html("");
			$("div#article-body").html("");

			//alert(localStorage['mvac_'+id]);

			//set the new one
			$("div#is-body").html("");
			$("div#is-body").html(localStorage['mvac_'+id]);
			$("h1#article-category").html(rel_name);

			localStorage['mvac_is_id'] = 'mvac_'+id;

			//alert(localStorage['left_menu_category_'+id]);
			// setTimeout(function(){
		 //        $.mobile.loading('hide');
		 //    }, 1000);

		}else if(rel_id == "daily_recap")
		{
			//remove the prev data
			$("h2#article-title").html("");
			$("div#article-body").html("");
			//set the new one
			$("div#is-body").html(localStorage['drac_'+id]);
			$("h1#article-category").html(rel_name);

			localStorage['drac_is_id'] = 'drac_'+id;

			// setTimeout(function(){
		 //        $.mobile.loading('hide');
		 //    }, 1000);

		}else if(rel_id == "research")
		{
			//remove the prev data
			$("h2#article-title").html("");
			$("div#article-body").html("");
			//set the new one
			$("div#is-body").html(localStorage['reac_'+id]);
			$("h1#article-category").html(rel_name);
			$("div#daily-recap-left-panel").panel("close");

			localStorage['reac_is_id'] = 'reac_'+id;

			// setTimeout(function(){
		 //        $.mobile.loading('hide');
		 //    }, 1000);

		}else if(rel_id == "funds")
		{

		}else if(rel_id == "tools")
		{

		}

		$("div#left-panel").panel("close");
		// $.ajax({
		// 	url: 'http://m.bpiassetmanagement.com/app/api/get_articles/1?callback=get_article',
		// 	dataType: "jsonp",
		// 	jsonp : "callback",
		// 	jsonpCallback: "get_article"
		// });
	});

	//REFRESH
	$('#refresh').on('click', function(event) {
		var current_page = localStorage['current_page'];
		var this_category_id = localStorage['category_id'];

		$.mobile.showPageLoadingMsg("a", "Updating...", true);
		$("div#left-panel").panel("close");

		$("h2#article-title").html("");
		$("div#article-body").html("");

      	if(current_page == "morning_view")
      	{

      	  $.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_morning_view',
		        dataType: "jsonp",
		        success: function (data) {
		            console.log(data);
		            localStorage["date_updated"] = data.date_updated;
		            localStorage['mvac_'+this_category_id] = "";
		            //get the articles
		            ctr = 0;
		            $.each(data.articles, function(i, articles){

		            	if(articles.category_id == this_category_id)
		            	{
			                localStorage["mvac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
			                localStorage["mvac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';
		            	}
		                ctr++;
		            });
		        }
		    });

      	  //$('div#is-body').html("");
          $('div#is-body').html(localStorage['mvac_'+this_category_id]);

      	}else if(current_page == "daily_recap"){

      	  $.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_daily_recap',
		        dataType: "jsonp",
		        success: function (data) {
		            console.log(data);
		            localStorage["date_updated"] = data.date_updated;
		            localStorage['drac_'+this_category_id] = "";
		            //get the articles
		            ctr = 0;
		            $.each(data.articles, function(i, articles){

		            	if(articles.category_id == this_category_id)
		            	{
			                localStorage["drac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
			                localStorage["drac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';
		            	}
		                ctr++;
		            });
		        }
		    });
	  	  
	  	  //$('div#is-body').html("");
	      $('div#is-body').html(localStorage['drac_'+this_category_id]);

      	}else if(current_page == "research"){
          $.ajax({
				url: 'http://m.bpiassetmanagement.com/app/api/get_research',
		        dataType: "jsonp",
		        success: function (data) {
		            console.log(data);
		            localStorage["date_updated"] = data.date_updated;
		            localStorage['reac_'+this_category_id] = "";
		            //get the articles
		            ctr = 0;
		            $.each(data.articles, function(i, articles){

		            	if(articles.category_id == this_category_id)
		            	{
			                localStorage["reac_"+articles.category_id] += '<h2 id="article-title">'+articles.title+'</h2>';
			                localStorage["reac_"+articles.category_id] += '<div id="article-body">'+articles.body+'</div>';
		            	}
		                ctr++;
		            });
		        }
		    });
	  	  
	  	  //$('div#is-body').html("");
	      $('div#is-body').html(localStorage['reac_'+this_category_id]);
      	}else if(current_page == "funds"){
          $('div#is-body').html('');
          $("h2#article-title").html(localStorage['funds_initial_title'] == '' ? '' : localStorage['funds_initial_title']);
		  $("div#article-body").html(localStorage['funds_initial_body'] == '' ? '' : localStorage['funds_initial_body']);
      	}else if(current_page == "tools"){
          $('div#is-body').html('');
          $("h2#article-title").html(localStorage['tools_initial_title']);
		  $("div#article-body").html(localStorage['tools_initial_body']);
      	}

		setTimeout(function(){
	        $.mobile.loading('hide');
	    }, 1000);

	});

	//right menu
	$('ul#right-menu').on('click', 'a', function(event) {
		var id = $(this).attr("id");
		var rel_array = $(this).attr("rel").split('|');
		var rel_id = rel_array[0];
		var rel_name = rel_array[1];
		//alert(rel_id);
		var fund_brand = rel_name;
		var risk_profile = "0";
		var fund_type = "0";
		var currency = "0";

		$.mobile.showPageLoadingMsg("a", "Loading...", true);

		$.ajax({
			url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_result/'+fund_brand+'/'+risk_profile+'/'+fund_type+'/'+currency,
	        dataType: "jsonp",
	        // success: function (data) {
	        //     //console.log(data);
	        //     var table = "";
	        //     $.each(data, function(i, result){
         //            //table += "<tr><td><div class='star' id="+result.id+"></div></td><td>"+result.fund_name+"</td><td>"+result.navpu+"</td><td>"+result.dod2+"</td><td>"+result.ytd3+"</td><td>"+result.year1+"</td><td>"+result.year2+"</td><td>"+result.year3+"</td></tr>";
         //            table += "<tr><td width='40%'><span class='star' id="+result.id+"></span>"+result.fund_name+"</td><td width='10%'>"+result.navpu+"</td><td width='10%'>"+result.dod2+"</td><td width='10%'>"+result.ytd3+"</td><td width='10%'>"+result.year1+"</td><td width='10%'>"+result.year2+"</td><td width='10%'>"+result.year3+"</td></tr>";
         //        });
         //        //table += "<script>$('.star').raty({numberMax: 1,starOff : 'images/star-off-big.png',starOn : 'images/star-on-big.png'});</script>";
         //        table += "<script>$('.star').raty({numberMax: 1,starOff : 'images/star-off-big.png',starOn : 'images/star-on-big.png'});</script>";
         //        table += "<script>$('.star').click(function(event) {var id = $(this).attr('id');});</script>";
	        //     $("#result_final").html(table);
	        // }
	        success: function (data) {
	            //console.log(data);
	            var table = "";
	            table += "<table data-role=\"table\" border=\"0\" width=\"100%\" id=\"search-results-table\"  class=\"ui-responsive table-stroke\"><thead><th>&nbsp;</th><th align=\"left\" width=\"40%\">Bond Funds</th><th align=\"left\" width=\"10%\">NAVPU</th><th align=\"left\" width=\"10%\">DoD<small>2</small></th><th align=\"left\" width=\"10%\">YTD<small>3</small></th><th align=\"left\" width=\"10%\">1YR</th><th align=\"left\" width=\"10%\">3YRS</th><th align=\"left\" width=\"10%\">YRS</th></thead><tbody id=\"result_final\" cellspacing=\"2\" cellpadding=\"2\">";
	            
	            $.each(data, function(i, result){
	            	
	            	var s = localStorage['star_ids'] ? localStorage['star_ids'] : '';
				    var match = s.split(',');
				    for (var a in match){
				    	var star_on = 'no';
				        var variable = match[a];

				        if(variable == result.id)
				        {
				        	star_on = 'yes';
				        	break;
				        }
				    }

				    if(star_on == 'yes')
				    {
				    	star_src = 'images/star-on-big.png';
				    	star_class = "star_on";
				    }else{
				    	star_src = 'images/star-off-big.png';
				    	star_class = "star_off";
				    }

                    //table += "<tr><td><span><img class='star "+star_class+"' id="+result.id+" src="+star_src+" /></span></td><td><a href='javascript:void()'>"+result.fund_name+"</a></td><td>"+result.navpu+"</td><td>"+result.dod2+"</td><td>"+result.ytd3+"</td><td>"+result.year1+"</td><td>"+result.year2+"</td><td>"+result.year3+"</td></tr>";
                	table += "<tr><td><span><img class='star "+star_class+"' id="+result.id+" src="+star_src+" /></span></td><td><a href=\"#funddesc"+result.id+"\" data-rel=\"popup\" data-inline=\"true\" data-transition=\"pop\">"+result.fund_name+"</a><div data-role=\"popup\" id=\"funddesc"+result.id+"\"><p>"+result.description+"</p></div></td><td>"+result.navpu+"</td><td>"+result.dod2+"</td><td>"+result.ytd3+"</td><td>"+result.year1+"</td><td>"+result.year2+"</td><td>"+result.year3+"</td></tr>";
                	table += "<script>$(\"#funddesc"+result.id+"\").popup();</script>";
                });
                //table += "<script>$('.star').raty({numberMax: 1,starOff : 'images/star-off-big.png',starOn : 'images/star-on-big.png'});</script>";
                table += "<script>$('.star').click(function(event) {var star_id = $(this).attr('id'); if($(this).hasClass('star_off')){localStorage['star_ids'] += ','+star_id;$('#'+star_id).attr('src', 'images/star-on-big.png');$(this).removeClass('star_off');$(this).addClass('star_on');}else{var new_star_ids; var star_ids_array=localStorage['star_ids'].split(',');$.each(star_ids_array,function(key,value){if(star_id != value){new_star_ids+= ','+value;}});localStorage['star_ids']=new_star_ids;$('#'+star_id).attr('src', 'images/star-off-big.png');$(this).removeClass('star_on');$(this).addClass('star_off');}});</script>";
	            table += "</tbody>";

	            $("div#is-body").html("");
	            $("h1#article-category").html("");
				$("h2#article-title").html("");
				$("div#article-body").html("");

	            $("span#page-article-title").html("Search Results");
	            $("div#article-body").html(table);
	            $("div#right-panel").panel("close");

	            setTimeout(function(){
			        $.mobile.loading('hide');
			    }, 1000);
	        }
	    });

		// $(document).on('pageshow',function(){
		// 	$( document ).on( "swipeleft swiperight", "#menu-result", function( e ) {
  //               // We check if there is no open panel on the page because otherwise
  //               // a swipe to close the left panel would also open the right panel (and v.v.).
  //               // We do this by checking the data that the framework stores on the page element (panel: open).
  //               if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
  //                   if ( e.type === "swipeleft"  ) {
  //                       $( "div#result-right-panel" ).panel( "open" );
  //                   } else if ( e.type === "swiperight" ) {
  //                       //$( "div#result-left-panel" ).panel( "open" );
  //                   }
  //               }
  //           });
  //       });

        

		// if(rel_id == "morning_view")
		// {
		// 	$("div#morning-view-right-panel").panel("close");
		// }else if(rel_id == "daily_recap")
		// {
		// 	$("div#daily-recap-right-panel").panel("close");
		// }else if(rel_id == "research")
		// {
		// 	$("div#research-right-panel").panel("close");
		// }else if(rel_id == "funds")
		// {
		// 	$("div#funds-right-panel").panel("close");
		// }else if(rel_id == "tools")
		// {
		// 	$("div#tools-right-panel").panel("close");
		// }

		// $(document).on('pageshow',function(event, ui){

		// 	$( document ).on( "swipeleft swiperight", "#menu-funds", function( e ) {
  //               // We check if there is no open panel on the page because otherwise
  //               // a swipe to close the left panel would also open the right panel (and v.v.).
  //               // We do this by checking the data that the framework stores on the page element (panel: open).
  //               if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
  //                   if ( e.type === "swipeleft"  ) {
  //                       $( "div#funds-right-panel" ).panel( "open" );
  //                   }
  //                   } else if ( e.type === "swiperight" ) {
  //                        $( "div#research-left-panel" ).panel( "open" );
  //                   }
  //               }
  //           });
	 //     });

	});

	//funds search
	$('.find_funds').on('click', function(event) {
		var id = $(this).attr("id");

		var fund_brand = $('select#fund-brand').val();
		var risk_profile = $('select#risk-profile').val();
		var fund_type = $('select#fund-type').val();
		var currency = $('select#currency').val();

		$.mobile.showPageLoadingMsg("a", "Loading...", true);

		// if(id == "morning-view-find-funds")
		// {
		// 	var fund_brand = $('select#morning-view-fund-brand').val();
		// 	var risk_profile = $('select#morning-view-risk-profile').val();
		// 	var fund_type = $('select#morning-view-fund-type').val();
		// 	var currency = $('select#morning-view-currency').val();
		// }else if(id == "daily-find-funds"){
		// 	var fund_brand = $('select#daily-fund-brand').val();
		// 	var risk_profile = $('select#daily-risk-profile').val();
		// 	var fund_type = $('select#daily-fund-type').val();
		// 	var currency = $('select#daily-currency').val();
		// }else if(id == "research-find-funds"){
		// 	var fund_brand = $('select#research-fund-brand').val();
		// 	var risk_profile = $('select#research-risk-profile').val();
		// 	var fund_type = $('select#research-fund-type').val();
		// 	var currency = $('select#research-currency').val();
		// }else if(id == "funds-find-funds"){
		// 	var fund_brand = $('select#funds-fund-brand').val();
		// 	var risk_profile = $('select#funds-risk-profile').val();
		// 	var fund_type = $('select#funds-fund-type').val();
		// 	var currency = $('select#funds-currency').val();
		// }else if(id == "tools-find-funds"){
		// 	var fund_brand = $('select#tools-fund-brand').val();
		// 	var risk_profile = $('select#tools-risk-profile').val();
		// 	var fund_type = $('select#tools-fund-type').val();
		// 	var currency = $('select#tools-currency').val();
		// }else if(id == "result-find-funds"){
		// 	var fund_brand = $('select#result-fund-brand').val();
		// 	var risk_profile = $('select#result-risk-profile').val();
		// 	var fund_type = $('select#result-fund-type').val();
		// 	var currency = $('select#result-currency').val();
		// }

		//get the result
		$.ajax({
			url: 'http://m.bpiassetmanagement.com/app/api/get_funds_search_result/'+fund_brand+'/'+risk_profile+'/'+fund_type+'/'+currency,
	        dataType: "jsonp",
	        success: function (data) {
	            // console.log(data);
	            var table = "";
	            table += "<table data-role=\"table\" border=\"0\" width=\"100%\" id=\"search-results-table\"  class=\"ui-responsive table-stroke\"><thead><th>&nbsp;</th><th align=\"left\" width=\"40%\">Bond Funds</th><th align=\"left\" width=\"10%\">NAVPU</th><th align=\"left\" width=\"10%\">DoD<small>2</small></th><th align=\"left\" width=\"10%\">YTD<small>3</small></th><th align=\"left\" width=\"10%\">1YR</th><th align=\"left\" width=\"10%\">3YRS</th><th align=\"left\" width=\"10%\">YRS</th></thead><tbody id=\"result_final\" cellspacing=\"2\" cellpadding=\"2\">";

	            $.each(data, function(i, result){

	            	var s = localStorage['star_ids'] ? localStorage['star_ids'] : '';
				    var match = s.split(',');
				    for (var a in match){
				    	var star_on = 'no';
				        var variable = match[a];

				        if(variable == result.id)
				        {
				        	star_on = 'yes';
				        	break;
				        }
				    }

				    if(star_on == 'yes')
				    {
				    	star_src = 'images/star-on-big.png';
				    	star_class = "star_on";
				    }else{
				    	star_src = 'images/star-off-big.png';
				    	star_class = "star_off";
				    }

                    //table += "<tr><td><div class='star' id="+result.id+"></div></td><td>"+result.fund_name+"</td><td>"+result.navpu+"</td><td>"+result.dod2+"</td><td>"+result.ytd3+"</td><td>"+result.year1+"</td><td>"+result.year2+"</td><td>"+result.year3+"</td></tr>";
                    table += "<tr><td><span><img class='star "+star_class+"' id="+result.id+" src="+star_src+" /></span></td><td><a href=\"#funddesc"+result.id+"\" data-rel=\"popup\" data-inline=\"true\" data-transition=\"pop\">"+result.fund_name+"</a><div data-role=\"popup\" id=\"funddesc"+result.id+"\"><p>"+result.description+"</p></div></td><td>"+result.navpu+"</td><td>"+result.dod2+"</td><td>"+result.ytd3+"</td><td>"+result.year1+"</td><td>"+result.year2+"</td><td>"+result.year3+"</td></tr>";
                	table += "<script>$(\"#funddesc"+result.id+"\").popup();</script>";
                });
                //table += "<script>$('.star').raty({numberMax: 1,starOff : 'images/star-off-big.png',starOn : 'images/star-on-big.png'});</script>";
                table += "<script>$('.star').click(function(event) {var star_id = $(this).attr('id'); if($(this).hasClass('star_off')){localStorage['star_ids'] += ','+star_id;$('#'+star_id).attr('src', 'images/star-on-big.png');$(this).removeClass('star_off');$(this).addClass('star_on');}else{var new_star_ids; var star_ids_array=localStorage['star_ids'].split(',');$.each(star_ids_array,function(key,value){if(star_id != value){new_star_ids+= ','+value;}});localStorage['star_ids']=new_star_ids;$('#'+star_id).attr('src', 'images/star-off-big.png');$(this).removeClass('star_on');$(this).addClass('star_off');}});</script>";
	           
	          	table += "</tbody>";

	          	$("div#is-body").html("");
	            $("h1#article-category").html("");
				$("h2#article-title").html("");
				$("div#article-body").html("");

	            $("span#page-article-title").html("Search Results");
	            $("div#article-body").html(table);
	            $("div#right-panel").panel("close");

	            setTimeout(function(){
			        $.mobile.loading('hide');
			    }, 1000);
	        }
	    });
		// $(document).on('pageshow',function(){
		// 	$( document ).on( "swipeleft swiperight", "#menu-result", function( e ) {
  //               // We check if there is no open panel on the page because otherwise
  //               // a swipe to close the left panel would also open the right panel (and v.v.).
  //               // We do this by checking the data that the framework stores on the page element (panel: open).
  //               if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
  //                   if ( e.type === "swipeleft"  ) {
  //                       $( "div#result-right-panel" ).panel( "open" );
  //                   } else if ( e.type === "swiperight" ) {
  //                       //$( "div#result-left-panel" ).panel( "open" );
  //                   }
  //               }
  //           });
  //       });

       

	});


	//favorites
	$('a#favorites').on('click', function(event) {
		var star_ids = "";
		var s = localStorage['star_ids'] ? localStorage['star_ids'] : '';

	    var match = s.split(',');
	    var ctr = 0;
	    for (var a in match){
	        var variable = match[a];

	        if(variable != 'undefined')
	        {
	        	//alert(variable);
	        	if(ctr == 0)
	        	{
	        		star_ids = variable;
	        	}else{
	        		star_ids += ','+variable;
	        	}
	        	ctr++;
	        }
	    }

	    if(star_ids.charAt( 0 ) == ',')
	    {
	    	star_ids = star_ids.substring(1);
	    }

		localStorage['star_ids'] = star_ids;

		$.mobile.showPageLoadingMsg("a", "Loading...", true);
		//alert(star_ids);
		//get the result
		$.ajax({
			url: 'http://m.bpiassetmanagement.com/app/api/favorites/?ids='+star_ids,
	        dataType: "jsonp",
	        success: function (data) {
	            //console.log(data);
	            var fav_table = "";
	           	fav_table += "<table data-role=\"table\" border=\"0\" width=\"100%\" id=\"search-results-table\"  class=\"ui-responsive table-stroke\"><thead><th>&nbsp;</th><th align=\"left\" width=\"40%\">Bond Funds</th><th align=\"left\" width=\"10%\">NAVPU</th><th align=\"left\" width=\"10%\">DoD<small>2</small></th><th align=\"left\" width=\"10%\">YTD<small>3</small></th><th align=\"left\" width=\"10%\">1YR</th><th align=\"left\" width=\"10%\">3YRS</th><th align=\"left\" width=\"10%\">YRS</th></thead><tbody id=\"result_final\" cellspacing=\"2\" cellpadding=\"2\">";

	            $.each(data, function(i, result){

	       //      	var s = localStorage['star_ids'] ? localStorage['star_ids'] : '';
				    // var match = s.split(',');
				    // for (var a in match){
				    // 	var star_on = 'no';
				    //     var variable = match[a];

				    //     if(variable == result.id)
				    //     {
				    //     	star_on = 'yes';
				    //     	break;
				    //     }
				    // }

				    // if(star_on == 'yes')
				    // {
				    // 	star_src = 'images/star-on-big.png';
				    // 	star_class = "star_on";
				    // }else{
				    // 	star_src = 'images/star-off-big.png';
				    // 	star_class = "star_off";
				    // }

				    star_class = "star_on";

				    star_src = 'images/star-on-big.png';

                    //table += "<tr><td><span><img class='star star_on' id="+result.id+" src="+star_src+" /></span></td><td><a  href='#fund_1' data-transition='pop' data-inline='true' data-rel='popup'>"+result.fund_name+"</a></td><td>"+result.navpu+"</td><td>"+result.dod2+"</td><td>"+result.ytd3+"</td><td>"+result.year1+"</td><td>"+result.year2+"</td><td>"+result.year3+"</td></tr>";
                	fav_table += "<tr><td><span><img class='star "+star_class+"' id="+result.id+" src="+star_src+" /></span></td><td><a href=\"#funddesc"+result.id+"\" data-rel=\"popup\" data-inline=\"true\" data-transition=\"pop\">"+result.fund_name+"</a><div data-role=\"popup\" id=\"funddesc"+result.id+"\"><p>"+result.description+"</p></div></td><td>"+result.navpu+"</td><td>"+result.dod2+"</td><td>"+result.ytd3+"</td><td>"+result.year1+"</td><td>"+result.year2+"</td><td>"+result.year3+"</td></tr>";
                	fav_table += "<script>$(\"#funddesc"+result.id+"\").popup();</script>";
                });
                //table += "<script>$('.star').raty({numberMax: 1,starOff : 'images/star-off-big.png',starOn : 'images/star-on-big.png'});</script>";
                fav_table += "<script>$('.star').click(function(event) {var star_id = $(this).attr('id'); if($(this).hasClass('star_off')){localStorage['star_ids'] += ','+star_id;$('#'+star_id).attr('src', 'images/star-on-big.png');$(this).removeClass('star_off');$(this).addClass('star_on');}else{var new_star_ids; var star_ids_array=localStorage['star_ids'].split(',');$.each(star_ids_array,function(key,value){if(star_id != value){new_star_ids+= ','+value;}});localStorage['star_ids']=new_star_ids;$('#'+star_id).attr('src', 'images/star-off-big.png');$(this).removeClass('star_on');$(this).addClass('star_off');}});</script>";
	           
	          	fav_table += "</tbody>";

	          	$("div#is-body").html("");
	            $("h1#article-category").html("");
				$("h2#article-title").html("");
				$("div#article-body").html("");

	            $("span#page-article-title").html("Search Results");
	            $("div#article-body").html(fav_table);
	            $("div#right-panel").panel("close");

	            setTimeout(function(){
			        $.mobile.loading('hide');
			    }, 1000);
	        }
	    });
	});
});
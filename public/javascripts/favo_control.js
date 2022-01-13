$(".favoButton").click(function() {
	//押されたボタンの特定
	const url = $(location).attr('pathname');
	const article_id = url.substr(9)
	console.log(article_id)
	const button = this;
	const mark = this.children[0]
	//お気に入りボタンのdata-conditionで制御
	if($(this).data('condition') == false){
  
	  //お気に入り登録
	  $.ajax({
		url: '/article',
		type: 'POST',
		dataType: 'text',
		data: {article_id: article_id, flg: 1},
	  })
	  .done(function() {
		//登録成功
		//if(data.result == true){
		  //お気に入りボタンの色を黄色に
		  //$(button).css('backgroundColor', '#FF0');
		  $(mark).attr("src","/images/favo_true.png")
		  //お気に入りボタン状態の更新
		  $(button).data('condition',true);
		//}
	  })
	  .fail(function(data, errorThrown) {
		console.log("error");
		console.log(errorThrown)
	  });
	  
	}
  
	else if($(this).data('condition') == true){
  
	  //お気に入り登録解除
	  $.ajax({
		url: '/article',
		type: 'POST',
		dataType: 'text',
		data: {article_id: article_id, flg: 2},
	  })
	  .done(function() {
		//登録解除成功
		//if(data.result == true){
		  //背景色を解除
		  //$(button).css('backgroundColor', '');
		  $(mark).attr("src","/images/favo_false.png")
		  //お気に入りボタン状態の更新
		  $(button).data('condition',false);
		//}
	  })
	  .fail(function(data) {
		console.log("error");
	  });
	}
  });
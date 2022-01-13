$(".favoButton").click(function() {
	
	var button = this
    const mark = this.children[0]
    console.log(mark)
	//お気に入りボタンのdata-conditionで制御
	if($(this).data('condition') == false){
	  //お気に入り登録
	  //お気に入りボタンの色を黄色に
	  //$(button).css('backgroundColor', '#FF0');
      $(mark).attr("src","/images/favo_true.png")
	  //お気に入りボタン状態の更新
	  $(button).data('condition',true);
	}
	else if($(this).data('condition') == true){

	  //お気に入り登録解除
	  //背景色を解除
	  //$(button).css('backgroundColor', '');
      $(mark).attr("src","/images/favo_false.png")
	  //お気に入りボタン状態の更新
	  $(button).data('condition',false);
	}
});
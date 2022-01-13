const textform = document.getElementsByClassName('textbox');
let cnt = 2;
// 親要素を取得
const form_area = document.getElementById('form_area');
//let..変動値
//const..固定値
window.onload =  function createForm() {
    // 要素を作成
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const td_content = document.createElement('td')
    const textbox = document.createElement('input');
    const plus_icon = document.createElement('img');
    const close_icon = document.createElement('img');
    const icon_area = document.createElement('div');
    const image_icon = document.createElement('label');
    const input_image = document.createElement('input');
    const preview = document.createElement('img');
    //id
    textbox.id = 'textbox1';
    icon_area.id = 'icon1';
    preview.id = 'preview1';
    //name
    textbox.name = 'content';
    input_image.name = 'content';
    // クラス名
    textbox.className = 'textbox';
    icon_area.className = 'icon_area';
    image_icon.className = 'image_icon';

    textbox.setAttribute('placeholder', 'テキスト');

    //function
    textbox.setAttribute('onkeydown', 'addForm(event)');
    input_image.setAttribute('type', 'file');
    input_image.setAttribute('accept', 'image/*');
    input_image.setAttribute('onchange', 'showPreview(this)');
    input_image.id = 'input_image1'


    textbox.addEventListener('focus',(a)=>{
        const Id = a.target.id
        const b = Id.substr(7)
        icon_set(b)
    });
    textbox.addEventListener('focusout',(a)=>{
        const Id = a.target.id
        const b = Id.substr(7)
        icon_delete(b)
    });

    textbox.addEventListener('input',(str)=>{
        //ここ直す
        const textForm = document.forms.article;
        const Id = str.target.id;
        const b = Id.substr(7)
        if(str.target.value == ""){
            //プラスアイコンを出す
            icon_set(b)
        }else{
            //プラスアイコンを消す
            icon_delete(b)
        }
    });

    
    //プラスボタン設定
    plus_icon.setAttribute('src', '/images/plus.png');
    plus_icon.setAttribute('onclick', 'showIconArea(id)');
    plus_icon.className = 'plus_icon';
    plus_icon.id = 1;

    //クローズボタン設定
    close_icon.setAttribute('src', '/images/close.png');
    close_icon.setAttribute('onclick', 'closeIconArea(id)');
    close_icon.className = 'close_icon';
    close_icon.id = 'close1'
    // 要素を追加
    form_area.appendChild(table).appendChild(tr).appendChild(td).appendChild(plus_icon);
    form_area.appendChild(table).appendChild(tr).appendChild(td_content).appendChild(textbox);
    form_area.appendChild(table).appendChild(tr).appendChild(td_content).appendChild(icon_area).appendChild(image_icon).appendChild(input_image);
    form_area.appendChild(table).appendChild(tr).appendChild(td_content).appendChild(close_icon);
    form_area.appendChild(table).appendChild(tr).appendChild(td_content).appendChild(preview);
}

function addForm(event) { 
    console.log("うごいた")
    // 要素を作成
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const td_content = document.createElement('td')
    const textbox = document.createElement('input');
    const plus_icon = document.createElement('img');
    const close_icon = document.createElement('img');
    const icon_area = document.createElement('div');
    const image_icon = document.createElement('label');
    const input_image = document.createElement('input');
    const preview = document.createElement('img');

    textbox.id = 'textbox'+cnt;
    icon_area.id = 'icon'+cnt;
    textbox.name = 'content';
    input_image.name = 'content';
    preview.id = 'preview'+cnt;
    // クラス名
    textbox.className = 'textbox';
    icon_area.className = 'icon_area';
    image_icon.className = 'image_icon';
    //function
    textbox.setAttribute('onkeydown', 'addForm(event)');
    input_image.setAttribute('type', 'file');
    input_image.setAttribute('accept', 'image/*');
    input_image.setAttribute('onchange', 'showPreview(this)');
    input_image.id = 'input_image'+cnt


    textbox.addEventListener('focus',(a)=>{
        const Id = a.target.id
        const b = Id.substr(7)
        icon_set(b)
    });
    textbox.addEventListener('focusout',(a)=>{
        const Id = a.target.id
        const b = Id.substr(7)
        icon_delete(b)
    });
    textbox.addEventListener('input',(str)=>{
        //ここ直す
        const textForm = document.forms.article;
        const Id = str.target.id;
        const b = Id.substr(7)
        if(str.target.value == ""){
            //プラスアイコンを出す
            icon_set(b)
        }else{
            //プラスアイコンを消す
            icon_delete(b)
        }
    });

    // 親要素を取得
    const form_area = document.getElementById('form_area');
    //id生成
    const current_textbox = 'textbox'+cnt;  
    //プラスボタン設定
    plus_icon.setAttribute('src', '/images/plus.png');
    plus_icon.setAttribute('onclick', 'showIconArea(id)');
    plus_icon.className = 'plus_icon';
    plus_icon.id = cnt;
    //クローズボタン設定
    close_icon.setAttribute('src', '/images/close.png');
    close_icon.setAttribute('onclick', 'closeIconArea(id)');
    close_icon.className = 'close_icon';
    close_icon.id = 'close'+cnt;


    // 要素を追加
    if(event.key === 'Enter'){
        form_area.appendChild(table).appendChild(tr).appendChild(td).appendChild(plus_icon);
        form_area.appendChild(table).appendChild(tr).appendChild(td_content).appendChild(textbox);
        form_area.appendChild(table).appendChild(tr).appendChild(td_content).appendChild(icon_area).appendChild(image_icon).appendChild(input_image);
        form_area.appendChild(table).appendChild(tr).appendChild(td_content).appendChild(close_icon);
        form_area.appendChild(table).appendChild(tr).appendChild(td_content).appendChild(preview);
        document.getElementById(current_textbox).focus();
        cnt++;
        //Enterキーでsubmitさせない
        event.preventDefault();
    }
    if(event.key === 'ArrowDown'){
        //開発中
    }
}

//プラスボタン表示非表示
function icon_set(id) {
    document.getElementById(id).style.visibility = "visible";
}
function icon_delete(id) {
    setTimeout(() => {
        document.getElementById(id).style.visibility = "hidden";  
    }, 300);
}


//選択した画像をプレビュー表示
function showPreview(param) {
    const Id = param.id.substr(11)
    area_id = 'icon'+Id;
    textbox_id = 'textbox'+Id;
    close_icon_id = 'close'+Id;
    let loadCompleteCount = 0;
    const reader = new FileReader();
    const file = param.files[0];
    const preview_id = "preview"+Id
    preview = document.getElementById(preview_id)
    //imgタグの場所を検索する
    reader.onload = function() {
        preview.setAttribute('src', reader.result);
    };
    reader.readAsDataURL( file );
    document.getElementById(area_id).style.display = "none";
    document.getElementById(close_icon_id).style.display = "none";
    document.getElementById(textbox_id).style.display = "none";
    document.getElementById(textbox_id).value = 'img'
}

function showIconArea(param) {
    area_id = 'icon'+param;
    textbox_id = 'textbox'+param;
    close_icon_id = 'close'+param;
    document.getElementById(area_id).style.display = "block";
    document.getElementById(close_icon_id).style.display = "block";
    document.getElementById(textbox_id).style.display = "none";
}

function closeIconArea(param) {
    Id = param.substr(5)
    area_id = 'icon'+Id;
    textbox_id = 'textbox'+Id;
    close_icon_id = 'close'+Id;
    document.getElementById(area_id).style.display = "none";
    document.getElementById(close_icon_id).style.display = "none";
    document.getElementById(textbox_id).style.display = "block";
}
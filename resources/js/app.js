import './bootstrap';

// data
import listData from './data/listData.js';
import listDataWithPulldown from './data/listDataWithPulldown.js';

/* -----------------------------------------------
    画面共通処理
----------------------------------------------- */
/* --------------- SPのグローバルメニューのリスト表示設定 --------------- */
$(function() {
    $('.js-global-menu__btn-sp').on('click', function(){
        $('.js-global-menu').slideToggle();
    });
});


/* --------------- サイドメニュー表示設定 --------------- */
$('.js-type-toggle').on('click', function(){

    // 1. [項目選択]ボタンの表示非表示
    $('.js-btn--type').slideToggle(500);

    // 2. 全てのリストを非表示
    $('.js-btn--list').hide();
    $('.js-btn--down').hide();

    // 3. テキスト表示変更
    let btn_text = $(this).text();
    if (btn_text == "項目一覧 ▼"){
        $(this).text('項目一覧 ▲');
    }else{
        $(this).text('項目一覧 ▼');
    }

});


/* -----------------------------------------------
    画面：商品紹介
----------------------------------------------- */
/* --------------- 初期表示設定 --------------- */

// 全商品コンテナ・項目選択ボタン非表示
$('.js-syouhin-container').hide();
$('.js-btn--type').hide();

// 登録内容確認画面時のみ表示（※例外パターン）
$('.form-confirm').find('.js-syouhin-container').show();


/* ---------------　変数設定 ---------------　*/

// CSS定義
const bg_orange = {background:"rgba(255,165,0,0.5)",color:"beige"};

// ボタン定義（[項目選択]-[商品一覧]）
const lists = listData;

// ボタン定義（[項目選択]-[商品一覧]-[プルダウン]）
const pulldown__area = listDataWithPulldown['area'];


/* ---------------　実行処理 ---------------　*/

/**
 * 〜 [項目選択]ボタン押下時処理 〜
 * @param name string・・・[項目選択]名
 * @param time int・・・トグル表示の時間
 */
function sortBtn(name, time){
    $('.js-'+name+'-type').click(function(){
        // 選択中のリストのCSS指定
        $('.js-btn--type').find('a').css({background:"none"});
        $(this).find('a').css(bg_orange);
        // クリックしたリストのみを表示する
        $('.message').hide();
        $('.js-btn--list').hide();
        $('.js-btn--down').hide();
        $('.js-'+name+'-list').slideToggle(time);
    });
};

// [項目選択]-[商品一覧]のみの時に適用
$.each(lists, function(index, list){
    sortBtn(list['name'], list['time']);
});
// [項目選択]-[商品一覧]-[プルダウン]時に適用
sortBtn(pulldown__area[0]['name'][0], pulldown__area[0]['time']);

/**
 * 〜 [商品一覧]ボタン押下時処理（[プルダウン]なし） 〜
 * @param name string・・・[項目選択]名
 * @param match string・・・表示させるクラス抽出の正規表現
 */
function listBtn(name, match){
    $('.js-'+name+'-list').click(function(){
        // クリックしたリストのみのテキストを取得し、タイトル(h3)のテキストを変更
        var text =  $(this).text();
        $('.js-syouhin-title').text(text);
        // 選択中のリストのCSS指定
        $('.js-btn--list').find('a').css({background:"none"});
        $(this).find('a:hover').css({background:"rgba(255,165,0,0.5)"});
        // クリックしたリストのみのjs-〜のクラス名を取得
        var js_class = $(this).attr('class').match(match);
        var show_class = '.' + js_class + '_';
        // クリックしたリストの商品コンテナのみを表示する
        $('.js-syouhin-container').hide();
        $('.message').hide();
        $(show_class).slideDown(1000);
    });
};

// [項目選択]-[商品一覧]のみの時に適用
$.each(lists, function(index, list){
    listBtn(list['name'], list['match']);
});

// 対象商品がないメッセージを表示させる商品
$('.js-aging_Joven').on('click', function(){
    $('.message').show();
});

/**
 * 〜 [商品一覧]ボタン押下時処理（[プルダウン]あり） 〜
 * @param name[0] string・・・[項目選択]名
 * @param name[1] string・・・[商品一覧]名
 * @param time int・・・トグル表示の時間
 * @param match string・・・表示させるクラス抽出の正規表現
 * @param hide  array・・・非表示にさせたいクラス
 */
function listBtnWithDown(name, time, match, hide){
    $('.js-'+name[0]+'_'+match).click(function(){
        // 対象のエリアのリストを非表示
        $('.js-'+name[1]+'_'+hide[0]).hide();
        $('.js-'+name[1]+'_'+hide[1]).hide();
        $('.js-'+name[1]+'_'+hide[2]).hide();
        // クリックしたリストのみのテキストを取得し、タイトル(h3)のテキストを変更
        var text =  $(this).text();
        $('.js-syouhin-title').text(text);
        // 選択中のリストのCSS指定
        $('.js-btn--list').find('a').css({background:"none"});
        $(this).find('a:hover').css({background:"rgba(255,165,0,0.5)"});
        // クリックしたリストの商品コンテナのみを表示する
        $('.js-syouhin-container').hide();
        $('.message').hide();
        $('.js-'+name[1]+'_'+match).slideDown(time);
        $('.js-'+name[0]+'_'+match+'_').slideDown(time);
    });
};

// [項目選択]-[商品一覧]-[プルダウン]時に適用
$.each(pulldown__area, function(index, list){
    listBtnWithDown(list['name'], list['time'], list['match'][0], list['hide']);
});

/**
 * 〜 [プルダウン]ボタン押下時処理 〜
 * @param name[1] string・・・[商品一覧]名
 * @param time int・・・トグル表示の時間
 * @param match[0] string・・・表示させる個別の[商品一覧]名
 * @param match[1] string・・・表示させるクラス抽出の正規表現
 * @param hide  array・・・非表示にさせたいクラス
 */
function DownBtn(name, time, match, hide){
    $('.js-'+name[1]+'_'+match[0]).click(function(){
        // 対象のエリアのリストを非表示
        $('.js-'+name[1]+'_'+hide[0]).hide();
        $('.js-'+name[1]+'_'+hide[1]).hide();
        $('.js-'+name[1]+'_'+hide[2]).hide();
        // クリックしたリストのみのテキストを取得し、タイトル(h3)のテキストを変更
        var text =  $(this).text();
        $('.js-syouhin-title').text(text);
        // 選択中のリストのCSS指定
        $('.js-btn--down').find('a').css({background:"none"});
        $(this).find('a:hover').css({background:"rgba(255,165,0,0.5)"});
        // クリックしたリストのみのjs-〜のクラス名を取得
        var js_class = $(this).attr('class').match(match[1]);
        var show_class = '.' + js_class + '_';
        // クリックしたリストの商品コンテナのみを表示する
        $('.js-syouhin-container').hide();
        $('.message').hide();
        $(show_class).slideDown(time);
    });
};

// [項目選択]-[商品一覧]-[プルダウン]時に適用
$.each(pulldown__area, function(index, list){
    DownBtn(list['name'], list['time'], list['match'], list['hide']);
});


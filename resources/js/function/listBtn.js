import js from '../data/classNames'; // JS操作用classNameデータ
import hideClass from '../function/hideClass';
import getClickClass from '../function/getClickClass';
import addCSS from '../function/addCSS';

/** 〜 [商品一覧]ボタン押下時処理（[プルダウン]なし） 〜
 * @param name string・・・[項目選択]名
 * @param match string・・・表示させるクラス抽出の正規表現
*/
function listBtn(name, match){

    // クリック時の処理
    $(js.prefix + name + '-list').on('click', function(){

        // 1. クリックしたリストのみのテキストを取得し、タイトル(h3)のテキストを変更
        const text =  $(this).text();
        $(js.syouhin_title).text(text);

        // 2. 選択中のリストのCSS指定
        addCSS(this, js.btn_list, { background: "rgba(255,165,0,0.5)" });

        // 3. 一度、商品コンテナとメッセージを非表示
        hideClass([js.syouhin_container, js.syouhin_message]);

        // 4. クリックしたリストのみのjs-〜のクラス名を取得
        const clickClass = getClickClass(this, match);

        // 5. クリックしたリストの商品コンテナのみを表示する
        $(clickClass).slideDown(1000);

    });

};
export default listBtn
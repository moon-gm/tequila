<?php

namespace App\Http\Controllers;

use App\SyouhinTable;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\ApplyInfo\ApplyInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\Helper;
use Illuminate\View\View;

class SyouhinController extends Controller
{

    public function syouhin()
    {
        // DB(tequila)のTable(syouhin)から全てのデータを取得
        $syouhin_data_all = DB::table('syouhin')->get();

        // 配列内の重複する値を削除して昇順にする
        function doubleDelete($list, $delete_key)
        {
            // 連想配列の（$delete_key）のValueで重複を削除
            $value_confirm = $lists = [];
            foreach ($list as $value) {
                if (!in_array($value[$delete_key], $value_confirm)) {
                    $value_confirm[] = $value[$delete_key];
                    $lists[] = $value;
                }
            }
            // 昇順に並び替え
            asort($lists);
            // 重複削除した配列を返却
            return $lists;
        }

        // タイトル抽出・・・DB取得したデータからタイトルを抽出し、連想配列化
        $title = [];
        foreach ($syouhin_data_all as $item) {
            $title[] = [
                'title' => $item->title_name,
                'title_id' => $item->title_id,
            ];
        }
        $titles = doubleDelete($title, 'title');

        // NOM抽出・・・DB取得したデータからNOMを抽出し、連想配列化
        $nom = [];
        foreach ($syouhin_data_all as $item) {
            $nom[] = [
                'nom' => $item->contents_nom,
                'dest' => $item->contents_dest,
            ];
        }
        $noms = doubleDelete($nom, 'nom');

        // 生産地方抽出・・・DB取得したデータから生産地方を抽出し、連想配列化
        $local = [];
        foreach ($syouhin_data_all as $item) {
            $local[] = [
                'local' => $item->contents_local,
                'local_id' => $item->contents_local_id,
            ];
        }
        $locals = doubleDelete($local, 'local');

        // 熟成度合い設定・・・連想配列化
        $agings =[
            ['aging_id' => 'Blanco', 'aging_name' => 'ブランコ', 'description' => '〜熟成期間1ヶ月未満（シルバー・プラタ）〜'],
            ['aging_id' => 'Hoben', 'aging_name' => 'ホベン', 'description' => '〜ブランコにレポサドかアネホを混合〜'],
            ['aging_id' => 'Gold', 'aging_name' => 'ゴールド', 'description' => '〜特に規定なし〜'],
            ['aging_id' => 'Reposado', 'aging_name' => 'レポサド', 'description' => '〜熟成期間最低2ヶ月〜'],
            ['aging_id' => 'Anejo', 'aging_name' => 'アネホ', 'description' => '〜熟成期間最低1年〜'],
            ['aging_id' => 'ExtraAnejo', 'aging_name' => 'エクストラアネホ', 'description' => '〜熟成期間最低3年〜'],
            ['aging_id' => 'Others', 'aging_name' => 'その他', 'description' => '〜上記以外の特殊なもの〜'],
            ['aging_id' => 'Mezcal', 'aging_name' => '※メスカル', 'description' => '〜原材料は同じでもテキーラではないもの〜'],
            ['aging_id' => 'Cocktail', 'aging_name' => '※カクテル', 'description' => '〜添加物ありのリキュール〜'],
        ];

        return view('tequila.syouhin')
            ->with('syouhin_data_all', $syouhin_data_all)
            ->with('titles', $titles)
            ->with('locals', $locals)
            ->with('noms', $noms)
            ->with('agings', $agings);
    }
}

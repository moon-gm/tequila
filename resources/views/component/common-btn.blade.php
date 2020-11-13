{{-- コンポーネント：共通ボタン --}}
<li
    class="
        {{config('app_class_css.common_btn')}}
        {{config('app_class_css.common_btn')}}--{{ $btn }}
        {{config('app_class_js.js_btn')}}--{{ $btn }}
        {{ !empty($js_class_1) ? $js_class_1 : null }}
        {{ !empty($js_class_2) ? $js_class_2 : null }}
        {{ !empty($js_class_3) ? $js_class_3 : null }}
    "
    {{ $hidden ? 'hidden' : null }}
>
    <a {{ !empty($link) ? 'href=' . $link : null }}>
        {{ $text }}
        @if(!empty($small_text))
            <br>
            <span class={{config('app_class_css.small_text')}}>
                {{ $small_text }}
            </span>
        @endif
    </a>
</li>
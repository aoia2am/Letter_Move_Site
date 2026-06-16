/* ===============================
   リセット
================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* ===============================
   全体
================================= */

body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    background-color: #3270E1;
    transition: background-color 0.5s ease;

    font-family:
        "BIZ UDPMincho",
        "BIZ UDMincho",
        serif;
}

/* 無花果モード */

body.fig-mode {
    background-color: #532e3b;
}

body.fig-mode .word {
    color: #000000;
}

/* ===============================
   星空Canvas
================================= */

#space-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
}

/* ===============================
   文字配置
================================= */

#container {
    position: absolute;
    left: 140px;
    top: 140px;
    z-index: 10;
}

.word {
    color: #FFFFFF;
    cursor: pointer;
    user-select: none;

    transition:
        color 0.5s ease,
        transform 1.2s cubic-bezier(.2,.9,.3,1.2),
        opacity 1.2s ease;
}

.small {
    font-size: 72px;
    line-height: 1.1;
}

.large {
    margin-top: 40px;
    font-size: 120px;
    line-height: 1;
}

/* ===============================
   造花（二重表示）
================================= */

#flower-container {
    position: relative;
    margin-top: 10px;
    width: 200px;
    height: 100px;
}

#flower1,
#flower2 {
    position: absolute;
}

#flower2 {
    left: 12px;
}

/* 飛んでいく演出 */

.run-away {
    transform: translate(120vw, -25vh) scale(0.5);
    opacity: 0;
}
/* ===============================
   【完全修正】iPhone17（402px）で絶対に折り返さない調整
================================= */
@media screen and (max-width: 480px) {
    
    /* 
       文字が折り返してしまう原因を防ぐため、
       スマホ版だけ縦並びのブロック（FlexBox）に強制変更します。
    */
    #container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        
        left: 40px;
        top: 50%;
        transform: translateY(-50%);
        width: auto; /* 幅を自動にして、文字が潰れるのを防ぐ */
    }

    /* 
       【超重要】
       ブラウザが勝手に文字を改行（折り返し）するのを100%禁止します。
    */
    .word {
        display: inline-block !important;
        white-space: nowrap !important; /* 絶対に折り返さない命令 */
    }

    /* 「星空」「造花」のサイズ */
    .small {
        font-size: 38px;
        line-height: 1.1;
    }

    /* 「無花果」のサイズ */
    .large {
        margin-top: 15px;
        font-size: 64px;
        line-height: 1;
    }

    /* 造花コンテナも折り返さないように横幅を確保 */
    #flower-container {
        display: block;
        margin-top: 5px;
        width: 120px;
        height: 50px;
    }

    #flower1,
    #flower2 {
        position: absolute;
    }

    #flower2 {
        left: 8px;
    }
}

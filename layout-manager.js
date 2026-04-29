// layout-manager.js - 質感升級版：亮色系選單 + 原始字體大小
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('tony-unique-header')) return;

    const style = document.createElement('style');
    style.textContent = `
        /* --- 1. 全局強制修正 --- */
        :root {
            --tony-dark: #060b1c;
            --tony-light: #f9f9f9;
        }

        html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
            background-color: var(--tony-light) !important;
            -webkit-text-size-adjust: 100%;
        }

        /* --- 2. Banner --- */
        .tony-banner {
            position: relative;
            width: 100% !important;
            height: 140px;
            background-color: var(--tony-dark);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            padding-left: max(20px, env(safe-area-inset-left));
            padding-right: max(20px, env(safe-area-inset-right));
            box-sizing: border-box;
            z-index: 1000;
            overflow: hidden;
            margin: 0 !important;
        }

        .logo-box { height: 112px; flex-shrink: 0; }
        .logo-box img { height: 100%; width: auto; display: block; }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
            flex-wrap: nowrap;
        }

        .pill-btn {
            color: white; border: 1px solid rgba(255,255,255,0.6);
            padding: 10px 18px; border-radius: 50px;
            text-decoration: none; font-size: 18px;
            display: flex; align-items: center; gap: 8px;
            transition: 0.3s; white-space: nowrap;
            font-family: 'Noto Sans TC', sans-serif;
            flex-shrink: 0;
        }
        .social-icon { height: 22px; width: auto; display: block; }

        .hamburger-icon {
            font-size: 40px !important;
            color: white;
            cursor: pointer;
            margin-right: 5px;
            flex-shrink: 0;
        }

        /* --- 3. Overlay --- */
        .menu-overlay {
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.45);
            z-index: 99998; display: none;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
        }
        .menu-overlay.open { display: block; }

        /* --- 4. 側邊選單外框 --- */
        .side-menu {
            position: fixed;
            top: 0; bottom: 0;
            left: -360px;
            width: 340px;
            max-width: 92%;
            background: #ffffff;
            z-index: 99999;
            transition: left 0.38s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 0 0 80px 0;
            visibility: hidden;
            box-sizing: border-box;
            overflow-y: auto;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
            box-shadow: 4px 0 30px rgba(0,0,0,0.12);
        }
        .side-menu.open { left: 0; visibility: visible; }

        /* --- 5. 選單 Header --- */
        .menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 22px 20px 18px 20px;
            border-bottom: 1px solid #f0ede8;
            margin-bottom: 14px;
            position: sticky;
            top: 0;
            background: #ffffff;
            z-index: 10;
        }
        .menu-brand {
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 0.02em;
            color: #1a1a1a;
            font-family: 'Noto Sans TC', sans-serif;
            line-height: 1.3;
        }
        .menu-brand span { color: #7c6fcd; }

        .menu-close-btn {
            width: 48px; height: 48px;
            border-radius: 50%;
            background: #f2f0eb;
            border: none;
            display: flex; align-items: center; justify-content: center;
            font-size: 22px; color: #888;
            cursor: pointer;
            flex-shrink: 0;
            font-family: sans-serif;
            line-height: 1;
        }

        /* --- 6. 選單連結區 --- */
        .menu-links {
            padding: 0 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        /* 所有卡片共用基礎 */
        .menu-card {
            border-radius: 16px;
            padding: 18px 20px;
            padding-right: 16px;
            display: flex;
            align-items: center;
            text-decoration: none;
            cursor: pointer;
            transition: transform 0.15s, filter 0.15s;
            position: relative;
        }
        .menu-card:hover {
            transform: scale(0.983);
            filter: brightness(0.96);
        }
        .menu-card-text { flex: 1; min-width: 0; }

        .menu-card-title {
            font-size: 26px;
            font-weight: 700;
            line-height: 1.3;
            font-family: 'Noto Sans TC', sans-serif;
            white-space: normal;
            word-break: break-word;
        }
        .menu-card-sub {
            font-size: 16px;
            margin-top: 6px;
            line-height: 1.5;
            font-family: 'Noto Sans TC', sans-serif;
        }
        .menu-card-arr {
            font-size: 22px;
            margin-left: 14px;
            flex-shrink: 0;
        }

        /* 回首頁 */
        .mc-home {
            background: #f7f5f2;
            border: 1px solid #ebe8e2;
        }
        .mc-home .menu-card-title { color: #666; font-weight: 600; }
        .mc-home .menu-card-arr   { color: #bbb; }

        /* 課程詳細介紹 — 金黃 */
        .mc-courses {
            background: #fffbf0;
            border: 1px solid #f0d97a;
        }
        .mc-courses .menu-card-title { color: #7a5c00; }
        .mc-courses .menu-card-sub   { color: #a07c20; }
        .mc-courses .menu-card-arr   { color: #c9a030; }

        /* 學測英文作文班 — 薰衣草紫 */
        .mc-sat {
            background: #f3f1ff;
            border: 1px solid #c4b8f5;
        }
        .mc-sat .menu-card-title { color: #3d2d9e; }
        .mc-sat .menu-card-sub   { color: #6b5bbf; }
        .mc-sat .menu-card-arr   { color: #7c6fcd; }

        /* 全民英檢中級寫作 — 玫瑰紅 */
        .mc-gept {
            background: #fff1f2;
            border: 1px solid #fbb6be;
        }
        .mc-gept .menu-card-title { color: #9b1c2e; }
        .mc-gept .menu-card-sub   { color: #c0404f; }
        .mc-gept .menu-card-arr   { color: #e05060; }

        /* 訂閱課程 — 流光金 */
        .mc-sub {
            background: #fffbef;
            border: 1px solid rgba(212,170,40,0.3);
            animation: subGlow 2.8s ease-in-out infinite alternate;
        }
        @keyframes subGlow {
            from { border-color: rgba(212,170,40,0.25); box-shadow: none; }
            to   { border-color: rgba(212,150,0,0.7); box-shadow: 0 0 16px rgba(212,170,40,0.18); }
        }
        .mc-sub .menu-card-sub { color: #a07820; }
        .mc-sub .menu-card-arr { color: #c9a030; }

        .shimmer-text {
            font-size: 26px;
            font-weight: 900;
            display: inline-block;
            background: linear-gradient(120deg, #b8860b 10%, #f5c842 45%, #ffe680 55%, #f5c842 65%, #b8860b 90%);
            background-size: 250% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shineText 3s linear infinite;
            font-family: 'Noto Sans TC', sans-serif;
        }
        @keyframes shineText { to { background-position: 250% center; } }

        .flame-icon {
            font-size: 32px;
            margin-left: 10px;
            flex-shrink: 0;
            animation: flamePulse 1.7s ease-in-out infinite alternate;
        }
        @keyframes flamePulse {
            from { transform: scale(1) rotate(-2deg); filter: drop-shadow(0 0 3px rgba(255,140,0,0.4)); }
            to   { transform: scale(1.2) rotate(2deg); filter: drop-shadow(0 0 10px rgba(255,200,0,0.9)); }
        }

        /* 分隔線 */
        .menu-divider {
            height: 1px;
            background: #f0ede8;
            margin: 4px 0;
        }

        /* 一般服務項目 */
        .mc-plain {
            background: #f7f5f2;
            border: 1px solid #ebe8e2;
        }
        .mc-plain .menu-card-title { color: #3a3630; font-weight: 600; }
        .mc-plain .menu-card-sub   { color: #9a9590; }
        .mc-plain .menu-card-arr   { color: #ccc; }

        /* LINE — 薄荷綠 */
        .mc-line {
            background: #f0faf4;
            border: 1px solid #86d9a8;
        }
        .mc-line .menu-card-title { color: #0d6e35; font-weight: 800; }
        .mc-line .menu-card-sub   { color: #3a9e60; }
        .mc-line .menu-card-arr   { color: #2db360; }

        /* --- 7. iPad 補丁 --- */
        @media screen and (min-width: 768px) and (max-width: 1199px) {
            #tony-schedule-container {
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                padding-left: 30px !important;
                padding-right: 30px !important;
            }
            body::before {
                content: "";
                position: fixed;
                top: 0; left: 0; width: 100%; height: 140px;
                background-color: var(--tony-dark);
                z-index: -1;
            }
        }

        /* --- 8. 手機版 Banner --- */
        @media (max-width: 600px) {
            .tony-banner { height: 100px; padding: 0 10px; }
            .logo-box { height: 70px; }
            .nav-links { gap: 5px; }
            .pill-btn {
                padding: 0;
                width: 40px; height: 40px;
                justify-content: center;
                border-radius: 50%;
            }
            .pill-btn span { display: none; }
            .social-icon { height: 20px; }
            .hamburger-icon { font-size: 32px !important; }
        }
    `;
    document.head.appendChild(style);

    const menuHTML = `
        <div class="menu-overlay" id="menu-overlay"></div>

        <nav class="side-menu" id="side-menu">
            <div class="menu-header">
                <div class="menu-brand">Tony 線上美語家教<span>．</span></div>
                <button class="menu-close-btn" id="menu-close">✕</button>
            </div>

            <div class="menu-links">

                <a href="index.html" class="menu-card mc-home">
                    <div class="menu-card-text">
                        <div class="menu-card-title">回首頁</div>
                    </div>
                    <span class="menu-card-arr">›</span>
                </a>

                <a href="https://tonyonlineenglish.netlify.app/allcourses" target="_blank" class="menu-card mc-courses">
                    <div class="menu-card-text">
                        <div class="menu-card-title">課程詳細介紹</div>
                        <div class="menu-card-sub">升學 · 檢定 · 職場 · 公職 · 客製化</div>
                    </div>
                    <span class="menu-card-arr">↗</span>
                </a>

                <a href="https://tonyonlineenglish.netlify.app/hsw" target="_blank" class="menu-card mc-sat">
                    <div class="menu-card-text">
                        <div class="menu-card-title">學測英文作文班</div>
                        <div class="menu-card-sub">最新學測 · 高中英文 · 培養 · 衝刺</div>
                    </div>
                    <span class="menu-card-arr">↗</span>
                </a>

                <a href="https://tonyonlineenglish.netlify.app/inter36w" target="_blank" class="menu-card mc-gept">
                    <div class="menu-card-text">
                        <div class="menu-card-title">全民英檢中級寫作</div>
                        <div class="menu-card-sub">三/六回影片課程 · 家教 · 批改</div>
                    </div>
                    <span class="menu-card-arr">↗</span>
                </a>

                <a href="https://tonyonlineenglish.netlify.app/sub" target="_blank" class="menu-card mc-sub">
                    <div class="menu-card-text">
                        <div class="shimmer-text">學員訂閱課程</div>
                        <div class="menu-card-sub">高 CP 值 · 持續學習</div>
                    </div>
                    <span class="flame-icon">🔥</span>
                    <span class="menu-card-arr">↗</span>
                </a>

                <div class="menu-divider"></div>

                <a href="https://tonyonlineenglish.netlify.app/ycs" target="_blank" class="menu-card mc-plain">
                    <div class="menu-card-text">
                        <div class="menu-card-title">你的課表查詢</div>
                        <div class="menu-card-sub">即時查看課程安排狀況</div>
                    </div>
                    <span class="menu-card-arr">↗</span>
                </a>

                <a href="https://tonyonlineenglish.netlify.app/exper" target="_blank" class="menu-card mc-plain">
                    <div class="menu-card-text">
                        <div class="menu-card-title">預約體驗課程</div>
                        <div class="menu-card-sub">25 / 50 分鐘線上試聽</div>
                    </div>
                    <span class="menu-card-arr">↗</span>
                </a>

                <a href="https://line.me/ti/p/T9YdimtG8_" target="_blank" class="menu-card mc-line">
                    <div class="menu-card-text">
                        <div class="menu-card-title">LINE 直接聯絡</div>
                        <div class="menu-card-sub">ID: Myavalon</div>
                    </div>
                    <span class="menu-card-arr">↗</span>
                </a>

            </div>
        </nav>

        <header class="tony-banner" id="tony-unique-header">
            <a href="index.html" class="logo-box">
                <img src="https://ik.imagekit.io/lql1uveoc/IMG_9614.PNG?updatedAt=1750437382543" alt="Logo">
            </a>
            <nav class="nav-links">
                <div id="global-hamburger" class="hamburger-icon">☰</div>
                <a href="https://www.youtube.com/@TonyOnlineEnglish" target="_blank" class="pill-btn">
                    <img src="https://ik.imagekit.io/lql1uveoc/Banner%20Front%20page/youtube.png" class="social-icon">
                    <span>YouTube</span>
                </a>
                <a href="https://www.facebook.com/share/1LwadaizKW/?mibextid=wwXIfr" target="_blank" class="pill-btn">
                    <img src="https://ik.imagekit.io/lql1uveoc/Banner%20Front%20page/facebook.png" class="social-icon">
                    <span>Facebook</span>
                </a>
                <a href="https://www.instagram.com/tonyonlineenglish" target="_blank" class="pill-btn">
                    <img src="https://ik.imagekit.io/lql1uveoc/instagram.png" class="social-icon">
                    <span>Instagram</span>
                </a>
                <a href="https://line.me/ti/p/T9YdimtG8_" target="_blank" class="pill-btn">
                    <img src="https://ik.imagekit.io/lql1uveoc/Banner%20Front%20page/line.png" class="social-icon">
                    <span>LINE</span>
                </a>
            </nav>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    const hamburger = document.getElementById('global-hamburger');
    const sideMenu  = document.getElementById('side-menu');
    const overlay   = document.getElementById('menu-overlay');
    const closeBtn  = document.getElementById('menu-close');

    function openMenu() {
        sideMenu.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
});

// layout-manager.js - 終極修正版：解決 iPad 直/橫放白條問題 + 原版高級深色漸層 + 訂閱制卡片發光 + 智慧黑白外連 Icon
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('tony-unique-header')) return;

    const style = document.createElement('style');
    style.textContent = `
        /* --- 1. 全局強制修正：剷除所有潛在白邊 --- */
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

        /* --- 2. Banner 基礎設定：確保深藍色橫向漆滿 --- */
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

        /* 右側按鈕區 */
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

        /* --- 3. 側邊選單樣式 --- */
        .side-menu {
            position: fixed; 
            top: 0; 
            bottom: 0; 
            left: -320px; 
            width: 320px; 
            max-width: 85%; 
            background: var(--tony-dark); 
            z-index: 99999; 
            transition: left 0.4s ease; 
            padding: 40px 20px 80px 20px; 
            visibility: hidden;
            box-sizing: border-box;
            overflow-y: auto !important; 
            overscroll-behavior: contain; 
            -webkit-overflow-scrolling: touch; 
            display: block; 
        }
        .side-menu.open { left: 0; visibility: visible; }
        
        .menu-link {
            position: relative; /* 為了讓右上角 Icon 絕對定位 */
            color: white; text-decoration: none; font-size: 26px !important;
            font-weight: 700; padding: 18px; 
            padding-right: 36px; /* 預留右側空間，避免文字蓋住 Icon */
            background: rgba(255,255,255,0.05);
            border-radius: 12px; display: block; margin-bottom: 15px;
            white-space: normal; 
            word-wrap: break-word;
        }
        .menu-link span { 
            display: block; font-size: 16px !important; color: #94a3b8; margin-top: 6px; 
            line-height: 1.4; white-space: normal; 
        }

        /* 智慧外連 Icon 樣式設定 (預設在深底上強制轉為純白色) */
        .ext-icon {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 16px;
            height: auto;
            filter: brightness(0) invert(1); /* 強制變成純白色 */
            opacity: 0.4;
            transition: opacity 0.3s;
        }
        .menu-link:hover .ext-icon {
            opacity: 0.9; /* 滑鼠移過去變亮 */
        }

        /* 課程詳細介紹 - 高對比黃底黑字 */
        .highlight-course {
            background: #FFD700 !important; 
            color: #000 !important; 
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
        }
        .highlight-course span { color: #333 !important; font-weight: 700; }
        /* 黃底上將 Icon 強制轉為黑色 */
        .highlight-course .ext-icon { 
            filter: brightness(0); /* 強制變成純黑色 */
            opacity: 0.4; 
        }
        .highlight-course:hover .ext-icon { opacity: 0.8; }

        /* 學測英文作文班 - 恢復質感深藍紫漸層 + 白字 */
        .sat-course {
            background: linear-gradient(135deg, #3b4fd8 0%, #6f42c1 100%) !important;
            color: #ffffff !important;
            box-shadow: 0 4px 12px rgba(111, 66, 193, 0.3);
        }
        .sat-course span { color: rgba(255, 255, 255, 0.9) !important; }

        /* 全民英檢中級寫作 - 恢復質感深紅漸層 + 白字 */
        .gept-course {
            background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%) !important;
            color: #ffffff !important;
            box-shadow: 0 4px 12px rgba(197, 48, 48, 0.3);
        }
        .gept-course span { color: rgba(255, 255, 255, 0.9) !important; }

        /* --- 訂閱制專屬：卡片邊框發亮 + 大字體掃光特效 --- */
        .sub-card {
            border: 2px solid #FAD961;
            background: rgba(250, 217, 97, 0.08) !important;
            animation: cardGlow 2s ease-in-out infinite alternate;
        }
        @keyframes cardGlow {
            from { 
                box-shadow: 0 0 5px rgba(250, 217, 97, 0.2); 
                border-color: rgba(250, 217, 97, 0.4);
            }
            to { 
                box-shadow: 0 0 16px rgba(250, 217, 97, 0.8); 
                border-color: #FAD961;
            }
        }

        .shimmer-text {
            font-size: 26px !important;
            font-weight: 900;
            display: inline-block;
            background: linear-gradient(120deg, #FAD961 20%, #FFFFFF 50%, #FAD961 80%);
            background-size: 200% auto;
            color: transparent !important;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shineText 2.5s linear infinite;
            line-height: 1.2;
        }
        @keyframes shineText {
            to { background-position: 200% center; }
        }

        /* 火焰動態特效 */
        .flame-icon {
            height: 35px; width: auto; flex-shrink: 0; margin-left: 5px; margin-right: 15px;
            animation: flamePulse 1.5s ease-in-out infinite alternate;
        }
        @keyframes flamePulse {
            from { transform: scale(1); filter: drop-shadow(0 0 2px rgba(255,106,0,0.5)); }
            to { transform: scale(1.15); filter: drop-shadow(0 0 8px rgba(255,186,0,0.9)); }
        }

        .menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 99998; display: none; }
        .menu-overlay.open { display: block; }

        /* --- 4. iPad 專屬補丁 (橫放與直放) --- */
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

        /* --- 5. 手機版優化 --- */
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
            <div style="text-align: right; margin-bottom: 20px;">
                <span id="menu-close" style="color:white; font-size:50px; cursor:pointer; line-height: 1;">&times;</span>
            </div>
            
            <a href="index.html" class="menu-link">回首頁</a>
            
            <a href="https://tonyonlineenglish.netlify.app/allcourses" target="_blank" class="menu-link highlight-course">
                課程詳細介紹<span>升學 檢定 職場 公職 客製化</span>
                <img src="https://ik.imagekit.io/lql1uveoc/external-link.png?updatedAt=1754911187731" class="ext-icon">
            </a>

            <a href="https://tonyonlineenglish.netlify.app/hsw" target="_blank" class="menu-link sat-course">
                學測英文作文班<span>最新學測/高中英文/培養/衝刺</span>
                <img src="https://ik.imagekit.io/lql1uveoc/external-link.png?updatedAt=1754911187731" class="ext-icon">
            </a>

            <a href="https://tonyonlineenglish.netlify.app/inter36w" target="_blank" class="menu-link gept-course">
                全民英檢中級寫作<span>三/六回影片課程+家教+批改</span>
                <img src="https://ik.imagekit.io/lql1uveoc/external-link.png?updatedAt=1754911187731" class="ext-icon">
            </a>

            <a href="https://tonyonlineenglish.netlify.app/sub" target="_blank" class="menu-link sub-card" style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <div class="shimmer-text">學員訂閱課程</div>
                    <span>高CP值課程/持續學習</span>
                </div>
                <img src="https://ik.imagekit.io/lql1uveoc/HIgh%20Quality%20Pictures/flame.png" alt="Flame Icon" class="flame-icon">
                <img src="https://ik.imagekit.io/lql1uveoc/external-link.png?updatedAt=1754911187731" class="ext-icon">
            </a>
            
            <a href="https://tonyonlineenglish.netlify.app/ycs" target="_blank" class="menu-link">
                你的課表查詢<span>即時查看課程安排狀況</span>
                <img src="https://ik.imagekit.io/lql1uveoc/external-link.png?updatedAt=1754911187731" class="ext-icon">
            </a>
            
            <a href="https://tonyonlineenglish.netlify.app/exper" target="_blank" class="menu-link">
                預約體驗課程<span>25 / 50 分鐘線上試聽</span>
                <img src="https://ik.imagekit.io/lql1uveoc/external-link.png?updatedAt=1754911187731" class="ext-icon">
            </a>
            
            <a href="https://line.me/ti/p/T9YdimtG8_" target="_blank" class="menu-link" style="color: #00B900;">
                LINE 直接聯絡<span>ID: Myavalon</span>
                <img src="https://ik.imagekit.io/lql1uveoc/external-link.png?updatedAt=1754911187731" class="ext-icon">
            </a>
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
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('menu-close');

    function toggleMenu() {
        const isOpen = sideMenu.classList.toggle('open');
        overlay.classList.toggle('open');
        
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
});

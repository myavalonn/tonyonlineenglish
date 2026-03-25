// layout-manager.js - 終極修正版：解決 iPad 直/橫放白條問題 (包含文字換行與寬度修正) + 新增 IG & 恢復手機版白邊 + 新增全民英檢中級寫作漸層
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
            color: white; text-decoration: none; font-size: 26px !important;
            font-weight: 700; padding: 18px; background: rgba(255,255,255,0.05);
            border-radius: 12px; display: block; margin-bottom: 15px;
            white-space: normal; 
            word-wrap: break-word;
        }
        .menu-link span { 
            display: block; font-size: 16px !important; color: #94a3b8; margin-top: 6px; 
            line-height: 1.4; white-space: normal; 
        }

        /* 課程詳細介紹 - 高對比強調樣式 */
        .highlight-course {
            background: #FFD700 !important; 
            color: #000 !important; 
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
        }
        .highlight-course span {
            color: #333 !important; 
            font-weight: 700;
        }

        /* 全民英檢中級寫作 - 專屬漸層樣式 */
        .gept-course {
            background: linear-gradient(135deg, #63B3ED 0%, #2B6CB0 100%) !important;
            box-shadow: 0 4px 12px rgba(43, 108, 176, 0.3);
        }
        .gept-course span {
            color: #F8FAFC !important; /* 讓小字在漸層藍底上清楚顯示 */
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
            .nav-links { gap: 5px; } /* 微調間距以容納4個Icon */
            .pill-btn { 
                padding: 0; /* 改為0，靠固定寬高來撐起圓形 */
                width: 40px; height: 40px; /* 設定固定寬高維持完美圓形 */
                justify-content: center; 
                border-radius: 50%; 
                /* 移除了 border: none，讓全域的白色圓圈邊框重新顯示 */
            }
            .pill-btn span { display: none; }
            .social-icon { height: 20px; } /* 恢復原本的大小以適應白圈內部 */
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
            <a href="https://tonyonlineenglish.netlify.app/allcourses" target="_blank" class="menu-link highlight-course">課程詳細介紹<span>升學 檢定 職場 公職 客製化</span></a>
            
            <!-- 新增的全民英檢中級寫作選項 (加上漸層 class) -->
            <a href="https://tonyonlineenglish.netlify.app/inter36w" target="_blank" class="menu-link gept-course">全民英檢中級寫作<span>三/六回影片課程+家教+批改</span></a>
            
            <a href="https://tonyonlineenglish.netlify.app/ycs" target="_blank" class="menu-link">你的課表查詢<span>即時查看課程安排狀況</span></a>
            <a href="https://tonyonlineenglish.netlify.app/exper" target="_blank" class="menu-link">預約體驗課程<span>25 / 50 分鐘線上試聽</span></a>
            <a href="https://line.me/ti/p/T9YdimtG8_" target="_blank" class="menu-link" style="color: #00B900;">LINE 直接聯絡<span>ID: Myavalon</span></a>
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
                <!-- Instagram 按鈕 -->
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

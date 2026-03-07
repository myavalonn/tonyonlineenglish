// layout-manager.js
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('tony-unique-header')) return;

    const style = document.createElement('style');
    style.textContent = `
        .tony-banner {
            position: relative;
            width: 100%;
            height: 140px;
            background-color: #060b1c;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px;
            box-sizing: border-box;
            z-index: 1000;
        }

        .logo-box { height: 112px; }
        .logo-box img { height: 100%; width: auto; }

        /* --- 調整選單連結文字大小 --- */
        .menu-link {
            color: white;
            text-decoration: none;
            font-size: 24px !important; /* 加大 iPad/手機 連結字體 */
            font-weight: 700;
            padding: 20px;
            border-radius: 12px;
            background: rgba(255,255,255,0.05);
            display: block;
            margin-bottom: 15px;
        }
        
        .menu-link span {
            display: block;
            font-size: 16px !important; /* 加大下方的說明文字 */
            color: #94a3b8;
            margin-top: 6px;
        }

        .hamburger-icon { 
            font-size: 45px !important; /* 加大漢堡圖示 */
            color: white; 
            cursor: pointer; 
        }

        /* 側邊選單基礎樣式 */
        .side-menu {
            position: fixed; top: 0; left: -320px; width: 320px; height: 100vh;
            background: #060b1c; z-index: 99999; transition: 0.4s;
            padding: 40px 20px; display: flex; flex-direction: column;
            visibility: hidden;
        }
        .side-menu.open { left: 0; visibility: visible; }

        .menu-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.7);
            z-index: 99998; display: none;
        }
        .menu-overlay.open { display: block; }

        /* iPad & 手機版調整 */
        @media (max-width: 1024px) {
            .tony-banner { height: 120px; }
            .logo-box { height: 95px; }
            /* 讓按鈕文字在平板上更清晰 */
            .pill-btn { font-size: 18px !important; padding: 12px 24px !important; }
        }
    `;
    document.head.appendChild(style);

    // 這裡維持你原本的 HTML 結構，不亂改內容
    const menuHTML = `
        <div class="menu-overlay" id="menu-overlay"></div>
        <nav class="side-menu" id="side-menu">
            <div id="menu-close" style="color:white; font-size:50px; cursor:pointer; align-self:flex-end; margin-bottom:20px;">&times;</div>
            <a href="index.html" class="menu-link">回首頁</a>
            <a href="https://tonyonlineenglish.netlify.app/ycs" target="_blank" class="menu-link">
                你的課表查詢
                <span>即時查看課程安排狀況</span>
            </a>
            <a href="https://tonyonlineenglish.netlify.app/exper" target="_blank" class="menu-link">
                預約體驗課程
                <span>25 / 50 分鐘線上試聽</span>
            </a>
            <a href="https://line.me/ti/p/T9YdimtG8_" target="_blank" class="menu-link" style="color: #00B900;">
                LINE 直接聯絡
                <span>ID: Myavalon</span>
            </a>
        </nav>
        <header class="tony-banner" id="tony-unique-header">
            <a href="index.html" class="logo-box">
                <img src="https://ik.imagekit.io/lql1uveoc/IMG_9614.PNG?updatedAt=1750437382543" alt="Logo">
            </a>
            <div id="global-hamburger" class="hamburger-icon">☰</div>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    const hamburger = document.getElementById('global-hamburger');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('menu-close');

    function toggleMenu() {
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('open');
    }

    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
});

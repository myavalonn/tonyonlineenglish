// layout-manager.js - 強力修復版
document.addEventListener("DOMContentLoaded", function() {
    // 防止重複執行
    if (document.getElementById('tony-unique-header')) return;

    const style = document.createElement('style');
    style.textContent = `
        /* 1. Banner 改為 relative 確保順著排，不浮動 */
        .tony-banner {
            position: relative !important;
            width: 100% !important;
            height: 140px !important;
            background-color: #060b1c !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 0 25px !important;
            box-sizing: border-box !important;
            z-index: 1000 !important;
        }

        .logo-box { height: 112px !important; }
        .logo-box img { height: 100% !important; width: auto !important; }

        /* 2. 側邊選單：強制隱藏邏輯 */
        .side-menu {
            position: fixed !important;
            top: 0 !important;
            left: -320px !important; /* 平時絕對躲在左邊外面 */
            width: 320px !important;
            height: 100vh !important;
            background: #060b1c !important;
            z-index: 99999 !important;
            transition: transform 0.4s ease !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 40px 20px !important;
            box-shadow: 10px 0 20px rgba(0,0,0,0.5) !important;
            visibility: hidden !important; /* 徹底消失 */
        }

        /* 3. 當選單開啟時 */
        .side-menu.open {
            left: 0 !important;
            visibility: visible !important;
        }

        .menu-overlay {
            position: fixed !important;
            inset: 0 !important;
            background: rgba(0,0,0,0.7) !important;
            z-index: 99998 !important;
            display: none;
            backdrop-filter: blur(4px) !important;
        }
        .menu-overlay.open { display: block !important; }

        /* 4. 手機版優化 */
        @media (max-width: 500px) {
            .tony-banner { height: 110px !important; }
            .logo-box { height: 85px !important; }
        }
    `;
    document.head.appendChild(style);

    const menuHTML = `
        <div class="menu-overlay" id="menu-overlay"></div>
        <nav class="side-menu" id="side-menu">
            <div id="menu-close" style="color:white; font-size:45px; cursor:pointer; align-self:flex-end;">&times;</div>
            <a href="index.html" style="color:white; text-decoration:none; padding:15px; background:rgba(255,255,255,0.1); border-radius:10px; margin-bottom:10px;">回首頁</a>
            <a href="https://tonyonlineenglish.netlify.app/ycs" target="_blank" style="color:white; text-decoration:none; padding:15px; background:rgba(255,255,255,0.1); border-radius:10px; margin-bottom:10px;">課表查詢</a>
            <a href="https://line.me/ti/p/T9YdimtG8_" target="_blank" style="color:#00B900; text-decoration:none; padding:15px; background:rgba(255,255,255,0.1); border-radius:10px;">LINE 直接聯絡</a>
        </nav>
        <header class="tony-banner" id="tony-unique-header">
            <a href="index.html" class="logo-box">
                <img src="https://ik.imagekit.io/lql1uveoc/IMG_9614.PNG?updatedAt=1750437382543" alt="Logo">
            </a>
            <div id="global-hamburger" style="font-size:36px; color:white; cursor:pointer;">☰</div>
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

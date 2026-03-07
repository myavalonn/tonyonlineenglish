// layout-manager.js
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('tony-unique-header')) return;

    const style = document.createElement('style');
    style.textContent = `
        /* Banner 基礎設定 */
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

        .logo-box { height: 112px; flex-shrink: 0; }
        .logo-box img { height: 100%; width: auto; display: block; }

        /* 右側社群按鈕與漢堡 */
        .nav-links { display: flex; align-items: center; gap: 15px; }
        
        .pill-btn {
            color: white; border: 1px solid rgba(255,255,255,0.6);
            padding: 12px 22px; border-radius: 50px;
            text-decoration: none; font-size: 18px; /* 加大按鈕字體 */
            display: flex; align-items: center; gap: 10px;
            transition: 0.3s; white-space: nowrap; font-family: 'Noto Sans TC', sans-serif;
        }
        .social-icon { height: 26px; width: auto; display: block; } /* 加大社群圖示 */
        
        .hamburger-icon { 
            font-size: 45px !important; 
            color: white; 
            cursor: pointer; 
            margin-right: 15px;
        }

        /* --- 側邊選單文字加大 --- */
        .side-menu {
            position: fixed; top: 0; left: -320px; width: 320px; height: 100vh;
            background: #060b1c; z-index: 99999; transition: 0.4s;
            padding: 40px 20px; display: flex; flex-direction: column;
            visibility: hidden;
        }
        .side-menu.open { left: 0; visibility: visible; }

        .menu-link {
            color: white; text-decoration: none; 
            font-size: 26px !important; /* 選單大標題加大 */
            font-weight: 700; padding: 18px; 
            background: rgba(255,255,255,0.05); border-radius: 12px;
            display: block; margin-bottom: 15px;
        }
        .menu-link span {
            display: block; font-size: 16px !important; /* 選單說明加大 */
            color: #94a3b8; margin-top: 6px;
        }

        .menu-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.7);
            z-index: 99998; display: none; backdrop-filter: blur(4px);
        }
        .menu-overlay.open { display: block; }

        /* iPad & 手機版適配 */
        @media (max-width: 768px) {
            .tony-banner { height: 110px; padding: 0 15px; }
            .logo-box { height: 85px; }
            .pill-btn span { display: none; } /* 手機版隱藏按鈕文字，只留圖示 */
            .pill-btn { padding: 12px; border-radius: 50%; width: 48px; height: 48px; justify-content: center; }
            .hamburger-icon { font-size: 38px !important; }
        }
    `;
    document.head.appendChild(style);

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
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('open');
    }

    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
});

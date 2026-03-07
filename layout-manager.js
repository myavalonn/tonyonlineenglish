// layout-manager.js
document.addEventListener("DOMContentLoaded", function() {
    // 1. Insert CSS Styles
    const style = document.createElement('style');
    style.textContent = `
        /* Header Body - Fixed to relative to stop overlapping */
        .tony-banner {
            position: relative; 
            top: 0; 
            left: 0; 
            z-index: 1000;
            width: 100%; 
            height: 140px; 
            background-color: #060b1c;
            display: flex; 
            align-items: center; 
            justify-content: space-between;
            padding: 0 25px; 
            box-sizing: border-box; 
            border-bottom: 1px solid #1a2a4a;
        }

        /* Logo Style */
        .logo-box { height: 112px; flex-shrink: 0; transition: 0.3s; }
        .logo-box img { height: 100%; width: auto; display: block; }

        /* Navigation Links */
        .nav-links { display: flex; align-items: center; gap: 12px; }
        .pill-btn {
            color: white; border: 1px solid rgba(255,255,255,0.6);
            padding: 10px 20px; border-radius: 50px;
            text-decoration: none; font-size: 15px;
            display: flex; align-items: center; gap: 8px;
            transition: 0.3s; white-space: nowrap; font-family: 'Noto Sans TC', sans-serif;
        }
        .pill-btn:hover { background-color: rgba(255,255,255,0.1); }
        .social-icon { height: 22px; width: auto; display: block; }
        .hamburger-icon { font-size: 36px; color: #FFFFFF; cursor: pointer; display: flex; align-items: center; margin-right: 20px; }

        /* --- Side Menu Logic --- */
        .side-menu {
            position: fixed; top: 0; left: -320px; width: 320px; height: 100%;
            background: #060b1c; z-index: 2000; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 40px 20px; box-shadow: 10px 0 20px rgba(0,0,0,0.5);
            display: flex; flex-direction: column; gap: 15px;
            pointer-events: none; /* Prevents blocking clicks when closed */
        }
        .side-menu.open { left: 0; pointer-events: auto; }
        
        .menu-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.7);
            z-index: 1999; display: none; backdrop-filter: blur(4px);
        }
        .menu-overlay.open { display: block; }
        .menu-close { color: white; font-size: 45px; align-self: flex-end; cursor: pointer; line-height: 1; margin-bottom: 10px; }
        
        .menu-link {
            color: white; text-decoration: none; font-size: 19px; font-weight: 700;
            padding: 15px 20px; border-radius: 12px; background: rgba(255,255,255,0.05);
            transition: 0.3s; border-left: 4px solid transparent;
            display: block;
        }
        .menu-link:hover { background: rgba(255,255,255,0.15); border-left: 4px solid #d4af37; padding-left: 25px; }
        .menu-link span { display: block; font-size: 12px; color: #94a3b8; font-weight: 400; margin-top: 4px; }

        /* Mobile Optimization */
        @media (max-width: 500px) {
            .tony-banner { height: 110px; padding: 0 15px; }
            .logo-box { height: 85px; }
            .pill-btn span { display: none; }
            .pill-btn { padding: 12px; border-radius: 50%; width: 45px; height: 45px; justify-content: center; }
            .hamburger-icon { font-size: 30px; margin-right: 10px; }
        }
    `;
    document.head.appendChild(style);

    // 2. Define HTML Structure (Spacer removed)
    const menuHTML = `
        <div class="menu-overlay" id="menu-overlay"></div>
        
        <nav class="side-menu" id="side-menu">
            <div class="menu-close" id="menu-close">&times;</div>
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

        <header class="tony-banner">
            <a href="index.html" class="logo-box">
                <img src="https://ik.imagekit.io/lql1uveoc/IMG_9614.PNG?updatedAt=1750437382543" alt="Logo">
            </a>
            <nav class="nav-links">
                <div class="hamburger-icon" id="global-hamburger">☰</div>
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

    // 3. Toggle Logic
    const hamburger = document.getElementById('global-hamburger');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('menu-close');

    function toggleMenu() {
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('open');
    }

    if(hamburger) hamburger.addEventListener('click', toggleMenu);
    if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);
});

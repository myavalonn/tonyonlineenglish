// layout-manager.js
document.addEventListener("DOMContentLoaded", function() {
    // 1. 插入通用的 CSS 樣式 (確保 40 頁的 Header 樣式統一)
    const style = document.createElement('style');
    style.textContent = `
        .tony-banner {
            position: fixed; top: 0; left: 0; z-index: 1000;
            width: 100%; height: 75px; background-color: #060b1c;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 15px; box-sizing: border-box; border-bottom: 1px solid #1a2a4a;
        }
        .logo-box { height: 50px; flex-shrink: 0; }
        .logo-box img { height: 100%; width: auto; display: block; }
        .nav-links { display: flex; align-items: center; gap: 8px; }
        .pill-btn {
            color: white; border: 1px solid rgba(255,255,255,0.6);
            padding: 6px 12px; border-radius: 50px;
            text-decoration: none; font-size: 13px;
            display: flex; align-items: center; gap: 6px;
            transition: 0.3s; white-space: nowrap; font-family: 'Noto Sans TC', sans-serif;
        }
        .pill-btn:hover { background-color: rgba(255,255,255,0.1); }
        .social-icon { height: 18px; width: auto; display: block; }
        .hamburger-icon { font-size: 28px; color: #FFFFFF; cursor: pointer; display: flex; align-items: center; margin-right: 15px; }
        
        /* 手機版優化 */
        @media (max-width: 500px) {
            .pill-btn span { display: none; }
            .pill-btn { padding: 8px; border-radius: 50%; width: 35px; height: 35px; justify-content: center; }
            .tony-banner { height: 65px; }
            .logo-box { height: 40px; }
        }
    `;
    document.head.appendChild(style);

    // 2. 定義 Header HTML 結構
    const headerHTML = `
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
        <div style="height: 75px;"></div> `;

    // 3. 插入到 <body> 的最上方
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 4. 漢堡按鈕的點擊事件 (你可以在這裡加入側邊欄開關邏輯)
    document.getElementById('global-hamburger').addEventListener('click', function() {
        alert('側邊選單功能開發中，或在此連結你的選單！');
    });
});

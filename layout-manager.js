// layout-manager.js
document.addEventListener("DOMContentLoaded", function() {
    // 1. 插入通用的 CSS 樣式 (Logo 再次放大 + 隨頁面滾動)
    const style = document.createElement('style');
    style.textContent = `
        .tony-banner {
            /* 關鍵修改：從 fixed 改為 absolute，讓它隨頁面捲動 */
            position: absolute; 
            top: 0; left: 0; z-index: 1000;
            width: 100%; 
            height: 140px; /* 再次加高，容納超大 Logo */
            background-color: #060b1c;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 25px; box-sizing: border-box; border-bottom: 1px solid #1a2a4a;
        }
        
        /* Logo 再次放大：原本 75px * 1.5 = 112.5px */
        .logo-box { height: 112px; flex-shrink: 0; transition: 0.3s; }
        .logo-box img { height: 100%; width: auto; display: block; }
        
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
        
        /* 手機版優化：適度縮小一點點，避免遮掉整個螢幕 */
        @media (max-width: 500px) {
            .tony-banner { height: 110px; padding: 0 15px; }
            .logo-box { height: 85px; }
            .pill-btn span { display: none; }
            .pill-btn { padding: 12px; border-radius: 50%; width: 45px; height: 45px; justify-content: center; }
            .hamburger-icon { font-size: 30px; margin-right: 10px; }
        }
    `;
    document.head.appendChild(style);

    // 2. 定義 Header HTML 結構 (墊高層同步調整)
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
        <div style="height: 140px;"></div> `; // 墊高層改為 140px

    // 3. 插入到 <body> 的最上方
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 4. 漢堡按鈕事件
    document.getElementById('global-hamburger').addEventListener('click', function() {
        alert('側邊選單功能開發中！');
    });
});

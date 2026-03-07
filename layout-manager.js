// layout-manager.js
document.addEventListener("DOMContentLoaded", function() {
    // 1. 插入通用的 CSS 樣式 (Logo 放大 1.5 倍版本)
    const style = document.createElement('style');
    style.textContent = `
        .tony-banner {
            position: fixed; top: 0; left: 0; z-index: 1000;
            width: 100%; 
            height: 100px; /* 從 75px 增加，確保放得下大 Logo */
            background-color: #060b1c;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px; box-sizing: border-box; border-bottom: 1px solid #1a2a4a;
        }
        /* Logo 放大：50px * 1.5 = 75px */
        .logo-box { height: 75px; flex-shrink: 0; transition: 0.3s; }
        .logo-box img { height: 100%; width: auto; display: block; }
        
        .nav-links { display: flex; align-items: center; gap: 10px; }
        .pill-btn {
            color: white; border: 1px solid rgba(255,255,255,0.6);
            padding: 8px 15px; border-radius: 50px;
            text-decoration: none; font-size: 14px;
            display: flex; align-items: center; gap: 8px;
            transition: 0.3s; white-space: nowrap; font-family: 'Noto Sans TC', sans-serif;
        }
        .pill-btn:hover { background-color: rgba(255,255,255,0.1); transform: translateY(-2px); }
        .social-icon { height: 20px; width: auto; display: block; }
        .hamburger-icon { font-size: 32px; color: #FFFFFF; cursor: pointer; display: flex; align-items: center; margin-right: 15px; }
        
        /* 手機版優化 (也要跟著稍微放大) */
        @media (max-width: 500px) {
            .tony-banner { height: 85px; }
            .logo-box { height: 60px; } /* 手機版也放大 1.5 倍 (原本 40px) */
            .pill-btn span { display: none; }
            .pill-btn { padding: 10px; border-radius: 50%; width: 40px; height: 40px; justify-content: center; }
        }
    `;
    document.head.appendChild(style);

    // 2. 定義 Header HTML 結構 (墊高層也改為 100px 確保內容不被遮擋)
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
        <div style="height: 100px;"></div> `; // 這裡也要同步改 100px

    // 3. 插入到 <body> 的最上方
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 4. 漢堡按鈕的點擊事件
    document.getElementById('global-hamburger').addEventListener('click', function() {
        alert('側邊選單功能開發中！');
    });
});

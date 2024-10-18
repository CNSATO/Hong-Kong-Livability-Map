const btnhide = document.getElementById('closeBtn');
const nav = document.getElementById("nav");
const locationZoom = document.getElementById('location-zoom');

nav.style.display = 'block';

btnhide.addEventListener('click', function () {
    navMenuFading();
});

function adjustLocationZoomPosition() {
    const nav = document.getElementById('nav');
    const locationZoom = document.getElementById('location-zoom');
    console.log("zoom panel adjusted");
    // 检查窗口宽度是否小于 800px
    if (window.innerWidth < 873) {
        // 获取 #nav 的高度和位置
        const navRect = nav.getBoundingClientRect();
        const navBottom = navRect.bottom; // 获取 #nav 底部位置

        // 设置 #location-zoom 的位置在 #nav 下面
        locationZoom.style.position = 'absolute';
        locationZoom.style.top = `${navBottom + 20}px`; // 设置在 #nav 下方 20px
        locationZoom.style.left = "auto";
        locationZoom.style.right = '20px';
        locationZoom.style.width = 'auto';
    } else {
        // 恢复原来的位置
        locationZoom.style.position = 'fixed';
        locationZoom.style.top = '20px';
        locationZoom.style.left = '40px';
        locationZoom.style.right = '';
        locationZoom.style.width = 'auto';
    }
    //Check if the menu (nav) is hidden
    if (nav.style.visibility === "hidden") {
        locationZoom.style.top = `60px`; // 设置在 #nav 下方 20px
        // if (window.innerWidth < 500) {
        //     locationZoom.style.top = `60px`; // 设置在 #nav 下方 20px
        // }
        if (window.innerWidth >= 873) {
            locationZoom.style.top = `20px`
        }
    }
}

// Hide Navigation Window
function navMenuFading() {
    if (nav.style.visibility === "hidden" || nav.style.display === '') {
        // 如果导航栏已隐藏，重新显示并更新按钮文本
        // nav.style.display = 'block';
        nav.style.visibility = "visible";
        nav.style.opacity = 1; // 重置不透明度
        btnhide.textContent = 'Hide Menu'; // 更新按钮文本为“关闭”
        btnhide.style.position = 'relative'; // 使按钮在导航栏内部
        btnhide.style.top = '0px'; // 设置按钮的顶部位置
        btnhide.style.right = '0px'; // 设置按钮的右侧位置
        adjustLocationZoomPosition();
    } else {
        // 如果导航栏可见，则逐渐隐藏并更新按钮文本
        var opacity = 1; // 初始不透明度
        var fadeOutInterval = setInterval(function () {
            if (opacity <= 0.05) {
                clearInterval(fadeOutInterval);
                // nav.style.display = 'none'; // 隐藏元素 And do not render anymore
                nav.style.visibility = "hidden"; // hide element but still render
                btnhide.style.visibility = "visible";
                btnhide.className = "Hided";
                btnhide.blur();
                nav.style.opacity = 1;
                btnhide.style.position = 'fixed'; // 移动按钮到右上角
                btnhide.textContent = 'Display Menu'; // 更新按钮文本为“显示”
                btnhide.style.top = '20px'; // 设置按钮的顶部位置
                btnhide.style.right = '20px'; // 设置按钮的右侧位置
                adjustLocationZoomPosition();
            } else {
                opacity -= 0.1; // 每次减少不透明度
                nav.style.opacity = opacity; // 更新元素不透明度
            }
        }, 10); // 每10毫秒执行一次
    }
}

// 在窗口大小变化时调整位置
window.addEventListener('resize', adjustLocationZoomPosition);

// 页面加载时也执行一次
window.addEventListener('load', adjustLocationZoomPosition);


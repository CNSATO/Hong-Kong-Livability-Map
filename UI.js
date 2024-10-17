const btnhide = document.getElementById('closeBtn');
const nav = document.getElementById("nav");
nav.style.display = 'block';

btnhide.addEventListener('click', function () {
    if (nav.style.visibility === "hidden" || nav.style.display === '') {
        // 如果导航栏已隐藏，重新显示并更新按钮文本
        // nav.style.display = 'block';
        nav.style.visibility = "visible";
        nav.style.opacity = 1; // 重置不透明度
        btnhide.textContent = 'Hide'; // 更新按钮文本为“关闭”
        btnhide.style.position = 'relative'; // 使按钮在导航栏内部
        btnhide.style.top = '0px'; // 设置按钮的顶部位置
        btnhide.style.right = '0px'; // 设置按钮的右侧位置        
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
            } else {
                opacity -= 0.1; // 每次减少不透明度
                nav.style.opacity = opacity; // 更新元素不透明度
            }
        }, 10); // 每10毫秒执行一次


    }
});

// Zhixin Shen
// ITMD 541-01 Graduate Student

(function () {
    // IIFE (Immediately Invoked Function Expression) 
    // 立即执行函数，避免污染全局变量
    console.log("Lab 4 script running...");
    // Log to console to confirm script is running
    // 控制台输出，确认代码成功运行

    // 1a. Change the main headline text in the hero section.
    // 修改 Hero 区域主标题
    const heroHeading = document.querySelector("#hero h1");
    // Select the h1 inside #hero
    // 选择 #hero 区域中的 h1 元素

    if (heroHeading) {
        heroHeading.textContent = "Uplift Your Brand with Stellar Marketing";
        // Update plain text content of the heading
        // 修改标题的纯文本内容
    }

    // 1b. Change the line of text below the hero headline.
    // 修改副标题内容
    const heroParagraph = document.querySelector("#hero p");

    if (heroParagraph) {
        heroParagraph.innerHTML =
            'Utilize cutting-edge strategies from Stellar Marketing to help your business <strong><em>thrive and excel.</em></strong>';
        // Use innerHTML to allow bold and italic formatting
        // 使用 innerHTML 支持加粗和斜体标签
    }

    // 1c. Change the image in the background of the hero.
    // 修改 Hero 区域背景图
    const heroSection = document.querySelector("#hero");

    if (heroSection) {
        heroSection.style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";
        // Set new background image
        // 设置新的背景图片

        heroSection.style.backgroundSize = "cover";
        // Make image cover the entire section
        // 让图片铺满整个区域

        heroSection.style.backgroundPosition = "center";
        // Center the background image
        // 图片居中显示
    }

    // 1d. Remove the “Get Started” CTA from the hero.
    // 删除 Hero 区域中的 Get Started 按钮
    const getStartedBtn = document.querySelector("#hero a");

    if (getStartedBtn) {
        getStartedBtn.remove();
        // Remove the button element from DOM
        // 从页面中删除该按钮
    }

    // 1e. Change the background color of the nav bar to match the footer.
    // 修改导航栏背景色为与 footer 相同（深色）
    const nav = document.querySelector("nav");

    if (nav) {
        nav.style.backgroundColor = "#1e293b";
        // Apply dark color similar to footer
        // 设置为与底部接近的深色
    }

    // 2a. Change all service icons color to #47C714.
    // 将 Services 区域所有图标改为绿色
    const serviceIcons = document.querySelectorAll("#services .material-symbols-outlined");

    serviceIcons.forEach(function (icon) {
        icon.style.color = "#47C714";
        // Loop through each icon and set color
        // 遍历所有图标并修改颜色
    });

    // 2b. Change the Digital Marketing icon to "ads_click".
    // 修改第一个图标为 ads_click
    const firstServiceIcon = document.querySelector("#services .material-symbols-outlined");

    if (firstServiceIcon) {
        firstServiceIcon.textContent = "ads_click";
        // Material icons use text to define icon shape
        // Material Icons 通过文字决定图标形状
    }

    // 3a. Make solution cards display 4 per row at >=1024px.
    // 在屏幕宽度 >=1024px 时，将 Solutions 改为一行4列
    const styleTag = document.createElement("style");

    styleTag.textContent = `
        @media (min-width: 1024px) {
            #solutions .grid {
                grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            }
        }
    `;
    // Inject CSS dynamically into the page
    // 动态插入 CSS 样式到页面中

    document.head.appendChild(styleTag);

    // 3b. Change the Musicians image.
    // 修改 Musicians 图片
    const musiciansImage = document.querySelector('img[alt="Musicians"]');

    if (musiciansImage) {
        musiciansImage.src = "https://picsum.photos/id/453/400/300";
        // Replace image source
        // 替换图片地址
    }

    // 4a. Prevent form submission and show alert messages.
    // 阻止表单跳转，并根据输入内容弹出提示
    const contactForm = document.querySelector("#contact form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();
            // Prevent page from navigating to broken URL
            // 阻止表单默认跳转行为

            const inputs = contactForm.querySelectorAll("input");

            const name = inputs[0] ? inputs[0].value.trim() : "";
            // Get name input and remove whitespace
            // 获取姓名并去除空格

            const email = inputs[1] ? inputs[1].value.trim() : "";
            // Get email input and remove whitespace
            // 获取邮箱并去除空格

            if (name && email) {
                alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
                // Show success message
                // 输入完整时显示成功提示
            } else {
                alert("Please provide a name and email.");
                // Show error message if fields are missing
                // 未填写时提示用户输入
            }
        });
    }

})();
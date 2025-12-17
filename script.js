// ================================
// スムーススクロール（ナビ）
// ================================
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ================================
// ナイトモード切替
// ================================
const nightBtn = document.getElementById('toggleNight');
if (nightBtn) {
    nightBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
}

// ================================
// スクロールでセクションに動きを付ける（IntersectionObserver）
//  - section 要素に .hidden を付け、表示時に .in-view を付与
//  - 同時にナビの active を切り替え
// ================================
const sections = document.querySelectorAll('.section');
sections.forEach(sec => sec.classList.add('hidden'));

const navButtons = document.querySelectorAll('nav button');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            entry.target.classList.remove('hidden');

            // ナビの active を切り替え
            navButtons.forEach(btn => {
                if (btn.dataset.target === id) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        } else {
            // 交差していないときは activeを消す（必要なら残す）
            //entry.target.classList.remove('in-view');
        }
    });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

// ================================
// スクロールフェードイン（既存の .fade 要素）
// ================================
const fadeEls = document.querySelectorAll('.fade');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ================================
// クロスフェード スライドショー（5000ms）
// ================================
document.querySelectorAll('.slideshow').forEach(slide => {
    // if data-images attr exists, use that; otherwise allow inline imgs (backward compat)
    let images = [];
    if (slide.dataset.images) {
        try {
            images = JSON.parse(slide.dataset.images);
        } catch (e) {
            images = [];
        }
    }

    // 用意されている img 要素がある場合はそれを使う
    const existingImgs = slide.querySelectorAll('img');
    if (existingImgs.length >= 2) {
        // 既にimg要素が置かれている場合はそのままクロスフェード動作
        const imgs = Array.from(existingImgs);
        let idx = 0;
        imgs.forEach((img, i) => img.classList.remove('active'));
        imgs[0].classList.add('active');

        function changeExisting() {
            imgs[idx].classList.remove('active');
            idx = (idx + 1) % imgs.length;
            imgs[idx].classList.add('active');
        }

        setInterval(changeExisting, 5000);
        return;
    }

    // data-images を使う場合（新規にimgを作る）
    if (images.length === 0) return;

    const imgA = document.createElement('img');
    const imgB = document.createElement('img');
    imgA.alt = '';
    imgB.alt = '';
    slide.appendChild(imgA);
    slide.appendChild(imgB);

    let index = 0;
    let isA = true;

    imgA.src = images[0];
    imgA.classList.add('active');
    imgB.src = images[1 % images.length];

    function changeImage() {
        index = (index + 1) % images.length;
        if (isA) {
            imgB.src = images[index];
            imgB.classList.add('active');
            imgA.classList.remove('active');
        } else {
            imgA.src = images[index];
            imgA.classList.add('active');
            imgB.classList.remove('active');
        }
        isA = !isA;
    }

    setInterval(changeImage, 5000);
});

// ===== トップへ戻るボタン =====
const backToTopBtn = document.getElementById("backToTop");

// スクロールでボタン表示
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

// クリックでトップへスムーズスクロール
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll("h2");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-line");
            }
        });
    }, { threshold: 0.6 });

    targets.forEach(t => observer.observe(t));
});


window.addEventListener("load", () => {
    document.getElementById("leftLogo").classList.add("drop-active");
    document.getElementById("rightLogo").classList.add("drop-active");
});

const startScreen = document.getElementById("start-screen");

if (startScreen) {
    startScreen.addEventListener("click", () => {
        startScreen.classList.add("hide");

        // 完全に透明になったら削除
        setTimeout(() => {
            startScreen.remove();
        }, 900);
    });
}


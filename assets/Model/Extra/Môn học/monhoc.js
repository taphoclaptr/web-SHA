// lệnh ☰ //
document.addEventListener("DOMContentLoaded", function () {
    // Bật/tắt menu khi bấm ☰
    window.toggleMenu = function () {
        var menu = document.getElementById("menu");
        menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
    };

    // Tắt menu khi bấm ra ngoài
    document.addEventListener("click", function(event) {
        var menu = document.getElementById("menu");
        var icon = document.querySelector(".menu-icon");
        if (!menu.contains(event.target) && !icon.contains(event.target)) {
            menu.style.display = "none";
        }
    });
});

// Lệnh tìm kiếm //
document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector('input[name="query"]');

    const subjects = {
      "toán": "/Môn học/Toán Học/toan_hoc.html",
      "toan": "/Môn học/Toán Học/toan_hoc.html",
      "toan hoc": "/Môn học/Toán Học/toan_hoc.html",
      "ngữ văn": "/Môn học/Ngữ Văn/ngu_van.html",
      "van": "/Môn học/Ngữ Văn/ngu_van.html",
      "văn": "/Môn học/Ngữ Văn/ngu_van.html",
      "ngu van": "/Môn học/Ngữ Văn/ngu_van.html",
      "vật lí": "/Môn học/Vật Lí/vat_li.html",
      "vat li": "/Môn học/Vật Lí/vat_li.html",
      "lí": "/Môn học/Vật Lí/vat_li.html",
      "li": "/Môn học/Vật Lí/vat_li.html",
      "hóa học": "/Môn học/Hóa Học/hoa_hoc.html",
      "hoa học": "/Môn học/Hóa Học/hoa_hoc.html",
      "hóa": "/Môn học/Hóa Học/hoa_hoc.html",
      "hoa": "/Môn học/Hóa Học/hoa_hoc.html",
      "sinh học": "/Môn học/Sinh Học/sinh_hoc.html",
      "sinh": "/Môn học/Sinh Học/sinh_hoc.html",
      "tin học": "/Môn học/Tin Học/tin_hoc.html",
      "tin": "/Môn học/Tin Học/tin_hoc.html",
      "ngoại ngữ": "/Môn học/Ngoại ngữ/ngoai_ngu.html",
      "tiếng anh": "/Môn học/Ngoại ngữ/ngoai_ngu.html",
      "anh": "/Môn học/Ngoại ngữ/ngoai_ngu.html",
      "ngoai ngu": "/Môn học/Ngoại ngữ/ngoai_ngu.html",
      "lịch sử": "/Môn học/Lịch Sử/lich_su.html",
      "lich su": "/Môn học/Lịch Sử/lich_su.html",
      "sử": "/Môn học/Lịch Sử/lich_su.html"
    };

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const rawInput = input.value.trim();    
            const query = rawInput.toLowerCase();

            for (let keyword in subjects) {
                if (query.includes(keyword)) {
                window.location.href = subjects[keyword];
                return;
                }
            }

          alert("Không tìm thấy môn học phù hợp.");
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.gallery-card');

  cards.forEach((card, index) => {
    const likeKey = `like_post_${index}`;
    const viewKey = `view_post_${index}`;
    const userLikeKey = `user_liked_post_${index}`;

    const likeCountEl = card.querySelector('.like-count');
    const viewCountEl = card.querySelector('.view-count');

    const btnLike = card.querySelector('.btn-like');
    const btnView = card.querySelector('.btn-view');

    let likes = parseInt(localStorage.getItem(likeKey)) || 0;
    let views = parseInt(localStorage.getItem(viewKey)) || 0;
    let userLiked = localStorage.getItem(userLikeKey) === 'true';

    // ✅ Hiển thị ban đầu
    likeCountEl.textContent = formatNumber(likes);
    viewCountEl.textContent = formatNumber(views);
    updateLikeButton();

    // ✅ Like
    btnLike.addEventListener('click', (e) => {
      e.stopPropagation();
      if (userLiked) {
        likes = Math.max(likes - 1, 0);
        userLiked = false;
      } else {
        likes++;
        userLiked = true;
      }
      localStorage.setItem(likeKey, likes);
      localStorage.setItem(userLikeKey, userLiked);
      likeCountEl.textContent = formatNumber(likes);
      updateLikeButton();
    });

    function updateLikeButton() {
      if (userLiked) {
        btnLike.textContent = '❤️';
        btnLike.classList.add('liked');
      } else {
        btnLike.textContent = '🤍';
        btnLike.classList.remove('liked');
      }
    }

    // ✅ Chỉ tăng view khi click card, KHÔNG phải click 2 nút
    card.addEventListener('click', (e) => {
      const isBtn = e.target.closest('.btn-like, .btn-view');
      if (isBtn) return;

      views++;
      localStorage.setItem(viewKey, views);
      viewCountEl.textContent = formatNumber(views);
    });

    // ✅ Ngăn lan ra card khi bấm nút mắt (không tăng view)
    btnView.addEventListener('click', (e) => {
      e.stopPropagation();
      // Không làm gì cả
    });
  });

  function formatNumber(num) {
    if (num >= 1000000000) {
      return (Math.round((num / 1000000000) * 100) / 100).toFixed(2) + 'B';  
    } else if (num >= 1000000) {
      return (Math.round((num / 1000000) * 100) / 100).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (Math.round((num / 1000) * 100) / 100).toFixed(2) + 'K';
    } else {
      return num.toString();
    }
  }
});
// ✅ Nghe sự kiện thay đổi localStorage từ các trang khác (ví dụ: trang cha)
window.addEventListener('storage', (e) => {
  if (e.key === likeKey || e.key === viewKey) {
    likes = parseInt(localStorage.getItem(likeKey)) || 0;
    views = parseInt(localStorage.getItem(viewKey)) || 0;

    likeCountEl.textContent = formatNumber(likes);
    viewCountEl.textContent = formatNumber(views);
    updateLikeButton();
  }
});


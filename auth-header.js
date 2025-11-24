(function () {
  function renderAuthHeader() {
    const navActions = document.getElementById('navActions');
    if (!navActions) return;

    const raw = localStorage.getItem('currentUser');

    // Nếu chưa đăng nhập -> giữ nguyên 2 nút Đăng nhập / Đăng ký
    if (!raw) {
      if (navActions.dataset.defaultHtml) {
        navActions.innerHTML = navActions.dataset.defaultHtml;
      }
      return;
    }

    let user;
    try {
      user = JSON.parse(raw);
    } catch (e) {
      console.error('currentUser không phải JSON hợp lệ', e);
      return;
    }

    // Lưu html mặc định lần đầu
    if (!navActions.dataset.defaultHtml) {
      navActions.dataset.defaultHtml = navActions.innerHTML;
    }

    const displayName =
      (user && (user.fullName || user.username || user.phone)) || 'Tài khoản';

    navActions.innerHTML = `
      <div class="user-menu">
        <span class="user-name">
          <i class="bx bx-user-circle"></i>
          ${displayName}
        </span>
        <button class="btn btn-outline" id="logoutBtn">
          <i class="bx bx-log-out"></i> Đăng xuất
        </button>
      </div>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.reload(); // trang hiện tại tự chuyển về trạng thái chưa đăng nhập
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAuthHeader);
  } else {
    renderAuthHeader();
  }

  // Huân bảo là giúp cho các tap đồng bộ thay đổi:)"
  window.addEventListener('storage', (e) => {
    if (e.key === 'currentUser') {
      renderAuthHeader();
    }
  });
})();
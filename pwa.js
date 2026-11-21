/* ============================================================================
 * 원탭 도구 허브 (OneTap Tools) · 홈 화면 설치(PWA)
 *
 * - Android·데스크톱 Chrome: beforeinstallprompt 를 잡아 두었다가 버튼 한 번에
 *   브라우저 기본 설치 창을 띄웁니다.
 * - iOS Safari 등 자동 설치 창이 없는 환경: 그림 안내 모달 + 주소 복사.
 * - 이미 앱(standalone)으로 열렸으면 버튼이 "앱 모드로 실행 중" 상태가 됩니다.
 * - sw.js 를 등록해 두 번째 실행부터 즉시 뜨고 오프라인에서도 열립니다.
 * 외부 요청은 하지 않습니다.
 * ==========================================================================*/
(function () {
  'use strict';

  var btn = document.getElementById('install-app');
  var modal = document.getElementById('install-modal');
  if (!btn || !modal) return;

  var titleEl = document.getElementById('install-modal-title');
  var stepsEl = document.getElementById('install-steps');
  var urlEl = document.getElementById('install-url');
  var copyBtn = document.getElementById('install-copy');
  var closeBtn = document.getElementById('install-close');
  var noteEl = document.getElementById('install-note');
  var platforms = Array.prototype.slice.call(modal.querySelectorAll('[data-platform]'));

  var deferredPrompt = null;
  var lastFocus = null;
  var installed = false;

  var COPY = {
    ios: [
      '사파리 하단 가운데의 <b>공유(□↑)</b> 를 누릅니다.',
      '목록을 조금 내려 <b>‘홈 화면에 추가’</b> 를 누릅니다.',
      '오른쪽 위 <b>‘추가’</b> 를 누르면 바탕화면에 아이콘이 깔립니다.'
    ],
    android: [
      '크롬 오른쪽 위 <b>⋮</b> 메뉴를 누릅니다.',
      '<b>‘앱 설치’</b> 또는 <b>‘홈 화면에 추가’</b> 를 누릅니다.',
      '<b>‘설치’</b> 를 누르면 앱 목록·바탕화면에 아이콘이 생깁니다.'
    ],
    desktop: [
      '주소창 오른쪽의 <b>설치 아이콘</b>(모니터↓)을 누릅니다.',
      '없으면 <b>⋮ 메뉴 → ‘앱 설치’</b> 를 고릅니다.',
      '<b>‘설치’</b> 를 누르면 독/작업 표시줄에 앱처럼 열립니다.'
    ]
  };

  function isStandalone() {
    try {
      return window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches ||
        window.navigator.standalone === true;
    } catch (_) {
      return window.navigator.standalone === true;
    }
  }

  function platform() {
    var ua = navigator.userAgent || '';
    var iOS = /iPad|iPhone|iPod/.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    if (iOS) return 'ios';
    if (/Android/i.test(ua)) return 'android';
    return 'desktop';
  }

  function cleanUrl() {
    try {
      var u = new URL(window.location.href);
      u.search = '';
      u.hash = '';
      return u.href;
    } catch (_) {
      return window.location.href;
    }
  }

  /* ------------------------------------------------------------ 버튼 상태 */
  function setState(state) {
    btn.classList.remove('is-ready', 'is-installed', 'is-appmode');
    if (state === 'appmode') {
      btn.classList.add('is-appmode');
      btn.innerHTML = '<span aria-hidden="true">✓</span> 앱 모드로 실행 중';
      btn.setAttribute('aria-disabled', 'true');
      btn.setAttribute('title', '이미 홈 화면 앱으로 열려 있습니다');
      return;
    }
    btn.removeAttribute('aria-disabled');
    if (state === 'installed') {
      btn.classList.add('is-installed');
      btn.innerHTML = '<span aria-hidden="true">✓</span> 앱처럼 설치됨';
      btn.setAttribute('title', '홈 화면 아이콘으로 열 수 있습니다');
      return;
    }
    btn.innerHTML = '<span aria-hidden="true">📱</span> 앱처럼 설치';
    btn.setAttribute('title', '폰 바탕화면에 앱 아이콘으로 설치합니다');
    if (state === 'ready') btn.classList.add('is-ready');
  }

  function refresh() {
    if (isStandalone()) return setState('appmode');
    if (installed) return setState('installed');
    setState(deferredPrompt ? 'ready' : 'plain');
  }

  /* ------------------------------------------------------------ 모달 */
  function fillModal() {
    var p = platform();
    platforms.forEach(function (el) {
      el.hidden = el.getAttribute('data-platform') !== p;
    });
    if (titleEl) {
      titleEl.textContent = p === 'ios'
        ? '아이폰: 사파리 공유 버튼으로 설치'
        : p === 'android' ? '안드로이드: 크롬 메뉴에서 설치' : 'PC: 주소창 설치 아이콘으로 설치';
    }
    if (stepsEl) {
      stepsEl.innerHTML = COPY[p].map(function (t, i) {
        return '<li><span class="install-step-no" aria-hidden="true">' + (i + 1) + '</span><span>' + t + '</span></li>';
      }).join('');
    }
    if (noteEl) {
      noteEl.textContent = p === 'ios'
        ? '아이폰은 애플 정책상 한 번에 설치되는 팝업이 없어 이 3단계만 거치면 됩니다. 주소창 없는 전체 화면 앱으로 열리고, 23종 도구가 한 아이콘에 담깁니다.'
        : p === 'android'
          ? '한 번 설치하면 주소창 없이 전체 화면으로 열리고, 23종 도구가 한 아이콘에 담깁니다. 앱을 지워도 입력해 둔 값은 브라우저에 그대로 남습니다.'
          : '설치해도 브라우저 탭과 똑같이 동작하고, 입력값은 이 기기에만 남습니다.';
    }
    if (urlEl) {
      urlEl.value = cleanUrl();
      urlEl.setAttribute('readonly', 'readonly');
    }
    if (copyBtn) {
      copyBtn.textContent = '주소 복사';
      copyBtn.removeAttribute('data-copied');
    }
  }

  function openModal(reason) {
    if (isStandalone()) return;
    lastFocus = document.activeElement;
    fillModal();
    modal.hidden = false;
    document.documentElement.classList.add('install-open');
    (closeBtn || modal).focus({ preventScroll: true });
    // "2초 그림 안내": 그림이 한 번 또렷하게 그려지도록 잠깐 강조합니다.
    modal.classList.remove('is-play');
    void modal.offsetWidth;
    modal.classList.add('is-play');
    if (reason === 'dismissed' && noteEl) {
      noteEl.textContent = '설치 창을 닫으셨다면 아래 방법으로도 똑같이 설치할 수 있습니다. ' + noteEl.textContent;
    }
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    modal.classList.remove('is-play');
    document.documentElement.classList.remove('install-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  }

  function copyUrl() {
    var text = cleanUrl();
    var done = function () {
      if (!copyBtn) return;
      copyBtn.textContent = '복사됨 ✓';
      copyBtn.setAttribute('data-copied', '1');
      window.setTimeout(function () {
        copyBtn.textContent = '주소 복사';
        copyBtn.removeAttribute('data-copied');
      }, 2400);
    };
    var fallback = function () {
      try {
        if (urlEl) {
          urlEl.removeAttribute('readonly');
          urlEl.select();
          urlEl.setSelectionRange(0, 9999);
          var ok = document.execCommand('copy');
          urlEl.setAttribute('readonly', 'readonly');
          if (ok) return done();
        }
      } catch (_) { /* 아래 안내로 넘어갑니다 */ }
      if (noteEl) noteEl.textContent = '주소를 길게 눌러 직접 복사해 주세요: ' + text;
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  /* ------------------------------------------------------------ 이벤트 */
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    refresh();
  });

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    installed = true;
    refresh();
    closeModal();
    try {
      document.dispatchEvent(new CustomEvent('hub:installed'));
    } catch (_) { /* 구형 브라우저 */ }
  });

  btn.addEventListener('click', function () {
    if (btn.getAttribute('aria-disabled') === 'true' || isStandalone()) return;
    if (deferredPrompt) {
      var prompt = deferredPrompt;
      deferredPrompt = null;
      btn.setAttribute('aria-busy', 'true');
      prompt.prompt();
      var choice = prompt.userChoice || Promise.resolve({ outcome: 'dismissed' });
      choice.then(function (res) {
        btn.removeAttribute('aria-busy');
        if (res && res.outcome === 'accepted') {
          installed = true;
          refresh();
        } else {
          refresh();
          openModal('dismissed');
        }
      }).catch(function () {
        btn.removeAttribute('aria-busy');
        refresh();
        openModal('dismissed');
      });
      return;
    }
    openModal('manual');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.closest('[data-close]')) closeModal();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (copyBtn) copyBtn.addEventListener('click', copyUrl);

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key !== 'Tab') return;
    var focusables = modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    var list = Array.prototype.filter.call(focusables, function (el) { return !el.hidden && el.offsetParent !== null; });
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  try {
    var mq = window.matchMedia('(display-mode: standalone)');
    var onChange = function () { refresh(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  } catch (_) { /* 무시 */ }

  refresh();

  /* ------------------------------------------------------------ Service Worker */
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || local)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(function () {
        /* 등록 실패는 조용히 넘어갑니다. 설치 버튼은 그대로 동작합니다. */
      });
    });
  }
})();

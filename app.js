/* ============================================================================
 * 원탭 도구 허브 (OneTap Tools) · 화면
 * data.js(라인업) + core.js(계산) + thumbs.js(SVG) 를 받아 그립니다.
 * 서버·외부 요청 없음. 상태는 이 탭 안에만 있습니다.
 * ==========================================================================*/
(function () {
  'use strict';

  var D = window.HubData;
  var C = window.HubCore;
  var T = window.HubThumbs;
  if (!D || !C || !T) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var CAT_LABEL = {};
  D.categories.forEach(function (c) { CAT_LABEL[c.id] = c.label; });

  var state = {
    category: 'all',
    query: '',
    liveOnly: false,
    picks: D.apps.map(function (a) { return a.id; })
  };

  function num(n) { return C.fmtKRW(n).replace('원', ''); }

  /* ------------------------------------------------------------ 필터 칩 */
  function renderChips() {
    var box = $('#filter-chips');
    var counts = C.categoryCounts(D.apps);
    box.innerHTML = D.categories.map(function (c) {
      var n = c.id === 'all' ? counts.all : (counts[c.id] || 0);
      return '<button type="button" class="chip" data-cat="' + c.id + '" aria-pressed="' +
        (state.category === c.id ? 'true' : 'false') + '">' + c.label +
        '<small>' + n + '</small></button>';
    }).join('');
    $$('.chip', box).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.category = btn.getAttribute('data-cat');
        $$('.chip', box).forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        renderCards();
      });
    });
  }

  /* ------------------------------------------------------------ 카드 17장 */
  function cardHtml(app) {
    var live = app.live;
    var badge = live
      ? '<span class="card-badge live"><span class="dot"></span>지금 열 수 있음</span>'
      : '<span class="card-badge"><span class="dot"></span>배포 준비 중</span>';
    var name = live
      ? '<a href="' + app.url + '" target="_blank" rel="noopener">' + app.name + '</a>'
      : app.name;
    var cta = live
      ? '<div class="card-cta-wrap">' +
        '<a class="card-cta" href="' + app.url + '" target="_blank" rel="noopener" aria-label="' +
        app.name + ' 새 창에서 열기">지금 열기 <span aria-hidden="true">↗</span></a>' +
        '<button type="button" class="card-ask" data-prefill="' + app.id + '" aria-label="' +
        app.name + ' 우리 회사용으로 제작 문의">커스텀 제작 문의</button></div>'
      : '<button type="button" class="card-cta pending" data-prefill="' + app.id + '">먼저 써 보기</button>';
    var price = app.replaces
      ? '<p class="card-price"><span>대체 예시 · ' + app.replaces.name + '</span>' +
        '<b>월 ' + C.fmtKRW(app.replaces.price) + '</b></p>'
      : '';
    return '<article class="card" id="app-' + app.slug + '" data-id="' + app.id + '" data-cat="' + app.category + '">' +
      '<div class="card-head"><span class="card-no">No. <b>' + (app.no < 10 ? '0' + app.no : app.no) + '</b></span>' +
      '<span class="card-cat">' + CAT_LABEL[app.category] + '</span></div>' +
      '<figure class="card-thumb">' + badge + T.get(app.thumb, app.name) + '</figure>' +
      '<div class="card-body">' +
        '<h3 class="card-name">' + name + '</h3>' +
        (app.lang === 'en' ? '<p class="card-en">English · ' + app.en + '</p>' : '<p class="card-en">' + app.en + '</p>') +
        '<p class="card-tagline">' + app.tagline + '</p>' +
        '<ul class="card-feats">' + app.features.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
      '</div>' +
      '<div class="card-foot">' + price + cta + '</div>' +
      '</article>';
  }

  function renderCards() {
    var list = C.filterApps(D.apps, {
      category: state.category, query: state.query, liveOnly: state.liveOnly
    });
    var grid = $('#app-grid');
    grid.innerHTML = list.map(cardHtml).join('');
    grid.hidden = list.length === 0;
    $('#empty-state').hidden = list.length !== 0;

    var bits = [];
    if (state.query) bits.push('“' + state.query + '”');
    if (state.category !== 'all') bits.push(CAT_LABEL[state.category]);
    if (state.liveOnly) bits.push('지금 열 수 있는 도구');
    $('#result-count').textContent = (bits.length ? bits.join(' · ') + ' — ' : '') + list.length + '종';
    $('#search-clear').hidden = !state.query;

    $$('[data-prefill]', grid).forEach(function (btn) {
      btn.addEventListener('click', function () { prefillInquiry(btn.getAttribute('data-prefill')); });
    });
  }

  /* ------------------------------------------------------------ 절약액 */
  function selectedApps() {
    return D.apps.filter(function (a) { return state.picks.indexOf(a.id) >= 0; });
  }

  function renderSavingsTable() {
    $('#savings-body').innerHTML = D.apps.map(function (a) {
      var on = state.picks.indexOf(a.id) >= 0;
      return '<tr data-id="' + a.id + '"' + (on ? '' : ' class="off"') + '>' +
        '<td class="col-check"><input class="check" type="checkbox" data-pick="' + a.id + '"' +
        (on ? ' checked' : '') + ' aria-label="' + a.name + ' 절약 계산에 포함"></td>' +
        '<td><span class="tool-name">' + a.name + '<small>' + CAT_LABEL[a.category] + '</small></span></td>' +
        '<td>' + a.replaces.name + '</td>' +
        '<td class="col-price">' + C.fmtKRW(a.replaces.price) + '</td>' +
        '</tr>';
    }).join('');

    $$('[data-pick]').forEach(function (box) {
      box.addEventListener('change', function () {
        var id = box.getAttribute('data-pick');
        var i = state.picks.indexOf(id);
        if (box.checked && i < 0) state.picks.push(id);
        if (!box.checked && i >= 0) state.picks.splice(i, 1);
        box.closest('tr').classList.toggle('off', !box.checked);
        updateSavings();
      });
    });
  }

  function updateSavings() {
    var s = C.savings(D.apps, state.picks);
    $('#sum-monthly').textContent = num(s.monthly);
    $('#sum-yearly').textContent = num(s.yearly);
    $('#sum-monthly-sub').textContent = '선택 ' + s.count + '종 · 1인';
    $('#pick-count').textContent = s.count;
    $('#savings-foot').textContent = C.fmtKRW(s.monthly);
    renderReceipt(s);

    var all = $('#pick-all'), none = $('#pick-none');
    all.disabled = s.count === D.apps.length;
    none.disabled = s.count === 0;
  }

  function renderReceipt(s) {
    var sel = selectedApps();
    var shown = sel.slice(0, 4);
    var rest = sel.slice(4);
    var rows = shown.map(function (a) {
      return '<li><span class="rl-name">' + a.name + '</span>' +
        '<span class="rl-price">' + num(a.replaces.price) + '</span></li>';
    });
    if (rest.length) {
      var restSum = rest.reduce(function (sum, a) { return sum + a.replaces.price; }, 0);
      rows.push('<li><span class="rl-name rl-more">외 ' + rest.length + '종</span>' +
        '<span class="rl-price">' + num(restSum) + '</span></li>');
    }
    if (!sel.length) {
      rows.push('<li><span class="rl-name rl-more">선택한 도구가 없습니다</span><span class="rl-price">0</span></li>');
    }
    $('#receipt-lines').innerHTML = rows.join('');
    $('#receipt-total').textContent = C.fmtKRW(s.monthly);
    $('#receipt-yearly').textContent = C.fmtKRW(s.yearly);
    $('#receipt-count').textContent = s.count + '종';
  }

  function setPicks(ids) {
    state.picks = ids.slice();
    $$('[data-pick]').forEach(function (box) {
      var on = state.picks.indexOf(box.getAttribute('data-pick')) >= 0;
      box.checked = on;
      box.closest('tr').classList.toggle('off', !on);
    });
    updateSavings();
  }

  /* ------------------------------------------------------------ 5단계 */
  function renderSteps() {
    $('#workflow-list').innerHTML = D.steps.map(function (s) {
      var apps = s.appIds.map(function (id) {
        return D.apps.filter(function (a) { return a.id === id; })[0];
      }).filter(Boolean);
      return '<li class="step">' +
        '<p class="step-no">' + s.no + '<small>STEP</small></p>' +
        '<div><h3 class="step-title">' + s.title + '</h3><p class="step-lead">' + s.lead + '</p></div>' +
        '<div class="step-side"><p class="step-out">결과물 <b>' + s.output + '</b></p>' +
        '<div class="step-apps">' + apps.map(function (a) {
          return '<button type="button" class="step-app" data-goto="' + a.slug + '">' + a.name + '</button>';
        }).join('') + '</div></div></li>';
    }).join('');

    $$('[data-goto]').forEach(function (btn) {
      btn.addEventListener('click', function () { gotoCard(btn.getAttribute('data-goto')); });
    });
  }

  function gotoCard(slug) {
    state.category = 'all';
    state.query = '';
    state.liveOnly = false;
    $('#search-input').value = '';
    $('#live-only').checked = false;
    $$('#filter-chips .chip').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-cat') === 'all' ? 'true' : 'false');
    });
    renderCards();
    var card = document.getElementById('app-' + slug);
    if (!card) return;
    $$('.card.is-match').forEach(function (c) { c.classList.remove('is-match'); });
    card.classList.add('is-match');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    window.setTimeout(function () { card.classList.remove('is-match'); }, 2200);
    var link = card.querySelector('.card-name a, .card-cta');
    if (link && link.focus) setTimeout(function () { link.focus({ preventScroll: true }); }, reduce ? 0 : 520);
  }

  /* ------------------------------------------------------------ B2B 3단계 + FAQ */
  function renderTiers() {
    $('#tier-grid').innerHTML = D.tiers.map(function (t) {
      return '<article class="tier"><div class="tier-head"><h3 class="tier-name">' + t.name + '</h3>' +
        '<span class="tier-tag">' + t.tag + '</span></div>' +
        '<p class="tier-price">' + t.price + '<small>' + t.note + '</small></p>' +
        '<p class="tier-desc">' + t.desc + '</p>' +
        '<ul class="tier-items">' + t.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' +
        '</article>';
    }).join('');
  }

  function renderFaq() {
    $('#faq-list').innerHTML = D.faq.map(function (f, i) {
      return '<details class="faq-item"' + (i === 0 ? ' open' : '') + '>' +
        '<summary>' + f.q + '</summary><p class="faq-a">' + f.a + '</p></details>';
    }).join('');
  }

  /* ------------------------------------------------------------ 문의 폼 */
  var form, result, resultText;

  function fillToolSelect() {
    var sel = $('#f-tool');
    var opts = ['<option value="">고르세요</option>'];
    D.apps.forEach(function (a) { opts.push('<option value="' + a.name + '">' + a.name + '</option>'); });
    opts.push('<option value="여러 개 · 전체">여러 개 · 전체</option>');
    opts.push('<option value="새 도구 설계">새 도구 설계</option>');
    sel.innerHTML = opts.join('');
  }

  function readForm() {
    return {
      name: $('#f-name').value,
      org: $('#f-org').value,
      email: $('#f-email').value,
      phone: $('#f-phone').value,
      tool: $('#f-tool').value,
      budget: $('#f-budget').value,
      message: $('#f-message').value,
      consent: $('#f-consent').checked
    };
  }

  var FIELD_OF = {
    name: 'f-name', email: 'f-email', phone: 'f-phone', tool: 'f-tool', message: 'f-message'
  };

  function clearErrors() {
    $$('.err').forEach(function (p) { p.textContent = ''; });
    $$('.field.bad').forEach(function (f) { f.classList.remove('bad'); });
  }

  function showErrors(errors) {
    clearErrors();
    var first = null;
    Object.keys(errors).forEach(function (key) {
      var id = key === 'consent' ? 'e-consent' : 'e-' + key;
      var p = document.getElementById(id);
      if (p) p.textContent = errors[key];
      var fid = FIELD_OF[key];
      if (fid) {
        var input = document.getElementById(fid);
        if (input) input.closest('.field').classList.add('bad');
        if (!first) first = input;
      } else if (key === 'consent') {
        first = first || $('#f-consent');
      }
    });
    if (first) {
      first.focus({ preventScroll: false });
      var box = first.closest('.field') || first;
      if (box.scrollIntoView) box.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  function renderLead() {
    var data = readForm();
    var check = C.validateLead(data);
    if (!check.ok) { showErrors(check.errors); return; }
    clearErrors();

    var to = D.contactEmail || '';
    var text = C.buildLeadText(data, { to: to || '문의 수신 메일' });
    resultText.textContent = text;
    result.hidden = false;

    var mail = $('#mail-lead');
    if (to) {
      mail.href = C.buildMailto(to, data);
      mail.hidden = false;
      $('#lead-result-note').textContent = '‘메일 앱으로 보내기’를 누르면 방금 만든 문안이 메일에 채워집니다. 보내기 전에 한 번 더 확인하세요.';
    } else {
      mail.hidden = true;
      mail.href = '#';
      $('#lead-result-note').textContent = '문안을 복사해 메일이나 카카오톡으로 보내 주세요. 회신은 적어 주신 메일로 드립니다.';
    }
    $('#lead-result-meta').textContent = (data.org ? data.org + ' · ' : '') + data.name + ' · ' + data.tool;
    result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('copy failed'));
      } catch (e) { reject(e); }
    });
  }

  function bindForm() {
    form = $('#lead-form');
    result = $('#lead-result');
    resultText = $('#lead-text');
    fillToolSelect();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      renderLead();
    });

    $('#lead-reset').addEventListener('click', function () {
      form.reset();
      clearErrors();
      result.hidden = true;
      $('#lead-foot').hidden = false;
      $('#f-name').focus();
    });

    $('#edit-lead').addEventListener('click', function () {
      $('#f-message').focus();
      $('#f-message').scrollIntoView({ block: 'center', behavior: 'smooth' });
    });

    $('#copy-lead').addEventListener('click', function () {
      var btn = this;
      copyText(resultText.textContent).then(function () {
        var old = btn.textContent;
        btn.textContent = '복사됐습니다';
        window.setTimeout(function () { btn.textContent = old; }, 1800);
      }).catch(function () {
        var range = document.createRange();
        range.selectNodeContents(resultText);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        $('#lead-result-note').textContent = '브라우저가 복사를 막았습니다. 위 문안을 직접 선택해 복사해 주세요.';
      });
    });

    $$('#lead-form input, #lead-form select, #lead-form textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        var field = el.closest('.field');
        if (field) {
          field.classList.remove('bad');
          var p = field.querySelector('.err');
          if (p) p.textContent = '';
        }
        if (el.id === 'f-consent') $('#e-consent').textContent = '';
      });
    });
  }

  function prefillInquiry(id) {
    var app = D.apps.filter(function (a) { return a.id === id; })[0];
    if (!app) return;
    var sel = $('#f-tool');
    sel.value = app.name;
    if (!sel.value) sel.value = '여러 개 · 전체';
    $('#b2b').scrollIntoView({ behavior: 'smooth', block: 'start' });
    var nameField = $('#f-name');
    if (!nameField.value.trim()) {
      window.setTimeout(function () { nameField.focus({ preventScroll: true }); }, 420);
    }
    var msg = $('#f-message');
    if (!msg.value.trim()) {
      msg.placeholder = '예: ' + app.name + '을 우리 브랜드로 바꾸고 싶습니다. 지금은 ' +
        (app.replaces ? app.replaces.name + '를 쓰고 있습니다.' : '직접 만들고 있습니다.');
    }
  }

  /* ------------------------------------------------------------ 검색 */
  function bindSearch() {
    var input = $('#search-input');
    var timer = null;
    input.addEventListener('input', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        state.query = input.value.trim();
        renderCards();
      }, 60);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        input.value = '';
        state.query = '';
        renderCards();
      }
    });
    $('#search-clear').addEventListener('click', function () {
      input.value = '';
      state.query = '';
      renderCards();
      input.focus();
    });
    $('#empty-reset').addEventListener('click', function () {
      input.value = '';
      state.query = '';
      state.category = 'all';
      state.liveOnly = false;
      $('#live-only').checked = false;
      $$('#filter-chips .chip').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-cat') === 'all' ? 'true' : 'false');
      });
      renderCards();
    });
    $('#live-only').addEventListener('change', function (e) {
      state.liveOnly = e.target.checked;
      renderCards();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
      e.preventDefault();
      window.scrollTo({ top: $('#tools').offsetTop - 70, behavior: 'smooth' });
      input.focus({ preventScroll: true });
    });

    $$('.quick-tag').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var term = btn.getAttribute('data-quick');
        input.value = term;
        state.query = term;
        state.category = 'all';
        state.liveOnly = false;
        $('#live-only').checked = false;
        $$('#filter-chips .chip').forEach(function (b) {
          b.setAttribute('aria-pressed', b.getAttribute('data-cat') === 'all' ? 'true' : 'false');
        });
        renderCards();
        var tools = $('#tools');
        window.scrollTo({ top: tools.offsetTop - 60, behavior: 'smooth' });
        window.setTimeout(function () { input.focus({ preventScroll: true }); }, 380);
      });
    });
  }

  /* ------------------------------------------------------------ 시작 */
  function boot() {
    var live = C.liveCount(D.apps);
    $('#live-pill').innerHTML = '<b>' + live + '</b>종 라이브';
    var status = $('#status-line');
    if (status) {
      status.textContent = (D.apps.length - live) === 0
        ? live + '종 모두 지금 바로 열 수 있습니다.'
        : live + '종은 지금 열려 있고, ' + (D.apps.length - live) + '종은 배포를 기다립니다.';
    }
    $('#foot-version').textContent = 'v' + D.meta.version;

    renderChips();
    renderCards();
    renderSavingsTable();
    renderSteps();
    renderTiers();
    renderFaq();
    bindSearch();
    bindForm();

    $('#pick-all').addEventListener('click', function () {
      setPicks(D.apps.map(function (a) { return a.id; }));
    });
    $('#pick-none').addEventListener('click', function () {
      setPicks([]);
    });

    updateSavings();
    document.documentElement.setAttribute('data-hub-ready', '1');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

/* ============================================================================
 * 원탭 도구 허브 (OneTap Tools) · 코어 (DOM 없음)
 * 검색·필터·절약 계산·문의 폼 검증처럼 숫자와 문자열만 다루는 부분.
 * 같은 코드를 브라우저(window.HubCore)와 node(require)에서 함께 씁니다.
 * ==========================================================================*/
(function (root) {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  function trim(s) { return String(s == null ? '' : s).replace(/^\s+|\s+$/g, ''); }

  /* 검색용 정규화: 소문자, 공백·가운뎃점·하이픈·괄호 제거 */
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/[\s\u00a0·・\-_/\\()[\]{}.,'"!?~:;+]/g, '');
  }

  var SYNONYMS = {
    '세금': ['부가세', '종소세', '종합소득세', '세무', '순수익'],
    '급여': ['월급', '알바', '주휴수당', '명세서', '4대보험'],
    '계약': ['계약서', '서명', '도장', '직인'],
    '서명': ['계약서', '도장', '직인', 'pdf'],
    '디자인': ['카드뉴스', '상세페이지', '이미지'],
    '카드': ['카드뉴스', '이미지'],
    '키워드': ['검색', 'seo', '경쟁률'],
    'seo': ['키워드', '검색', '상품명'],
    '광고': ['문구', '표시광고', '법률', '검수'],
    '댓글': ['유튜브', '반응', '고객'],
    '견적': ['제안서', '단가', '인보이스'],
    '체험단': ['인플루언서', '협찬', '공고'],
    '링크': ['프로필', '문의폼', '피싱'],
    '퇴직': ['퇴직금', '퇴사', '연차', '연차수당'],
    '연차': ['휴가', '퇴직금', '연차수당'],
    '보안': ['피싱', '개인정보', '마스킹', '비밀번호'],
    '피싱': ['링크', '보안', '스미싱'],
    '개인정보': ['마스킹', '피싱', '주민번호'],
    '마스킹': ['개인정보', '가리기'],
    'pdf': ['서명', '계약서'],
    'ai': ['llm', '프롬프트', 'gpt', 'claude', 'gemini'],
    '리뷰': ['답글', '별점', '소명서', '배달'],
    '숏폼': ['영상', '쇼츠', '릴스', '대본'],
    '썸네일': ['이미지', '누끼', '배경', '유튜브'],
    '원고': ['글쓰기', '블로그', '스레드', '상세페이지'],
    '이미지': ['썸네일', '누끼', '배경'],
    '누끼': ['이미지', '썸네일', '배경'],
    '해외': ['english', 'en', '달러']
  };

  function haystack(app) {
    return norm([
      app.name, app.en, app.tagline, (app.features || []).join(' '),
      app.replaces && app.replaces.name, app.category,
      app.lang === 'en' ? 'english en 달러 해외' : '한국어 국내'
    ].join(' '));
  }

  function terms(query) {
    var q = norm(query);
    if (!q) return [];
    var out = [q];
    Object.keys(SYNONYMS).forEach(function (key) {
      var k = norm(key);
      if (q.indexOf(k) >= 0 && q.length <= k.length + 1) {
        SYNONYMS[key].forEach(function (s) {
          var v = norm(s);
          if (out.indexOf(v) < 0) out.push(v);
        });
      }
    });
    return out;
  }

  /* 점수: 이름 일치 > 영문명 > 기능 > 설명. 0점은 탈락. */
  function scoreApp(app, list) {
    if (!list.length) return 1;
    var name = norm(app.name + (app.en || ''));
    var feats = norm((app.features || []).join(' '));
    var body = haystack(app);
    var best = 0;
    list.forEach(function (t, i) {
      var w = i === 0 ? 1 : 0.72;                 // 원 질의 가중치
      if (norm(app.name).indexOf(t) === 0 || norm(app.en || '') === t) best = Math.max(best, 100 * w);
      else if (name.indexOf(t) >= 0) best = Math.max(best, 80 * w);
      else if (norm(app.features ? app.features.join(' ') : '').indexOf(t) >= 0 || feats.indexOf(t) >= 0) best = Math.max(best, 55 * w);
      else if (body.indexOf(t) >= 0) best = Math.max(best, 30 * w);
    });
    return best;
  }

  function searchApps(apps, query) {
    var list = terms(query);
    if (!list.length) return apps.slice();
    return apps
      .map(function (a) { return { app: a, score: scoreApp(a, list) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score || a.app.no - b.app.no; })
      .map(function (r) { return r.app; });
  }

  function filterApps(apps, opt) {
    var o = opt || {};
    var out = apps.slice();
    if (o.category && o.category !== 'all') {
      out = out.filter(function (a) { return a.category === o.category; });
    }
    if (o.liveOnly) out = out.filter(function (a) { return a.live; });
    if (o.query) out = searchApps(out, o.query);
    else out.sort(function (a, b) { return a.no - b.no; });
    return out;
  }

  /* 선택한 도구의 유료 대체 요금 합계 — selected 를 주지 않으면 전체 */
  function savings(apps, selected) {
    var ids = (selected == null) ? apps.map(function (a) { return a.id; }) : selected;
    var want = {};
    ids.forEach(function (id) { want[id] = true; });
    var rows = apps.filter(function (a) { return want[a.id]; });
    var monthly = rows.reduce(function (s, a) { return s + (a.replaces ? a.replaces.price : 0); }, 0);
    return {
      count: rows.length,
      monthly: monthly,
      yearly: monthly * 12,
      ids: rows.map(function (a) { return a.id; })
    };
  }

  function categoryCounts(apps) {
    var map = { all: apps.length };
    apps.forEach(function (a) { map[a.category] = (map[a.category] || 0) + 1; });
    return map;
  }

  function fmtKRW(n) {
    var v = Math.round(Number(n) || 0);
    var neg = v < 0;
    var s = String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '-' : '') + s + '원';
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function nowStamp(d) {
    var t = d || new Date();
    return t.getFullYear() + '-' + pad2(t.getMonth() + 1) + '-' + pad2(t.getDate()) +
      ' ' + pad2(t.getHours()) + ':' + pad2(t.getMinutes());
  }

  var PHONE_RE = /^[0-9+\-\s()]{9,20}$/;

  /* 문의 폼: 동의 체크는 선택이 아니라 필수 */
  function validateLead(f) {
    var v = f || {};
    var errors = {};
    if (trim(v.name).length < 2) errors.name = '이름을 2자 이상 적어 주세요.';
    if (!EMAIL_RE.test(trim(v.email))) errors.email = '회신받을 메일 주소 형식을 확인해 주세요.';
    var phone = trim(v.phone);
    if (phone && !PHONE_RE.test(phone)) errors.phone = '숫자와 - 만으로 적어 주세요.';
    if (!trim(v.tool)) errors.tool = '필요한 도구를 하나 골라 주세요.';
    if (trim(v.message).length < 10) errors.message = '어떤 업무에 쓰실지 10자 이상 적어 주세요.';
    if (v.consent !== true) errors.consent = '개인정보 수집·이용에 동의해야 보낼 수 있습니다.';
    return { ok: Object.keys(errors).length === 0, errors: errors };
  }

  function leadSummary(f) {
    var v = f || {};
    var lines = [];
    lines.push('■ 문의 내용');
    lines.push('이름: ' + trim(v.name));
    if (trim(v.org)) lines.push('회사·브랜드: ' + trim(v.org));
    lines.push('회신 메일: ' + trim(v.email));
    if (trim(v.phone)) lines.push('연락처: ' + trim(v.phone));
    lines.push('필요한 도구: ' + trim(v.tool));
    if (trim(v.budget)) lines.push('예산: ' + trim(v.budget));
    lines.push('');
    lines.push('■ 요청 사항');
    lines.push(trim(v.message));
    return lines.join('\n');
  }

  function buildLeadText(f, opt) {
    var o = opt || {};
    var head = ['[도구 허브] B2B 커스텀 제작 문의', '', leadSummary(f), '', '■ 개인정보'];
    head.push('수집·이용 동의: 동의함 (문의 회신 목적, 회신 후 3개월 보관)');
    head.push('작성 시각: ' + (o.stamp || nowStamp(o.now)));
    head.push('수신: ' + (o.to || '문의 수신 메일'));
    return head.join('\n');
  }

  function buildMailto(email, f, opt) {
    var addr = trim(email);
    if (!addr) return '';
    var subject = '[도구 허브] B2B 제작 문의 — ' + (trim(f.org) || trim(f.name) || '문의');
    return 'mailto:' + addr +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(buildLeadText(f, opt));
  }

  function liveCount(apps) { return apps.filter(function (a) { return a.live; }).length; }

  function stepAppIds(steps) {
    var seen = {};
    steps.forEach(function (s) { (s.appIds || []).forEach(function (id) { seen[id] = true; }); });
    return Object.keys(seen);
  }

  var api = {
    trim: trim, norm: norm, terms: terms, scoreApp: scoreApp, searchApps: searchApps,
    filterApps: filterApps, savings: savings, categoryCounts: categoryCounts,
    fmtKRW: fmtKRW, nowStamp: nowStamp, validateLead: validateLead,
    leadSummary: leadSummary, buildLeadText: buildLeadText, buildMailto: buildMailto,
    liveCount: liveCount, stepAppIds: stepAppIds,
    EMAIL_RE: EMAIL_RE, PHONE_RE: PHONE_RE
  };

  root.HubCore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);

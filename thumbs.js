/* ============================================================================
 * 원탭 도구 허브 (OneTap Tools) · 카드 썸네일 (자체 SVG)
 * 외부 이미지·아이콘 폰트 요청이 0건이 되도록 26종을 전부 SVG로 그립니다.
 * 색은 styles.css 의 토큰 클래스(t-paper, t-line, t-ink, t-accent …)를 씁니다.
 * ==========================================================================*/
(function (root) {
  'use strict';

  var W = 320, H = 220;

  function wrap(inner, label) {
    return '<svg class="thumb-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' +
      label + '" preserveAspectRatio="xMidYMid slice">' +
      '<rect class="t-paper" x="0" y="0" width="' + W + '" height="' + H + '" rx="0"/>' +
      inner + '</svg>';
  }

  function lines(x, y, widths, gap, cls) {
    return widths.map(function (w, i) {
      return '<rect class="' + (cls || 't-sub') + '" x="' + x + '" y="' + (y + i * gap) +
        '" width="' + w + '" height="4" rx="2"/>';
    }).join('');
  }

  var THUMBS = {
    /* 01 떡상 레이더 — 배수 막대 + 재생 */
    radar: function () {
      var bars = [
        { y: 44, w: 74, hot: false },
        { y: 76, w: 128, hot: false },
        { y: 108, w: 196, hot: true },
        { y: 140, w: 96, hot: false }
      ].map(function (b) {
        return '<rect class="t-faint" x="30" y="' + b.y + '" width="260" height="18" rx="9"/>' +
          '<rect class="' + (b.hot ? 't-accent' : 't-line') + '" x="30" y="' + b.y + '" width="' + b.w + '" height="18" rx="9"/>';
      }).join('');
      return wrap(
        '<circle class="t-ink" cx="272" cy="52" r="17"/>' +
        '<path class="t-paper-fill" d="M267 44.5 281 52l-14 7.5z"/>' +
        bars +
        '<text class="t-text t-text-ink" x="30" y="30" font-size="10">VIRAL ×</text>' +
        '<text class="t-text t-text-accent" x="238" y="121" font-size="15" font-weight="600">7.3</text>' +
        '<rect class="t-rule" x="30" y="176" width="260" height="1"/>' +
        lines(30, 188, [58, 34], 12, 't-sub'),
        '숏폼 배수 막대와 재생 버튼이 있는 썸네일'
      );
    },

    /* 02 블로그 SEO — 검색 + 점수 링 */
    blog: function () {
      var ring = 2 * Math.PI * 34;
      return wrap(
        '<rect class="t-card" x="24" y="26" width="200" height="34" rx="17"/>' +
        '<circle class="t-stroke-line" cx="46" cy="43" r="7" fill="none" stroke-width="2"/>' +
        '<path class="t-stroke-line" d="M51 48l6 6" stroke-width="2" fill="none"/>' +
        '<rect class="t-sub" x="66" y="41" width="118" height="4" rx="2"/>' +
        '<circle class="t-stroke-line" cx="248" cy="70" r="34" fill="none" stroke-width="7"/>' +
        '<circle class="t-stroke-accent" cx="248" cy="70" r="34" fill="none" stroke-width="7"' +
        ' stroke-dasharray="' + (ring * 0.87) + ' ' + ring + '" stroke-linecap="round" transform="rotate(-90 248 70)"/>' +
        '<text class="t-text t-text-ink" x="248" y="77" font-size="20" text-anchor="middle" font-weight="600">87</text>' +
        '<rect class="t-card" x="24" y="82" width="188" height="44" rx="6"/>' +
        lines(38, 94, [120, 150], 12, 't-sub') +
        '<rect class="t-card" x="24" y="136" width="188" height="44" rx="6"/>' +
        lines(38, 148, [96, 138], 12, 't-sub') +
        '<rect class="t-accent-soft" x="24" y="192" width="86" height="16" rx="8"/>' +
        '<rect class="t-card" x="118" y="192" width="60" height="16" rx="8"/>',
        '검색창과 87점 점수 링이 있는 썸네일'
      );
    },

    /* 03 커머스 SEO — 상품 카드 + 가격 */
    commerce: function () {
      return wrap(
        '<rect class="t-card" x="26" y="24" width="140" height="150" rx="8"/>' +
        '<rect class="t-accent-soft" x="38" y="36" width="116" height="80" rx="4"/>' +
        '<circle class="t-accent-soft-2" cx="82" cy="66" r="12"/>' +
        '<path class="t-line-fill" d="M46 116 74 84l20 20 14-12 22 24z"/>' +
        lines(38, 128, [96, 68], 14, 't-sub') +
        '<text class="t-text t-text-ink" x="38" y="166" font-size="13" font-weight="600">24,900원</text>' +
        '<rect class="t-card" x="182" y="24" width="112" height="90" rx="8"/>' +
        '<text class="t-text t-text-sub" x="194" y="44" font-size="9">경쟁강도</text>' +
        '<rect class="t-faint" x="194" y="54" width="88" height="10" rx="5"/>' +
        '<rect class="t-accent" x="194" y="54" width="52" height="10" rx="5"/>' +
        '<text class="t-text t-text-ink" x="194" y="84" font-size="16" font-weight="600">2.1</text>' +
        '<text class="t-text t-text-sub" x="222" y="84" font-size="9">/ 보통</text>' +
        '<rect class="t-card" x="182" y="124" width="112" height="50" rx="8"/>' +
        '<text class="t-text t-text-sub" x="194" y="142" font-size="9">상품명 점수</text>' +
        '<text class="t-text t-text-accent" x="194" y="163" font-size="17" font-weight="600">94점</text>',
        '상품 사진 카드와 가격, 경쟁강도 막대가 있는 썸네일'
      );
    },

    /* 04 카드뉴스 — 겹친 카드 3장 */
    cardnews: function () {
      function card(x, y, rot) {
        return '<g transform="rotate(' + rot + ' ' + (x + 60) + ' ' + (y + 75) + ')">' +
          '<rect class="t-card-shadow" x="' + (x + 3) + '" y="' + (y + 3) + '" width="120" height="150" rx="4"/>' +
          '<rect class="t-card" x="' + x + '" y="' + y + '" width="120" height="150" rx="4"/>' +
          '</g>';
      }
      return wrap(
        card(44, 34, -6) + card(98, 30, 5) +
        '<rect class="t-paper-fill" x="160" y="34" width="120" height="150" rx="4"/>' +
        '<rect class="t-stroke-line" x="160" y="34" width="120" height="150" rx="4" fill="none"/>' +
        '<rect class="t-accent" x="174" y="50" width="34" height="4" rx="2"/>' +
        lines(174, 66, [88, 70, 82], 13, 't-ink-soft') +
        '<rect class="t-accent-soft" x="174" y="122" width="92" height="30" rx="3"/>' +
        '<text class="t-text t-text-ink" x="180" y="141" font-size="10">4:5 · 9:16</text>' +
        '<text class="t-text t-text-sub" x="174" y="170" font-size="8">PNG · ZIP · SRT</text>' +
        '<text class="t-text t-text-sub" x="44" y="206" font-size="9">1 / 8</text>' +
        '<rect class="t-faint" x="70" y="201" width="180" height="2" rx="1"/>' +
        '<rect class="t-accent" x="70" y="201" width="42" height="2" rx="1"/>',
        '겹쳐 놓은 카드뉴스 세 장과 4대5 비율 표시'
      );
    },

    /* 05 댓글 분석 — 말풍선 + 감정 태그 */
    comments: function () {
      var rows = [
        { y: 30, bubble: 150, tag: 42, cls: 't-accent-soft', tagText: '구매' },
        { y: 70, bubble: 120, tag: 30, cls: 't-faint', tagText: '질문' },
        { y: 110, bubble: 168, tag: 36, cls: 't-faint', tagText: '긍정' },
        { y: 150, bubble: 132, tag: 42, cls: 't-accent', tagText: '불만' }
      ].map(function (r) {
        return '<circle class="t-line-fill" cx="42" cy="' + (r.y + 12) + '" r="10"/>' +
          '<rect class="t-card" x="62" y="' + r.y + '" width="' + r.bubble + '" height="24" rx="12"/>' +
          '<rect class="t-sub" x="76" y="' + (r.y + 10) + '" width="' + (r.bubble - 44) + '" height="4" rx="2"/>' +
          '<rect class="' + r.cls + '" x="' + (232 - 0) + '" y="' + (r.y + 3) + '" width="' + r.tag + '" height="18" rx="9"/>' +
          '<text class="' + (r.cls === 't-accent' ? 't-text t-text-paper' : 't-text t-text-sub') +
          '" x="' + (232 + r.tag / 2) + '" y="' + (r.y + 16) + '" font-size="8" text-anchor="middle">' + r.tagText + '</text>';
      }).join('');
      return wrap(
        rows +
        '<text class="t-text t-text-sub" x="26" y="200" font-size="9">4분류 자동 태깅</text>' +
        '<rect class="t-accent" x="252" y="196" width="46" height="2" rx="1"/>',
        '댓글 말풍선과 구매·질문·긍정·불만 태그가 있는 썸네일'
      );
    },

    /* 06 광고 문구 검수 — 경고 표시가 붙은 문서 */
    law: function () {
      return wrap(
        '<rect class="t-card-shadow" x="80" y="22" width="164" height="180" rx="3"/>' +
        '<rect class="t-paper-fill" x="74" y="18" width="164" height="180" rx="3"/>' +
        '<rect class="t-stroke-line" x="74" y="18" width="164" height="180" rx="3" fill="none"/>' +
        '<rect class="t-ink" x="92" y="38" width="70" height="5" rx="2"/>' +
        lines(92, 58, [128, 118, 132], 12, 't-sub') +
        '<rect class="t-accent-soft" x="88" y="96" width="136" height="22" rx="2"/>' +
        '<rect class="t-sub" x="96" y="103" width="92" height="6" rx="3"/>' +
        '<rect class="t-accent" x="96" y="106" width="92" height="2"/>' +
        lines(92, 130, [120, 100], 12, 't-sub') +
        '<circle class="t-accent" cx="214" cy="170" r="22"/>' +
        '<path class="t-paper-fill" d="M214 158l3 8 8 .6-6 5 2 8-7-4.4-7 4.4 2-8-6-5 8-.6z"/>' +
        '<text class="t-text t-text-sub" x="92" y="186" font-size="8">50 RULES · 1s</text>',
        '문서 위 경고 표시와 검수 문구가 있는 썸네일'
      );
    },

    /* 07 견적서 — A4 단가표 + 합계 */
    proposal: function () {
      return wrap(
        '<rect class="t-card-shadow" x="36" y="18" width="150" height="184" rx="2"/>' +
        '<rect class="t-paper-fill" x="30" y="14" width="150" height="184" rx="2"/>' +
        '<rect class="t-stroke-line" x="30" y="14" width="150" height="184" rx="2" fill="none"/>' +
        '<text class="t-text t-text-ink" x="44" y="38" font-size="11" font-weight="600">QUOTE</text>' +
        '<rect class="t-line" x="44" y="46" width="122" height="1"/>' +
        [0, 1, 2, 3].map(function (i) {
          var y = 62 + i * 22;
          return '<rect class="t-sub" x="44" y="' + y + '" width="' + (54 + (i % 2) * 12) + '" height="4" rx="2"/>' +
            '<rect class="t-ink-soft" x="118" y="' + y + '" width="34" height="4" rx="2"/>' +
            '<rect class="t-faint" x="44" y="' + (y + 10) + '" width="122" height="1"/>';
        }).join('') +
        '<rect class="t-accent-soft" x="44" y="154" width="122" height="24" rx="2"/>' +
        '<text class="t-text t-text-ink" x="52" y="170" font-size="9">합계</text>' +
        '<text class="t-text t-text-ink" x="158" y="170" font-size="10" text-anchor="end" font-weight="600">₩2,420,000</text>' +
        '<rect class="t-card" x="196" y="56" width="94" height="70" rx="6"/>' +
        '<text class="t-text t-text-sub" x="208" y="76" font-size="9">테마 8종</text>' +
        [0, 1, 2, 3].map(function (i) {
          return '<rect class="' + (i === 1 ? 't-accent' : 't-line-fill') + '" x="' + (208 + i * 18) + '" y="86" width="12" height="24" rx="2"/>';
        }).join('') +
        '<rect class="t-card" x="196" y="140" width="94" height="44" rx="6"/>' +
        '<text class="t-text t-text-sub" x="208" y="158" font-size="9">A4 · 2쪽</text>' +
        '<rect class="t-ink" x="208" y="166" width="52" height="4" rx="2"/>',
        '견적서 한 장과 테마 견본이 있는 썸네일'
      );
    },

    /* 08 체험단 보드 — 칸반 3열 */
    influencer: function () {
      function col(x, items, accentIndex) {
        return '<rect class="t-faint" x="' + x + '" y="34" width="80" height="152" rx="6"/>' +
          '<rect class="t-sub" x="' + (x + 10) + '" y="46" width="34" height="4" rx="2"/>' +
          items.map(function (h, i) {
            var y = 60 + i * (h + 8);
            return '<rect class="' + (i === accentIndex ? 't-accent-soft' : 't-card') + '" x="' + (x + 8) +
              '" y="' + y + '" width="64" height="' + h + '" rx="4"/>' +
              '<circle class="' + (i === accentIndex ? 't-accent' : 't-line-fill') + '" cx="' + (x + 18) +
              '" cy="' + (y + 11) + '" r="4"/>' +
              '<rect class="t-sub" x="' + (x + 26) + '" y="' + (y + 9) + '" width="34" height="3" rx="1.5"/>' +
              '<rect class="t-faint" x="' + (x + 16) + '" y="' + (y + 20) + '" width="44" height="3" rx="1.5"/>';
          }).join('');
      }
      return wrap(
        col(26, [34, 26, 34], 0) + col(120, [26, 34], -1) + col(214, [34, 26], 0) +
        '<text class="t-text t-text-sub" x="26" y="204" font-size="9">CPV · ROI</text>' +
        '<text class="t-text t-text-accent" x="230" y="204" font-size="11" font-weight="600">+312%</text>',
        '체험단 지원자를 세 칸으로 나눈 보드 썸네일'
      );
    },

    /* 09 PDF 서명 — 서명 선 + 도장 */
    signature: function () {
      return wrap(
        '<rect class="t-card-shadow" x="60" y="16" width="158" height="188" rx="3"/>' +
        '<rect class="t-paper-fill" x="54" y="12" width="158" height="188" rx="3"/>' +
        '<rect class="t-stroke-line" x="54" y="12" width="158" height="188" rx="3" fill="none"/>' +
        '<text class="t-text t-text-sub" x="70" y="34" font-size="9">CONTRACT</text>' +
        lines(70, 48, [126, 120, 104, 126, 88], 13, 't-sub') +
        '<rect class="t-line" x="70" y="122" width="126" height="1"/>' +
        '<path class="t-stroke-accent" d="M74 150c8-14 14 8 22-4s10 12 20-2 12 10 22-4 14 8 24 2" fill="none" stroke-width="2.4" stroke-linecap="round"/>' +
        '<rect class="t-line" x="70" y="164" width="70" height="1"/>' +
        '<circle class="t-stroke-accent" cx="184" cy="158" r="26" fill="none" stroke-width="2"/>' +
        '<circle class="t-stroke-accent" cx="184" cy="158" r="20" fill="none" stroke-width="1"/>' +
        '<text class="t-text t-text-accent" x="184" y="162" font-size="9" text-anchor="middle">직인</text>' +
        '<rect class="t-card" x="222" y="120" width="66" height="24" rx="12"/>' +
        '<text class="t-text t-text-ink" x="255" y="136" font-size="9" text-anchor="middle">0 KB 전송</text>',
        '계약서 위 서명과 둥근 도장이 있는 썸네일'
      );
    },

    /* 10 급여명세서 — 표와 실수령액 */
    payslip: function () {
      var rows = [0, 1, 2].map(function (i) {
        var y = 74 + i * 24;
        return '<rect class="t-sub" x="44" y="' + (y + 5) + '" width="' + (40 + i * 10) + '" height="4" rx="2"/>' +
          '<rect class="t-ink-soft" x="182" y="' + (y + 5) + '" width="40" height="4" rx="2"/>' +
          '<rect class="t-faint" x="44" y="' + (y + 18) + '" width="192" height="1"/>';
      }).join('');
      return wrap(
        '<rect class="t-card-shadow" x="28" y="16" width="228" height="188" rx="3"/>' +
        '<rect class="t-paper-fill" x="24" y="12" width="228" height="188" rx="3"/>' +
        '<rect class="t-stroke-line" x="24" y="12" width="228" height="188" rx="3" fill="none"/>' +
        '<text class="t-text t-text-ink" x="44" y="38" font-size="11" font-weight="600">급여명세서</text>' +
        '<text class="t-text t-text-sub" x="228" y="38" font-size="9" text-anchor="end">2026. 11.</text>' +
        '<rect class="t-accent" x="44" y="48" width="192" height="2"/>' +
        rows +
        '<rect class="t-accent-soft" x="36" y="152" width="204" height="34" rx="2"/>' +
        '<text class="t-text t-text-ink" x="44" y="173" font-size="9">실수령액</text>' +
        '<text class="t-text t-text-ink" x="232" y="174" font-size="14" text-anchor="end" font-weight="600">1,182,523</text>' +
        '<text class="t-text t-text-sub" x="44" y="196" font-size="7">주휴수당 · 4대보험 · 소득세 자동</text>',
        '급여명세서 표와 실수령액이 있는 썸네일'
      );
    },

    /* 11 세금 — 두 막대 비교 + 도넛 */
    tax: function () {
      var arc = 2 * Math.PI * 26;
      return wrap(
        '<text class="t-text t-text-sub" x="26" y="34" font-size="9">부가세 비교</text>' +
        '<rect class="t-line-fill" x="34" y="52" width="40" height="112" rx="3"/>' +
        '<rect class="t-accent" x="34" y="98" width="40" height="66" rx="3"/>' +
        '<text class="t-text t-text-sub" x="54" y="182" font-size="8" text-anchor="middle">간이</text>' +
        '<rect class="t-line-fill" x="92" y="52" width="40" height="112" rx="3"/>' +
        '<rect class="t-accent" x="92" y="72" width="40" height="92" rx="3"/>' +
        '<text class="t-text t-text-sub" x="112" y="182" font-size="8" text-anchor="middle">일반</text>' +
        '<rect class="t-faint" x="26" y="166" width="118" height="1"/>' +
        '<circle class="t-stroke-line" cx="234" cy="86" r="26" fill="none" stroke-width="10"/>' +
        '<circle class="t-stroke-accent" cx="234" cy="86" r="26" fill="none" stroke-width="10"' +
        ' stroke-dasharray="' + (arc * 0.33) + ' ' + arc + '" stroke-linecap="round" transform="rotate(-90 234 86)"/>' +
        '<text class="t-text t-text-ink" x="234" y="91" font-size="12" text-anchor="middle" font-weight="600">3.3%</text>' +
        '<rect class="t-card" x="180" y="132" width="108" height="56" rx="4"/>' +
        '<text class="t-text t-text-sub" x="192" y="150" font-size="8">이번 달 순수익</text>' +
        '<text class="t-text t-text-ink" x="192" y="172" font-size="15" font-weight="600">2,840,000</text>',
        '간이와 일반 부가세 막대, 3.3퍼센트 도넛이 있는 썸네일'
      );
    },

    /* 12 원탭링크 — 폰 속 링크 버튼 */
    linkhub: function () {
      return wrap(
        '<rect class="t-card-shadow" x="106" y="14" width="112" height="192" rx="16"/>' +
        '<rect class="t-paper-fill" x="100" y="8" width="112" height="192" rx="16"/>' +
        '<rect class="t-stroke-line" x="100" y="8" width="112" height="192" rx="16" fill="none"/>' +
        '<rect class="t-ink" x="140" y="16" width="32" height="4" rx="2"/>' +
        '<circle class="t-accent-soft" cx="156" cy="46" r="16"/>' +
        '<text class="t-text t-text-ink" x="156" y="70" font-size="8" text-anchor="middle">@brand</text>' +
        ['t-ink', 't-card', 't-card'].map(function (cls, i) {
          return '<rect class="' + cls + '" x="112" y="' + (84 + i * 30) + '" width="88" height="22" rx="11"/>' +
            (cls === 't-ink' ? '<text class="t-text t-text-paper" x="156" y="' + (99 + i * 30) + '" font-size="8" text-anchor="middle">문의 남기기</text>' : '');
        }).join('') +
        '<rect class="t-card" x="112" y="174" width="88" height="18" rx="9"/>' +
        '<path class="t-stroke-accent" d="M40 108h34m0 0-8-8m8 8-8 8" fill="none" stroke-width="2"/>' +
        '<path class="t-stroke-accent" d="M246 108h34m0 0-8-8m8 8-8 8" fill="none" stroke-width="2"/>' +
        '<text class="t-text t-text-sub" x="26" y="150" font-size="8">HTML 1장</text>' +
        '<text class="t-text t-text-sub" x="232" y="150" font-size="8">광고 0</text>',
        '휴대폰 화면 안 링크 버튼과 문의 버튼이 있는 썸네일'
      );
    },

    /* 13 ICS — 달력 격자 + CSV */
    calendar: function () {
      var cells = [];
      for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 5; c++) {
          var x = 28 + c * 26, y = 62 + r * 26;
          var filled = (r === 1 && c === 2) || (r === 2 && c === 4);
          cells.push('<rect class="' + (filled ? 't-accent' : 't-card') + '" x="' + x + '" y="' + y +
            '" width="20" height="20" rx="3"/>');
        }
      }
      return wrap(
        '<text class="t-text t-text-sub" x="28" y="34" font-size="9" letter-spacing="1">NOVEMBER</text>' +
        cells.join('') +
        '<rect class="t-line" x="28" y="168" width="126" height="1"/>' +
        '<path class="t-stroke-accent" d="M182 104h44m0 0-10-10m10 10-10 10" fill="none" stroke-width="2"/>' +
        '<rect class="t-card" x="240" y="76" width="54" height="56" rx="6"/>' +
        '<text class="t-text t-text-ink" x="267" y="102" font-size="11" text-anchor="middle" font-weight="600">CSV</text>' +
        '<text class="t-text t-text-sub" x="267" y="118" font-size="7" text-anchor="middle">TSV · JSON</text>' +
        '<text class="t-text t-text-sub" x="28" y="190" font-size="8">RFC 5545 검사 · 브라우저에서만</text>',
        '달력 격자와 CSV로 내보내는 화살표가 있는 썸네일'
      );
    },

    /* 14 인보이스 — 금액과 P&L 막대 */
    invoice: function () {
      return wrap(
        '<rect class="t-card-shadow" x="22" y="18" width="186" height="184" rx="3"/>' +
        '<rect class="t-paper-fill" x="18" y="14" width="186" height="184" rx="3"/>' +
        '<rect class="t-stroke-line" x="18" y="14" width="186" height="184" rx="3" fill="none"/>' +
        '<text class="t-text t-text-ink" x="34" y="38" font-size="10" font-weight="600">INVOICE</text>' +
        '<text class="t-text t-text-sub" x="188" y="38" font-size="8" text-anchor="end">#0012</text>' +
        '<rect class="t-ink" x="34" y="46" width="154" height="1"/>' +
        [0, 1, 2].map(function (i) {
          var y = 62 + i * 22;
          return '<rect class="t-sub" x="34" y="' + y + '" width="' + (70 + i * 8) + '" height="4" rx="2"/>' +
            '<text class="t-text t-text-ink" x="188" y="' + (y + 5) + '" font-size="8" text-anchor="end">$' + (1200 - i * 250) + '.00</text>';
        }).join('') +
        '<rect class="t-accent-soft" x="34" y="134" width="154" height="26" rx="2"/>' +
        '<text class="t-text t-text-ink" x="42" y="151" font-size="8">TOTAL</text>' +
        '<text class="t-text t-text-ink" x="180" y="151" font-size="11" text-anchor="end" font-weight="600">$2,410.00</text>' +
        '<text class="t-text t-text-sub" x="34" y="180" font-size="7">정수 센트 계산 · BigInt</text>' +
        '<text class="t-text t-text-sub" x="218" y="90" font-size="8">P&amp;L</text>' +
        [0, 1, 2, 3].map(function (i) {
          var h = [34, 52, 28, 62][i];
          return '<rect class="' + (i === 3 ? 't-accent' : 't-line-fill') + '" x="' + (218 + i * 19) +
            '" y="' + (166 - h) + '" width="12" height="' + h + '" rx="2"/>';
        }).join('') +
        '<rect class="t-line" x="214" y="166" width="82" height="1"/>',
        '인보이스 금액표와 손익 막대가 있는 썸네일'
      );
    },

    /* 15 LLM 비용 — 계산식 + 추세선 */
    llm: function () {
      return wrap(
        '<rect class="t-card" x="24" y="26" width="72" height="30" rx="15"/>' +
        '<text class="t-text t-text-ink" x="60" y="46" font-size="10" text-anchor="middle">tokens</text>' +
        '<text class="t-text t-text-sub" x="104" y="46" font-size="12" text-anchor="middle">×</text>' +
        '<rect class="t-card" x="120" y="26" width="60" height="30" rx="15"/>' +
        '<text class="t-text t-text-ink" x="150" y="46" font-size="10" text-anchor="middle">$ / M</text>' +
        '<text class="t-text t-text-sub" x="192" y="46" font-size="12" text-anchor="middle">=</text>' +
        '<text class="t-text t-text-accent" x="246" y="48" font-size="18" text-anchor="middle" font-weight="600">$412</text>' +
        '<rect class="t-faint" x="24" y="76" width="272" height="1"/>' +
        '<path class="t-stroke-line" d="M24 158 76 140l52 12 52-30 52 10 52-26" fill="none" stroke-width="2"/>' +
        '<path class="t-stroke-accent" d="M24 166 76 158l52-16 52 4 52-26 52 8" fill="none" stroke-width="2.4"/>' +
        '<circle class="t-accent" cx="284" cy="120" r="4"/>' +
        '<text class="t-text t-text-sub" x="24" y="192" font-size="8">CACHED · BUDGET · YEARLY</text>' +
        '<rect class="t-card" x="212" y="180" width="78" height="18" rx="9"/>' +
        '<text class="t-text t-text-ink" x="251" y="192" font-size="8" text-anchor="middle">llms.txt</text>',
        '토큰 단가 계산식과 비용 추세선이 있는 썸네일'
      );
    },

    /* 16 퇴직금·연차 — 정산서 + 연차 달력 */
    severance: function () {
      var cal = [];
      for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 5; c++) {
          var x = 212 + c * 17, y = 46 + r * 17;
          var on = (r === 1 && c === 2) || (r === 2 && c === 4) || (r === 3 && c === 1);
          cal.push('<rect class="' + (on ? 't-accent' : 't-card') + '" x="' + x + '" y="' + y +
            '" width="13" height="13" rx="2"/>');
        }
      }
      return wrap(
        '<rect class="t-card-shadow" x="28" y="18" width="172" height="184" rx="3"/>' +
        '<rect class="t-paper-fill" x="24" y="14" width="172" height="184" rx="3"/>' +
        '<rect class="t-stroke-line" x="24" y="14" width="172" height="184" rx="3" fill="none"/>' +
        '<text class="t-text t-text-ink" x="40" y="52" font-size="10" font-weight="600">퇴직금 정산</text>' +
        '<rect class="t-accent" x="40" y="58" width="140" height="2"/>' +
        lines(40, 70, [104, 84, 96], 11, 't-sub') +
        '<rect class="t-rule" x="40" y="102" width="140" height="1"/>' +
        '<text class="t-text t-text-sub" x="40" y="116" font-size="7">평균임금 × 30 × 재직일수/365</text>' +
        '<rect class="t-accent-soft" x="40" y="126" width="140" height="42" rx="2"/>' +
        '<text class="t-text t-text-sub" x="48" y="141" font-size="8">퇴직금</text>' +
        '<text class="t-text t-text-ink" x="172" y="155" font-size="16" text-anchor="end" font-weight="600">8,420,000</text>' +
        '<text class="t-text t-text-sub" x="40" y="184" font-size="7">평균임금 · 통상임금 중 큰 값</text>' +
        '<text class="t-text t-text-sub" x="212" y="34" font-size="9">연차</text>' +
        cal.join('') +
        '<text class="t-text t-text-sub" x="212" y="142" font-size="7">올해 잔여</text>' +
        '<text class="t-text t-text-accent" x="212" y="166" font-size="20" font-weight="600">15일</text>' +
        '<text class="t-text t-text-sub" x="212" y="182" font-size="7">회계연도 정산</text>',
        '퇴직금 정산서와 연차 달력이 있는 썸네일'
      );
    },

    /* 17 보안 점검 — 가린 개인정보 + 방패 */
    guard: function () {
      return wrap(
        '<rect class="t-card" x="24" y="48" width="272" height="26" rx="13"/>' +
        '<path class="t-stroke-line" d="M37 57v-4a4 4 0 0 1 8 0v4" fill="none" stroke-width="1.6"/>' +
        '<rect class="t-line-fill" x="35" y="57" width="12" height="9" rx="1.5"/>' +
        '<rect class="t-sub" x="56" y="60" width="134" height="4" rx="2"/>' +
        '<rect class="t-accent" x="212" y="53" width="72" height="15" rx="7"/>' +
        '<text class="t-text t-text-paper" x="248" y="64" font-size="7" text-anchor="middle">피싱 위험 92</text>' +
        '<path class="t-line-fill" d="M88 86l34 13v28c0 22-16 36-34 43-18-7-34-21-34-43V99z"/>' +
        '<path class="t-stroke-accent" d="M72 118l12 13 24-28" fill="none" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text class="t-text t-text-sub" x="148" y="94" font-size="8">주민등록번호</text>' +
        '<text class="t-text t-text-ink" x="148" y="108" font-size="10">900101-1******</text>' +
        '<text class="t-text t-text-sub" x="148" y="124" font-size="8">카드번호</text>' +
        '<text class="t-text t-text-ink" x="148" y="138" font-size="10">4111-****-****-1111</text>' +
        '<text class="t-text t-text-sub" x="148" y="154" font-size="8">휴대폰</text>' +
        '<text class="t-text t-text-ink" x="148" y="168" font-size="10">010-****-5678</text>' +
        '<rect class="t-accent-soft" x="148" y="176" width="62" height="14" rx="7"/>' +
        '<text class="t-text t-text-sub" x="179" y="186" font-size="7" text-anchor="middle">GPS 삭제</text>' +
        '<text class="t-text t-text-sub" x="24" y="208" font-size="8">마스킹 · 링크 진단 · 사진 메타 점검</text>',
        '가린 개인정보와 방패 표시가 있는 썸네일'
      );
    },

    /* 18 리뷰 답글 — 별점 리뷰 + 사장님 답글 + 말투 칩 */
    reply: function () {
      var stars = [0, 1, 2, 3, 4].map(function (i) {
        return '<circle class="' + (i < 2 ? 't-accent' : 't-line-fill') + '" cx="' + (32 + i * 16) + '" cy="46" r="4"/>';
      }).join('');
      return wrap(
        stars +
        '<text class="t-text t-text-sub" x="110" y="50" font-size="9" letter-spacing="1">REVIEW</text>' +
        '<rect class="t-card" x="24" y="60" width="186" height="60" rx="8"/>' +
        '<circle class="t-line-fill" cx="44" cy="80" r="10"/>' +
        '<rect class="t-sub" x="62" y="72" width="48" height="4" rx="2"/>' +
        lines(62, 84, [120, 96], 12, 't-sub') +
        '<path class="t-stroke-accent" d="M40 124v10h12" fill="none" stroke-width="2"/>' +
        '<rect class="t-accent-soft" x="46" y="138" width="248" height="62" rx="8"/>' +
        '<text class="t-text t-text-ink" x="60" y="158" font-size="9">사장님 답글</text>' +
        ['정중', '친근', '짧게'].map(function (t, i) {
          return '<rect class="' + (i === 0 ? 't-accent' : 't-card') + '" x="' + (196 + i * 32) + '" y="148" width="28" height="13" rx="6.5"/>' +
            '<text class="' + (i === 0 ? 't-text t-text-paper' : 't-text t-text-sub') + '" x="' + (210 + i * 32) + '" y="157" font-size="6.5" text-anchor="middle">' + t + '</text>';
        }).join('') +
        lines(60, 168, [120, 160, 100], 11, 't-sub') +
        '<text class="t-text t-text-accent" x="294" y="212" font-size="8" text-anchor="end">답글 3안 · 일괄 답글</text>',
        '별점 리뷰 아래 사장님 답글과 말투 선택 칩이 있는 썸네일'
      );
    },

    /* 19 숏폼 — 세로 폰 프레임 + 5컷 타임라인 */
    shorts: function () {
      var cuts = [0, 1, 2, 3, 4].map(function (i) {
        return '<text class="t-text t-text-sub" x="26" y="' + (48 + i * 28) + '" font-size="8">0' + (i + 1) + '</text>' +
          '<rect class="' + (i === 0 ? 't-accent' : 't-line-fill') + '" x="44" y="' + (40 + i * 28) + '" width="' + (22 + i * 9) + '" height="10" rx="5"/>';
      }).join('');
      return wrap(
        '<rect class="t-card-shadow" x="128" y="14" width="96" height="190" rx="16"/>' +
        '<rect class="t-paper-fill" x="122" y="8" width="96" height="190" rx="16"/>' +
        '<rect class="t-stroke-line" x="122" y="8" width="96" height="190" rx="16" fill="none"/>' +
        '<rect class="t-accent-soft" x="132" y="20" width="76" height="122" rx="6"/>' +
        '<circle class="t-ink" cx="170" cy="78" r="18"/>' +
        '<path class="t-paper-fill" d="M165 69 181 78l-16 9z"/>' +
        '<rect class="t-accent" x="132" y="150" width="22" height="4" rx="2"/>' +
        '<rect class="t-line-fill" x="158" y="150" width="14" height="4" rx="2"/>' +
        '<rect class="t-line-fill" x="176" y="150" width="14" height="4" rx="2"/>' +
        '<rect class="t-line-fill" x="194" y="150" width="14" height="4" rx="2"/>' +
        '<text class="t-text t-text-sub" x="132" y="176" font-size="7">3.8s HOOK</text>' +
        cuts +
        '<text class="t-text t-text-ink" x="238" y="52" font-size="14" font-weight="600">9:16</text>' +
        '<rect class="t-accent-soft" x="234" y="64" width="70" height="16" rx="8"/>' +
        '<text class="t-text t-text-ink" x="269" y="75" font-size="7" text-anchor="middle">.webm 녹화</text>' +
        '<text class="t-text t-text-sub" x="234" y="102" font-size="8">자막 .srt</text>' +
        '<rect class="t-rule" x="26" y="188" width="84" height="1"/>' +
        '<text class="t-text t-text-sub" x="26" y="205" font-size="7.5">5컷 · 자막 · 배경음</text>',
        '세로 폰 화면에 재생 버튼과 5컷 타임라인이 있는 썸네일'
      );
    },

    /* 20 원고 — 원고지 + 포맷 탭 + AI 티 점검 */
    writer: function () {
      var tabs = ['블로그', '스레드', '상세'].map(function (t, i) {
        return '<rect class="' + (i === 0 ? 't-accent' : 't-card') + '" x="224" y="' + (34 + i * 26) + '" width="74" height="20" rx="3"/>' +
          '<text class="' + (i === 0 ? 't-text t-text-paper' : 't-text t-text-sub') + '" x="261" y="' + (48 + i * 26) + '" font-size="8" text-anchor="middle">' + t + '</text>';
      }).join('');
      var ring = 2 * Math.PI * 20;
      return wrap(
        '<rect class="t-card-shadow" x="26" y="16" width="186" height="188" rx="3"/>' +
        '<rect class="t-paper-fill" x="22" y="12" width="186" height="188" rx="3"/>' +
        '<rect class="t-stroke-line" x="22" y="12" width="186" height="188" rx="3" fill="none"/>' +
        '<rect class="t-accent" x="36" y="40" width="118" height="6" rx="3"/>' +
        lines(36, 58, [150, 138, 154, 116], 13, 't-sub') +
        '<rect class="t-accent-soft" x="36" y="114" width="154" height="20" rx="2"/>' +
        '<text class="t-text t-text-ink" x="42" y="128" font-size="8">소제목 5단</text>' +
        lines(36, 146, [148, 126], 13, 't-sub') +
        '<rect class="t-faint" x="36" y="176" width="152" height="1"/>' +
        '<text class="t-text t-text-sub" x="36" y="190" font-size="7">2,200자 · 실사 사진 6곳</text>' +
        tabs +
        '<circle class="t-stroke-line" cx="262" cy="140" r="20" fill="none" stroke-width="5"/>' +
        '<circle class="t-stroke-accent" cx="262" cy="140" r="20" fill="none" stroke-width="5"' +
        ' stroke-dasharray="' + (ring * 0.06) + ' ' + ring + '" stroke-linecap="round" transform="rotate(-90 262 140)"/>' +
        '<text class="t-text t-text-ink" x="262" y="144" font-size="10" text-anchor="middle" font-weight="600">0</text>' +
        '<text class="t-text t-text-sub" x="262" y="176" font-size="7" text-anchor="middle">AI 티</text>' +
        '<text class="t-text t-text-sub" x="224" y="198" font-size="7">광고 위험 표현 점검</text>',
        '원고지와 블로그·스레드·상세 탭, AI 티 점수 고리가 있는 썸네일'
      );
    },

    /* 21 이미지 — 캔버스 + 투명 격자 + 규격 칩 */
    image: function () {
      var checks = [];
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 5; c++) {
          var x = 28 + c * 20, y = 108 + r * 20;
          if ((r + c) % 2 === 0) checks.push('<rect class="t-faint" x="' + x + '" y="' + y + '" width="20" height="20"/>');
        }
      }
      return wrap(
        '<rect class="t-card" x="22" y="20" width="196" height="150" rx="4"/>' +
        checks.join('') +
        '<rect class="t-accent-soft" x="28" y="26" width="100" height="72" rx="2"/>' +
        '<circle class="t-line-fill" cx="52" cy="48" r="9"/>' +
        '<path class="t-line-fill" d="M34 96 66 62l20 20 12-10 22 24z"/>' +
        '<rect class="t-paper-fill" x="22" y="112" width="196" height="58" rx="4"/>' +
        '<rect class="t-stroke-line" x="22" y="112" width="196" height="58" rx="4" fill="none"/>' +
        '<rect class="t-accent" x="34" y="126" width="42" height="7" rx="3"/>' +
        '<rect class="t-ink" x="82" y="126" width="86" height="7" rx="3"/>' +
        '<text class="t-text t-text-sub" x="34" y="152" font-size="7">겨울 가습기 3만원대</text>' +
        '<rect class="t-card" x="36" y="80" width="52" height="14" rx="7"/>' +
        '<text class="t-text t-text-accent" x="62" y="90" font-size="7" text-anchor="middle">누끼 완료</text>' +
        ['1280×720', '1080×1350', '1000×1000'].map(function (t, i) {
          return '<rect class="' + (i === 0 ? 't-accent-soft' : 't-card') + '" x="228" y="' + (44 + i * 24) + '" width="72" height="18" rx="9"/>' +
            '<text class="t-text t-text-sub" x="264" y="' + (57 + i * 24) + '" font-size="7" text-anchor="middle">' + t + '</text>';
        }).join('') +
        '<rect class="t-rule" x="228" y="126" width="70" height="1"/>' +
        '<text class="t-text t-text-ink" x="228" y="146" font-size="9">테마 6종</text>' +
        '<text class="t-text t-text-sub" x="228" y="166" font-size="7">PNG · JPG · WebP</text>' +
        '<text class="t-text t-text-sub" x="22" y="196" font-size="8">배경 투명화 · 그림자 · 합성</text>',
        '사진 캔버스와 투명 격자, 규격 칩이 있는 썸네일'
      );
    },

    /* 02 벡터 — 베지어 곡선 + 노드 + 포맷 칩 */
    vector: function () {
      var chips = ['SVG', 'EPS', 'PDF', 'AI'].map(function (t, i) {
        return '<rect class="' + (i === 0 ? 't-accent' : 't-card') + '" x="' + (206 + (i % 2) * 46) + '" y="' + (36 + Math.floor(i / 2) * 24) + '" width="40" height="18" rx="9"/>' +
          '<text class="' + (i === 0 ? 't-text t-text-paper' : 't-text t-text-sub') + '" x="' + (226 + (i % 2) * 46) + '" y="' + (49 + Math.floor(i / 2) * 24) + '" font-size="8" text-anchor="middle">' + t + '</text>';
      }).join('');
      var nodes = [[44, 152], [104, 62], [166, 140], [186, 78]].map(function (p) {
        return '<circle class="t-paper-fill" cx="' + p[0] + '" cy="' + p[1] + '" r="5"/>' +
          '<circle class="t-stroke-accent" cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="none" stroke-width="1.6"/>';
      }).join('');
      return wrap(
        '<rect class="t-card" x="20" y="20" width="178" height="166" rx="8"/>' +
        '<path class="t-accent" d="M44 152C104 62 166 140 186 78" fill="none" stroke="none"/>' +
        '<path d="M44 152C104 62 166 140 186 78" fill="none" class="t-stroke-accent" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M44 152C74 104 128 100 186 78" fill="none" class="t-stroke-line" stroke-width="1" stroke-dasharray="4 4"/>' +
        nodes +
        '<text class="t-text t-text-ink" x="32" y="36" font-size="9">BEZIER FIT</text>' +
        chips +
        '<rect class="t-rule" x="32" y="132" width="120" height="1"/>' +
        '<text class="t-text t-text-sub" x="32" y="150" font-size="7">PNG 2.4MB → SVG 38KB</text>' +
        '<text class="t-text t-text-accent" x="32" y="168" font-size="8">인쇄 300dpi · 색상 12색</text>' +
        '<text class="t-text t-text-sub" x="206" y="112" font-size="7">배경 투명</text>' +
        '<rect class="t-accent-soft" x="206" y="120" width="88" height="52" rx="4"/>' +
        '<text class="t-text t-text-ink" x="214" y="142" font-size="9">로고 분리</text>' +
        '<text class="t-text t-text-sub" x="214" y="158" font-size="7">누끼 · 곡선 정리</text>',
        '베지어 곡선과 노드, SVG·EPS 포맷 칩이 있는 썸네일'
      );
    },

    /* 03 연말정산 — 12월 달력 + 역산 화살표 + 13 */
    yearend: function () {
      var cells = [];
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 4; c++) {
          cells.push('<rect class="t-faint" x="' + (30 + c * 26) + '" y="' + (62 + r * 26) + '" width="20" height="20" rx="3"/>');
        }
      }
      return wrap(
        '<rect class="t-card" x="20" y="20" width="150" height="170" rx="8"/>' +
        '<text class="t-text t-text-sub" x="30" y="44" font-size="9">12월</text>' +
        '<text class="t-text t-text-ink" x="30" y="58" font-size="8">31일까지</text>' +
        cells.join('') +
        '<rect class="t-accent" x="108" y="88" width="20" height="20" rx="3"/>' +
        '<text class="t-text t-text-paper" x="118" y="102" font-size="8" text-anchor="middle">31</text>' +
        '<path class="t-stroke-accent" d="M186 166h82" stroke-width="2" fill="none"/>' +
        '<path d="M258 161l10 5-10 5z" class="t-accent"/>' +
        '<text class="t-text t-text-sub" x="186" y="152" font-size="8">지금 넣으면</text>' +
        '<text class="t-text t-text-ink" x="186" y="140" font-size="22" font-weight="600">+13월</text>' +
        '<text class="t-text t-text-sub" x="186" y="188" font-size="7">카드 25% · 연금 900만</text>' +
        '<rect class="t-accent-soft" x="186" y="44" width="104" height="72" rx="6"/>' +
        '<text class="t-text t-text-ink" x="196" y="64" font-size="9">환급액</text>' +
        '<text class="t-text t-text-ink" x="196" y="94" font-size="20" font-weight="600">83.4만</text>' +
        '<text class="t-text t-text-accent" x="196" y="108" font-size="7">지금 실행 시</text>',
        '12월 달력과 역산 화살표, 환급액 숫자가 있는 썸네일'
      );
    },

    /* 11 백오피스 — 카톡 접수 → 당일 납품 체크리스트 */
    backoffice: function () {
      var items = ['리뷰 답글 20건', '블로그 원고 4편', '카드뉴스 4장', '견적서 2건'].map(function (t, i) {
        return '<rect class="t-card" x="150" y="' + (34 + i * 30) + '" width="150" height="24" rx="4"/>' +
          '<path d="M158 ' + (46 + i * 30) + 'l4 4 7-7" class="t-stroke-accent" fill="none" stroke-width="2"/>' +
          '<text class="t-text t-text-sub" x="176" y="' + (50 + i * 30) + '" font-size="8">' + t + '</text>';
      }).join('');
      return wrap(
        '<rect class="t-card" x="20" y="44" width="112" height="132" rx="10"/>' +
        '<path d="M42 96c0-16 14-26 34-26s34 10 34 26-14 24-34 24l-14-2-12 8 3-12c-7-5-11-11-11-18z" class="t-accent-soft"/>' +
        '<text class="t-text t-text-ink" x="62" y="92" font-size="9">카톡 접수</text>' +
        '<text class="t-text t-text-sub" x="62" y="106" font-size="7" text-anchor="middle">하루 3분</text>' +
        '<text class="t-text t-text-sub" x="30" y="52" font-size="7">사장님 →</text>' +
        '<path class="t-stroke-accent" d="M136 108h10" stroke-width="2" fill="none"/>' +
        '<path d="M142 103l8 5-8 5z" class="t-accent"/>' +
        '<text class="t-text t-text-ink" x="150" y="24" font-size="9">당일 납품 · 법규 검수</text>' +
        items +
        '<text class="t-text t-text-sub" x="150" y="162" font-size="7">아이디·비밀번호 없음</text>' +
        '<text class="t-text t-text-accent" x="150" y="180" font-size="9" font-weight="600">월 39만 원</text>' +
        '<text class="t-text t-text-sub" x="20" y="200" font-size="7">사람이 붙는 유료 대행 서비스</text>',
        '카톡 접수 말풍선과 당일 납품 체크리스트가 있는 썸네일'
      );
    },

    /* 25 작업 증빙 리포트 — 체크된 완료 목록 + 소요시간 배지 + 공유 링크 */
    proof: function () {
      var rows = [0, 1, 2].map(function (i) {
        var y = 72 + i * 30;
        return '<rect class="t-card" x="26" y="' + y + '" width="190" height="22" rx="5"/>' +
          '<path class="t-stroke-accent" d="M34 ' + (y + 11) + 'l4 4 6-7" fill="none" stroke-width="2"/>' +
          '<rect class="t-sub" x="52" y="' + (y + 8) + '" width="' + (104 - i * 18) + '" height="4" rx="2"/>' +
          '<rect class="t-faint" x="176" y="' + (y + 7) + '" width="30" height="8" rx="4"/>';
      }).join('');
      return wrap(
        '<text class="t-text t-text-sub" x="26" y="30" font-size="9">PROOF OF WORK</text>' +
        '<rect class="t-card" x="26" y="42" width="190" height="20" rx="5"/>' +
        '<rect class="t-ink" x="34" y="48" width="72" height="8" rx="3"/>' +
        '<rect class="t-faint" x="150" y="48" width="58" height="8" rx="3"/>' +
        rows +
        '<rect class="t-accent-soft" x="232" y="54" width="62" height="58" rx="12"/>' +
        '<text class="t-text t-text-accent" x="263" y="84" font-size="19" text-anchor="middle" font-weight="600">12h</text>' +
        '<text class="t-text t-text-accent" x="263" y="100" font-size="7" text-anchor="middle">이번 주</text>' +
        '<text class="t-text t-text-ink" x="232" y="132" font-size="9">공유 링크</text>' +
        '<text class="t-text t-text-sub" x="232" y="145" font-size="7">?d= 한 줄</text>' +
        '<text class="t-text t-text-accent" x="232" y="166" font-size="10" font-weight="600">A4 PDF</text>' +
        '<text class="t-text t-text-sub" x="26" y="166" font-size="7">완료 6건 · 증빙률 100%</text>',
        '체크된 완료 목록과 소요시간 배지, 공유 링크가 있는 썸네일'
      );
    },

    /* 26 시세 레이더 — 평균가 카드 + 가격 레인지 바 + 최저·평균·최고 마커 */
    priceradar: function () {
      return wrap(
        '<text class="t-text t-text-sub" x="26" y="30" font-size="9">PRICE RADAR KR</text>' +
        '<circle class="t-stroke-line" cx="270" cy="27" r="13" fill="none" stroke-width="2"/>' +
        '<path class="t-stroke-accent" d="M270 27l8-5" stroke-width="2" fill="none"/>' +
        '<circle class="t-accent" cx="270" cy="27" r="2.2"/>' +
        '<rect class="t-card" x="26" y="44" width="268" height="74" rx="10"/>' +
        '<text class="t-text t-text-sub" x="40" y="66" font-size="8">엔진오일 + 오일필터</text>' +
        '<text class="t-text t-text-ink" x="40" y="98" font-size="22" font-weight="600">8.0만</text>' +
        '<text class="t-text t-text-sub" x="40" y="112" font-size="7">평균가 · 부품+공임</text>' +
        '<rect class="t-accent-soft" x="198" y="58" width="82" height="24" rx="7"/>' +
        '<text class="t-text t-text-accent" x="239" y="74" font-size="9" text-anchor="middle">최저 대비 1.3×</text>' +
        '<text class="t-text t-text-sub" x="198" y="100" font-size="7">6업종 54품목</text>' +
        '<text class="t-text t-text-sub" x="198" y="112" font-size="7">공개 자료 기준</text>' +
        '<rect class="t-faint" x="26" y="130" width="268" height="12" rx="6"/>' +
        '<rect class="t-line" x="26" y="130" width="176" height="12" rx="6"/>' +
        '<circle class="t-ink" cx="64" cy="136" r="4"/>' +
        '<circle class="t-accent" cx="160" cy="136" r="7"/>' +
        '<circle cx="252" cy="136" r="4" fill="none" stroke="#5C626A" stroke-width="2"/>' +
        '<text class="t-text t-text-ink" x="64" y="160" font-size="7" text-anchor="middle">최저</text>' +
        '<text class="t-text t-text-accent" x="160" y="160" font-size="7" text-anchor="middle">평균</text>' +
        '<text class="t-text t-text-ink" x="252" y="160" font-size="7" text-anchor="middle">최고</text>',
        '평균가 카드와 가격 레인지 바가 있는 썸네일'
      );
    }
  };

  function get(key, label) {
    var fn = THUMBS[key] || THUMBS.blog;
    return fn(label);
  }

  root.HubThumbs = { get: get, keys: Object.keys(THUMBS) };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.HubThumbs;
})(typeof window !== 'undefined' ? window : globalThis);

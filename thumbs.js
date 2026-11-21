/* ============================================================================
 * 원탭 도구 허브 (OneTap Tools) · 카드 썸네일 (자체 SVG)
 * 외부 이미지·아이콘 폰트 요청이 0건이 되도록 17종을 전부 SVG로 그립니다.
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
    }
  };

  function get(key, label) {
    var fn = THUMBS[key] || THUMBS.blog;
    return fn(label);
  }

  root.HubThumbs = { get: get, keys: Object.keys(THUMBS) };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.HubThumbs;
})(typeof window !== 'undefined' ? window : globalThis);

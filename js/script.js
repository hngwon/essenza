// top 버튼
$(window).scroll(function () {
  const height = $(window).scrollTop();
  if (height > 100) {
    $('.top').fadeIn();
  } else {
    $('.top').fadeOut();
  }
});

// footer 메인 비주얼 스와이퍼
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
  loop: true,
  effect: 'slide',
  speed: 700,
});

// footer 근처에서 TOP 아이콘 바꾸기
window.addEventListener('scroll', function () {
  const footer = document.querySelector('#footer');
  const topBtn = document.querySelector('.top img'); // TOP 버튼 안의 img
  const footerTop = footer.offsetTop;
  const scrollPos = window.scrollY + window.innerHeight;

  if (scrollPos >= footerTop) {
    topBtn.src = './img/icon/TOP2.png';
  } else {
    topBtn.src = './img/icon/TOP.png';
  }
});

// ------------------------------
// PRODUCT 탭 & 스와이퍼
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 각 컨테이너(el)마다 버튼/스크롤바를 연결해 초기화
  const makeSwiper = (el) => new Swiper(el, {
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',   // 바깥 버튼을 공통 선택자로 사용 중
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    observer: true,
    observeParents: true,
    breakpoints: {
      1200: { slidesPerView: 3, spaceBetween: 24 },
      768:  { slidesPerView: 2, spaceBetween: 20 },
      0:    { slidesPerView: 1, spaceBetween: 16 },
    }
  });

  // 모든 .js-swiper 초기화 후 핸들을 저장
  document.querySelectorAll('.js-swiper').forEach((el) => {
    const sw = makeSwiper(el);
    el._swiper = sw; // 탭 전환 시 접근하려고 저장
  });

  // 탭 전환
  $('.tab_menu li a').on('click', function (e) {
    e.preventDefault();
    const target = $(this).attr('href');

    // 탭 표시 전환
    $(this).parent().addClass('on').siblings().removeClass('on');
    $('.tab_content').removeClass('on');
    $(target).addClass('on');

    // 이 탭 안의 모든 스와이퍼를 '첫 슬라이드'로 리셋
    document.querySelectorAll(`${target} .js-swiper`).forEach((el) => {
      const s = el._swiper;
      if (!s) return;
      s.update();

      // 슬라이드 위치 처음으로
      if (s.params.loop) s.slideToLoop(0, 0, false);
      else               s.slideTo(0, 0, false);

      // 스크롤바/프로그레스도 0으로
      if (typeof s.setProgress === 'function') s.setProgress(0, 0);
      if (s.scrollbar && typeof s.scrollbar.updateSize === 'function') {
        s.scrollbar.updateSize();
      }
    });
  });
});
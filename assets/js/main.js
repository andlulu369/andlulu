/* andlulu — interactions (軽量・依存なし) */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("no-js");
  doc.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- header: スクロールで背景をつける ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("global-nav");
  var setInert = function (on) {
    document.querySelectorAll("main, .site-footer, .skip-link").forEach(function (el) {
      if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert");
    });
  };
  if (toggle && nav) {
    var closeNav = function (returnFocus) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "メニューを開く");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      setInert(false);
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) { closeNav(false); return; }
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "メニューを閉じる");
      nav.classList.add("is-open");
      document.body.classList.add("nav-open");
      setInert(true);
      var first = nav.querySelector("a");
      if (first) setTimeout(function () { first.focus(); }, 60);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav(true);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && nav.classList.contains("is-open")) closeNav(false);
    });
  }

  /* ---------- hero: 文字を1文字ずつ ---------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    hero.querySelectorAll(".hero-title .line").forEach(function (line, n) { line.style.setProperty("--i", n); });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add("is-ready"); });
    });

    /* 視点（ポインタ）で球体の光の位置が変わる */
    var orbs = hero.querySelectorAll(".orb");
    if (finePointer && !reduceMotion && orbs.length) {
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      var step = function () {
        cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
        orbs.forEach(function (o) { o.style.setProperty("--px", cx.toFixed(3)); o.style.setProperty("--py", cy.toFixed(3)); });
        raf = (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) ? requestAnimationFrame(step) : null;
      };
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(step);
      });
    }
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal, .prism-figure");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- lens: レンズ越しに、別の見え方 ---------- */
  var field = document.querySelector(".lens-field");
  if (field) {
    var unveil = document.querySelector("[data-lens-unveil]");
    var lx = 30, ly = 40, gx = 30, gy = 40, lensRaf = null, userMoved = false, t0 = performance.now();

    var setLens = function (x, y) {
      field.style.setProperty("--lx", x + "%");
      field.style.setProperty("--ly", y + "%");
    };
    var tick = function (now) {
      if (!userMoved) {
        /* 触れていないときは、ゆっくり漂う */
        var t = (now - t0) / 1000;
        gx = 50 + Math.sin(t * 0.32) * 34;
        gy = 50 + Math.sin(t * 0.21 + 1.2) * 30;
      }
      lx += (gx - lx) * 0.12; ly += (gy - ly) * 0.12;
      setLens(lx.toFixed(2), ly.toFixed(2));
      lensRaf = requestAnimationFrame(tick);
    };
    var moveTo = function (e) {
      var r = field.getBoundingClientRect();
      gx = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
      gy = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100));
      userMoved = true;
    };
    field.addEventListener("pointermove", moveTo);
    field.addEventListener("pointerdown", moveTo);
    field.addEventListener("pointerleave", function () { userMoved = false; t0 = performance.now() - 2000; });

    if (reduceMotion) {
      setLens(50, 50);
    } else if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !lensRaf) lensRaf = requestAnimationFrame(tick);
          if (!en.isIntersecting && lensRaf) { cancelAnimationFrame(lensRaf); lensRaf = null; }
        });
      }).observe(field);
    }

    if (unveil) {
      unveil.addEventListener("click", function () {
        var on = field.classList.toggle("is-unveiled");
        unveil.setAttribute("aria-pressed", on ? "true" : "false");
        unveil.textContent = on ? "レンズに戻す" : "ぜんぶレンズ越しに見る";
      });
    }
  }

  /* ---------- contact form (Formspree) ---------- */
  var form = document.getElementById("contact-form");
  if (form && window.fetch) {
    var status = document.getElementById("form-status");
    var submitBtn = form.querySelector("[type=submit]");
    var params = new URLSearchParams(window.location.search);
    var preset = params.get("menu");
    if (preset) {
      var sel = form.querySelector("select[name='ご相談内容']");
      if (sel) Array.prototype.forEach.call(sel.options, function (o) { if (o.dataset.key === preset) o.selected = true; });
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      submitBtn.disabled = true;
      submitBtn.textContent = "送信しています…";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("bad");
          form.reset();
          status.className = "form-status is-success";
          status.textContent = "送信しました。内容を確認のうえ、ご入力のメールアドレスへご連絡します。";
        })
        .catch(function () {
          status.className = "form-status is-error";
          status.textContent = "送信できませんでした。通信環境をご確認のうえもう一度お試しいただくか、メールまたはLINEからご連絡ください。";
        })
        .then(function () {
          status.hidden = false;
          status.focus();
          submitBtn.disabled = false;
          submitBtn.textContent = "この内容で送信する";
        });
    });
  }
})();

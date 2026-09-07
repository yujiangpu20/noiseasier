(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observedCards = [];

  function createVideo(path, className, label) {
    var video = document.createElement('video');
    video.className = className || '';
    video.dataset.src = path;
    video.preload = 'none';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('aria-label', label);
    return video;
  }

  function loadVideo(video) {
    if (!video.src && video.dataset.src) {
      video.src = video.dataset.src;
      video.load();
    }
  }

  function playVideo(video) {
    loadVideo(video);
    if (!reduceMotion && !document.hidden) {
      video.play().catch(function () {
        // Muted autoplay can still be blocked by a user's browser preference.
      });
    }
  }

  function pauseVideos(container) {
    container.querySelectorAll('video').forEach(function (video) {
      video.pause();
    });
  }

  function replaceVideoSource(video, path) {
    if (video.dataset.src === path) {
      return;
    }

    video.pause();
    video.removeAttribute('src');
    video.load();
    video.dataset.src = path;
  }

  function renderGallery() {
    var gallery = document.querySelector('#highlight-gallery');
    var fragment = document.createDocumentFragment();

    NOISEASIER_DATA.gallery.forEach(function (sample, index) {
      var card = document.createElement('button');
      var resultVideo = createVideo(sample.after, 'result-video', 'NoisEasier result ' + (index + 1));
      var baselineVideo = createVideo(sample.before, 'baseline-video', 'Baseline result ' + (index + 1));
      var label = document.createElement('span');

      card.type = 'button';
      card.className = 'highlight-card';
      card.setAttribute('aria-label', 'Toggle baseline comparison for result ' + (index + 1));
      card.setAttribute('aria-pressed', 'false');
      label.className = 'video-label';
      label.setAttribute('aria-hidden', 'true');
      card.append(resultVideo, baselineVideo, label);

      function setFlipped(flipped) {
        card.classList.toggle('is-flipped', flipped);
        card.setAttribute('aria-pressed', String(flipped));

        if (card.dataset.inView === 'true') {
          if (flipped) {
            resultVideo.pause();
            playVideo(baselineVideo);
          } else {
            baselineVideo.pause();
            playVideo(resultVideo);
          }
        }
      }

      card.addEventListener('pointerenter', function (event) {
        if (event.pointerType === 'mouse') {
          setFlipped(true);
        }
      });
      card.addEventListener('pointerleave', function (event) {
        if (event.pointerType === 'mouse') {
          setFlipped(false);
        }
      });
      card.addEventListener('click', function (event) {
        if (event.pointerType !== 'mouse') {
          setFlipped(!card.classList.contains('is-flipped'));
        }
      });

      fragment.appendChild(card);
      observedCards.push(card);
    });

    gallery.appendChild(fragment);
  }

  function createPanel(labelText, className) {
    var panel = document.createElement('figure');
    var label = document.createElement('figcaption');
    var video = createVideo('', '', labelText + ' generation');

    panel.className = 'video-panel';
    label.className = 'panel-label ' + className;
    label.textContent = labelText;
    panel.append(video, label);
    return { panel: panel, video: video };
  }

  function renderComparison(group) {
    var card = document.createElement('article');
    var header = document.createElement('header');
    var title = document.createElement('h3');
    var media = document.createElement('div');
    var baseline = createPanel('Baseline', 'before');
    var result = createPanel('NoisEasier', 'after');
    var prompt = document.createElement('p');
    var controls = document.createElement('div');
    var previous = document.createElement('button');
    var next = document.createElement('button');
    var dots = document.createElement('div');
    var index = 0;

    card.className = 'comparison-card';
    header.className = 'comparison-header';
    title.textContent = group.model;
    header.appendChild(title);

    if (group.isNew) {
      var badge = document.createElement('span');
      badge.className = 'new-badge';
      badge.textContent = 'New baseline';
      header.appendChild(badge);
    }

    media.className = 'comparison-media';
    media.append(baseline.panel, result.panel);
    prompt.className = 'prompt';
    prompt.setAttribute('aria-live', 'polite');
    controls.className = 'carousel-controls';
    dots.className = 'dots';

    previous.type = 'button';
    previous.className = 'carousel-button';
    previous.setAttribute('aria-label', 'Previous example');
    previous.textContent = '‹';

    next.type = 'button';
    next.className = 'carousel-button';
    next.setAttribute('aria-label', 'Next example');
    next.textContent = '›';

    var dotButtons = group.samples.map(function (_, dotIndex) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot-button';
      dot.setAttribute('aria-label', 'Show example ' + (dotIndex + 1));
      dot.addEventListener('click', function () {
        show(dotIndex);
      });
      dots.appendChild(dot);
      return dot;
    });

    controls.append(previous, dots, next);
    card.append(header, media, prompt, controls);

    function loadCurrentVideos() {
      if (card.dataset.inView === 'true') {
        playVideo(baseline.video);
        playVideo(result.video);
      }
    }

    function show(nextIndex) {
      index = (nextIndex + group.samples.length) % group.samples.length;
      var sample = group.samples[index];

      replaceVideoSource(baseline.video, sample[1]);
      replaceVideoSource(result.video, sample[2]);
      prompt.textContent = '“' + sample[0] + '”';
      dotButtons.forEach(function (dot, dotIndex) {
        dot.setAttribute('aria-current', String(dotIndex === index));
      });
      loadCurrentVideos();
    }

    previous.addEventListener('click', function () {
      show(index - 1);
    });
    next.addEventListener('click', function () {
      show(index + 1);
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        show(index - 1);
      } else if (event.key === 'ArrowRight') {
        show(index + 1);
      }
    });

    card.loadCurrentVideos = loadCurrentVideos;
    show(0);
    observedCards.push(card);
    return card;
  }

  function renderResults() {
    NOISEASIER_DATA.groups.forEach(function (group) {
      var container = document.querySelector('#' + group.benchmark + '-results');
      container.appendChild(renderComparison(group));
    });
  }

  function observeMedia() {
    if (!('IntersectionObserver' in window)) {
      observedCards.forEach(function (card) {
        card.dataset.inView = 'true';
        if (card.classList.contains('highlight-card')) {
          playVideo(card.querySelector('.result-video'));
        } else {
          card.loadCurrentVideos();
        }
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var card = entry.target;
          card.dataset.inView = String(entry.isIntersecting);

          if (!entry.isIntersecting) {
            pauseVideos(card);
            return;
          }

          if (card.classList.contains('highlight-card')) {
            var selector = card.classList.contains('is-flipped') ? '.baseline-video' : '.result-video';
            playVideo(card.querySelector(selector));
          } else {
            card.loadCurrentVideos();
          }
        });
      },
      { rootMargin: '240px 0px', threshold: 0.01 }
    );

    observedCards.forEach(function (card) {
      observer.observe(card);
    });
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      document.querySelectorAll('video').forEach(function (video) {
        video.pause();
      });
      return;
    }

    observedCards.forEach(function (card) {
      if (card.dataset.inView !== 'true') {
        return;
      }

      if (card.classList.contains('highlight-card')) {
        var selector = card.classList.contains('is-flipped') ? '.baseline-video' : '.result-video';
        playVideo(card.querySelector(selector));
      } else {
        card.loadCurrentVideos();
      }
    });
  });

  renderGallery();
  renderResults();
  observeMedia();
})();

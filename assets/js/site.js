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

  function createSamplePair() {
    var samplePair = document.createElement('section');
    var media = document.createElement('div');
    var baseline = createPanel('Baseline', 'before');
    var result = createPanel('NoisEasier', 'after');
    var prompt = document.createElement('p');

    samplePair.className = 'sample-pair';
    media.className = 'comparison-media';
    media.append(baseline.panel, result.panel);
    prompt.className = 'prompt';
    prompt.setAttribute('aria-live', 'polite');
    samplePair.append(media, prompt);

    return {
      element: samplePair,
      baseline: baseline,
      result: result,
      prompt: prompt
    };
  }

  function renderComparison(group) {
    var card = document.createElement('article');
    var header = document.createElement('header');
    var title = document.createElement('h3');
    var sampleGrid = document.createElement('div');
    var controls = document.createElement('div');
    var previous = document.createElement('button');
    var next = document.createElement('button');
    var dots = document.createElement('div');
    var pageIndex = 0;
    var itemsPerPage = group.itemsPerPage || 1;
    var pageCount = Math.ceil(group.samples.length / itemsPerPage);
    var sampleSlots = Array.from({ length: itemsPerPage }, function () {
      return createSamplePair();
    });

    card.className = 'comparison-card';
    card.classList.toggle('is-multi-sample', itemsPerPage > 1);
    card.style.setProperty('--video-aspect-ratio', group.aspectRatio);
    header.className = 'comparison-header';
    title.textContent = group.model;
    header.appendChild(title);

    if (group.isNew) {
      var badge = document.createElement('span');
      badge.className = 'new-badge';
      badge.textContent = 'New baseline';
      header.appendChild(badge);
    }

    sampleGrid.className = 'comparison-samples';
    sampleGrid.classList.toggle('is-two-up', itemsPerPage > 1);
    sampleSlots.forEach(function (slot) {
      sampleGrid.appendChild(slot.element);
    });
    controls.className = 'carousel-controls';
    dots.className = 'dots';

    previous.type = 'button';
    previous.className = 'carousel-button';
    previous.setAttribute('aria-label', 'Previous examples');
    previous.textContent = '‹';

    next.type = 'button';
    next.className = 'carousel-button';
    next.setAttribute('aria-label', 'Next examples');
    next.textContent = '›';

    var dotButtons = Array.from({ length: pageCount }, function (_, dotIndex) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot-button';
      dot.setAttribute('aria-label', 'Show page ' + (dotIndex + 1));
      dot.addEventListener('click', function () {
        show(dotIndex);
      });
      dots.appendChild(dot);
      return dot;
    });

    controls.append(previous, dots, next);
    card.append(header, sampleGrid, controls);

    function loadCurrentVideos() {
      if (card.dataset.inView !== 'true') {
        return;
      }

      sampleSlots.forEach(function (slot) {
        if (!slot.element.hidden) {
          playVideo(slot.baseline.video);
          playVideo(slot.result.video);
        }
      });
    }

    function show(nextPageIndex) {
      var visibleSamples = 0;
      pageIndex = (nextPageIndex + pageCount) % pageCount;

      sampleSlots.forEach(function (slot, slotIndex) {
        var sample = group.samples[pageIndex * itemsPerPage + slotIndex];

        slot.element.hidden = !sample;
        if (!sample) {
          replaceVideoSource(slot.baseline.video, '');
          replaceVideoSource(slot.result.video, '');
          slot.prompt.textContent = '';
          return;
        }

        visibleSamples += 1;
        replaceVideoSource(slot.baseline.video, sample[1]);
        replaceVideoSource(slot.result.video, sample[2]);
        slot.prompt.textContent = '“' + sample[0] + '”';
      });

      sampleGrid.classList.toggle('has-single-sample', visibleSamples === 1 && itemsPerPage > 1);
      dotButtons.forEach(function (dot, dotIndex) {
        dot.setAttribute('aria-current', String(dotIndex === pageIndex));
      });
      loadCurrentVideos();
    }

    previous.addEventListener('click', function () {
      show(pageIndex - 1);
    });
    next.addEventListener('click', function () {
      show(pageIndex + 1);
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        show(pageIndex - 1);
      } else if (event.key === 'ArrowRight') {
        show(pageIndex + 1);
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

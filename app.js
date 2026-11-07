(() => {
  const video = document.getElementById('camera-video');
  const stage = document.getElementById('video-stage');
  const audioButton = document.getElementById('audio-button');
  const fullscreenButton = document.getElementById('fullscreen-button');
  const playbackState = document.getElementById('playback-state');
  const videoError = document.getElementById('video-error');
  const headerClock = document.getElementById('header-clock');
  const videoClock = document.getElementById('video-clock');

  const updateClock = () => {
    const now = new Date();
    headerClock.textContent = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(now);
    videoClock.textContent = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(now);
  };

  const setPlaybackLabel = (label) => {
    playbackState.lastElementChild.textContent = label;
  };

  const updateAudioButton = () => {
    const isMuted = video.muted;
    audioButton.setAttribute('aria-pressed', String(!isMuted));
    audioButton.title = isMuted ? 'Ativar áudio' : 'Desativar áudio';
    audioButton.querySelector('span').textContent = isMuted ? 'ÁUDIO DESLIGADO' : 'ÁUDIO LIGADO';
    audioButton.querySelector('svg').innerHTML = isMuted
      ? '<path d="M11 5 6 9H3v6h3l5 4V5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m17 9 4 6m0-6-4 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
      : '<path d="M11 5 6 9H3v6h3l5 4V5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M16 9a4 4 0 0 1 0 6m2.5-8.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>';
  };

  audioButton.addEventListener('click', () => {
    video.muted = !video.muted;
    updateAudioButton();
    if (!video.paused) return;
    video.play().catch(() => setPlaybackLabel('AGUARDANDO'));
  });

  fullscreenButton.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await stage.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      setPlaybackLabel('TELA CHEIA INDISPONÍVEL');
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const isFullscreen = Boolean(document.fullscreenElement);
    fullscreenButton.title = isFullscreen ? 'Sair da tela cheia' : 'Abrir em tela cheia';
    fullscreenButton.querySelector('span').textContent = isFullscreen ? 'SAIR DA TELA CHEIA' : 'TELA CHEIA';
  });

  video.addEventListener('playing', () => {
    videoError.hidden = true;
    setPlaybackLabel('REPRODUZINDO');
  });
  video.addEventListener('waiting', () => setPlaybackLabel('CARREGANDO'));
  video.addEventListener('pause', () => setPlaybackLabel('PAUSADO'));
  video.addEventListener('error', () => {
    setPlaybackLabel('FALHA NO VÍDEO');
    videoError.hidden = false;
  });

  // O atributo loop mantém a reprodução no mesmo elemento, sem controles ou telas intermediárias.
  video.loop = true;
  video.muted = true;
  updateAudioButton();
  updateClock();
  window.setInterval(updateClock, 1000);
  document.getElementById('footer-year').textContent = String(new Date().getFullYear());

  video.play().catch(() => {
    // Alguns navegadores podem bloquear autoplay; a interação de áudio também inicia a reprodução.
    setPlaybackLabel('TOQUE PARA INICIAR');
  });
})();

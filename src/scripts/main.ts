import { pageview, shareEvent } from './events';
import { manageSession } from './session';

manageSession();
pageview();

window.addEventListener('click', async (e) => {
    const shareButton = e.target && e.target instanceof HTMLElement && e.target.closest('[data-event-share]');
    if (!shareButton) {
        return;
    }

    const method = shareButton.getAttribute('data-event-share') ?? 'unknown';
    const url = window.location.href;

    shareEvent(method, url);
});

import * as $ from 'jquery';

function createAnalytics() {
    let clicks: number = 0;
    let isDestroyed: boolean= false;
    const incrementor = () => clicks++;
    $(document).on('click', incrementor);
    return {
        destroy() {
            $(document).off('click', incrementor);
            isDestroyed = true;
            return 'Analytics is destroyed successfully!';
        },
        getClicks() {
          return isDestroyed ? 'Analytics is not available...' : clicks;
        },
    }
}

window['analytics'] = createAnalytics();
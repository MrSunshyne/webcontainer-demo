import { WebContainer } from '@webcontainer/api';

function output(text) {
    console.log(text);
}

window.addEventListener('load', async () => {
    output('Booting...');
    const wc = await WebContainer.boot()
    output('Booted!');
})
import { WebContainer } from '@webcontainer/api';

function output(text) {
    console.log(text);
}

window.addEventListener('load', async () => {
    output('Booting...');
    const wc = await WebContainer.boot()
    output('Booted!');

    const process = await wc.spawn('node', ['--version']);

    process.output.pipeTo(new WritableStream({
        write: (chunk) => {
            output('Process output: ' + chunk);
        }
    }));

    if (await process.exit) {
        output('Exited with code: ' + process.exit);
    }
})
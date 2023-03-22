import { WebContainer } from '@webcontainer/api';

function output(text: string) {
    // @ts-ignore
    outputPanel.textContent += `\n${text}`
}

window.addEventListener('load', async () => {
    output('Booting...');
    const wc = await WebContainer.boot()
    output('Booted!');

    const runCommand = async (cmd, args) => {
        const process = await wc.spawn(cmd, args);

        process.output.pipeTo(new WritableStream({
            write: (chunk) => {
                output('Process output: ' + chunk);
            }
        }));

        if (await process.exit) {
            output('Exited with code: ' + process.exit);
        }
    }

    await runCommand('node', ['--version']);

    // @ts-ignore
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // @ts-ignore

        const cmd = input.value.split(' ');
        const args = cmd.slice(1);
        const command = cmd[0];

        await runCommand(command, args);
    });

    wc.on('server-ready', (port, host) => {
        output(`Server ready on : ${host}:${port}`);
    })
    
    // @ts-ignore
    urlbarForm.addEventListener('submit', (e) => {
        e.preventDefault()

        // @ts-ignore
        let theurl = url.value;
        // @ts-ignore
        iframe.src = theurl;
    })

})
import { execFile } from 'child_process';

const defaultExecOptions = {};
const logResult: (error: Error | null, stdout: string, stderr: string) => void = (
    error,
    stdout,
    stderr
) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
    if (stderr) {
        console.log(stderr);
    }
};

export function runScript(script: string, args: ReadonlyArray<string> = []) {
    execFile(script, args, defaultExecOptions, logResult);
}

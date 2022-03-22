import {exec} from 'child_process';

/**
 * Executes a command in the cli
 * 
 * @param cmd - the command to run
 * @returns Promise<string>
 */
export default async function execCommand(cmd: string) {
  return new Promise((resolve: (result: string) => void, reject: (errorMessage: string) => void) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};
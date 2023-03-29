import { readdirSync, lstatSync } from "fs";
import { resolve } from "path";

export function getDirFiles(path: string): string[] {
    return readdirSync(path)
        .reduce((files, name) => {
            let url = `${path}/${name}`;

            return lstatSync(url).isDirectory()
                ? files.concat(getDirFiles(url))
                : files.concat([url]);
        }, [] as string[])
        .map((path) => resolve(path));
}

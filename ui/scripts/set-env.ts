import * as fs_base from "fs";
import * as dotenv from 'dotenv';
dotenv.config();

let targetPath;
switch(process.env['ENV_MODE']) {
    case('staging'): {
        targetPath = "./src/environments/environment.stag.ts";
        break;
    }
    case('production'):
    default: {
        targetPath = "./src/environments/environment.prod.ts";
    }
}

const envConfigFile = `import { Environment } from "./environment.model";

export const environment: Environment = {
    ENV_MODE: '${process.env['ENV_MODE']}',
    API_BASE_URL: '${process.env['API_BASE_URL']}',
};
`;

fs_base.writeFileSync(targetPath, envConfigFile);
console.log(`Output generated at ${targetPath}`);
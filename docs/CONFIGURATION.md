## 🔑 $\textsf{\color{salmon}.env Setup}$

### Additional information to set `.env` up correctly :

| Key | Information |
|-----|-------------|

<br>

## 🗒️ $\textsf{\color{salmon}set-env.dev.ts Setup}$

### Create this file as "set-env.dev.ts" at /ui/scripts.

```sh
import * as fs_dev from "fs";
const targetPath_dev = "./src/environments/environment.dev.ts";
const envConfigFile_dev = `import { Environment } from "./environment.model";

export const environment: Environment = {
    ENV_MODE: '', /* select your environment => local: 'development' */
    API_BASE_URL: '' /* select backend link like 'https://localhost:3000' */
};
`;
fs_dev.writeFileSync(targetPath_dev, envConfigFile_dev);
console.log(`Environment output generated at ${targetPath_dev}`);
```
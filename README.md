# xLib-ClientApp

### Run Application

**Dev Server:**
```bash
pnpm run dev 
```

**Build:**
```bash
pnpm run build
```

**Preview:**
```bash
export API_URL="http://localhost:30231/api/";
envsubst < public/env-dynamic.template.js > public/env-dynamic.js
pnpm run preview
```
Note: This is required to dynamically change env for docker or cluster.


### Create Docker Container

**Create Image:**
```bash
nerdctl build -t xlib/app:0.0.1 .
```

**Run Image:**
```bash
nerdctl run --env API_URL="http://localhost:9000/api/" -p 1337:80 xlib/app:latest
```
# vue-page-stack

vue-page-stack for vue3

## quick start

```
npm install vue-page-stack@next

```

main.js

```ts
import { VuePageStack } from 'vue-page-stack'

import router from './router'

createApp(App).use(VuePageStack, { router }).mount('#app')
```

App.vue

```vue
<template>
  <router-view>
    <template v-slot="{ Component, route }">
      <stack-router-view
        :component="Component"
        :route="route"
      ></stack-router-view>
    </template>
  </router-view>
</template>
```

### Api

| api       | desc               |
| --------- | ------------------ |
| useAction | Get router action  |
| useStack  | Get current stacks |

## Example

See [Playground Project](./playground).

## Contributing

See [Contributing Guide](./github/contributing.md).

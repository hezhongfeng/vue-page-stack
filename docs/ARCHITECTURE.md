# Architecture

## Overview

`vue-page-stack` is a Vue 3 plugin that preserves route component instances in stack order so SPA navigation behaves more like a native app.

At runtime, the library has four main layers:

1. Plugin installation
2. Navigation state tracking
3. Page stack decision logic
4. Vue renderer adaptation

## Runtime Flow

### 1. Plugin Installation

Entry point: `lib/main.js`

The plugin install step:

1. Validates the passed `router`
2. Creates a per-app navigation state object
3. Registers the `VuePageStack` component
4. Provides the navigation state with Vue `provide`
5. Wires browser back/forward detection
6. Wraps router navigation methods

The installation is intentionally idempotent for the same app + router pair.

### 2. Navigation State Tracking

Files:

- `lib/history.js`
- `lib/navigation.js`
- `lib/eventRegister.js`

`history.js` defines the navigation state shape and the injection key.

`navigation.js` owns the rules for updating navigation state. It translates:

- `router.push()` into `push`
- `router.replace()` into `replace`
- `router.go(n)` into `back` or `forward`
- browser history callbacks into `back` or `forward`

`eventRegister.js` applies that strategy to a router instance.

The important design choice here is that navigation state is instance-scoped, not module-global.

### 3. Page Stack Decision Logic

File: `lib/components/VuePageStack.js`

`VuePageStack` is responsible for deciding whether the current render should:

- push a fresh page onto the stack
- replace the current stack entry
- restore a cached page on back navigation
- fall back to a fresh render when cache restore is unsafe

The component does not directly own Vue renderer internals anymore. Instead, it consumes a small renderer adapter contract.

Important helper responsibilities:

- `isCacheableVNode`: decide whether the child can participate in stack caching
- `normalizeVNodeForCache`: clone vnode when Vue has already attached DOM state
- `writeCachedSubtree`: write mount/update results into the internal stack
- `restoreFromCache`: attempt cached restoration on back navigation
- `trimStackFrom`: drop entries that are no longer reachable

### 4. Vue Renderer Adaptation

File: `lib/components/pageStackRenderer.js`

This is the only place that depends on Vue internal renderer behavior.

It provides a small adapter used by `VuePageStack`:

- `getInnerChild`
- `isSuspense`
- `resetShapeFlag`
- `reuseCachedVNode`
- `unmountCached`

It also installs custom `activate` / `deactivate` behavior on the component instance context so cached component instances can move between the real container and an off-screen storage container.

If Vue internal behavior changes in a future version, this file is the first place to inspect.

## Directory Map

### Source

- `lib/main.js`: plugin entry
- `lib/history.js`: navigation state factory and injection key
- `lib/navigation.js`: navigation action strategy
- `lib/eventRegister.js`: router wrapping
- `lib/components/VuePageStack.js`: page stack behavior
- `lib/components/pageStackRenderer.js`: Vue renderer adapter
- `lib/config/config.js`: shared constants

### Tests

- `tests/unit/*.test.js`: plugin and navigation strategy behavior
- `tests/integration/vue-page-stack.test.js`: page stack behavior against mounted Vue components

## Invariants

These assumptions are important when changing the implementation:

1. Navigation state must remain scoped to the installed app instance.
2. Cached vnode reuse is only valid when route keys match.
3. Back-navigation cache miss must degrade to fresh render safely.
4. The renderer adapter should remain the only place that touches Vue renderer internals.
5. Tests should cover both normal flows and degraded edge cases.

## Maintenance Notes

When modifying stack behavior, run:

```bash
pnpm run test:run
pnpm run test:coverage
pnpm run lint
pnpm run build
```

When behavior looks wrong only after dependency upgrades, inspect these files first:

1. `lib/components/pageStackRenderer.js`
2. `lib/components/VuePageStack.js`
3. `lib/navigation.js`

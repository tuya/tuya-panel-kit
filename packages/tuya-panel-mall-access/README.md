# `tuya-panel-utils`

Tuya tool collection kit

## description
Tips for tuya panel access to mall

## Usage

```
import ToolBarMallIndicator from 'tuya-panel-topbar-mall-indicator';
or
import { ToolBarMallIndicator } from 'tuya-panel-kit';

const router: NavigationRoute[] = [
  {
    name: 'main',
    component: Home,
    options: {
      renderTopBar: () => {
        return <ToolBarMallIndicator title="home" />;
      },
    },
  },
  ...
];

```


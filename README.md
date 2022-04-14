# CLI Handler

```ts
import { parse, Directive, Handler } from 'cli-handler';

const generateServiceHandler: Handler = (value, flags) => {
  console.log({
    value,
    flags,
  });
};

const DIRECTIVES: Directive[] = [
  {
    path: 'g|generate',
    description: 'Generate a new project',
    children: [
      {
        input: true,
        path: 'c|component',
        description: 'Template to use',
      },
      {
        input: true,
        path: 's|service',
        description: 'Template to use',
        flags: ['flat', 'tests'],
        handler: generateServiceHandler,
      },
    ],
  },
];
parse(DIRECTIVES);
```

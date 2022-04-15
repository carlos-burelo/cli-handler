import { Directive, Handler, parse } from './index'

const serveHandler: Handler = (value, flags) => {
  console.log({
    value,
    flags,
  })
}

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
        handler: (value, flags) => {
          console.log({
            value,
            flags,
          })
        },
      },
    ],
  },
  {
    path: 'n|new',
    description: 'Serve the project',
    input: true,
    flags: ['deps$'],
    handler: serveHandler,
  },
]

parse(DIRECTIVES)

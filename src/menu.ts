import { Menu, shell, BrowserWindow } from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&ElecFile',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O',
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '&ElecView',
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
              ],
      },
      {
        label: 'ElecHelp',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('https://electronjs.org');
            },
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal(
                'https://github.com/electron/electron/tree/master/docs#readme'
              );
            },
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://www.electronjs.org/community');
            },
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/electron/electron/issues');
            },
          },
        ],
      },
      {
        label: '&FILE',
        submenu: [
          {
            label: '&NEW PROJECT',
            accelerator: 'Ctrl+N',
            click: () => {
              console.log('&NEW PROJECT');
            },
          },
          {
            label: '&OPEN PROJECT',
            accelerator: 'Ctrl+O',
            click: () => {
              console.log('&OPEN PROJECT');
            },
          },
          {
            label: '&SAVE PROJECT',
            accelerator: 'Ctrl+S',
            click: () => {
              console.log('&SAVE PROJECT');
            },
          },
          {
            label: '&SAVE PROJECT AS...',
            accelerator: 'Shift+Ctrl+S',
            click: () => {
              console.log('&SAVE PROJECT AS...');
            },
          },
          {
            label: '&EXPORT',
            accelerator: 'Ctrl+E',
            click: () => {
              // TODO: file dialog: rendered file name and location
              //  -> extra render pop-up: choose format (mp3/wav/zip),
              //  display render progress bar
              console.log('&EXPORT');
            },
          },
        ],
      },
      {
        label: '&EDIT',
        submenu: [
          {
            label: '&UNDO',
            accelerator: 'Ctrl+Z',
            click: () => {
              console.log('&UNDO');
            },
          },
          {
            label: '&REDO',
            accelerator: 'Ctrl+Y',
            click: () => {
              console.log('&REDO');
            },
          },
        ],
      },
      {
        label: '&PATTERN',
        submenu: [
          {
            label: '&DUMMY PATTERN',
            submenu: [
              {
                label: '&ADD',
                accelerator: 'Ctrl+A',
                click: () => {
                  console.log('&ADD');
                },
              },
              {
                label: '&CLONE',
                accelerator: 'Shift+Ctrl+A',
                click: () => {
                  console.log('&CLONE');
                },
              },
              {
                label: '&DELETE',
                accelerator: 'Ctrl+D',
                click: () => {
                  console.log('&DELETE');
                },
              },
            ],
          },
        ],
      },
    ];

    return templateDefault;
  }
}

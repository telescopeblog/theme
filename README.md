# TelescopeBlog Theme
![Ghost Screenshot](https://s3.eu-central-1.amazonaws.com/telescopeblog/2016/Jun/Bildschirmfoto_2016_06_29_um_20_29_19-1467225031491.png)

# Quick Start Install 
(origin: https://github.com/TryGhost/Ghost)

Make sure you've installed Node.js - We recommend the latest **Node v0.10.x** release. For other versions [click here](http://support.ghost.org/supported-node-versions/). May contain nuts.

1. Download the [latest release](https://ghost.org/developers/) of Ghost
1. Unzip in the location you want to install
1. Fire up a terminal
1. `npm install --production`
1. Start Ghost!
    - Local environment: `npm start`
    - On a server: `npm start --production`
1. `http://localhost:2368/ghost` :tada:

More [install docs](http://support.ghost.org/installation/) here in case you got stuck.

<a name="getting-started"></a>
# Developer Install (from git)

Install Node.js. (See [Supported Node.js versions](http://support.ghost.org/supported-node-versions/))

```bash
# Node v0.10.x - recommended
# Node v0.12.x and v4.2+ LTS - supported
#
# Choose wisely
```

Clone :ghost:

```bash
git clone git://github.com/tryghost/ghost.git
cd ghost
```

Install grunt. No prizes here.

```bash
npm install -g grunt-cli
```

Install Ghost. If you're running locally, use [master](https://github.com/TryGhost/Ghost/tree/master). For production, use [stable](https://github.com/TryGhost/Ghost/tree/stable). :no_entry_sign::rocket::microscope:

```bash
npm install
```

Build the things!

```bash
grunt init
```

Minify that shit for production?

```bash
grunt prod
```

Start your engines.

```bash
npm start

## running production? Add --production
```

Congrats! You made it. BTW you can also just `npm install ghost` if you're into that sort of thing. NPM aficionados can also read up on using [Ghost as an NPM module](https://github.com/TryGhost/Ghost/wiki/Using-Ghost-as-an-npm-module).

More general [install docs](http://support.ghost.org/installation/) here in case you got stuck.

## Copyright & License

Copyright (C) 2015-2016 Markus Guder - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

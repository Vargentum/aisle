aisle
=====
# Grunt powered project
## Requirements
  
You'll need to have the following items installed before continuing.
  
    * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
    * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`

## Quickstart

  ```bash
  git clone git@github.com:Vargentum/aisle.git
  npm install
  ```
  
 To simply build project run
  `grunt`
  
 To deploy development server run
 `grunt server`

## Directory Strucutre
  
 * `src/`: Project sources.
 * `src/styles`: Project styles powered with Stylus. If you don't know stylus - simply write CSS rules in stylus files!
 * `src/views`: Project views. Simply comment/uncomment strings to disable/enable views.
 * `src/scripts/`: Project scripts. Simply paste any plugins in plugins/ folder, and initialize them in core.coffee
 * `app/`: Project compilation: front-end stack. Important: Don't write any code here!!!

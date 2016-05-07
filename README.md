Plugin for Chrome/Chromium to download videos from some video platforms using `youtube-dl-api-server`

##Installation
First install `youtube-dl-api-server`, then install `youtube-dl-chrome-plugin` and finally configure the plugin

###Server installation
To install `youtube-dl-api-server` you can read [the official documentation](https://youtube-dl-api-server.readthedocs.io/en/latest/install.html) or follow my recommendations for Linux and Windows:

####Linux
Install `python` and `pip`

    sudo apt-get install python python-pip

Install the server

    sudo pip install --pre youtube_dl_server

####Windows
TODO

###Server execution
For options `youtube-dl-api-server` you can read [the official documentation](https://youtube-dl-api-server.readthedocs.io/en/latest/server-manual.html) but simply run:

####Linux
To start using the server

    youtube-dl-server

To autostart adds a line to `/etc/rc.local` before `exit 0` with `youtube-dl-server`

###Windows
TODO

###Chrome/Chromium plugin installation
This plugin does not comply with [the policies of Chrome Web Store](https://developer.chrome.com/webstore/program_policies) so you can only manually install. To do this:
- Run Chrome/Chromium with `--enable-easy-off-store-extension-install` flag. On Windows will have to modify a shortcut
- Open the extensions page `chrome://extensions/`
- Drag and drop [the .crx file](https://github.com/r4mos/youtube-dl-chrome-plugin/raw/master/bin/chrome-plugin.crx)

## POWERED BY
- [youtube-dl](https://github.com/rg3/youtube-dl)
- [youtube-dl-api-server](https://github.com/jaimeMF/youtube-dl-api-server)

## LICENSE
`youtube-dl-chrome-plugin` is released under MIT licence, read [here](https://github.com/r4mos/youtube-dl-chrome-plugin/blob/master/LICENSE) for more info

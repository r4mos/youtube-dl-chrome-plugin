Plugin for Chrome/Chromium to download videos from some video platforms using `youtube-dl-api-server`

* [INSTALLATION](#installation)
 * [Server installation](#server-installation)
 * [Server execution](#server-execution)
 * [Chrome/Chromium plugin installation](#chromechromium-plugin-installation)
* [UPDATE](#update)
 * [Server update](#server-update)
 * [Chrome/Chromium plugin update](#chromechromium-plugin-update)
* [UNINSTALL](#uninstall)
 * [Server uninstall](#server-uninstall)
 * [Chrome/Chromium plugin uninstall](#chromechromium-plugin-uninstall)
* [LINKS](#links)
* [LICENSE](#license)

##INSTALLATION
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
For options `youtube-dl-api-server` you can read [the official documentation](https://youtube-dl-api-server.readthedocs.io/en/latest/server-manual.html) but:

####Linux
To start using the server

    youtube-dl-server

To autostart adds a line to `/etc/rc.local` before `exit 0` with `youtube-dl-server &`

###Windows
TODO

###Chrome/Chromium plugin installation
This plugin does not comply with [the policies of Chrome Web Store](https://developer.chrome.com/webstore/program_policies) so you can only manually install:
- Run Chrome/Chromium with `--enable-easy-off-store-extension-install` flag. On Windows will have to modify a shortcut
- Open the extensions page `chrome://extensions/`
- Drag and drop [the .crx file](https://github.com/r4mos/youtube-dl-chrome-plugin/raw/master/bin/chrome-plugin.crx)

##UPDATE
To upgrade the system you have to update separately `youtube-dl`, `youtube-dl-api-server` and `youtube-dl-chrome-plugin`

###Server update
The server are `youtube-dl` and `youtube-dl-api-server`

####Linux

    sudo pip install youtube_dl --upgrade
    sudo pip install youtube_dl_server --upgrade

####Windows
TODO

###Chrome/Chromium plugin update
To update the plugin you have to [uninstall](#chromechromium-plugin-uninstall) and [reinstall](#chromechromium-plugin-installation)

##UNINSTALL
To uninstall the system you have to remove separately `youtube-dl`, `youtube-dl-api-server` and `youtube-dl-chrome-plugin`

###Server uninstall
The server are `youtube-dl` and `youtube-dl-api-server`

####Linux

    sudo pip uninstall youtube_dl
    sudo pip uninstall youtube_dl_server

####Windows
TODO

###Chrome/Chromium plugin uninstall
It can be unistalled from the extensions page `chrome://extensions/`

##LINKS
- [youtube-dl](https://github.com/rg3/youtube-dl)
- [youtube-dl-api-server](https://github.com/jaimeMF/youtube-dl-api-server)

##LICENSE
`youtube-dl-chrome-plugin` is released under MIT licence, read [here](https://github.com/r4mos/youtube-dl-chrome-plugin/blob/master/LICENSE) for more info

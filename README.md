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
To install `youtube-dl-api-server` you can read [the official documentation](https://youtube-dl-api-server.readthedocs.io/en/latest/install.html) or follow my recommendations for Debian-based distributions and Windows:

####Debian-based distributions
Install `python` and `pip`

    sudo apt-get install python python-pip

Install the server

    sudo pip install --pre youtube_dl_server

####Windows
Install `python` and `pip` from [the official web page](https://www.python.org/downloads/) adding `python.exe` to Path. Then run (with `Win + R`) the server installation

    python -m pip install --pre youtube_dl_server

###Server execution
For options `youtube-dl-api-server` you can read [the official documentation](https://youtube-dl-api-server.readthedocs.io/en/latest/server-manual.html) but:

####Debian-based distributions
To start using the server

    youtube-dl-server

To autostart, add a line to `/etc/rc.local` before `exit 0` with `python -m youtube_dl_server`

###Windows
To start using the server

    python -m youtube_dl_server

To autostart, download [HStart](http://www.ntwind.com/software/hstart.html) and create a shortcut with `PATH\TO\hstat.exe /NOCONSOLE "python -m youtube_dl_server"` on your startup folder

###Chrome/Chromium plugin installation
This plugin does not comply with [the policies of Chrome Web Store](https://developer.chrome.com/webstore/program_policies) so you can only manually install on [Dev & Canary releases](https://productforums.google.com/forum/?utm_campaign=2811969_hl_en_b_s1&utm_source=0&utm_medium=1#!category-topic/chrome/discuss-chrome/windows8/33-Beta/d35tIyH8dVM%5B1-25%5D):
- Open the extensions page `chrome://extensions/`
- Drag and drop [the .crx file](https://github.com/r4mos/youtube-dl-chrome-plugin/raw/master/bin/chrome-plugin.crx)

##UPDATE
To upgrade the system you have to update separately `youtube-dl`, `youtube-dl-api-server` and `youtube-dl-chrome-plugin`

###Server update
The server are `youtube-dl` and `youtube-dl-api-server`

####Debian-based distributions

    sudo pip install youtube_dl --upgrade
    sudo pip install youtube_dl_server --upgrade

####Windows

    python -m pip install youtube_dl --upgrade
    python -m pip install youtube_dl_server --upgrade

###Chrome/Chromium plugin update
To update the plugin you have to [uninstall](#chromechromium-plugin-uninstall) and [reinstall](#chromechromium-plugin-installation)

##UNINSTALL
To uninstall the system you have to remove separately `youtube-dl`, `youtube-dl-api-server` and `youtube-dl-chrome-plugin`

###Server uninstall
The server are `youtube-dl` and `youtube-dl-api-server`

####Debian-based distributions

    sudo pip uninstall youtube_dl
    sudo pip uninstall youtube_dl_server

####Windows

    python -m pip uninstall youtube_dl
    python -m pip uninstall youtube_dl_server

###Chrome/Chromium plugin uninstall
It can be unistalled from the extensions page `chrome://extensions/`

##LINKS
- [youtube-dl](https://github.com/rg3/youtube-dl)
- [youtube-dl-api-server](https://github.com/jaimeMF/youtube-dl-api-server)

##LICENSE
`youtube-dl-chrome-plugin` is released under MIT licence, read [here](https://github.com/r4mos/youtube-dl-chrome-plugin/blob/master/LICENSE) for more info

# front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### General tips and tricks

ChattyPub works best in Google Chrome but Chrome will add ugly footers with page numbers. To bypass this: install the Mac 10.13-10.14 and make sure to bypass the automatic updates on relaunch. 

#### Google Chrome legacy version

[https://www.google.com/chrome/](https://www.google.com/chrome/)
Scroll all the way to the bottom. Click on "other platforms", download Mac 10.13-10.14 version. When you've downloaded the dmg, drag the app to your desktop (or somewhere else) and rename it to Google Chrome Chattypub or something so it's clear that its a specific version, then move it to your /Applications folder. Close regular Chrome and open this one. Click print and ଘ(∩^o^)⊃━☆･:*:･｡☆

#### Disable Chrome's auto update

1. Empty these directories 

In terminal: 

```
/Library/Google/GoogleSoftwareUpdate/
~/Library/Google/GoogleSoftwareUpdate/
```

2. Change permissions 

```
cd /Library/Google/
sudo chown nobody:nogroup GoogleSoftwareUpdate
sudo chmod 000 GoogleSoftwareUpdate
cd ~/Library/Google/
sudo chown nobody:nogroup GoogleSoftwareUpdate
sudo chmod 000 GoogleSoftwareUpdate
```

3. Change permissions one level up 

```
cd /Library/
sudo chown nobody:nogroup Google
sudo chmod 000 Google
cd ~/Library/
sudo chown nobody:nogroup Google
sudo chmod 000 Google
```

To re-enable the auto update feature if you want to change it back: 

```
rm -rf ~/Library/Google/GoogleSoftwareUpdate
```
and

```
rm -rf /Library/Google/GoogleSoftwareUpdate
```

(if it exists), then re-launch Chrome. The directory will be re-created as writable. No profile info will be lost.

Source: 

[https://stackoverflow.com/questions/59372124/how-to-disable-google-chrome-auto-update-for-mac-os#59374068](https://stackoverflow.com/questions/59372124/how-to-disable-google-chrome-auto-update-for-mac-os#59374068 )
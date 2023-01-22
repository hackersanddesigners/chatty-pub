# server

## intro

`chatty-pub` is working with the Zulip API to read data from. when uploading files to a chat, we need to use a workaround in order to correctly display them on the webapp interface, because we run the webapp on a different server than the one running Zulip.

following some notes on how this is setup.

we run the webapp on a different server than the one where Zulip is running: to correctly display anything that is not simple text read from a JSON response (eg a "blob"), image, video, audio, PDF files etc, we need to copy those files from the Zulip server to the server where `chatty-pub` runs.

## setup

on the Zulip server, we created a `chatty-pub` unix user which is ssh-accessible by anyone from H&D with their ssh pubkey added to this user.

the `chatty-pub` user has an ssh-key so we can sync files using `rsync` between the two servers. in order to avoid getting asked by rsync to type out the ssh-key passphrase, we confirm the passphrase to the keyring, which runs until the server is rebooted.

to do so, we add the following to `chatty-pub`'s `.bashrc`:

```
/usr/bin/keychain $HOME/.ssh/id_rsa
source $HOME/.keychain/${HOSTNAME}-sh
```

then run `source ~ .bashrc` to activate the new settings: this will prompt you to type the passphrase and then the keyring will start to work.

we then have a shell script called `chatty-pub-files-sync.sh` with:

```
#!/bin/sh

screen \
  watch -n10 \
  rsync -azP /home/zulip/uploads/files chatty-pub@hackersanddesigners.nl:/var/www/chatty-pub-files
```

- `screen`: allows to run the next command (`watch`), which is an on-going operation and "detach from it" without stopping the command, else the terminal screen will be only displaying the outcome of the `watch` command
- `watch`: check for file changes under `/home/zulip/uploads/files` (managed by `rsync`) every 10 seconds
- `rsync`: synchronize any new file from the Zulip server, to the `chatty-pub` unix user on the server where the `chatty-pub` webapp is running, with the correct file permissions.

we run `./chatty-pub-files-sync.sh`, then type `ctrl + a` together, then `d` to detach from the screen session. after this the script will keep running in the background.

we can re-attach to the screen session by typing `screen -r`, and list all screen processes with `screen -list`.

to stop a screen process, re-attach to it (for instance, `screen -r`), then simply stop the process with `ctrl + c`.

this script works fine until a system reboot, after which the command should be restarted manually (typing ssh-key passphrase and running script).

## references

- [screen command](https://askubuntu.com/a/542671)
- [save ssh-key passphrase to keyring](https://askubuntu.com/questions/338937/how-to-use-rsync-via-ssh-with-rsa-key-passphrases/701144#701144)


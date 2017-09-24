#!/bin/sh
# Automated build script for Youku Html5 Player
# environment: cygwin x64
# /cws: self-written chrome-web-store api tool

if [[ $1 == "" ]]; then
	echo "Missing version param"
	exit
fi
version=$1

export NODE_PATH=$APPDATA/npm/node_modules
path=/cygdrive/D/PHP/Zaddons/youku
files_share="_locales ABPlayer.css ABPlayer.min.js biliplus_shield.min.js CommentCoreLibrary.min.js dom_gen.js flv.min.js google-style-loading.min.js icon.png icon_gray.png jquery-2.1.4.min.js md5.js options.html options.js resizeSensor.js script_executer.js v_slash_jumper.js youku_embed_replacer.js youku_html5.js youku_html5_hack.js playerCounter_background.js"
files_chrome="hookFetch.js hookFetch_background.js"
files_firefox=""
sz="/cygdrive/C/Program Files/7-Zip/7z"
cd "$path"
mkdir -p tmp

echo
node "!compress.js"
echo

if [[ $1 == "ff" ]]; then
	echo "generating firefox test dir"
	cp -rf ff/manifest.json $files_share tmp/
	#for a in $files_share; do cp -f $a tmp/; done
	chmod -R 7777 tmp
	echo "Done, press enter to clear"
	read
	rm -rf tmp
	exit
fi

amo_token=$(</tmp/amo.token)
amo_key=${amo_token%|*}
amo_secret=${amo_token#*|}

#zip share bundle
"$sz" a build_share.zip $files_share >/dev/null 2>&1

#build chrome
cp build_share.zip build_chrome.zip
sed -e "s/1\\.0\\.0\\.0/${version}/" manifest.json >tmp/manifest.json
"$sz" a build_chrome.zip $files_chrome ./tmp/manifest.json >/dev/null 2>&1
echo "Submitting to CWS"
/cws update fpnknfakcmgkbhccgpgnbaddggjligol build_chrome.zip; echo
/cws publish fpnknfakcmgkbhccgpgnbaddggjligol; echo
curl -s -o signed.crx -L "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=38.0&x=id%3Dfpnknfakcmgkbhccgpgnbaddggjligol%26installsource%3Dondemand%26uc"

#build firefox
cp build_share.zip build_firefox.zip
sed -e "s/1\\.0\\.0\\.0/${version}/" ff/manifest.json >tmp/manifest.json
echo "Submitting to AMO"
"$sz" x build_firefox.zip -otmp >/dev/null 2>&1
cmd /c web-ext sign --api-key=$amo_key --api-secret=$amo_secret -s tmp -a .
mv -f youku_html5_player-*.xpi signed.xpi

#build firefox listed
echo "Submitting development listed version to AMO"
sed -e "s/1\\.0\\.0\\.0/${version}/" ff/store/manifest.json >tmp/manifest.json
cmd /c web-ext sign --api-key=$amo_key --api-secret=$amo_secret -s tmp -a tmp

echo "Submitting listed version to AMO"
sed -e "s/1\\.0\\.0\\.0pre/${version}/" ff/store/manifest.json >tmp/manifest.json
cmd /c web-ext sign --api-key=$amo_key --api-secret=$amo_secret -s tmp -a tmp

rm -rf build_share.zip build_chrome.zip build_firefox.zip tmp
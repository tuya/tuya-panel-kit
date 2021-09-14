# cd
cd ../../packages/tuya-panel-kit

for pkg in \
tuya-panel-kit \
tuya-panel-utils \
tuya-panel-theme \
tuya-panel-acrylic-kit \
tuya-panel-classic-kit \
tuya-panel-nordic-kit \
;
do
  cd ../$pkg
  yarn build
  yalc publish
done

yalc update
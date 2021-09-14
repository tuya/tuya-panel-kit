# cd
root=$(pwd)

for pkg in \
tuya-panel-kit \
tuya-panel-utils \
tuya-panel-theme \
;
do
  cd ../../packages/$pkg
  yarn build
  yalc publish
  cd $root
  yalc link $pkg
done

yalc update
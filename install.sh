#!/bin/bash

if pwd | grep node_modules ; then
  cd ../..
  mv node_modules/ngx-treeview tmp-ngx-treeview
  cd tmp-ngx-treeview
  npm install --ignore-scripts
  npm rebuild node-sass
  npm run build
  cd ..
  mv tmp-ngx-treeview/dist/src node_modules/ngx-treeview
  mv tmp-ngx-treeview node_modules/ngx-treeview/source
fi

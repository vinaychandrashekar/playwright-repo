#!/bin/bash

echo "Going to project folder..."
cd ~/playwr_nodejs || {
  echo "Folder not found. Exiting."
  exit 1
}

echo "Installing stuff..."
npm install || {
  echo "Something went wrong with npm install."
  exit 1
}

echo "Done. Ready to go!"

## This repository contains my practice works of my NoSQL course (mongodb) at ESILV

I developed all queries and documents generation with [Node.js](https://nodejs.org/en/) 

## Environment - Arch Linux

### Install Mongodb

    git clone https://aur.archlinux.org/mongodb-bin.git 
    cd mongodb-bin/
    makepkg -s
    sudo pacman -U --noconfirm file.tar.xz

Install the driver

    npm i mongodb
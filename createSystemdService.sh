#!/bin/bash
fileName=jokeBot.service
NODE=`which node`

echo [Unit] > $fileName
echo Description=jokeBot >> $fileName
echo >> $fileName
echo [Service] >> $fileName
echo Type=simple >> $fileName 
echo WorkingDirectory=$PWD >> $fileName 
echo ExecStart=$NODE . >> $fileName 
echo >> $fileName 
echo [Install] >> $fileName 
echo WantedBy=multi-user.target >> $fileName 

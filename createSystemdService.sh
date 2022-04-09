#!/bin/bash
output="[Unit]
Description=jokeBot

[Service]
Type=simple
WorkingDirectory=$PWD
ExecStart=$(which node) .

[Install]
WantedBy=multi-user.target"

echo "$output" > jokeBot.service
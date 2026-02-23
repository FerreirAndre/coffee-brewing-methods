#!/bin/bash

session="dev"

tmux new-session -d -s $session

tmux rename-window -t 1 'nvim'
tmux send-keys -t 'nvim' 'nvim .' C-m

tmux new-window -t $session:2 -n 'server-back'
tmux new-window -t $session:3 -n 'server-front'
tmux new-window -t $session:4 -n 'terminal'

tmux attach-session -t $session:1

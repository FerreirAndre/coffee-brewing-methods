#!/bin/bash

session="dev"

tmux new-session -d -s $session

tmux rename-window -t 1 'nvim'
tmux send-keys -t 'nvim' 'nvim coffee-brewing-methods-ui' C-m

tmux new-window -t $session:2 -n 'server-back'
tmux send-keys -t 'server-back' 'cd coffee-brewing-methods-api' C-m './mvnw spring-boot:run' C-m
tmux new-window -t $session:3 -n 'server-front'
tmux send-keys -t 'server-front' 'cd coffee-brewing-methods-ui' C-m 'ng s' C-m
tmux new-window -t $session:4 -n 'terminal'

tmux attach-session -t $session:1

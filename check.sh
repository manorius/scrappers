#!/usr/bin/env bash
SONG=${1?Error: no song given}
grep -rnw 'songs' -e "$SONG"

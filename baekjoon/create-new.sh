#! /bin/bash

RUN="cp -r $1 ./$2 && cd ./$2"
echo $RUN
eval $RUN
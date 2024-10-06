#! /bin/bash

if [ -e "./$2" ]
then
    echo "$2 already exists."
    cd "./$2";
else
    RUN="cp -r $1 ./$2 && cd ./$2"
    echo $RUN
    eval $RUN
fi
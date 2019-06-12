#!/bin/bash
echo "corriendo en el puerto 11205"
docker run --rm -ti --name tutorias-ui -v $(pwd)/src:/src -p 11205:4200 desarrollo-ui

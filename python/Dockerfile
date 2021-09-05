# set base image (host OS)
FROM python:3.8

# set the working directory in the container
WORKDIR /

# Install protobuf
RUN apt-get update
RUN apt-get install -y protobuf-compiler
RUN pip install protobuf
# copy the requirements.txt block
COPY ./requirements.txt requirements.txt
# install dependencies
RUN pip install -r requirements.txt
# copy the content of the local src directory to the working directory
COPY . /python

# Create the python file
WORKDIR /python/chipotle
RUN protoc --python_out . ./chipotle.proto

# command to run on container start
WORKDIR /python

# python3 -m rasa_sdk --actions proto_actions --p 5006
EXPOSE 5055
CMD ["python", "-m", "rasa_sdk", "--actions", "proto_actions"]
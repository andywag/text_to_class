# set base image (host OS)
FROM python:3.8

# set the working directory in the container
WORKDIR /

# copy the requirements.txt block
COPY ./requirements.txt requirements.txt

# install dependencies
RUN pip install -r requirements.txt

# copy the content of the local src directory to the working directory
COPY . .

# command to run on container start
WORKDIR /
RUN rasa train
EXPOSE 5005

CMD [ "rasa", "run", "--credentials", "fb_credentials.yml","--enable-api","--cor","*" ]
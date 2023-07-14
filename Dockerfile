 
FROM node:14.15.0
RUN useradd -ms /bin/bash dev
RUN usermod -aG root dev

#ENV HOME /home/dev
#WORKDIR /home/dev
ENV NODE_ENV=prd

ADD . /home/dev
COPY package.json /home/dev/package.json
RUN cd /home/dev; npm install; npm audit fix
COPY . /home/dev

USER dev

CMD ["node", "/home/dev/server"]
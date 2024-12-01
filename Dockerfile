FROM openjdk:17 

COPY event-0.0.1-SNAPSHOT.jar .

CMD java -jar event-0.0.1-SNAPSHOT.jar
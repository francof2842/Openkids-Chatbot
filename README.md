Pasos a seguir:

Usamos mongodb para la db

Option 1: Local MongoDB Setup
Install MongoDB

On Mac: Create a docker with mongoDb:

```
docker run --name mongodb -d -p 27017:27017 -v ~/mongodb-data:/data/db mongo:6.0
```

Run the MongoDB server:

```
docker exec -it mongodb mongosh

```

This starts the server on localhost:27017 by default.

Install MongoDB Compass (Optional)

Download MongoDB Compass for a GUI to interact with your database.
Test Connection

In a terminal, connect to MongoDB:

```
mongo
```

Run:

```
show dbs
```

Set Up Your Database

Switch to the whatsapp-bot database:

```
use whatsapp-bot
```

1.

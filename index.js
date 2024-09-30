const express = require("express");
const { Eureka } = require("eureka-js-client");

// Créez l'application Express
const app = express();

// Définissez un simple point de terminaison
app.get("/node-service/:id", (req, res) => {
  let id = req.params.id;
  console.log(`Hello from Node Service registered with Eureka! :${id}`);
  res.send(`Hello from Node Service registered with Eureka! :${id}`);
});

// Démarrez le serveur Express
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node service is running on port ${PORT}`);
});

// Créez un client Eureka pour l'enregistrement
const client = new Eureka({
  instance: {
    app: "node-service", // Nom du service
    hostName: "localhost",
    ipAddr: "127.0.0.1",
    statusPageUrl: `http://localhost:${PORT}`, // Page de statut du service
    port: {
      $: PORT, // Port sur lequel le service est exposé
      "@enabled": "true",
    },
    vipAddress: "node-service", // Adresse virtuelle du service
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: "localhost",
    port: 9090, // Port sur lequel Eureka Server est en cours d'exécution
    servicePath: "/eureka/apps/",
  },
});

// Démarrez l'enregistrement dans Eureka
client.start((error) => {
  if (error) {
    console.log("Error registering with Eureka:", error);
  } else {
    console.log("Node service registered with Eureka on port 9090");
  }
});



const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");
const { sequelize } = require("./DB_connection");
require('dotenv').config();
const mercadopago = require("mercadopago");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(morgan("dev"));
server.use((req, res, next) => {
    console.log(req);
    next();
});

server.post("/create_preference", (req, res) => {
    // Configurar las credenciales directamente aquí
    mercadopago.configure({
        access_token: "APP_USR-257395260467218-120522-3b1dead10db761af764f29165ef066eb-144012804",
    });

    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            },
        ],
        back_urls: {
            success: "https://fronttp-production.up.railway.app/",
            failure: "https://fronttp-production.up.railway.app/",
            pending: "",
        },
        auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
});

server.use(router);
server.use(express.static('src'));

module.exports = server;

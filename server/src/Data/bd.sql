CREATE DATABASE card_mvd;

USE card_mvd;

CREATE TABLE usuario(
    u_id        INT(25) NOT NULL PRIMARY KEY  AUTO_INCREMENT,
    u_ced	    VARCHAR(20),
    u_nom       VARCHAR(50),
    u_usu       VARCHAR(20),
    u_pass      VARCHAR(15),
    u_telf      VARCHAR(15),
    u_ema       VARCHAR(50),
    u_nac       DATE CHECK (fecha REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    u_dir       TEXT,
            
    u_nivel     VARCHAR(2),

    u_status    VARCHAR(10),
    u_foto      VARCHAR(100)
);

CREATE TABLE producto (
    prod_id     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    prod_nom    VARCHAR(250),
    prod_img    TEXT,
    prod_desc   TEXT,
    prod_precio FLOAT,
    prod_precio_dcto FLOAT,
    prod_marca  VARCHAR(30),
    prod_model  VARCHAR(30),
    prod_cate   VARCHAR(100),
    prod_stock  INT(3)
);

CREATE TABLE carrito(
    car_id    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    u_id      INT,
    car_fech  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (u_id)     REFERENCES usuario(u_id)
);

CREATE TABLE pago (
    pago_id    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    car_id     INT,
    pago_sta   INT,
    pago_fech  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (car_id)  REFERENCES carrito(car_id) 
);

CREATE TABLE detalles(
    det_id    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    car_id    INT,
    prod_id   INT,
    det_prod  TEXT,
    det_cant  INT(5),

    FOREIGN KEY (prod_id)  REFERENCES producto(prod_id),
    FOREIGN KEY (car_id)   REFERENCES carrito(car_id)
);

CREATE TABLE opinion(
    opi_id    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    u_id      INT,
    prod_id   INT,
    opi_comen TEXT,
    opi_valor VARCHAR(1),
    opi_fech  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (u_id)     REFERENCES usuario(u_id),
    FOREIGN KEY (prod_id)  REFERENCES producto(prod_id) 
);

INSERT INTO `producto` (`prod_id`, `prod_nom`, `prod_img`, `prod_desc`, `prod_precio`, `prod_precio_dcto`, `prod_marca`, `prod_model`, `prod_cate`, `prod_stock`) VALUES
(1, 'Laptop ProBook 3000', 'p1.jpg', '2 teras en disco solido, memoria Ram 32, Pantalla 14\'\'', 2500, 50, 'TechGlobe', 'ProBook', 'PC', 3),
(2, 'Escritorio Armable', 'p2.jpg', 'En madera y de color plan con una altura de 80cm, ancho 120 cm y fondo 70 cm', 5000, 50, 'DELL', 'G45', 'PC', 20),
(3, 'Camara', 'p3.jpg', 'Profesional con varios lente', 500, 25, 'CANON', '2576', 'Camaras', 30),
(88, 'Teclado gamer', 'p4.jpg', 'Profesional con varios lente', 5500, NULL, 'Toshiba', 'DT36-B', 'PC', 25),
(89, 'Teclado gamer', 'p5.jpg', 'Profesional con varios lente', 5500, 75, 'Toshiba', 'DT36-B', 'PC', 25);

SELECT * FROM usuario;
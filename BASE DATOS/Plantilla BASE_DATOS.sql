create database DWH;
use DWH;
create table USUARIO(
ID int primary key auto_increment not null,
Usuario varchar(100) not null,
Nombre varchar(100) not null,
Apellido varchar(150) not null,
Email varchar(100) not null,
Perfil enum('1','2') not null DEFAULT '1',
Pass varchar(100) not null
);
insert into USUARIO (Usuario,Nombre,Apellido,Email,Perfil,Pass) 
VALUES ("Camila","camila","natera","cami@outlook.com","1","123");

create table REGION(
ID int primary key auto_increment not null,
NombreRegion varchar(100) not null
);

create table PAIS(
ID int primary key auto_increment not null,
NombrePais varchar(100) not null,
ID_Region integer not null
);

create table CIUDAD(
ID int primary key auto_increment not null,
NombreCiudad varchar(100) not null,
ID_Pais integer not null
);

insert into REGION (NombreRegion) 
VALUES ("Sudamerica"),("Norteamerica");

insert into PAIS (NombrePais,ID_Region) 
VALUES ("Argentina",1),("Colombia",1),("Chile",1),("Uruguay",1),("Canelones",1),("Maldonado",1),("Montevideo",1),
("Mexico",2),("Estados Unidos",2),("Florida",2),("Texas",2);

insert into CIUDAD (NombreCiudad,ID_Pais) 
VALUES ("Buenos Aires",1),("Cordoba",1),("Bogota",2),("Cucuta",2),("Medellin",2),("Atacama",3),("Santiago",3),
("Valparaiso",3),("Ciudad De Mexico",8),("Tijuana",8);




create table EMPRESA(
ID int primary key auto_increment not null,
NombreEmpresa varchar(100) not null,
Direccion varchar(100) not null,
Email varchar(100) not null,
Telefono varchar(15) not null,
ID_Region integer not null,
ID_Pais integer not null,
ID_Ciudad integer not null
);

insert into EMPRESA (NombreEmpresa,Direccion,Email,Telefono,ID_Region,ID_Pais,ID_Ciudad) 
VALUES ('Ccamilasas','cll 11#71-78','camila@gmial.com','3146751950','1','2','2');



create table CONTACTO(
ID int primary key auto_increment not null,
NombreContacto varchar(100) not null,
ApellidoContacto varchar(100) not null,
Cargo varchar(100) not null,
Email varchar(100) not null,
ID_Empresa integer not null,
ID_Region integer not null,
ID_Pais integer not null,
ID_Ciudad integer not null,
Direccion varchar(100) not null,
Interes integer not null,
Foto varchar(100) null
);



create table CANAL(
ID int primary key auto_increment not null,
Canal integer not null,
Cuenta varchar(50) not null,
Preferencia integer not null,
ID_Contacto integer not null
);
# 🌐 Academia Inglés (React)

Plataforma web institucional para gestión de usuarios, clases y pagos en una academia de idiomas.  
Este proyecto incluye frontend en React y backend con Node.js + Express, conectado a una base de datos SQL Server.

---

## 📦 Requisitos previos

Antes de comenzar, asegurate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Visual Studio Code](https://code.visualstudio.com/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

---

## 🚀 Instalación del proyecto

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/LuisArce10/academia-ingles-react.git
cd bright-english

### Paso 2: Clonar el repositorio EnglishAcademy

CREATE DATABASE EnglishAcademy;
GO
USE EnglishAcademy;

-- Tabla de usuarios
CREATE TABLE Usuarios (
  id INT PRIMARY KEY IDENTITY,
  usuario VARCHAR(50) NOT NULL,
  contraseña VARCHAR(100) NOT NULL,
  rol VARCHAR(20) NOT NULL
);

-- Tabla de clases
CREATE TABLE Clases (
  id INT PRIMARY KEY IDENTITY,
  nombre VARCHAR(100),
  nivel VARCHAR(50),
  docente_id INT FOREIGN KEY REFERENCES Usuarios(id)
);

-- Tabla de pagos
CREATE TABLE Pagos (
  id INT PRIMARY KEY IDENTITY,
  estudiante_id INT FOREIGN KEY REFERENCES Usuarios(id),
  monto DECIMAL(10,2),
  fecha DATE
);

### Paso 3: Instalar dependencias del frontend
cd bright-english
npm install

### Paso 4: Instalar dependencias del backend
cd proyecto_backend
npm install

Paso 5: Levantar el backend
Desde la carpeta proyecto_backend, ejecutá:
npm run dev

Paso 6: Levantar el frontend
Desde la carpeta bright-english, ejecutá:
npm run dev

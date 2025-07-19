# Api Rest en Node.js

## Descripción del Servidor.

Servidor Desarrollado con: ** Node.js y ** Express **. Conectado a ** Firebase ** (Firestore), para el manejos de documentos. Alojado en la plataforma Vercel, para su distribución. 
Lleva por nombre: API REST para ABM de Autos de diferentes Marcas.  

##  Funcionalidades.
- Permite el alta de los datos del auto.
- Permite la modificación de todos los datos de un auto, mediante el ID.
- Permite la modificación del precio de un auto por medio del ID.
- Permite eliminar todos los datos de un auto por medio del ID.
- Permite la autenticación del usuario para el uso de la API REST, Mediante JWT. 
- Permite el control de acceso al usuario. No podrá   dar de alta, modificar y eliminar datos de un auto si   
  no esta verificado, con los permisos de API.
- Permite la busque da autos mediante:
    . nameModel.
    . nameModel y anio.
    . anio.
    . color.
    . rotation.
    . marca.
    . marca, nameModel y anio.
- Listar todos los autos existentes.
- Buscar por ID los datos de un auto.


## Instalación

1. Clonar el repositorio mediante github si no lo tenes instalalo, usa la consola y escribe:
    git clone https://github.com/jdmdtg/proyecto-final-ecommerce-JoseGilbertoMedina.git

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno (Firebase, JWT, etc.)

4. Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

---

##  Endpoints de la API.

###  Ruta Principal.

```
GET /api
```


** Respuesta:** Mensaje de bienvenida.

---
 
### 🔐 Login y solicitud de Token de acceso.

```
POST /api/login
```

Ejemplo:
POST /api/jmedina

**Body (JSON):**

```Ejemplo: json

{
  "usuario": "jmedina@email.com",
  "passsword": "jmedina***"
}

```

Devuelve un token JWT si las credenciales son válidas.

Ejemplo de Respuesta: 

"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNzUyODkzMTc5LCJleHAiOjE3NTI5MjE5Nzl9.UE7_kHuB9dreaID8k1DWtbAnWvv55cK6e_n-QBp"

--- 

### Productos.

'''

## Documentación de la API


#### ➕ Crear producto.

```
POST /api/products
```

**Body(JSON):**

```Ejemplo de json que se deberia pasar.
{
    "marca": "fiat",
    "transmision": "M",
    "price": 10000,
    "anio": 2012,
    "rotation": "A",
    "combustible": "N",
    "nameModel": "fiat palio 1.3",
    "color": "gris"
}

## Tipo combustible que acepta: 
    - N: Nafta.
    - G: Gas.
    - D: Diesel.
    - E: Energia Electrica.
    - H: Hidrógeno.

## Rotation existentes:
    - A: Alta.
    - B: Baja.
    - M: Media.

## Trasmisión:
    M: Manual.
    A: Automática.

Observación: Una vez enviada la consulta, el sistema validará los datos ingresados, también verificara que no exista un registro de auto con el mismo nombre.

Guarda el producto en la base de datos.

Ejemplo de respuesta.

{
    "id": "lQHmGArLrtR1R7V0Ziat",
    "marca": "fiat",
    "transmision": "M",
    "price": 10000,
    "anio": 2012,
    "rotation": "A",
    "combustible": "N",
    "nameModel": "fiat palio 1.3",
    "color": "gris"
}

```
#### ✏️ Actualizar un producto (PUT)
---
Modifica todos los campos enviados del producto donde se cambio su valor, indicado por ID.

```
PUT /api/productos/:id
```
Ejemplo.

PUT /api/productos/lQHmGArLrtR1R7V0Ziat

**Body (ejemplo):**

``` 

{
    "marca": "peugeot",
    "transmision": "M",
    "price": 10000,
    "anio": 2025,
    "rotation": "A",
    "combustible": "N",
    "nameModel": "cadilla 1.4",
    "color": "gris"
}

```
Ejemplo de respuesta:
```
{
    "Product": "nCMkQQd8rYuGpzam2Jgs",
    "ok": "Producto actualizado correctamente"
}
```

#### ✏️ Actualizar parcialmente un producto (PATCH)

---

Modifica solo el campos price del producto indicado por ID.

```
PATCH /api/productos/:id
```
Ejemplo.

PATCH /api/productos/lQHmGArLrtR1R7V0Ziat

**Body (ejemplo):**
```
{
  "precio": 70000
}


Ejemplo de respuesta.

{
    "product": "lQHmGArLrtR1R7V0Ziat",
    "Price": 10000,
    "ok": "Producto actualizado correctamente"
}
---

#### 🗑️ Eliminar producto
----
```
DELETE /api/productos/:id
```

Elimina el producto con el ID especificado.

Ejemplo.

DELETE /api/productos/hVhqJlh765cdNaGYPWVv

Ejemplo de Respuesta:

Not 204 No Content.



### Buscar productos por campos (GET).
___

## Para Buscar Por anio del producto.
```
GET /api/products/search/:tipo?{campo}={valor}&{campo}={valor}

Ejemplo de Busqueda.

```
GET /api/products/search/anio?anio=2025
```
```
Ejemplo de Respuesta:
````
{
        "id": "hVhqJlh765cdNaGYPWVv",
        "anio": 2025,
        "combustible": "N",
        "rotation": "A",
        "marca": "peugeot",
        "transmision": "M",
        "nameModel": "cadeeeidella 1.4",
        "price": 10000,
        "color": "gris"
}
````

## Para Buscar Por color del producto.

- Podemos buscar por el color nombre exacto.
- Podemos buscarlos por alguna letra que contenga el nombre del color.

```
GET /api/products/search/:tipo?{campo}={valor}&{campo}={valor}

Ejemplo de Busqueda.

```
GET /api/products/search/color?color=verde or /api/products/search/color?color=ver
```
```
Ejemplo de Respuesta:
```
{
        "id": "hVhqJlh765cdNaGYPWVv",
        "anio": 2025,
        "combustible": "N",
        "rotation": "A",
        "marca": "peugeot",
        "transmision": "M",
        "nameModel": "cadeeeidella 1.4",
        "price": 10000,
        "color": "verde"
}
````

## Para Buscar Por nameModel del producto.


- Podemos buscar por el nameModel nombre exacto.
- Podemos buscarlos por alguna letra que contenga el nameModel.

```
GET /api/products/search/:tipo?{campo}={valor}&{campo}={valor}
```
Ejemplo de Busqueda.

```
GET /api/products/search/nameModel?nameModel=cadeeeidella 1.4 or /api/products/search/nameModel?nameModel=cadee
```
```
Ejemplo de Respuesta:

{
        "id": "hVhqJlh765cdNaGYPWVv",
        "anio": 2025,
        "combustible": "N",
        "rotation": "A",
        "marca": "peugeot",
        "transmision": "M",
        "nameModel": "cadeeeidella 1.4",
        "price": 10000,
        "color": "verde"
}


````
## Para Buscar Por Rotation del producto.

- Podemos buscar por rotation del producto, nombre exacto.

```
GET /api/products/search/:tipo?{campo}={valor}&{campo}={valor}

Ejemplo de Busqueda.
```
GET /api/products/search/rotation?rotation=A 
```

Ejemplo de Respuesta:

{
        "id": "hVhqJlh765cdNaGYPWVv",
        "anio": 2025,
        "combustible": "N",
        "rotation": "A",
        "marca": "peugeot",
        "transmision": "M",
        "nameModel": "cadeeeidella 1.4",
        "price": 10000,
        "color": "verde"
}


````
## Para Buscar Por Marca del producto.

- Podemos buscar por el Marca nombre exacto.
- Podemos buscarlos por alguna letra que contenga la Marca.

```
GET /api/products/search/:tipo?{campo}={valor}&{campo}={valor}

Ejemplo de Busqueda.

```
GET /api/products/search/marca?marca=peugeot or GET /api/products/search/marca?marca=peug
```

Ejemplo de Respuesta:

{
        "id": "hVhqJlh765cdNaGYPWVv",
        "anio": 2025,
        "combustible": "N",
        "rotation": "A",
        "marca": "peugeot",
        "transmision": "M",
        "nameModel": "cadeeeidella 1.4",
        "price": 10000,
        "color": "verde"
}


```
## Códigos de estado

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `204` - No Content: Recurso eliminado exitosamente
- `400` - Bad Request: Datos de entrada inválidos
- `404` - Not Found: Recurso no encontrado

---
 

## 📁 Estructura del proyecto

```
src/
├── Controllers/
│    ├── auth.controllers.js
│    └── products.controller.js
│
├── Modelos/
│     └── prouctos.modelo.js
│
├── Routes/
│    ├── auth.router.js
│    └── products.router.js
│
├── services/
└── products.service.js

```

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- Firebase (Firestore)
- JWT
- Vercel (deploy)

---

## ✍️ Autor

**José Gilberto Medina**  
📧 jdmdtg@gmail.com  
📍 Buenos Aires, Argentina

## 2025
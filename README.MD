# eCommerce backend

Proyecto final de curso de backend con nodejs en Coderhouse.

# Repo de desafíos

https://github.com/FelixGonzalo/curso_backend_30960

# Entregables del proyecto

## PRIMERA ENTREGA: v0.1.0

### Descripción

- API para manejar productos
- API para manejar carrito de compras
- Persistencia en archivos.txt
- Documentación en /api/documentation

### Scripts

Para hacer build del proyecto. resultado en carpeta dist

` npm run build`

Para hacer build y resetear el servidor durante desarrollo

` npm run start`

### Consideraciones

Dentro de la carpeta dist generada al hacer build, debe agergar los archivos.txt donde se guardarán los datos: products.txt y shoppingCarts.txt

## SEGUNDA ENTREGA: v0.2.0

### Descripción

El proyecto puede usar File System, MongoDB o Firebase para la persistencia de los datos mediante el uso de DAOs.

- Para utilizar mongoDB o Firebase:

1. descomente la importación del archivo de conexión en el index.ts del proyecto

```
require('dotenv').config()

// import './store/mongoDb/connection' // connect to MongoDB
// import './store/firebase/connection' // connect to Firebase

import express from 'express'
// ...
```

2. dentro del index.ts en la carpeta daos cambie el DAO correspondiente.

```
import productDaoFileSystem from './productDaoFileSystem'
import shoppingCartDaoFileSystem from './shoppingCartDaoFileSystem'
// import productDaoMongoDB from './productDaoMongoDB'
// import shoppingCartDaoMongoDB from './shoppingCartDaoMongoDB'
// import productDaoFirebase from '../../store/daos/productDaoFirebase'

const productDao = productDaoFileSystem
const shoppingCartDao = shoppingCartDaoFileSystem
export { productDao, shoppingCartDao }

```

3. dentro del archivo .env del proyecto complete los datos necesarios tomando como ejemplo el .env.example

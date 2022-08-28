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

## TERCERA ENTREGA: v0.3.0

**Descripción:**
- API para manejar autenticación (registro, login y uso de JWT)
- API para manejar carrito de compras actualizada (se agrega vender carrito)
- Uso de servicios de gmail, WhatsApp y storage para imágenes.
  - gmail para confirmar registro de usuario y venta de carrito.
  - WhatsApp para confirmar venta de carrito.
  - storage para subir photo del usuario.
- Ahora se utiliza solo MongoDB Atlas para persistir la data.
- Habilitar el modo CLUSTER mediante variable de entorno.
- Implementar registro de logs V1 con winston y morgan.
- Realizar prueba de performance en modo FORK y CLUSTER utilizando Artillery.
- Remover Webpack para trabajar con dependencias typescript y ts-node-dev
- Mejorar en el uso de TypeScript (tipado).
- Separar la declaración de rutas de los controladores en un archivo routes.ts

**Actualizacón de scripts:**

Para hacer build del proyecto. resultado en carpeta build

` npm run build`

Para limpiar el build generado

` npm run clean`

Para utilizar durante desarrollo

` npm run dev`

Para utilizar el build generado en producción

` npm run start`

**Captura de la prueba con Artillery**

![pruebas](./pruebas.png)

**NOTAS: Pendientes adicionales a la entrega:**
- Actualizar la documentación con swagger (Investigar como implementar la documentación por comentarios)
- Investigar como extender las propiedades del Request de Express con TypeScript para no usar req["newProperty"]
- Investigar estrategias de subida de archivos para que se cargue con previa validación de negocio.
- Mejorar la funcionalidad de vender el carrito de compras (Manejar cantidad por producto y actualización del stock)
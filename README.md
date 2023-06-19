# Arrecife

Arrecife es un ERP básico para gestionar las finanzas de empreas pequeñas o de particulares. Gestiona lo siguiente:

- Empresas
- Facturas y sus vencimientos
- Marcas
- Artículos
- Impuestos
- Planes de pago

Las facturas dependen de los impuestos y los planes de pago, las marcas dependen de las empresas (que sean proveedores) los artículos que dependen de las marcas.

La idea era dividir el proyecto en tres fases:

- Gestión básica (facturas, planes de pago, impuestos y vencimientos).
- Gestión de inventario (artículos, marcas, proveedores, almacenes y tiendas)
- Gestión de venta (TPV, vendedores y clientes)

Sólo ha dado tiempo a completar la primera fase, y la segunda parcialmente.

Este proyecto es el Trabajo de fin de Ciclo para el Grado Superior de Desarrollo de Aplicaciones Web.

## Tecnologías usadas

Se ha usado [SvelteKit](https://kit.svelte.dev) y [Prisma](https://prisma.io) en el lado del servidor, y en el lado del cliente [Bootstrap 5](https://getbootstrap.com) con [pequeñas modificaciones](./src/lib/custom.scss) relativas a los colores.

Para la base de datos se ha optado por MySQL funcionando en un contenedor porque es literalmente un comando hacerlo funcionar:

```sh
docker run -p 3306:3306 -e "MYSQL_ROOT_PASSWORD=<aqui la contraseña del usuario root>" -d mysql
```

Gracias al uso de Prisma, se puede usar cualquier motor que sea compatible.

## Desarrollo

Para empezar, clone el repositorio, descargue las dependencias, configure el *.env* y ejecute las migraciones:

```sh
git clone https://github.com/eplq/Arrecife.git
cd Arrecife
npm i
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Y ya podría abrir su editor para hacer lo que precise.

## Licencia

Este software no tiene **níngun tipo de garantía**. Está bajo la licencia [GNU GPLv3](./LICENSE).

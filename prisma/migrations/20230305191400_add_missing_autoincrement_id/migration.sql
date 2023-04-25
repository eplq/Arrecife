/*
    A pesar de que estas migraciones están pensadas para
    ejecutarse antes de introducir ningún dato, vamos a
    seguir las recomendaciones del hilo de StackOverflow
    del que hemos extraido la solución a nuestro problema.

    Database error code: 1833
    Database error: Cannot change column 'id': used in a foreign key constraint 'Product_brandId_fkey' of table
    'prisma_migrate_shadow_db_eacd...ac8d.Product'

    La solución que se propone consiste en bloquear las tablas
    para su escritura, desactivar la integridad de claves foráneas,
    hacer los cambios y volver a activar las comprobaciones.

    https://stackoverflow.com/questions/13606469/cannot-change-column-used-in-a-foreign-key-constraint

    No obstante, la solución óptima es agregar el autoincremento en las migraciones previas correspondientes
    a cada modelo. Así se solucionará de una manera mucho más limpia.

    ACTUALIZACIÓN: Una vez corregidas la migraciones originales, carece de sentido
    ejecutar esta.
*/

/*
LOCK TABLES Brand WRITE, Building WRITE, Company WRITE, PaymentPlan WRITE, Tax WRITE;
SET FOREIGN_KEY_CHECKS = 0;

-- AlterTable
ALTER TABLE `Brand` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Building` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Company` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `PaymentPlan` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `Tax` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

SET FOREIGN_KEY_CHECKS = 1;
UNLOCK TABLES;
*/

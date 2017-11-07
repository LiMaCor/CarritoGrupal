package Dao.specificimplementation;

import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import Dao.genericimplementation.TableGenericDaoImplementation;
import java.sql.Connection;

/**
 *
 * @author Julián
 */

public class ProductoSpecificDaoImplementation extends TableGenericDaoImplementation {

    public ProductoSpecificDaoImplementation(Connection oPooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, String strWhere) {
        super("producto", oPooledConnection, oPuserBean_security, strWhere);
    }
}

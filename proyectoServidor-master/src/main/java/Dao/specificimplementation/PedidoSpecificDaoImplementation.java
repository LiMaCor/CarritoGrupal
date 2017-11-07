package Dao.specificimplementation;

import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import Dao.genericimplementation.TableGenericDaoImplementation;
import java.sql.Connection;

/**
 *
 * @author Julián
 */

public class PedidoSpecificDaoImplementation extends TableGenericDaoImplementation {

    public PedidoSpecificDaoImplementation(Connection oPooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, String strWhere) {
        super("pedido", oPooledConnection, oPuserBean_security, strWhere);
    }

}

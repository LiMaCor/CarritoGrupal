package Dao.specificimplementation;

import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import Dao.genericimplementation.TableGenericDaoImplementation;
import java.sql.Connection;

/**
 *
 * @author Julián
 */

public class LineapedidoSpecificDaoImplementation extends TableGenericDaoImplementation {
    
    public LineapedidoSpecificDaoImplementation( Connection oPooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, String strWhere) {
        super("linea_pedido", oPooledConnection, oPuserBean_security, strWhere);
    }
    
}
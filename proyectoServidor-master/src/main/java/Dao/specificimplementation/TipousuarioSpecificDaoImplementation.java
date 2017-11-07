package Dao.specificimplementation;

/**
 *
 * @author Julián
 */

import Dao.genericimplementation.TableGenericDaoImplementation;
import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import java.sql.Connection;

public class TipousuarioSpecificDaoImplementation extends TableGenericDaoImplementation {

    public TipousuarioSpecificDaoImplementation(Connection oPooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, String strWhere) {
        super("tipousuario", oPooledConnection, oPuserBean_security, strWhere);
    }

}

package Bean.publicinterface;

import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Julián
 */

public interface GenericBeanInterface {

    public String getColumns();

    public String getValues();

    public String toPairs();

    public GenericBeanInterface fill(ResultSet oResultSet, Connection pooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, Integer expand) throws SQLException, Exception;

}

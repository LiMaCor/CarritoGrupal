package Bean.publicinterface;

import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Julián
 */

/**
 * Interfa genérica que tiene los métodos sin implementar para obtener las
 * columnas y valores de estas centralizados.
 */

public interface GenericBeanInterface {

    public String getColumns() throws Exception;

    public String getValues() throws Exception;

    public String toPairs() throws Exception;

    public GenericBeanInterface fill(ResultSet oResultSet, Connection pooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, Integer expand) throws SQLException, Exception;

}

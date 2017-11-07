package Bean.specificimplementation;

import com.google.gson.annotations.Expose;
import Bean.genericimplementation.TableGenericBeanImplementation;
import Helper.EncodingUtilHelper;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import Bean.publicinterface.GenericBeanInterface;

/**
 * 
 * @author Julián
 */

public class TipousuarioSpecificBeanImplementation extends TableGenericBeanImplementation {

    @Expose
    private String descripcion;

    public TipousuarioSpecificBeanImplementation() {

    }

    public TipousuarioSpecificBeanImplementation(Integer intId) {
        id = intId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Método getColumns(): Obtiene las columnas de la tabla correspondiente al
     * propio Bean.
     * @return String
     */
    
    @Override
    public String getColumns() {
        String strColumns = "";
        strColumns += "id,";
        strColumns += "descripcion";
        return strColumns;
    }

    /**
     * Método getValues(): Obtiene los valores de los registros correspondientes
     * al propio Bean.
     * @return String
     */
    
    @Override
    public String getValues() {
        String strColumns = "";
        strColumns += id + ",";
        strColumns += EncodingUtilHelper.quotate(descripcion);
        return strColumns;
    }

    /**
     * Método toPairs(): Relaciona los valores declarados en las propiedades del
     * propio Bean.
     * @return String
     */
    
    @Override
    public String toPairs() {
        String strPairs = "";
        //strPairs += "id=" + id + ",";
        strPairs += "descripcion=" + EncodingUtilHelper.quotate(descripcion);
        return strPairs;
    }

    /**
     * Método fill(): Establece valores a todos los atributos del Bean para
     * crearlo.
     * @param oResultSet
     * @param oConnection
     * @param oPuserBean_security
     * @param expand
     * @return GenericBeanInterface
     * @throws SQLException
     * @throws Exception 
     */
    
    @Override
    public GenericBeanInterface fill(ResultSet oResultSet, Connection pooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, Integer expand) throws SQLException, Exception {
        this.setId(oResultSet.getInt("id"));
        this.setDescripcion(oResultSet.getString("descripcion"));
        return this;
    }

}

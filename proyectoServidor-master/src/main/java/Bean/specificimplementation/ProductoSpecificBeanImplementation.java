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

public class ProductoSpecificBeanImplementation extends TableGenericBeanImplementation {

    @Expose
    private String codigo;
    @Expose
    private String descripcion;
    @Expose
    private Integer existencias;
    @Expose
    private Double precio;

    public ProductoSpecificBeanImplementation() {
    }

    public ProductoSpecificBeanImplementation(Integer id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getExistencias() {
        return existencias;
    }

    public void setExistencias(Integer existencias) {
        this.existencias = existencias;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
        strColumns += "codigo,";
        strColumns += "descripcion";
        strColumns += "existencias,";
        strColumns += "precio,";
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
        strColumns += EncodingUtilHelper.quotate(codigo) + ",";
        strColumns += EncodingUtilHelper.quotate(descripcion) + ",";
        strColumns += existencias + ",";
        strColumns += precio;

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
        strPairs += "codigo=" + EncodingUtilHelper.quotate(codigo) + ",";
        strPairs += "descripcion=" + EncodingUtilHelper.quotate(descripcion) + ",";
        strPairs += "existencias=" + existencias + ",";
        strPairs += "precio=" + precio;

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
    public GenericBeanInterface fill(ResultSet oResultSet, Connection oConnection, UsuarioSpecificBeanImplementation oPuserBean_security, Integer expand) throws SQLException, Exception {
        this.setId(oResultSet.getInt("id"));
        this.setCodigo(oResultSet.getString("codigo"));
        this.setDescripcion(oResultSet.getString("descripcion"));
        this.setExistencias(oResultSet.getInt("existencias"));
        this.setPrecio(oResultSet.getDouble("precio"));
        return this;
    }

}

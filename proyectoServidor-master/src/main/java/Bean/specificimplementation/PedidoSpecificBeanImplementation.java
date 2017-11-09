package Bean.specificimplementation;

import Bean.genericimplementation.TableGenericBeanImplementation;
import Bean.publicinterface.GenericBeanInterface;
import Dao.specificimplementation.UsuarioSpecificDaoImplementation;
import Helper.EncodingUtilHelper;
import com.google.gson.annotations.Expose;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;

/**
 *
 * @author Julián
 */

public class PedidoSpecificBeanImplementation extends TableGenericBeanImplementation {

    @Expose
    private Date fecha;
    @Expose
    private Integer iva;
    @Expose
    private Boolean tiene_iva;
    @Expose(serialize = false)
    private Integer id_usuario = 0;
    @Expose(deserialize = false)
    private UsuarioSpecificBeanImplementation obj_usuario = null;

    public PedidoSpecificBeanImplementation() {

    }
    
    public PedidoSpecificBeanImplementation(Integer id_usuario, Date dateFecha) {
        this.id_usuario = id_usuario;
        this.fecha = dateFecha;
    }

    public PedidoSpecificBeanImplementation(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Integer getIva() {
        return iva;
    }

    public void setIva(Integer iva) {
        this.iva = iva;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public UsuarioSpecificBeanImplementation getObj_usuario() {
        return obj_usuario;
    }

    public void setObj_usuario(UsuarioSpecificBeanImplementation obj_usuario) {
        this.obj_usuario = obj_usuario;
    }

    public Boolean getTiene_iva() {
        return tiene_iva;
    }

    public void setTiene_iva(Boolean tiene_iva) {
        this.tiene_iva = tiene_iva;
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
        strColumns += "fecha,";
        strColumns += "iva,";
        strColumns += "id_usuario";
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
        strColumns += EncodingUtilHelper.stringifyAndQuotate(fecha) + ",";
        strColumns += iva + ",";
        strColumns += id_usuario;
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
        strPairs += "fecha=" + EncodingUtilHelper.stringifyAndQuotate(fecha) + ",";
        strPairs += "iva=" + iva + ",";
        strPairs += "id_usuario=" + id_usuario;
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
        this.setFecha(oResultSet.getDate("fecha"));
        this.setIva(oResultSet.getInt("iva"));
        this.setId_usuario(oResultSet.getInt("id_usuario"));
        if (expand > 0) {
            UsuarioSpecificBeanImplementation oUsuarioBean = new UsuarioSpecificBeanImplementation();
            UsuarioSpecificDaoImplementation oUsuarioDao = new UsuarioSpecificDaoImplementation(oConnection, oPuserBean_security, null);
            oUsuarioBean = (UsuarioSpecificBeanImplementation) oUsuarioDao.get(oResultSet.getInt("id_usuario"), expand - 1);
            this.setObj_usuario(oUsuarioBean);
        } else {
            this.setId_usuario(oResultSet.getInt("id_usuario"));
        }

        return this;
    }

}

package Bean.specificimplementation;

import com.google.gson.annotations.Expose;
import Bean.genericimplementation.TableGenericBeanImplementation;
import Dao.specificimplementation.TipousuarioSpecificDaoImplementation;
import Helper.EncodingUtilHelper;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import Bean.publicinterface.GenericBeanInterface;
import java.util.Date;

/**
 * 
 * @author Julián
 */

public class UsuarioSpecificBeanImplementation extends TableGenericBeanImplementation {

    @Expose
    private String dni;
    @Expose
    private String nombre;
    @Expose
    private String primer_apellido;
    @Expose
    private String segundo_apellido;
    @Expose
    private String login;
    @Expose(serialize = false)
    private String pass;
    @Expose
    private Date fecha_nacimiento;
    @Expose
    private String email;
    @Expose(serialize = false)
    private Integer id_tipousuario = 0;
    @Expose(deserialize = false)
    private TipousuarioSpecificBeanImplementation obj_tipousuario = null;

    public UsuarioSpecificBeanImplementation() {

    }

    public UsuarioSpecificBeanImplementation(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrimer_apellido() {
        return primer_apellido;
    }

    public void setPrimer_apellido(String primer_apellido) {
        this.primer_apellido = primer_apellido;
    }

    public String getSegundo_apellido() {
        return segundo_apellido;
    }

    public void setSegundo_apellido(String segundo_apellido) {
        this.segundo_apellido = segundo_apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getId_tipousuario() {
        return id_tipousuario;
    }

    public void setId_tipousuario(Integer id_tipousuario) {
        this.id_tipousuario = id_tipousuario;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public TipousuarioSpecificBeanImplementation getObj_tipousuario() {
        return obj_tipousuario;
    }

    public void setObj_tipousuario(TipousuarioSpecificBeanImplementation obj_tipousuario) {
        this.obj_tipousuario = obj_tipousuario;
    }

    public Date getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(Date fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    /**
     * Método getColumns(): Obtiene las columnas de la tabla correspondiente al
     * propio Bean.
     * @return String
     */
    
    @Override
    public String getColumns() {
        String strColumns = "";
        strColumns += "dni,";
        strColumns += "nombre,";
        strColumns += "primer_apellido,";
        strColumns += "segundo_apellido,";
        strColumns += "login,";
        strColumns += "pass,";
        strColumns += "fecha_nacimiento";
        strColumns += "email,";
        strColumns += "id_tipousuario";

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
        strColumns += EncodingUtilHelper.quotate(dni) + ",";
        strColumns += EncodingUtilHelper.quotate(nombre) + ",";
        strColumns += EncodingUtilHelper.quotate(primer_apellido) + ",";
        strColumns += EncodingUtilHelper.quotate(segundo_apellido) + ",";
        strColumns += EncodingUtilHelper.quotate(login) + ",";
        strColumns += EncodingUtilHelper.quotate("da8ab09ab4889c6208116a675cad0b13e335943bd7fc418782d054b32fdfba04") + ",";
        strColumns += EncodingUtilHelper.stringifyAndQuotate(fecha_nacimiento) + ",";
        strColumns += EncodingUtilHelper.quotate(email) + ",";
        strColumns += id_tipousuario;
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
        strPairs += "dni=" + EncodingUtilHelper.quotate(dni) + ",";
        strPairs += "nombre=" + EncodingUtilHelper.quotate(nombre) + ",";
        strPairs += "primer_apellido=" + EncodingUtilHelper.quotate(primer_apellido) + ",";
        strPairs += "segundo_apellido=" + EncodingUtilHelper.quotate(segundo_apellido) + ",";
        strPairs += "login=" + EncodingUtilHelper.quotate(login) + ",";
        strPairs += "fecha_nacimiento=" + EncodingUtilHelper.stringifyAndQuotate(fecha_nacimiento) + ",";
        strPairs += "email=" + EncodingUtilHelper.quotate(email) + ",";
        strPairs += "id_tipousuario=" + id_tipousuario;
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
        this.setDni(oResultSet.getString("dni"));
        this.setNombre(oResultSet.getString("nombre"));
        this.setPrimer_apellido(oResultSet.getString("primer_apellido"));
        this.setSegundo_apellido(oResultSet.getString("segundo_apellido"));
        this.setLogin(oResultSet.getString("login"));
        this.setPass(oResultSet.getString("pass"));
        this.setFecha_nacimiento(oResultSet.getDate("fecha_nacimiento"));
        this.setEmail(oResultSet.getString("email"));
        this.setId_tipousuario(oResultSet.getInt("id_tipousuario"));
        if (expand > 0) {
            TipousuarioSpecificBeanImplementation oTipousuarioBean = new TipousuarioSpecificBeanImplementation();
            TipousuarioSpecificDaoImplementation oTipousuarioDao = new TipousuarioSpecificDaoImplementation(oConnection, oPuserBean_security, null);
            oTipousuarioBean = (TipousuarioSpecificBeanImplementation) oTipousuarioDao.get(oResultSet.getInt("id_tipousuario"), expand - 1);
            this.setObj_tipousuario(oTipousuarioBean);
        } else {
            this.setId_tipousuario(oResultSet.getInt("id_tipousuario"));
        }

        return this;
    }

}
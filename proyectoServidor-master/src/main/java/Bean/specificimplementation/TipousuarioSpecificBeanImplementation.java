/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Bean.specificimplementation;

import com.google.gson.annotations.Expose;
import Bean.genericimplementation.TableGenericBeanImplementation;
import Helper.EncodingUtilHelper;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import Bean.publicinterface.GenericBeanInterface;

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

    @Override
    public String getColumns() {
        String strColumns = "";
        strColumns += "id,";
        strColumns += "descripcion";
        return strColumns;
    }

    @Override
    public String getValues() {
        String strColumns = "";
        strColumns += id + ",";
        strColumns += EncodingUtilHelper.quotate(descripcion);
        return strColumns;
    }

    @Override
    public String toPairs() {
        String strPairs = "";
        //strPairs += "id=" + id + ",";
        strPairs += "descripcion=" + EncodingUtilHelper.quotate(descripcion);
        return strPairs;
    }

    @Override
    public GenericBeanInterface fill(ResultSet oResultSet, Connection pooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, Integer expand) throws SQLException, Exception {
        this.setId(oResultSet.getInt("id"));
        this.setDescripcion(oResultSet.getString("descripcion"));
        return this;
    }

}

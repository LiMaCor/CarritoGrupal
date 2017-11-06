/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Dao.specificimplementation;

/**
 *
 * @author Kysuke
 */
import Dao.genericimplementation.TableGenericDaoImplementation;
import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import Helper.AppConfigurationHelper;
import Helper.Log4jConfigurationHelper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UsuarioSpecificDaoImplementation extends TableGenericDaoImplementation {

    public UsuarioSpecificDaoImplementation(Connection oPooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, String strWhere) {
        super("usuario", oPooledConnection, oPuserBean_security, strWhere);
    }

    public UsuarioSpecificBeanImplementation getFromLoginAndPass(UsuarioSpecificBeanImplementation oUsuarioBean) throws Exception {
        PreparedStatement oPreparedStatement = null;
        ResultSet oResultSet = null;

        strSQL += " AND login='" + oUsuarioBean.getLogin() + "'";
        strSQL += " AND pass='" + oUsuarioBean.getPass() + "'";
        try {
            oPreparedStatement = oConnection.prepareStatement(strSQL);
            oResultSet = oPreparedStatement.executeQuery();
            if (oResultSet.next()) {
                oUsuarioBean.fill(oResultSet, oConnection, oPuserSecurity, AppConfigurationHelper.getJsonMsgDepth());
            } else {
                throw new Exception("UsuarioDao getFromLoginAndPass error");
            }
        } catch (Exception ex) {
            String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
            Log4jConfigurationHelper.errorLog(msg, ex);
            throw new Exception(msg, ex);
        } finally {
            if (oResultSet != null) {
                oResultSet.close();
            }
            if (oPreparedStatement != null) {
                oPreparedStatement.close();
            }
        }
        return oUsuarioBean;
    }

}

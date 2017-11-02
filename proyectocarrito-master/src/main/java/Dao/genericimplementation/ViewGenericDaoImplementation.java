/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Dao.genericimplementation;

/**
 *
 * @author Kysuke
 */
import Bean.genericimplementation.ViewGenericBeanImplementation;
import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import Helper.FilterBeanHelper;
import Helper.Log4jConfigurationHelper;
import Helper.MappingBeanHelper;
import Helper.SqlBuilderHelper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import Bean.publicinterface.GenericBeanInterface;
import Dao.publicinterface.ViewDaoInterface;

public abstract class ViewGenericDaoImplementation implements ViewDaoInterface<ViewGenericBeanImplementation> {

    protected String ob = null;
    protected String strSQL = null;

    protected String strCountSQL = null;
    protected Connection oConnection = null;
    protected UsuarioSpecificBeanImplementation oPuserSecurity = null;

    public ViewGenericDaoImplementation(String obj, Connection oPooledConnection, UsuarioSpecificBeanImplementation oPuserBean_security, String strWhere) {
        oConnection = oPooledConnection;
        oPuserSecurity = oPuserBean_security;
        ob = obj;
        strSQL = "select * from " + ob + " WHERE 1=1 ";
        strCountSQL = "select COUNT(*) from " + ob + " WHERE 1=1 ";
        if (strWhere != null) {
            strSQL += strWhere + " ";
            strCountSQL += strWhere + " ";
        }
    }

    @Override
    public Long getCount(ArrayList<FilterBeanHelper> alFilter) throws Exception {
        PreparedStatement oPreparedStatement = null;
        ResultSet oResultSet = null;
        strCountSQL += SqlBuilderHelper.buildSqlFilter(alFilter);
        Long iResult = 0L;
        try {
            oPreparedStatement = oConnection.prepareStatement(strCountSQL);
            oResultSet = oPreparedStatement.executeQuery();
            if (oResultSet.next()) {
                iResult = oResultSet.getLong("COUNT(*)");
            } else {
                String msg = this.getClass().getName() + ": getcount";
                Log4jConfigurationHelper.errorLog(msg);
                throw new Exception(msg);
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
        return iResult;
    }

    @Override
    public ArrayList<ViewGenericBeanImplementation> getPage(int intRegsPerPag, int intPage, LinkedHashMap<String, String> hmOrder, ArrayList<FilterBeanHelper> alFilter, int expand) throws Exception {
        String strSQL1 = strSQL;
        strSQL1 += SqlBuilderHelper.buildSqlFilter(alFilter);
        strSQL1 += SqlBuilderHelper.buildSqlOrder(hmOrder);
        strSQL1 += SqlBuilderHelper.buildSqlLimit(this.getCount(alFilter), intRegsPerPag, intPage);
        ArrayList<ViewGenericBeanImplementation> aloBean = new ArrayList<>();
        PreparedStatement oPreparedStatement = null;
        ResultSet oResultSet = null;
        try {
            oPreparedStatement = oConnection.prepareStatement(strSQL1);
            oResultSet = oPreparedStatement.executeQuery(strSQL1);
            while (oResultSet.next()) {
                GenericBeanInterface oBean = MappingBeanHelper.getBean(ob);
                oBean = (ViewGenericBeanImplementation) oBean.fill(oResultSet, oConnection, oPuserSecurity, expand);
                aloBean.add((ViewGenericBeanImplementation) oBean);
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
        return aloBean;
    }

    @Override
    public ArrayList<ViewGenericBeanImplementation> getPageX(int id_foreign, String ob_foreign, int intRegsPerPag, int intPage, LinkedHashMap<String, String> hmOrder, ArrayList<FilterBeanHelper> alFilter, int expand) throws Exception {
        String strSQL1 = strSQL;
        strSQL1 += " and id_" + ob_foreign + "=" + id_foreign + " ";
        strSQL1 += SqlBuilderHelper.buildSqlFilter(alFilter);
        strSQL1 += SqlBuilderHelper.buildSqlOrder(hmOrder);
        strSQL1 += SqlBuilderHelper.buildSqlLimit(getCount(alFilter), intRegsPerPag, intPage);
        ArrayList<ViewGenericBeanImplementation> aloBean = new ArrayList<>();
        PreparedStatement oPreparedStatement = null;
        ResultSet oResultSet = null;
        try {
            oPreparedStatement = oConnection.prepareStatement(strSQL1);
            oResultSet = oPreparedStatement.executeQuery(strSQL1);
            while (oResultSet.next()) {
                GenericBeanInterface oBean = MappingBeanHelper.getBean(ob);
                oBean = (ViewGenericBeanImplementation) oBean.fill(oResultSet, oConnection, oPuserSecurity, expand);
                aloBean.add((ViewGenericBeanImplementation) oBean);
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
        return aloBean;
    }

    @Override
    public Long getCountX(int id_foreign, String ob_foreign, ArrayList<FilterBeanHelper> alFilter) throws Exception {
        PreparedStatement oPreparedStatement = null;
        ResultSet oResultSet = null;
        strSQL = "SELECT COUNT(*) FROM " + ob;
        strSQL += " WHERE id_tipousuario=" + id_foreign;
        strSQL += SqlBuilderHelper.buildSqlFilter(alFilter);
        Long iResult = 0L;
        try {
            oPreparedStatement = oConnection.prepareStatement(strSQL);
            oResultSet = oPreparedStatement.executeQuery(strSQL);
            if (oResultSet.next()) {
                iResult = oResultSet.getLong("COUNT(*)");
            } else {
                String msg = this.getClass().getName() + ": getCountxtipousuario";
                Log4jConfigurationHelper.errorLog(msg);
                throw new Exception(msg);
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
        return iResult;
    }

}

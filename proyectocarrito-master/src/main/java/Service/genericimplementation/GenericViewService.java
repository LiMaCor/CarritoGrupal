/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Service.genericimplementation;

/**
 *
 * @author Kysuke
 */
import Service.publicinterface.ViewServiceInterface;
import com.google.gson.Gson;
import Bean.genericimplementation.ViewGenericBeanImplementation;
import Bean.ReplyBean;
import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import Connection.ConnectionInterface;
import Helper.AppConfigurationHelper;
import Helper.EncodingUtilHelper;
import Helper.FilterBeanHelper;
import Helper.Log4jConfigurationHelper;
import Helper.MappingDaoHelper;
import Helper.ParameterCookHelper;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import javax.servlet.http.HttpServletRequest;
import Dao.publicinterface.ViewDaoInterface;

public abstract class GenericViewService implements ViewServiceInterface {

    protected HttpServletRequest oRequest = null;
    protected String ob = null;

    public GenericViewService(HttpServletRequest request) {
        oRequest = request;
        ob = oRequest.getParameter("ob");
    }

    protected Boolean checkPermission(String strMethodName) {
        UsuarioSpecificBeanImplementation oUsuarioBean = (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user");
        if (oUsuarioBean != null) {
            return true;
        } else {
            return false;
        }
    }

    /*
    * http://127.0.0.1:8081/generic-carrito-server/json?ob=xxxxxx&op=getpage&np=1&rpp=10
     */
    @Override
    public ReplyBean getPage() throws Exception {
        if (this.checkPermission("getpage")) {
            int np = Integer.parseInt(oRequest.getParameter("np"));
            int rpp = Integer.parseInt(oRequest.getParameter("rpp"));
            String strOrder = oRequest.getParameter("order");
            String strFilter = oRequest.getParameter("filter");
            LinkedHashMap<String, String> hmOrder = ParameterCookHelper.getOrderParams(strOrder);
            ArrayList<FilterBeanHelper> alFilter = ParameterCookHelper.getFilterParams(strFilter);
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            ReplyBean oReplyBean = null;
            ArrayList<ViewGenericBeanImplementation> aloBean = null;
            try {
                oPooledConnection = AppConfigurationHelper.getSourceConnection();
                oConnection = oPooledConnection.newConnection();
                ViewDaoInterface oDao = MappingDaoHelper.getDao(ob, oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("userBean"), null);
                aloBean = oDao.getPage(rpp, np, hmOrder, alFilter, AppConfigurationHelper.getJsonMsgDepth());
                Gson oGson = AppConfigurationHelper.getGson();
                String strJson = oGson.toJson(aloBean);
                oReplyBean = new ReplyBean(200, strJson);
            } catch (Exception ex) {
                String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
                Log4jConfigurationHelper.errorLog(msg, ex);
                throw new Exception(msg, ex);
            } finally {
                if (oConnection != null) {
                    oConnection.close();
                }
                if (oPooledConnection != null) {
                    oPooledConnection.disposeConnection();
                }
            }
            return oReplyBean;
        } else {
            return new ReplyBean(401, EncodingUtilHelper.quotate("Unauthorized"));
        }
    }

    /*
    * http://127.0.0.1:8081/generic-carrito-server/json?ob=xxxxxxxx&op=getcount
     */
    @Override
    public ReplyBean getCount() throws Exception {
        if (this.checkPermission("getcount")) {
            Long lResult;
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            ReplyBean oReplyBean = null;
            String strFilter = oRequest.getParameter("filter");
            ArrayList<FilterBeanHelper> alFilter = ParameterCookHelper.getFilterParams(strFilter);
            try {
                oPooledConnection = AppConfigurationHelper.getSourceConnection();
                oConnection = oPooledConnection.newConnection();
                ViewDaoInterface oDao = MappingDaoHelper.getDao(ob, oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("userBean"), null);
                lResult = oDao.getCount(alFilter);
                Gson oGson = AppConfigurationHelper.getGson();
                String strJson = oGson.toJson(lResult);
                oReplyBean = new ReplyBean(200, strJson);
            } catch (Exception ex) {
                String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
                Log4jConfigurationHelper.errorLog(msg, ex);
                throw new Exception(msg, ex);
            } finally {
                if (oConnection != null) {
                    oConnection.close();
                }
                if (oPooledConnection != null) {
                    oPooledConnection.disposeConnection();
                }
            }
            return oReplyBean;
        } else {
            return new ReplyBean(401, EncodingUtilHelper.quotate("Unauthorized"));
        }
    }

    public ReplyBean getPageX() throws Exception {
        if (this.checkPermission("getpagex")) {
            int np = Integer.parseInt(oRequest.getParameter("np"));
            int rpp = Integer.parseInt(oRequest.getParameter("rpp"));
            int id = Integer.parseInt(oRequest.getParameter("id"));
            int id_foreign = Integer.parseInt(oRequest.getParameter("id_foreign"));
            String ob_foreign = oRequest.getParameter("ob_foreign");
            String strOrder = oRequest.getParameter("order");
            String strFilter = oRequest.getParameter("filter");
            LinkedHashMap<String, String> hmOrder = ParameterCookHelper.getOrderParams(strOrder);
            ArrayList<FilterBeanHelper> alFilter = ParameterCookHelper.getFilterParams(strFilter);
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            ReplyBean oReplyBean = null;
            ArrayList<UsuarioSpecificBeanImplementation> aloBean = null;
            try {
                oPooledConnection = AppConfigurationHelper.getSourceConnection();
                oConnection = oPooledConnection.newConnection();
                ViewDaoInterface oDao = MappingDaoHelper.getDao(ob, oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("userBean"), null);
                aloBean = oDao.getPageX(id_foreign, ob_foreign, rpp, np, hmOrder, alFilter, AppConfigurationHelper.getJsonMsgDepth());
                Gson oGson = AppConfigurationHelper.getGson();
                String strJson = oGson.toJson(aloBean);
                oReplyBean = new ReplyBean(200, strJson);
            } catch (Exception ex) {
                String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
                Log4jConfigurationHelper.errorLog(msg, ex);
                throw new Exception(msg, ex);
            } finally {
                if (oConnection != null) {
                    oConnection.close();
                }
                if (oPooledConnection != null) {
                    oPooledConnection.disposeConnection();
                }
            }
            return oReplyBean;
        } else {
            return new ReplyBean(401, EncodingUtilHelper.quotate("Unauthorized"));
        }
    }

    @Override
    public ReplyBean getCountX() throws Exception {
        if (this.checkPermission("getcountx")) {
            Long lResult;
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            ReplyBean oReplyBean = null;
            int id_foreign = Integer.parseInt(oRequest.getParameter("id_foreign"));
            String ob_foreign = oRequest.getParameter("ob_foreign");
            String strFilter = oRequest.getParameter("filter");
            ArrayList<FilterBeanHelper> alFilter = ParameterCookHelper.getFilterParams(strFilter);
            try {
                oPooledConnection = AppConfigurationHelper.getSourceConnection();
                oConnection = oPooledConnection.newConnection();
                ViewDaoInterface oDao = MappingDaoHelper.getDao(ob, oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("userBean"), null);
                lResult = oDao.getCountX(id_foreign, ob_foreign, alFilter);
                Gson oGson = AppConfigurationHelper.getGson();
                String strJson = oGson.toJson(lResult);
                oReplyBean = new ReplyBean(200, strJson);
            } catch (Exception ex) {
                String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
                Log4jConfigurationHelper.errorLog(msg, ex);
                throw new Exception(msg, ex);
            } finally {
                if (oConnection != null) {
                    oConnection.close();
                }
                if (oPooledConnection != null) {
                    oPooledConnection.disposeConnection();
                }
            }
            return oReplyBean;
        } else {
            return new ReplyBean(401, EncodingUtilHelper.quotate("Unauthorized"));
        }
    }

}
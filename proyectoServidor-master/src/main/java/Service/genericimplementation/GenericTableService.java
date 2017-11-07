package Service.genericimplementation;

import Service.publicinterface.TableServiceInterface;
import com.google.gson.Gson;
import Bean.genericimplementation.TableGenericBeanImplementation;
import Bean.ReplyBean;
import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import Connection.ConnectionInterface;
import Helper.AppConfigurationHelper;
import Helper.Log4jConfigurationHelper;
import Helper.MappingBeanHelper;
import Helper.MappingDaoHelper;
import java.sql.Connection;
import javax.servlet.http.HttpServletRequest;
import Helper.EncodingUtilHelper;
import Dao.publicinterface.TableDaoInterface;

/**
 *
 * @author Julián
 */

public abstract class GenericTableService extends GenericViewService implements TableServiceInterface {

    public GenericTableService(HttpServletRequest request) {
        super(request);
    }

    /**
     * Método get(): Obtiene datos, a través de la capa Dao, procedentes de la
     * base de datos.
     * @return ReplyBean
     * @throws Exception 
     */
    
    @Override
    public ReplyBean get() throws Exception {
        if (this.checkPermission("get")) {
            int id = Integer.parseInt(oRequest.getParameter("id"));
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            ReplyBean oReplyBean = null;
            try {
                oPooledConnection = AppConfigurationHelper.getSourceConnection();
                oConnection = oPooledConnection.newConnection();

                TableDaoInterface oDao = (TableDaoInterface) MappingDaoHelper.getDao(ob, oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user"), null);

                TableGenericBeanImplementation oBean = (TableGenericBeanImplementation) oDao.get(id, AppConfigurationHelper.getJsonMsgDepth());
                Gson oGson = AppConfigurationHelper.getGson();
                String strJson = oGson.toJson(oBean);
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

    /**
     * Método set(): Establece datos en la base de datos, a través de la capa Dao.
     * @return ReplyBean
     * @throws Exception 
     */
    
    @Override
    public ReplyBean set() throws Exception {
        if (this.checkPermission("set")) {
            String jason = oRequest.getParameter("jason");
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            ReplyBean oReplyBean = null;
            TableGenericBeanImplementation oBean = (TableGenericBeanImplementation) MappingBeanHelper.getBean(ob);
            Gson oGson = AppConfigurationHelper.getGson();
            oBean = oGson.fromJson(jason, oBean.getClass());
            if (oBean == null) {
                throw new Exception("Bean null en service set");
            }
            int iResult = 0;
            try {
                oPooledConnection = AppConfigurationHelper.getSourceConnection();
                oConnection = oPooledConnection.newConnection();
                TableDaoInterface oDao = (TableDaoInterface) MappingDaoHelper.getDao(ob, oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user"), null);
                iResult = oDao.set(oBean);
                String strJson = oGson.toJson(iResult);
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

    /**
     * Método remove(): Elimina un registro de la base de datos, a través de la
     * capa Dao.
     * @return ReplyBean
     * @throws Exception 
     */
    
    @Override
    public ReplyBean remove() throws Exception {
        if (this.checkPermission("remove")) {
            int id = Integer.parseInt(oRequest.getParameter("id"));
            Boolean iResult = false;
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            ReplyBean oReplyBean = null;
            try {
                oPooledConnection = AppConfigurationHelper.getSourceConnection();
                oConnection = oPooledConnection.newConnection();

                TableDaoInterface oDao = (TableDaoInterface) MappingDaoHelper.getDao(ob, oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user"), null);

                iResult = oDao.remove(id);
                Gson oGson = AppConfigurationHelper.getGson();
                String strJson = oGson.toJson(iResult);
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

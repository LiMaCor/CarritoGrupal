package Service.specificimplementation;

import Bean.CarritoBean;
import Bean.ReplyBean;
import Bean.specificimplementation.LineapedidoSpecificBeanImplementation;
import Bean.specificimplementation.PedidoSpecificBeanImplementation;
import Bean.specificimplementation.ProductoSpecificBeanImplementation;
import Bean.specificimplementation.UsuarioSpecificBeanImplementation;
import Connection.ConnectionInterface;
import Dao.specificimplementation.LineapedidoSpecificDaoImplementation;
import Dao.specificimplementation.PedidoSpecificDaoImplementation;
import Helper.AppConfigurationHelper;
import Helper.Log4jConfigurationHelper;
import Dao.specificimplementation.ProductoSpecificDaoImplementation;
import Service.publicinterface.TableServiceCarritoInterface;
import Service.publicinterface.ViewServiceCarritoInterface;
import com.google.gson.Gson;
import java.sql.Connection;
import java.util.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Julian
 */
public class CarritoSpecificServiceImplementation implements TableServiceCarritoInterface, ViewServiceCarritoInterface {

    HttpServletRequest oRequest = null;

    public CarritoSpecificServiceImplementation(HttpServletRequest request) {
        oRequest = request;
    }

    private Boolean checkPermission(String strMethodName) throws Exception {
        UsuarioSpecificBeanImplementation oUsuarioBean = (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user");
        if (oUsuarioBean != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * METODO FIND TIENE QUE SER HASHMAP O BEAN --> HASHMAP TIPO <INT,POJO BEAN>
     * --> BEAN (INT CANTIDAD, PRODUCTOBEAN OPRODUCTO)
     *
     * @return
     * @throws Exception
     */
    private CarritoBean find(ArrayList<CarritoBean> alCarrito, int id) {
        Iterator<CarritoBean> iterator = alCarrito.iterator();
        while (iterator.hasNext()) {
            CarritoBean oCarrito = iterator.next();
            if (id == (oCarrito.getoProducto().getId())) {
                return oCarrito;
            }
        }
        return null;
    }

    @Override
    public ReplyBean add() throws Exception {
        if (this.checkPermission("add")) {
            ArrayList<CarritoBean> alCarrito = (ArrayList) oRequest.getSession().getAttribute("carrito");
            ReplyBean oReplyBean = null;
            CarritoBean oCarritoBeanEnCarrito = null;
            int id = Integer.parseInt(oRequest.getParameter("id"));
            int cantidad = Integer.parseInt(oRequest.getParameter("cantidad"));
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            if (alCarrito == null) {
                alCarrito = new ArrayList<CarritoBean>();
            }
            oCarritoBeanEnCarrito = find(alCarrito, id);
            if (oCarritoBeanEnCarrito != null) {
                oCarritoBeanEnCarrito.setCantidad(oCarritoBeanEnCarrito.getCantidad() + cantidad);
            } else {
                try {
                    oPooledConnection = AppConfigurationHelper.getSourceConnection();
                    oConnection = oPooledConnection.newConnection();
                    CarritoBean oCarritoBean = new CarritoBean();
                    oCarritoBean.setCantidad(cantidad);
                    ProductoSpecificDaoImplementation oProductoDao = new ProductoSpecificDaoImplementation(oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user"), null);
                    ProductoSpecificBeanImplementation oProductoBeanAdd = (ProductoSpecificBeanImplementation) oProductoDao.get(id, AppConfigurationHelper.getJsonMsgDepth());
                    oCarritoBean.setoProducto(oProductoBeanAdd);
                    alCarrito.add(oCarritoBean);
                } catch (Exception ex) {
                    String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
                    Log4jConfigurationHelper.errorLog(msg, ex);
                    throw new Exception(msg, ex);
                } finally {
                    if (oConnection != null) {
                        oConnection.close();
                    }
                    if (AppConfigurationHelper.getSourceConnection() != null) {
                        AppConfigurationHelper.getSourceConnection().disposeConnection();
                    }
                }
            }
            Gson oGson = AppConfigurationHelper.getGson();
            String strJson = oGson.toJson(alCarrito);
            oReplyBean = new ReplyBean(200, strJson);
            return oReplyBean;
        } else {
            return new ReplyBean(401, "Unauthorized operation");
        }
    }

    @Override
    public ReplyBean remove() throws Exception {
        if (this.checkPermission("remove")) {
            ArrayList<CarritoBean> alCarrito = (ArrayList) oRequest.getSession().getAttribute("carrito");
            int id = Integer.parseInt(oRequest.getParameter("id"));
            ReplyBean oReplyBean = null;
            try {
                CarritoBean oCarrito = find(alCarrito, id);
                alCarrito.remove(oCarrito);
                Gson oGson = AppConfigurationHelper.getGson();
                String strJson = oGson.toJson(alCarrito);
                oReplyBean = new ReplyBean(200, strJson);
            } catch (Exception ex) {
                String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
                Log4jConfigurationHelper.errorLog(msg, ex);
                throw new Exception(msg, ex);
            }
            return oReplyBean;
        } else {
            return new ReplyBean(401, "Unauthorized operation");
        }
    }

    @Override
    public ReplyBean list() throws Exception {
        if (this.checkPermission("list")) {
            ArrayList<CarritoBean> alCarrito = (ArrayList) oRequest.getSession().getAttribute("carrito");
            ReplyBean oReplyBean = null;
            Gson oGson = AppConfigurationHelper.getGson();
            String strJson = oGson.toJson(alCarrito);
            oReplyBean = new ReplyBean(200, strJson);
            return oReplyBean;
        } else {
            return new ReplyBean(401, "Unauthorized operation");
        }
    }

    @Override
    public ReplyBean buy() throws Exception {
        if (this.checkPermission("buy")) {
            ArrayList<CarritoBean> alCarrito = (ArrayList) oRequest.getSession().getAttribute("carrito");
            UsuarioSpecificBeanImplementation oUsuarioBean = (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user");
            ReplyBean oReplyBean = null;
            Connection oConnection = null;
            ConnectionInterface oPooledConnection = null;
            //Date fecha = (Date) Calendar.getInstance().getTime(); //Date.valueOf(oRequest.getParameter("fecha"));
            try {
                oPooledConnection = AppConfigurationHelper.getSourceConnection();
                oConnection = oPooledConnection.newConnection();
                if (alCarrito != null && alCarrito.size() > 0) {
                    oConnection.setAutoCommit(false);
                    PedidoSpecificBeanImplementation oPedidoBean = new PedidoSpecificBeanImplementation();
                    oPedidoBean.setId_usuario(oUsuarioBean.getId());
                    oPedidoBean.setFecha(Calendar.getInstance().getTime());
                    PedidoSpecificDaoImplementation oPedidoDao = new PedidoSpecificDaoImplementation(oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user"), null);
                    oPedidoBean.setId(oPedidoDao.set(oPedidoBean));
                    Iterator<CarritoBean> iterator = alCarrito.iterator();
                    while (iterator.hasNext()) {
                        CarritoBean oCarritoBean = iterator.next();
                        ProductoSpecificBeanImplementation oProductoBeanDeCarrito = oCarritoBean.getoProducto();
                        ProductoSpecificDaoImplementation oProductoDao = new ProductoSpecificDaoImplementation(oConnection, (UsuarioSpecificBeanImplementation) oRequest.getSession().getAttribute("user"), null);
                        ProductoSpecificBeanImplementation oProductoBeanDeDB = (ProductoSpecificBeanImplementation) oProductoDao.get(oProductoBeanDeCarrito.getId(), AppConfigurationHelper.getJsonMsgDepth());
                        if (oProductoBeanDeDB.getExistencias() > oCarritoBean.getCantidad()) {
                            LineapedidoSpecificBeanImplementation oLineadepedidoBean = new LineapedidoSpecificBeanImplementation();
                            oLineadepedidoBean.setCantidad(oCarritoBean.getCantidad());
                            oLineadepedidoBean.setId_pedido(oPedidoBean.getId());
                            oLineadepedidoBean.setId_producto(oProductoBeanDeCarrito.getId());
                            LineapedidoSpecificDaoImplementation oLineadepedidoDao = new LineapedidoSpecificDaoImplementation(oConnection, oUsuarioBean, null);
                            oLineadepedidoBean.setId(oLineadepedidoDao.set(oLineadepedidoBean));
                            oProductoBeanDeCarrito.setExistencias(oProductoBeanDeCarrito.getExistencias() - oCarritoBean.getCantidad());
                            oProductoDao.set(oProductoBeanDeCarrito);
                        }
                    }
                    alCarrito.clear();
                    oConnection.commit();
                }
            } catch (Exception ex) {
                oConnection.rollback();
                String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
                Log4jConfigurationHelper.errorLog(msg, ex);
                throw new Exception(msg, ex);
            } finally {
                if (oConnection != null) {
                    oConnection.close();
                }
                if (AppConfigurationHelper.getSourceConnection() != null) {
                    AppConfigurationHelper.getSourceConnection().disposeConnection();
                }
            }
            return oReplyBean = new ReplyBean(200, "Compra realizada correctamente");
        } else {
            return new ReplyBean(401, "Unauthorized operation");
        }
    }

    @Override
    public ReplyBean empty() throws Exception {
        if (this.checkPermission("empty")) {
            ArrayList<CarritoBean> alCarrito = (ArrayList) oRequest.getSession().getAttribute("carrito");
            ReplyBean oReplyBean = null;
            try {
                alCarrito.clear();
                Gson oGson = AppConfigurationHelper.getGson();
                String strJson = oGson.toJson(alCarrito);
                oReplyBean = new ReplyBean(200, strJson);
            } catch (Exception ex) {
                String msg = this.getClass().getName() + ":" + (ex.getStackTrace()[0]).getMethodName();
                Log4jConfigurationHelper.errorLog(msg, ex);
                throw new Exception(msg, ex);
            }
            return oReplyBean;
        } else {
            return new ReplyBean(401, "Unauthorized operation");
        }
    }

}

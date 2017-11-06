/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Bean.specificimplementation;

import Bean.genericimplementation.TableGenericBeanImplementation;
import Bean.publicinterface.GenericBeanInterface;
import Dao.specificimplementation.PedidoSpecificDaoImplementation;
import Dao.specificimplementation.ProductoSpecificDaoImplementation;
import com.google.gson.annotations.Expose;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Kysuke
 */
public class LineapedidoSpecificBeanImplementation extends TableGenericBeanImplementation {

    @Expose
    private Integer id_producto;
    @Expose
    private Integer id_pedido;
    @Expose
    //en la bd esta como varchar
    private Integer cantidad;
    @Expose(deserialize = false)
    private PedidoSpecificBeanImplementation obj_pedido = null;
    @Expose(deserialize = false)
    private ProductoSpecificBeanImplementation obj_producto = null;

    public LineapedidoSpecificBeanImplementation() {

    }

    public LineapedidoSpecificBeanImplementation(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId_producto() {
        return id_producto;
    }

    public void setId_producto(Integer id_producto) {
        this.id_producto = id_producto;
    }

    public Integer getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(Integer id_pedido) {
        this.id_pedido = id_pedido;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public PedidoSpecificBeanImplementation getObj_pedido() {
        return obj_pedido;
    }

    public void setObj_pedido(PedidoSpecificBeanImplementation obj_pedido) {
        this.obj_pedido = obj_pedido;
    }

    public ProductoSpecificBeanImplementation getObj_producto() {
        return obj_producto;
    }

    public void setObj_producto(ProductoSpecificBeanImplementation obj_producto) {
        this.obj_producto = obj_producto;
    }

    @Override
    public String getColumns() {
        String strColumns = "";
        strColumns += "id,";
        strColumns += "cantidad,";
        strColumns += "id_pedido,";
        strColumns += "id_producto";
        return strColumns;
    }

    @Override
    public String getValues() {
        String strColumns = "";
        strColumns += id + ",";
        strColumns += cantidad + ",";
        strColumns += id_pedido + ",";
        strColumns += id_producto;
        return strColumns;
    }

    @Override
    public String toPairs() {
        String strPairs = "";
        strPairs += "cantidad=" + cantidad + ",";
        strPairs += "id_pedido=" + id_pedido + ",";
        strPairs += "id_producto=" + id_producto;
        return strPairs;
    }

    @Override
    public GenericBeanInterface fill(ResultSet oResultSet, Connection oConnection, UsuarioSpecificBeanImplementation oPuserBean_security, Integer expand) throws SQLException, Exception {
        this.setId(oResultSet.getInt("id"));
        this.setCantidad(oResultSet.getInt("cantidad"));
        this.setId_pedido(oResultSet.getInt("id_pedido"));
        this.setId_producto(oResultSet.getInt("id_producto"));
        if (expand > 0) {
            //expansion producto
            ProductoSpecificBeanImplementation oProductoBean = new ProductoSpecificBeanImplementation();
            ProductoSpecificDaoImplementation oProductoDao = new ProductoSpecificDaoImplementation(oConnection, oPuserBean_security, null);
            oProductoBean = (ProductoSpecificBeanImplementation) oProductoDao.get(oResultSet.getInt("id_producto"), expand - 1);
            this.setObj_producto(oProductoBean);
            //exapansion pedido
            PedidoSpecificBeanImplementation oPedidoBean = new PedidoSpecificBeanImplementation();
            PedidoSpecificDaoImplementation oPedidoDao = new PedidoSpecificDaoImplementation(oConnection, oPuserBean_security, null);
            oPedidoBean = (PedidoSpecificBeanImplementation) oPedidoDao.get(oResultSet.getInt("id_pedido"), expand - 1);
            this.setObj_pedido(oPedidoBean);
        } else {
            this.setId_producto(oResultSet.getInt("id_producto"));
            this.setId_pedido(oResultSet.getInt("id_pedido"));
        }

        return this;
    }
}

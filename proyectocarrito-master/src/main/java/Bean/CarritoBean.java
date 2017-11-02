package Bean;

import Bean.specificimplementation.ProductoSpecificBeanImplementation;
import com.google.gson.annotations.Expose;

/**
 *
 * @author Julian
 */

public class CarritoBean {
    @Expose
    private Integer cantidad;
    @Expose
    private ProductoSpecificBeanImplementation oProducto;

    public CarritoBean(Integer cantidad, ProductoSpecificBeanImplementation oProducto) {
        this.cantidad = cantidad;
        this.oProducto = oProducto;
    }

    public CarritoBean() {
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public ProductoSpecificBeanImplementation getoProducto() {
        return oProducto;
    }

    public void setoProducto(ProductoSpecificBeanImplementation oProducto) {
        this.oProducto = oProducto;
    }
    
}

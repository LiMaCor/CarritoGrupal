package Service.publicinterface;

import Bean.ReplyBean;

/**
 *
 * @author Julian
 */

/**
 * Interfaz que establece los métodos que no reciben ningún parámetro, sin
 * implementar, del carrito.
 */

public interface ViewServiceCarritoInterface {

    public ReplyBean list() throws Exception;

    public ReplyBean buy() throws Exception;

    public ReplyBean empty() throws Exception;
}

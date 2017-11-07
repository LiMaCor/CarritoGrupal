package Service.publicinterface;

import Bean.ReplyBean;

/**
 *
 * @author Julian
 */

/**
 * Interfaz que establece los métodos que reciben un parámetro, sin implementar,
 * del carrito.
 */

public interface TableServiceCarritoInterface {

    public ReplyBean add() throws Exception;

    public ReplyBean remove() throws Exception;
}

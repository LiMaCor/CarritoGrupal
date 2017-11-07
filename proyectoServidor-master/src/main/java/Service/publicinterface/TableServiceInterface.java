package Service.publicinterface;

/**
 *
 * @author Julián
 */

import Bean.ReplyBean;

/**
 * Interfaz que estabece los métodos Dao, que obtienen, establecen/actualizan o
 * eliminan datos de la base de datos.
 */

public interface TableServiceInterface {

    public ReplyBean get() throws Exception;

    public ReplyBean set() throws Exception;

    public ReplyBean remove() throws Exception;

}


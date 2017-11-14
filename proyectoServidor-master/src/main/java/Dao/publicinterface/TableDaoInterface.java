package Dao.publicinterface;

/**
 *
 * @author Julián
 */

/**
 * Interfaz que implementa los métodos Dao que obtienen, establecen/actualizan y
 * eliminan datos de la base de datos.
 * @param <GenericTableBean> 
 */

public interface TableDaoInterface<GenericTableBean> {

    public GenericTableBean get(int id, int intExpand) throws Exception;

    public Integer set(GenericTableBean oBean) throws Exception;

    public int remove(Integer id) throws Exception;

}

package Dao.publicinterface;

/**
 *
 * @author Julián
 */

public interface TableDaoInterface<GenericTableBean> {

    public GenericTableBean get(int id, int intExpand) throws Exception;

    public Integer set(GenericTableBean oBean) throws Exception;

    public Boolean remove(Integer id) throws Exception;

}

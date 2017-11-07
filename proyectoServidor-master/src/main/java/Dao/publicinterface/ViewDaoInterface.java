package Dao.publicinterface;

/**
 *
 * @author Julián
 */

import Helper.FilterBeanHelper;
import java.util.ArrayList;
import java.util.LinkedHashMap;

/**
 * Interfaz de los métodos Dao que obtienen registros de la base de datos.
 * @param <GenericViewBean> 
 */

public interface ViewDaoInterface<GenericViewBean> {

    public Long getCount(ArrayList<FilterBeanHelper> alFilter) throws Exception;

    public ArrayList<GenericViewBean> getPage(int intRegsPerPag, int intPage, LinkedHashMap<String, String> hmOrder, ArrayList<FilterBeanHelper> alFilter, int expand) throws Exception;

    public ArrayList<GenericViewBean> getPageX(int id_foreign, String ob_foreign, int intRegsPerPag, int intPage, LinkedHashMap<String, String> hmOrder, ArrayList<FilterBeanHelper> alFilter, int expand) throws Exception;

    public Long getCountX(int id_foreign, String ob_foreign, ArrayList<FilterBeanHelper> alFilter) throws Exception;

}

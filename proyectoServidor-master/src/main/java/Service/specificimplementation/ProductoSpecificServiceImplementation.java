package Service.specificimplementation;

import Service.genericimplementation.GenericTableService;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Julián
 */

public class ProductoSpecificServiceImplementation extends GenericTableService  {
    
    public ProductoSpecificServiceImplementation(HttpServletRequest request) {
        super(request);
    }
    
}
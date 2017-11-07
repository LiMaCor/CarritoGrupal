package Service.specificimplementation;

/**
 *
 * @author Julián
 */

import Service.genericimplementation.GenericTableService;
import javax.servlet.http.HttpServletRequest;

public class TipousuarioSpecificServiceImplementation extends GenericTableService {

    public TipousuarioSpecificServiceImplementation(HttpServletRequest request) {
        super(request);
    }

}
